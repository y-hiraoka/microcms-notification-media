import { Box, Center } from "@chakra-ui/react";
import { FC } from "react";

export const AppFooter: FC = () => {
  return (
    <Center as="footer" paddingY="12">
      <Box as="small" fontSize="sm" fontWeight="bold" color="textSecondary">
        chot Inc.
      </Box>
    </Center>
  );
};
