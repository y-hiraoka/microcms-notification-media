import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { getMessaging } from "firebase-admin/messaging";

admin.initializeApp();

const setupSubscription = async (subscriptionState: SubscriptionState) => {
  await Promise.all(
    Object.entries(subscriptionState.categorySubscriptions).map(
      ([categoryId, subscribed]) => {
        if (subscribed) {
          getMessaging().subscribeToTopic(subscriptionState.token, categoryId);
        } else {
          getMessaging().unsubscribeFromTopic(
            subscriptionState.token,
            categoryId
          );
        }
      }
    )
  );
};

export const subscribeCategoriesOnCreate = functions.firestore
  .document("notification/{notificationId}")
  .onCreate(async (snapshot, context) => {
    await setupSubscription(snapshot.data() as SubscriptionState);
  });

export const subscribeCategoriesOnUpdate = functions.firestore
  .document("notification/{notificationId}")
  .onUpdate(async (snapshot, context) => {
    await setupSubscription(snapshot.after.data() as SubscriptionState);
  });

export const notifyNewArticle = functions.https.onRequest(
  async (request, response) => {
    if (request.method !== "POST") {
      response.status(405).send("method not allowed.");
      return;
    }

    const requestKey = request.headers["x-notification-request-key"];

    if (!requestKey || requestKey !== process.env.NOTIFICATION_REQUEST_KEY) {
      response.status(401).send("invalid request key.");
    }

    const webhook = request.body as WebhookBody;

    if (
      webhook.type !== "new" ||
      webhook.contents?.new?.publishValue == undefined
    ) {
      response.send({ notified: false });
      return;
    }

    await getMessaging().send({
      topic: webhook.contents.new.publishValue.category.id,
      notification: {
        title: "新着記事のお知らせ",
        body: webhook.contents.new.publishValue.title,
        imageUrl: webhook.contents.new.publishValue.thumbnail?.url,
      },
      webpush: {
        fcmOptions: {
          link: `https://microcms-notification-media.vercel.app/articles/${webhook.id}`,
        },
      },
    });

    response.send({ notified: true });
  }
);

type WebhookBody = {
  service: string;
  api: string;
  id: string | null;
  type: "new" | "edit" | "delete";
  contents: {
    new: {
      id: string;
      publishValue: {
        title: string;
        thumbnail?: { url: string };
        category: { id: string };
      };
    } | null;
  } | null;
};

type SubscriptionState = {
  token: string;
  categorySubscriptions: {
    [categoryId: string]: boolean;
  };
};
