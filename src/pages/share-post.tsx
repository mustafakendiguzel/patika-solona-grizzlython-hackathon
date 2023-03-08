import type { NextPage } from "next";
import Head from "next/head";
import { SharePostView } from "views";

const SharePost: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Solana Scaffold</title>
        <meta name="description" content="Basic Functionality" />
      </Head>
      <SharePostView />
    </div>
  );
};

export default SharePost;
