export type MappedHostOrders = {
  buyer: string;
  orderName: string;
  amount: number;
  price: {
    display: string;
    value: number;
  };
  finalPrice: number | null;
  id: string;
  paidStatus: boolean;
};
