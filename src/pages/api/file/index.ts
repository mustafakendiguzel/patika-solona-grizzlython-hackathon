// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "lib/mongodb";
type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const client = await clientPromise;
  const db = client.db("dApp");

  if (!req.body) {
    res.status(400).send({ message: "Body is empty!" });
    return;
  }

  const { fileId, username, password } = req.body;

  await db.collection("users").insertOne({
    fileId,
    username,
    password,
  });
  res.status(200).json({ name: "John Doe" });
}
