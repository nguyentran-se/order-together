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
