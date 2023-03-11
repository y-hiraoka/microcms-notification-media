import { NextApiHandler } from "next";

const ON_DEMAND_ISR_KEY = (() => {
  if (process.env.ON_DEMAND_ISR_KEY) {
    return process.env.ON_DEMAND_ISR_KEY;
  } else {
    throw new Error("process.env.ON_DEMAND_ISR_KEY must be set.");
  }
})();

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send("Method not allowed.");
  }

  const revalidateKey = req.headers["x-on-demand-isr-key"];

  if (revalidateKey !== ON_DEMAND_ISR_KEY) {
    console.log({ revalidateKey, ON_DEMAND_ISR_KEY });
    res.status(401).send("Invalid key.");
    return;
  }

  const webhook = req.body as WebhookBody;
  if (webhook.api !== "articles") {
    res.send({ revalidated: false });
    return;
  }

  const paths = new Set(["/"]);

  [webhook.contents?.new, webhook.contents?.old].forEach((content) => {
    if (content?.id) {
      paths.add(`/articles/${content.id}`);
    }
  });

  await Promise.all(Array.from(paths).map((path) => res.revalidate(path)));

  res.send({ revalidated: true });
};

export default handler;

type WebhookBody = {
  service: string;
  api: string;
  id: string | null;
  type: "new" | "edit" | "delete";
  contents: {
    old: {
      id: string;
    } | null;
    new: {
      id: string;
    } | null;
  } | null;
};
