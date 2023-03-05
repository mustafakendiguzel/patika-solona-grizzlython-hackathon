// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import clientPromise from "lib/mongodb";

type Data = {
  token: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | { message: string }>
) {
  if (!req.body) {
    res.status(400).send({ message: "Body is empty!" });
    return;
  }
  const { method } = req;
  if (method !== "POST") {
    res.status(400).send({ message: "Request type should be Post!" });
    return;
  }
  const client = await clientPromise;
  const db = client.db("dApp");
  const { email, username, password } = req.body;
  await db.collection("users").insertOne({
    email,
    username,
    password,
  });
  await res.status(201).end();
}
