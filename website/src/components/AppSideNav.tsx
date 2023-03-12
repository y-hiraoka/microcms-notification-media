import { useNotification } from "@/lib/useNotification";
import { Box, Button, Icon, Text } from "@chakra-ui/react";
import { FC } from "react";
import { IoNotificationsOutline } from "react-icons/io5";

export const AppSideNav: FC = () => {
  const { permission, isRequesting, requestPermission } = useNotification();

  return (
    <Box as="aside" position="sticky" top={4}>
      {permission === "not-supported" ? (
        <Text fontSize="sm" textAlign="center" color="red.500">
          プッシュ通知がサポートされていません
        </Text>
      ) : permission === "denied" ? (
        <Text fontSize="sm" textAlign="center" color="red.500">
          プッシュ通知を拒否しました
        </Text>
      ) : permission === "granted" ? (
        <Text fontSize="sm" textAlign="center" color="cyan.500">
          新着記事をプッシュ通知します！
        </Text>
      ) : (
        <Button
          width="full"
          rightIcon={<Icon as={IoNotificationsOutline} />}
          colorScheme="cyan"
          variant="outline"
          onClick={requestPermission}
          isLoading={isRequesting}
        >
          通知を受け取る
        </Button>
      )}
    </Box>
  );
};
