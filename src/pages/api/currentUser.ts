// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import clientPromise from "lib/mongodb";
import { ObjectId } from "mongodb";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const bearerHeader = req.headers["authorization"];
  const jwtKey = process.env.JWT_KEY;
  const client = await clientPromise;
  const db = client.db("dApp");
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    var payload;
    const user = await db.collection("users").findOne({
      _id: new ObjectId(payload.id as string),
    });
    try {
      payload = await jwt.verify(bearerToken, jwtKey);
    } catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        return res.status(401).end();
      }
      return res.status(400).end();
    }

    return res.status(200).json(user);
  }
  return res.status(400).json({ message: "Bearer is undefined" });
}
