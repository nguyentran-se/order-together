export interface UserSlack {
  iss?: string;
  sub?: string;
  aud?: string;
  exp?: number;
  iat?: number;
  auth_time?: number;
  nonce?: string;
  at_hash?: string;
  teamId?: string;
  userId?: string;
  email?: string;
  email_verified?: boolean;
  date_email_verified?: number;
  locale?: string;
  name?: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
  teamName?: string;
  teamDomain?: string;
  teamImage?: string;
  teamImageDefault?: boolean;
}
