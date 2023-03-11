// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "lib/mongodb";
import { ObjectId, Collection } from "mongodb";

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
  const { followId,walletId } = req.body;
  const client = await clientPromise;
  const db = client.db("dApp");
  const Collection: Collection<User> = await db.collection("users");
  if (method == "GET") {
    const user = await db.collection("users").findOne(
      {
        _id: new ObjectId(userId as string),
      },
      { projection: { password: 0 } }
    );
    return await res.status(200).send(user);
  } else if (method == "PUT") {
    // followers
    const followers = await Collection.findOneAndUpdate(
      {
        _id: new ObjectId(followId as string),
      },
      { $addToSet: { followers: userId as string } },
      { projection: { password: 0 }, returnDocument: "after" }
    );
    //following
    const following = await Collection.findOneAndUpdate(
      {
        _id: new ObjectId(userId as string),
      },
      { $addToSet: { following: followId as string } },
      { projection: { password: 0 }, returnDocument: "after" }
    );
    return await res
      .status(200)
      .send({ ...followers.value, ...following.value });
  } else if(method == "PATCH") {
    if(walletId) {
      const users = await Collection.findOneAndUpdate(
        {
          _id: new ObjectId(userId as string),
        },
        { $set: { walletId: walletId as string } },
        { projection: { password: 0 }, returnDocument: "after" }
      );
      return await res.send({ ...users.value });
    }
    return await res.json({ok:'ok'})
  }
}
