import { transformObjectToArrayResponse } from 'utils';

export const transformDashboardData = (hostOrders: any[]) => {
  //name, orderName, amount, price, finalPrice, status
  const flattedData: any[] = [];
  hostOrders.forEach((ho, index) => {
    const confirmed = transformObjectToArrayResponse({ ...ho.confirmed }, 'oid');

    if (confirmed.length >= 0) {
      confirmed.forEach((c: any) => {
        flattedData.push({
          buyer: `${ho.buyer.givenName} ${ho.buyer.familyName}`,
          orderName: c.name,
          amount: c.amount,
          price: {
            display: `${c.priceV2.amountDisplay} ${c._currency.symbol}`,
            value: c.priceV2.amountInMinor,
          },
          finalPrice: c.finalPrice || null,
          id: c.oid,
          paidStatus: index % 2 === 0 ? false : true,
        });
      });
    }
  });
  return flattedData;
};

export const AR = ['paidStatus'];
