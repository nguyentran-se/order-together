import { Collections, LoungeData, ScrapedLounge, UserSlack } from '@types';
import { firebaseCore } from 'pages/_app';
import { transformObjectToArrayResponse } from 'utils';
import axiosFirebase from '../axiosFirebase';

export const userLoungeApi = {
  createUserLounge: (uid: string, lid: string) => {
    const url = `${Collections.USER_LOUNGE}/${uid}_${lid}.json`;
    const data = { uid, lid };
    return axiosFirebase.put(url, data);
  },
  getUserLounge: async () => {
    let lounges: ScrapedLounge[] = [];
    let users: UserSlack[] = [];
    let data: LoungeData[] = [];
    await firebaseCore.loungeRef.once('value', (snapshot) => {
      lounges = transformObjectToArrayResponse<ScrapedLounge>(snapshot.val(), 'lid');
    });
    await firebaseCore.userLoungeRef.orderByChild('lid').once('value', (ulSnapshot) => {
      const ulids = transformObjectToArrayResponse(ulSnapshot.val(), 'ulid');
      data = lounges.map((d) => {
        const ulid: any = ulids.find((ul: any) => ul.lid === d.lid);
        return { ...d, host: ulid.uid };
      });
    });
    await firebaseCore.userRef.once('value', (userSnapshot) => {
      users = transformObjectToArrayResponse(userSnapshot.val(), 'uid');
    });
    data = data.map((d) => {
      const hostInfo = users.find((u) => (u as any).uid === d.host);
      return { ...d, host: { ...hostInfo } };
    });
    return data;
  },
};
