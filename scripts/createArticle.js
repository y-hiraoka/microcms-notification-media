const { createClient } = require("microcms-js-sdk");
const { format } = require("date-fns");
const ja = require("date-fns/locale/ja");
const { faker } = require("@faker-js/faker");

const main = async () => {
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

  const client = createClient({
    serviceDomain: MICROCMS_API_DOMAIN,
    apiKey: MICROCMS_API_KEY,
  });

  const { contents: categories } = await client.getList({
    endpoint: "categories",
  });

  const category = categories[Math.floor(Math.random() * categories.length)];

  client.create({
    endpoint: "articles",
    content: {
      title: format(new Date(), "yyyy月M月d日 H時m分 の投稿", { locale: ja }),
      category: category.id,
      content: faker.lorem.paragraphs(10, "\n"),
      relatedArticles: [],
    },
  });
};

main();
