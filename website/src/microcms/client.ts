import { createClient, MicroCMSSchemaInfer } from "microcms-ts-sdk";
import { Article } from "./apis/article";
import { Category } from "./apis/category";

type Endpoints = {
  list: {
    articles: Article;
    categories: Category;
  };
};

const MICROCMS_API_DOMAIN = (() => {
  if (process.env.MICROCMS_API_DOMAIN) {
    return process.env.MICROCMS_API_DOMAIN;
  } else {
    throw new Error("process.env.MICROCMS_API_DOMAIN must be set.");
  }
})();

const MICROCMS_API_KEY = (() => {
  if (process.env.MICROCMS_API_KEY) {
    return process.env.MICROCMS_API_KEY;
  } else {
    throw new Error("process.env.MICROCMS_API_KEY must be set.");
  }
})();

export const microcmsClient = createClient<Endpoints>({
  serviceDomain: MICROCMS_API_DOMAIN,
  apiKey: MICROCMS_API_KEY,
});

export type MicroCMSSchema = MicroCMSSchemaInfer<typeof microcmsClient>;
