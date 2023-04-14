import { ArticleCard } from "@/components/ArticleCard";
import { Datetime } from "@/components/Datetime";
import { MicroCMSHtml } from "@/components/MicroCMSHtml";
import { microcmsClient, MicroCMSSchema } from "@/microcms/client";
import { AspectRatio, Box, Divider, Heading, Text } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

type Props = {
  article: MicroCMSSchema["articles"];
  relatedArticles: MicroCMSSchema["articles"][];
};

type Params = {
  contentId: string;
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    fallback: "blocking",
    paths: [],
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  if (!params?.contentId) {
    return { notFound: true };
  }

  const article = await microcmsClient
    .getListDetail({
      endpoint: "articles",
      contentId: params.contentId,
      queries: { depth: 1 },
    })
    .catch(() => null);

  if (article === null) {
    return { notFound: true, revalidate: 60 };
  }

  const relatedArticleIds = article.relatedArticles?.map((a) => a.id) ?? [];

  const { contents: relatedArticles } =
    relatedArticleIds.length > 0
      ? await microcmsClient.getList({
          endpoint: "articles",
          queries: { ids: relatedArticleIds },
        })
      : { contents: [] };

  return {
    props: { article, relatedArticles },
  };
};

const ArticlePage: NextPage<Props> = ({ article, relatedArticles }) => {
  return (
    <>
      <Head>
        <title>{article.title} | Web Push Media</title>
      </Head>
      <Box as="main">
        {article.thumbnail && (
          <AspectRatio ratio={16 / 9} marginBottom="10">
            <Image src={article.thumbnail.url} fill alt={article.title} />
          </AspectRatio>
        )}
        <Heading as="h1" fontSize={["xl", "2xl", "3xl"]}>
          {article.title}
        </Heading>
        <Text
          fontWeight="bold"
          fontSize="sm"
          color="textSecondary"
          marginTop="4"
        >
          {article.category.name}
        </Text>
        {article.publishedAt && (
          <Text fontSize="sm" color="textSecondary">
            <Datetime
              datetime={article.publishedAt}
              format="yyyy/MM/dd HH:mm"
            />
          </Text>
        )}
        <Divider marginY="10" />
        <MicroCMSHtml html={article.content} />
        {relatedArticles.length > 0 && (
          <>
            <Divider marginY="10" />
            <Box as="section">
              <Heading fontSize="lg">関連記事</Heading>
              <Box
                as="ul"
                listStyleType="none"
                display="grid"
                gridTemplateColumns="repeat(auto-fill, minmax(240px,  1fr))"
                columnGap="4"
                rowGap="8"
                marginTop="4"
              >
                {relatedArticles.map((relatedArticle) => (
                  <li key={relatedArticle.id}>
                    <ArticleCard article={relatedArticle} />
                  </li>
                ))}
              </Box>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default ArticlePage;
