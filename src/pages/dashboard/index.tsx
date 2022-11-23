import {
  Heading,
  Table,
  TableContainer,
  Tag,
  TagLabel,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { MappedHostOrders } from '@types';
import clsx from 'clsx';
import { useAppSelector } from 'hooks';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useMemo } from 'react';
import { selectHostOrders } from 'selectors';
import { getHostLounge } from 'slices/dashboard/dashboard.saga';
import { useAppDispatch } from 'store';
import { AR, transformDashboardData } from './helper';
import style from './index.module.scss';
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
const Dashboard: NextPage = () => {
  const dispatch = useAppDispatch();
  const hostOrders = useAppSelector(selectHostOrders);

  useEffect(() => {
    dispatch(getHostLounge());
  }, [dispatch]);

  const data: MappedHostOrders[] = useMemo(() => transformDashboardData(hostOrders), [hostOrders]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const tableHeader = useMemo(
    () =>
      table.getHeaderGroups().map((headerGroup) => (
        <Tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <Th
              key={header.id}
              className={clsx({ [style['Text-center']]: AR.includes(header.id) })}
            >
              {header.isPlaceholder
                ? null
                : flexRender(header.column.columnDef.header, header.getContext())}
            </Th>
          ))}
        </Tr>
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  );
  const tableBody = useMemo(
    () =>
      table.getRowModel().rows.map((row) => (
        <Tr key={row.id}>
          {row.getVisibleCells().map((cell) => {
            return (
              <Td
                key={cell.id}
                className={clsx({ [style['Text-center']]: AR.includes(cell.column.id) })}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Td>
            );
          })}
        </Tr>
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  );
  const total = useMemo(
    () =>
      table.getRowModel().rows.reduce((acc, row) => {
        return (row.getValue('price') as MappedHostOrders['price']).value + acc;
      }, 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  );

  return (
    <div>
      <Head>
        <title>Order Together | Dashboard</title>
        <meta name="description" content="Order" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading as="h3" size="lg" mb="4">
        Tiệm cơm bất ổn
      </Heading>
      <TableContainer>
        <Table variant="simple">
          <Thead>{tableHeader}</Thead>
          <Tbody>{tableBody}</Tbody>
          <Tfoot>
            <Tr>
              <Td>
                <b>TOTAL: </b>
              </Td>
              <Td></Td>
              <Td></Td>
              <Td>
                <b>{total.toLocaleString('vi-VN')} ₫</b>
              </Td>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Dashboard;
