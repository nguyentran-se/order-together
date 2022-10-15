export interface UserSlack {
  iss?: string;
  sub?: string;
  aud?: string;
  exp?: number;
  iat?: number;
  authTime?: number;
  nonce?: string;
  atHash?: string;
  teamId?: string;
  userId?: string;
  email?: string;
  emailVerified?: boolean;
  dateEmailVerified?: number;
  locale?: string;
  name?: string;
  picture?: string;
  givenName?: string;
  familyName?: string;
  teamName?: string;
  teamDomain?: string;
  teamImage?: string;
  teamImageDefault?: boolean;
}
