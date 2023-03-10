// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import clientPromise from "lib/mongodb";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (!req.body) {
    res.status(400).send({ message: "Body is empty!" });
    return;
  }
  const client = await clientPromise;
  const db = client.db("dApp");
  const { method } = req;
  const {following} = req.body
  if (method == "POST") {
    var ids = following

    var oids = [];
    ids.forEach(function(item){
    oids.push(new ObjectId(item));
    });
    const posts = await db.collection("files").find({ users: {$in : oids}}).toArray()
    return res.status(200).send(posts);
  }
}
