import { Box, Button, Icon } from "@chakra-ui/react";
import { FC } from "react";
import { IoNotificationsOutline } from "react-icons/io5";

export const AppSideNav: FC = () => {
  return (
    <Box as="aside" position="sticky" top={4}>
      <Button
        width="full"
        rightIcon={<Icon as={IoNotificationsOutline} />}
        colorScheme="cyan"
        variant="outline"
      >
        通知を受け取る
      </Button>
    </Box>
  );
};
