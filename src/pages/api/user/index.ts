// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "lib/mongodb";
import { FindCursor, WithId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | { message: string }>
) {
  const { method } = req;
  if (method !== "GET") {
    res.status(400).send({ message: "Request type should be Get!" });
    return;
  }
  const client = await clientPromise;
  const db = client.db("dApp");

  const allUser = await db.collection("users").find({}).toArray();
  await res.status(200).send(allUser);
}
