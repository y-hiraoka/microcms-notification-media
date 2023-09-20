const { getMicroCMSClient } = require("./getMicroCMSClient");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
    articles.map(async (article, index) => {
      // microCMS の DELETE API 制限 5回/秒 を考慮する
      await sleep(index * 250);

      await client.delete({
        endpoint: "articles",
        contentId: article.id,
      });

      console.log(`Deleted: ${article.title}`);
    })
  );
};

main();
