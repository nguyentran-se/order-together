import { Collections, LoungeData } from '@types';
import { firebaseCore } from 'pages/_app';
import { transformObjectToArrayResponse } from 'utils';
import axiosFirebase from '../axiosFirebase';
export const loungeOrderApi = {
  createLoungeOrder: (lid: string, oid: string) => {
    const url = `${Collections.LOUNGE_ORDER}/${lid}_${oid}.json`;
    const data = { lid, oid };
    return axiosFirebase.put(url, data);
  },
  getLoungeOrder: async (uid: string) => {
    if (!uid) return;
    let hostLounge: LoungeData;
    let hostOrderIds: string[] = [];
    let hostOrders: any[] = [];
    await firebaseCore.loungeRef
      .orderByChild('uid')
      .equalTo(uid)
      .once('value', (loungeSnapshot) => {
        const data = transformObjectToArrayResponse<LoungeData>(loungeSnapshot.val(), 'lid');
        hostLounge = data[0];
      });
    await firebaseCore.loungeOrderRef.once('value', (loSnapshot) => {
      const loungeOrders = transformObjectToArrayResponse(loSnapshot.val(), 'loid');
      loungeOrders.forEach((lo: any) => {
        if (lo.lid === hostLounge.lid) hostOrderIds.push(lo.oid);
      });
    });
    await firebaseCore.orderRef.once('value', (orderSnapshot) => {
      const orders = transformObjectToArrayResponse(orderSnapshot.val(), 'oid');
      orders.forEach((o: any) => {
        if (hostOrderIds.includes(o.oid)) hostOrders.push(o);
      });
    });
    return hostOrders;
  },
};
