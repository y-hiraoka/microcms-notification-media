import { AppLayout } from "@/components/AppLayout";
import { AppFooter } from "@/components/AppFooter";
import { AppHeader } from "@/components/AppHeader";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AppType } from "next/app";
import { AppSideNav } from "@/components/AppSideNav";
import Head from "next/head";

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        fontFamily: ['"Noto Sans JP"'].join(","),
        backgroundColor: "gray.50",
        color: "textPrimary",
      },
    },
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  semanticTokens: {
    colors: {
      error: "red.500",
      textPrimary: "gray.800",
      textSecondary: "blackAlpha.600",
    },
  },
});

const NextApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Web Push Media</title>
      </Head>
      <ChakraProvider theme={theme}>
        <AppLayout>
          <AppHeader />
          <Component {...pageProps} />
          <AppSideNav />
          <AppFooter />
        </AppLayout>
      </ChakraProvider>
    </>
  );
};

export default NextApp;
