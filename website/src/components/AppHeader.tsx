import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";

export const AppHeader: FC = () => {
  return (
    <Box as="header" paddingY="12">
      <HStack flexWrap="wrap" columnGap="12">
        <Heading
          as="h1"
          color="textPrimary"
          marginRight="auto"
          fontWeight="500"
        >
          <Link href="/">Web Push Media</Link>
        </Heading>
        <Text color="textSecondary" fontSize="sm">
          Webでも通知が来るメディア
        </Text>
      </HStack>
    </Box>
  );
};
