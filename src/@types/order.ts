import { UserSlack } from './slack';
export interface OrderDetail {
  [index: string]: {
    amount: number;
    [index: string]: any;
  };
}
export type Order = OrderDetail & {
  buyer: UserSlack;
};
export type OrderResponse = {
  oid: string;
} & Order;
