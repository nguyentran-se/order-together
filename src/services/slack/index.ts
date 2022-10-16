import axios from 'axios';

export default class Slack {
  private configuration: any;

  constructor() {
    this.configuration = this.intializeConfiguration();
  }

  intializeConfiguration = () => {
    const __DEV__ = process.env.NODE_ENV;
    const localhost = 'https://localhost:3000/';
    return {
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      redirect_uri: __DEV__ ? localhost : process.env.NEXT_PUBLIC_REDIRECT_URI,
      client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      response_type: 'code',
      scope: 'openid%20profile%20email',
    };
  };

  createAuthRequest = (config: any = this.configuration, isOpenid: boolean = true) => {
    const requestInitial = isOpenid
      ? 'https://slack.com/openid/connect/authorize?'
      : 'https://slack.com/oauth/v2/authorize?';
    return Object.keys(config).reduce(
      (total, key, index) =>
        total + key + '=' + config[key] + (index === Object.keys(config).length - 1 ? '' : '&'),
      requestInitial,
    );
  };

  createExchangeTokenPostRequest = (code: string) => {
    const url = 'https://slack.com/api/openid.connect.token';
    const reqBody = {
      code,
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID as string,
      client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
    };
    const urlEncodedBody = new URLSearchParams(Object.entries(reqBody)).toString();
    const options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    return axios.post(url, urlEncodedBody, options);
  };
}
// const oathConfig = {
//   ...commonConfig,
//   user_scope: 'identity.basic,identity.email,identity.avatar',
// };
