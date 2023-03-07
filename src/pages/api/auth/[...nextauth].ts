import NextAuth from "next-auth";

export default NextAuth({
  providers: [],
  database: process.env.MONGODB_URI,
  session: {
    jwt: true,
  },
  jwt: {
    secret: "asdcvbtjhm",
  },
});
