// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId, Collection } from "mongodb";
import clientPromise from "../../../../lib/mongodb";

type User = {
  followers: [{}];
  following: [{}];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | { message: string }>
) {
  const { method } = req;
  const { userId } = req.query;
  const { followId } = req.body;
  const client = await clientPromise;
  const db = client.db("dApp");
  const Collection: Collection<User> = await db.collection("users");
  if (method != "DELETE") {
    return res.status(400).send({ message: "Request type should be Delete!" });
  }

  // followers
  const followers = await Collection.findOneAndUpdate(
    {
      _id: new ObjectId(followId as string),
    },
    { $pull: { followers: userId as string } },
    { projection: { password: 0 }, returnDocument: "after" }
  );
  //following
  const following = await Collection.findOneAndUpdate(
    {
      _id: new ObjectId(userId as string),
    },
    { $pull: { following: followId as string } },
    { projection: { password: 0 }, returnDocument: "after" }
  );
  return await res.status(200).send({ ...followers.value, ...following.value });
}
