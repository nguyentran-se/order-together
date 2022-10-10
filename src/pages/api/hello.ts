// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { initializeApp } from "firebase-admin/app";
// import adminConfig from "@firebase/admin-config.json";
type Data = {
  name: string;
};
// initializeApp({
//   credential:
// });
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe" });
}
