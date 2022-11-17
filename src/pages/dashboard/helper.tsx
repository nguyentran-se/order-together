import { Tag, TagLabel } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { MappedHostOrders } from '@types';
import { transformObjectToArrayResponse } from 'utils';
const columnHelper = createColumnHelper<MappedHostOrders>();
export const columns = [
  columnHelper.accessor('buyer', {
    header: 'Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('orderName', {
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => 'Order',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('amount', {
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => 'Amount',
  }),
  columnHelper.accessor('price', {
    header: () => 'Price',
    cell: (info) => info.getValue().display,
  }),
  columnHelper.accessor('finalPrice', {
    header: 'Final Price',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('paidStatus', {
    header: 'Status',
    cell: (info) =>
      info.getValue() ? (
        <Tag
          size={'md'}
          borderRadius="full"
          variant="solid"
          color="#10892A"
          backgroundColor="#EBF9EB"
        >
          <TagLabel>Paid</TagLabel>
        </Tag>
      ) : (
        <Tag
          size={'md'}
          borderRadius="full"
          variant="subtle"
          backgroundColor={'#F9E8D9'}
          color={'#E35505'}
          style={{ cursor: 'pointer' }}
        >
          <TagLabel>Not paid yet</TagLabel>
        </Tag>
      ),
  }),
];
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
