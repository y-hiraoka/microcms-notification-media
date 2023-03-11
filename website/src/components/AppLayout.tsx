import { Box, Container, Flex } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

export const AppLayout: FC<{
  children: [ReactNode, ReactNode, ReactNode, ReactNode];
}> = ({ children: [child1, child2, child3, child4] }) => {
  return (
    <Box
      display="grid"
      minHeight="100vh"
      gridTemplateRows={[
        "auto 1fr auto auto",
        "auto 1fr auto auto",
        "auto 1fr auto",
      ]}
    >
      <Container paddingX={[4, 8]} maxWidth="container.xl">
        {child1}
      </Container>
      <Container paddingX={[4, 8]} maxWidth="container.xl">
        <Flex gap={8}>
          <Box flex={1}>{child2}</Box>
          <Box display={["none", "none", "block"]} width="240px">
            {child3}
          </Box>
        </Flex>
      </Container>
      <Box
        display={["block", "block", "none"]}
        width="full"
        position="sticky"
        bottom={0}
        left={0}
        bgColor="gray.50"
        padding="4"
      >
        {child3}
      </Box>
      <Container paddingX={[4, 8]} maxWidth="container.xl">
        {child4}
      </Container>
    </Box>
  );
};
