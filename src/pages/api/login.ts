// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import clientPromise from "lib/mongodb";

type Data = {
  token: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
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
  const { email, password } = req.body;
  const user = await db.collection("users").findOne({
    email,
  });
  if (!user) {
    res.status(400).send({ message: "Not Authenticated!" });
    return;
  }

  await res.json({
    token: jwt.sign(
      {
        email,
      },
      process.env.JWT_KEY
    ),
  });
}
