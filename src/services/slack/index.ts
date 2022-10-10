import axios from "axios";

const commonConfig = {
  client_id: "2697222791.4155630899861",
  redirect_uri: "https%3A%2F%2Flocalhost:3000",
};

const openidConfig = {
  ...commonConfig,
  client_secret: "df99362992fce7d81a2a97f0416bed86",
  response_type: "code",
  scope: "openid%20profile%20email",
};

const oathConfig = {
  ...commonConfig,
  user_scope: "identity.basic,identity.email,identity.avatar",
};

export function createAuthRequest(
  config: any = openidConfig,
  isOpenid: boolean = true
) {
  const requestInitial = isOpenid
    ? "https://slack.com/openid/connect/authorize?"
    : "https://slack.com/oauth/v2/authorize?";
  return Object.keys(config).reduce(
    (total, key, index) =>
      total +
      key +
      "=" +
      config[key] +
      (index === Object.keys(config).length - 1 ? "" : "&"),
    requestInitial
  );
}

export function createExchangeTokenPostRequest(code: string) {
  const url = "https://slack.com/api/openid.connect.token";
  const reqBody = {
    code,
    client_id: "2697222791.4155630899861",
    client_secret: "df99362992fce7d81a2a97f0416bed86",
  };
  const urlEncodedBody = new URLSearchParams(
    Object.entries(reqBody)
  ).toString();
  const options = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  return axios.post(url, urlEncodedBody, options);
}
