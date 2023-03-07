import type { NextPage } from "next";
import Head from "next/head";
import { PeoplesView } from "../views";

const Peoples: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Solana Scaffold</title>
        <meta name="description" content="Basic Functionality" />
      </Head>
      <PeoplesView />
    </div>
  );
};

export default Peoples;
