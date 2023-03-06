import type { NextPage } from "next";
import Head from "next/head";
import { LoginView } from "views/login";

const Login: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Solana Scaffold</title>
        <meta name="description" content="Solana Scaffold" />
      </Head>
      <LoginView />
    </div>
  );
};

export default Login;
