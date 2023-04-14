import { firebaseApp } from "@/firebase";
import { useFirestoreDocSubscription } from "@/lib/useFirestoreSubscription";
import { useNotification } from "@/lib/useNotification";
import { MicroCMSSchema, microcmsClient } from "@/microcms/client";
import {
  Box,
  Button,
  Checkbox,
  Heading,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useCallback } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import useSWR from "swr";

type Props = {
  categories: MicroCMSSchema["categories"][];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { contents: categories } = await microcmsClient.getAll({
    endpoint: "categories",
  });

  return {
    props: { categories },
  };
};

const NotificationsSettingsPage: NextPage<Props> = ({ categories }) => {
  const { permission, requestPermission, isRequesting } = useNotification();

  const requestFirstPermission = useCallback(async () => {
    if (permission === "granted") return;
    const token = await requestPermission();
    if (!token) return;
    const db = getFirestore(firebaseApp);
    await setDoc(doc(db, "notification", token), {
      token: token,
      categorySubscriptions: categories.reduce(
        (acc, category) => ({ ...acc, [category.id]: true }),
        {}
      ),
    });
  }, [categories, permission, requestPermission]);

  const { data: notificationToken } = useSWR(
    ["notification-token", permission],
    async () => {
      if (permission !== "granted") return null;
      return requestPermission();
    }
  );

  return (
    <>
      <Head>
        <title>通知設定 | Web Push Media</title>
      </Head>
      <Box as="main">
        <Heading fontSize="2xl" fontWeight="500" marginBottom="8">
          通知設定
        </Heading>
        {permission === "not-supported" ? (
          <Text fontSize="sm" color="red.500">
            プッシュ通知がサポートされていません
          </Text>
        ) : permission === "denied" ? (
          <Text fontSize="sm" color="red.500">
            プッシュ通知を拒否しました
          </Text>
        ) : permission === "granted" ? (
          <Text fontSize="sm" color="cyan.500">
            新着記事をプッシュ通知します！
          </Text>
        ) : (
          <Button
            rightIcon={<Icon as={IoNotificationsOutline} />}
            colorScheme="cyan"
            variant="solid"
            onClick={requestFirstPermission}
            isLoading={isRequesting}
          >
            通知を許可する
          </Button>
        )}
        {notificationToken && (
          <SubscriptionCheckboxes
            categories={categories}
            token={notificationToken}
          />
        )}
      </Box>
    </>
  );
};

export default NotificationsSettingsPage;

type SubscriptionState = {
  token: string;
  categorySubscriptions: {
    [categoryId: string]: boolean;
  };
};

const SubscriptionCheckboxes: React.FC<{
  categories: MicroCMSSchema["categories"][];
  token: string;
}> = ({ categories, token }) => {
  const subscriptionState = useFirestoreDocSubscription<SubscriptionState>(
    "notification",
    token
  );

  const categorySubscriptions = subscriptionState?.categorySubscriptions ?? {};

  const allChecked = Object.values(categorySubscriptions).every((v) => v);
  const isIndeterminate =
    Object.values(categorySubscriptions).some((v) => v) && !allChecked;

  const onChangeItem = async (id: string, isChecked: boolean) => {
    const firestore = getFirestore(firebaseApp);

    setDoc(doc(firestore, "notification", token), {
      token: token,
      categorySubscriptions: Object.fromEntries(
        categories.map((category) => [
          category.id,
          category.id === id
            ? isChecked
            : categorySubscriptions[category.id] ?? false,
        ])
      ),
    });
  };

  const onChangeAll = async (isChecked: boolean) => {
    const firestore = getFirestore(firebaseApp);

    setDoc(doc(firestore, "notification", token), {
      token: token,
      categorySubscriptions: Object.fromEntries(
        categories.map((category) => [category.id, isChecked])
      ),
    });
  };

  return (
    <Box marginTop="8">
      <Checkbox
        colorScheme="cyan"
        isChecked={allChecked}
        isIndeterminate={isIndeterminate}
        onChange={(e) => onChangeAll(e.target.checked)}
      >
        全てのカテゴリーを購読する
      </Checkbox>
      <Stack pl={6} mt="3" spacing="3">
        {categories.map((category) => (
          <Checkbox
            key={category.id}
            colorScheme="cyan"
            isChecked={
              subscriptionState?.categorySubscriptions?.[category.id] ?? false
            }
            onChange={(e) => onChangeItem(category.id, e.target.checked)}
          >
            {category.name}
          </Checkbox>
        ))}
      </Stack>
    </Box>
  );
};
