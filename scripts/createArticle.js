const { format } = require("date-fns");
const ja = require("date-fns/locale/ja");
const { faker } = require("@faker-js/faker");
const { getMicroCMSClient } = require("./getMicroCMSClient");

const main = async () => {
  const client = getMicroCMSClient();

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
