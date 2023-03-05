import NextAuth from "next-auth";
import Providers from "next-auth/providers";

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
