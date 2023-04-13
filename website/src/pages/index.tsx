import { ArticleList } from "@/components/ArticleList";
import { microcmsClient, MicroCMSSchema } from "@/microcms/client";
import { Box, Heading, VisuallyHidden } from "@chakra-ui/react";
import { GetStaticProps, NextPage } from "next";

type Props = {
  articles: MicroCMSSchema["articles"][];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { contents: articles } = await microcmsClient.getAll({
    endpoint: "articles",
    queries: { orders: "-publishedAt" },
  });
  return {
    props: { articles },
  };
};

const Home: NextPage<Props> = ({ articles }) => {
  return (
    <Box as="main">
      <VisuallyHidden>
        <Heading fontSize="2xl" fontWeight="500">
          Home
        </Heading>
      </VisuallyHidden>
      <ArticleList articles={articles} />
    </Box>
  );
};

export default Home;
