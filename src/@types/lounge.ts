import { UserSlack } from './slack';

export type ScrapedLounge = {
  activeMerchantID: string;
  cuisine: any;
  entities: any;
  errors: any;
  loadings: any;
  menuRefreshedInfoBarVisible: boolean;
  uid?: string;
  lid?: string;
};
export type LoungeData = ScrapedLounge & { host: UserSlack };
