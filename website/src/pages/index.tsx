import { ArticleCard } from "@/components/ArticleCard";
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
      <Box
        as="ul"
        listStyleType="none"
        display="grid"
        gridTemplateColumns="repeat(6, 1fr)"
        rowGap="8"
        columnGap="4"
      >
        {articles.map((article, index) => (
          <Box
            as="li"
            key={article.id}
            gridColumn={
              index === 0
                ? ["span 6", "span 6", "span 6", "span 3", "span 3"]
                : index === 1
                ? ["span 6", "span 3", "span 3", "span 3", "span 3"]
                : ["span 6", "span 3", "span 3", "span 3", "span 2"]
            }
          >
            <ArticleCard article={article} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Home;
