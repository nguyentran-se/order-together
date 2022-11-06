export interface UserFirebase {
  accessToken?: string;
  refreshToken?: string;
  displayName?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  photoURL?: string | null;
  uid?: string;
  tenantId?: string | null;
}

export type ObjectFirebaseResponse = {
  [index: string]: Object;
};

export enum Collections {
  LOUNGE = 'lounge',
  USER = 'user',
  USER_LOUNGE = 'user-lounge',
  ORDER = 'order',
  LOUNGE_ORDER = 'lounge-order',
}
