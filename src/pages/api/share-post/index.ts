// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import clientPromise from "lib/mongodb";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

export type loginData = {
  token: string;
};

export type errorData = {
  message: string;
};

function isSamePass(myPlaintextPassword: string, hash: string) {
  return bcrypt
    .compare(myPlaintextPassword, hash)
    .then(function (result: boolean) {
      return result;
    });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<loginData | errorData>
) {
  if (!req.body) {
    res.status(400).send({ message: "Body is empty!" });
    return;
  }
  const client = await clientPromise;
  const db = client.db("dApp");
  const { method } = req;
  const { fileUrl, userId, input1, input2 } = req.body;
  console.log(fileUrl, userId, input1, input2);
  if (method == "POST") {
    const file = await db.collection("files").insertOne({
      users: new ObjectId(userId as string),
      fileUrl: "http://localhost:3000/images/" + fileUrl,
      select: [input1, input2],
    });
    return res.status(400).send({ message: "File created" });
  }
}
