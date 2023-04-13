import { Box, Button, Icon } from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";
import { IoNotificationsOutline } from "react-icons/io5";

export const AppSideNav: FC = () => {
  return (
    <Box as="aside" position="sticky" top={4}>
      <Button
        as={Link}
        href="/settings/notifications"
        width="full"
        rightIcon={<Icon as={IoNotificationsOutline} />}
        colorScheme="cyan"
        variant="outline"
      >
        通知設定
      </Button>
    </Box>
  );
};
