import { Box, Heading, Link, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import NextLink from "next/link";

const NotFoundPage: NextPage = () => {
  return (
    <Box as="main">
      <Heading as="h1" fontSize="2xl">
        Not Found
      </Heading>
      <Text marginTop="8">
        <Link as={NextLink} href="/" color="textSecondary" fontSize="sm">
          TOPに戻る
        </Link>
      </Text>
    </Box>
  );
};

export default NotFoundPage;
