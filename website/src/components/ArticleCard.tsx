import { MicroCMSSchema } from "@/microcms/client";
import { AspectRatio, Box, Heading, Icon, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { CiImageOff } from "react-icons/ci";
import { Datetime } from "./Datetime";

type Article = Omit<MicroCMSSchema["articles"], "content">;

export const ArticleCard: FC<{ article: Article }> = ({ article }) => {
  return (
    <Box as={Link} display="block" href={`/articles/${article.id}`}>
      <article>
        <AspectRatio ratio={16 / 9} bgColor="gray.100">
          {article.thumbnail ? (
            <Image fill src={article.thumbnail.url} alt={article.title} />
          ) : (
            <Box>
              <AspectRatio ratio={1 / 1} bgColor="gray.100" width="25%">
                <Icon
                  as={CiImageOff}
                  color="gray.300"
                  aria-label="no thumbnail"
                />
              </AspectRatio>
            </Box>
          )}
        </AspectRatio>
        <Heading
          as="h2"
          fontSize={["md", "lg", "lg", "lg", "xl"]}
          marginTop="2"
        >
          {article.title}
        </Heading>
        <Text
          display="block"
          marginTop="2"
          as="span"
          fontWeight="bold"
          fontSize="sm"
          color="textSecondary"
        >
          {article.category.name}
        </Text>
        {article.publishedAt && (
          <Text marginTop="0" fontSize="sm" color="textSecondary">
            <Datetime
              datetime={article.publishedAt}
              format="yyyy/MM/dd HH:mm"
            />
          </Text>
        )}
      </article>
    </Box>
  );
};
