import { MicroCMSSchema } from "@/microcms/client";
import { Box } from "@chakra-ui/react";
import { FC } from "react";
import { ArticleCard } from "./ArticleCard";

type Article = Omit<MicroCMSSchema["articles"], "content">;

export const ArticleList: FC<{ articles: Article[] }> = ({ articles }) => {
  return (
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
  );
};
