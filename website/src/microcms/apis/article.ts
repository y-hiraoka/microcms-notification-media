import { MicroCMSImage, MicroCMSRelation } from "microcms-ts-sdk";
import { Category } from "./category";

export type Article = {
  title: string;
  thumbnail?: MicroCMSImage;
  content: string;
  category: MicroCMSRelation<Category>;
  relatedArticles?: MicroCMSRelation<Article>[];
};
