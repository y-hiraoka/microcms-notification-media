const { getMicroCMSClient } = require("./getMicroCMSClient");

const main = async () => {
  const client = getMicroCMSClient();

  const { contents: articles } = await client.getList({
    endpoint: "articles",
    queries: {
      limit: 14,
      fields: ["id", "title", "publishedAt"],
      orders: "-publishedAt",
    },
  });

  await Promise.all(
    articles.map(async (article) => {
      await client.delete({
        endpoint: "articles",
        contentId: article.id,
      });

      console.log(`Deleted: ${article.title}`);
    })
  );
};

main();
