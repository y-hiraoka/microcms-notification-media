import { ArticleList } from "@/components/ArticleList";
import { MicroCMSSchema, microcmsClient } from "@/microcms/client";
import { Box, Heading } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

type Props = {
  category: MicroCMSSchema["categories"];
  articles: MicroCMSSchema["articles"][];
};

type Params = {
  categoryId: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: "blocking",
    paths: [],
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  if (!params?.categoryId) {
    return { notFound: true };
  }

  const category = await microcmsClient
    .getListDetail({
      endpoint: "categories",
      contentId: params.categoryId,
    })
    .catch(() => null);

  if (category === null) {
    return { notFound: true, revalidate: 60 };
  }

  const { contents: articles } = await microcmsClient.getAll({
    endpoint: "articles",
    queries: { filters: `category[equals]${category.id}` },
  });

  return {
    props: { category, articles },
  };
};

const CategoryPage: NextPage<Props> = ({ category, articles }) => {
  return (
    <Box as="main">
      <Heading fontSize="2xl" fontWeight="500" marginBottom="8">
        {category.name} の記事一覧
      </Heading>
      <ArticleList articles={articles} />
    </Box>
  );
};

export default CategoryPage;
