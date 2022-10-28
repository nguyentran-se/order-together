import { UserSlack } from './slack';
export interface OrderDetail {
  [index: string]: any;
  amount: number;
}
export interface OrderPayload extends OrderDetail {
  buyer: UserSlack;
}
