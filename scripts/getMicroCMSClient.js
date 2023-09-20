const { createClient } = require("microcms-js-sdk");

const getMicroCMSClient = () => {
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

  return createClient({
    serviceDomain: MICROCMS_API_DOMAIN,
    apiKey: MICROCMS_API_KEY,
  });
};

module.exports = {
  getMicroCMSClient,
};
