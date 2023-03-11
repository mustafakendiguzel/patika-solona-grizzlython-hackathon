import { FC, useEffect, useState,useCallback } from "react";
import { GetServerSideProps } from "next";
import path from "path";
import fs from "fs/promises";
import { getCurrentUser } from "components/login-register/login";
import Image from "next/image";
import profilePicture from '../../../public/profile-photo.jpg';
import { useWallet,useConnection, } from "@solana/wallet-adapter-react";
import { SendTransaction } from "components/SendTransaction";
import { getUser } from "components/peoples";
import { Keypair, SystemProgram, Transaction,  PublicKey,TransactionMessage, TransactionSignature, VersionedTransaction } from '@solana/web3.js';
import { notify } from "utils/notifications";


async function showAllPost(currentUser?: any) {
  const post = await fetch(`api/show-post`, {
    headers: { "Content-Type": "application/json" },
     method: "POST",
     body: JSON.stringify({following: currentUser.following}),
   })
  const posts: Array<String> = await post.json();
  const filteredPost = posts.filter((post:any) => {
    return post.users.toString() !== currentUser._id;
  });
  return filteredPost;
}



export const ShowPostList: FC = () => {
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [posts, setPosts] = useState([])
  const [postSharedUser,setPostSharedUser] = useState(null)
  const [currentUser, setCurrentUser] = useState(null);
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

   useEffect(() => {
    const token = localStorage.getItem("token");
      getCurrentUser(token).then((currentUser)=>{
       setCurrentUser({...currentUser,publicKey:publicKey ? publicKey:null });
       showAllPost(currentUser).then((post)=>{
        const updatedPost = post.map((el:any)=>{
          getUser(el.users).then((user)=>{
            el['walletId'] = user.walletId ? user.walletId:false
          })
          return el
        })
          setPosts(updatedPost)
       })
     });
  }, []);
  
  const onClick = useCallback(async (walletID:string) => {
    
    if (!walletID) {
        notify({ type: 'error', message: `Wallet not connected!` });
        console.log('error', `Send Transaction: Wallet not connected!`);
        return;
    }

    let signature: TransactionSignature = '';
    try {
        const destPubkey = new PublicKey(walletID);
        console.log("burdaym",destPubkey)
        const randomKehy = publicKey
        // Create instructions to send, in this case a simple transfer
        const instructions = [
            SystemProgram.transfer({
                fromPubkey: publicKey,
                // @ts-ignore
                toPubkey: destPubkey,
                lamports: 1_000_000,
            }),
        ];
        console.log()
        // Get the lates block hash to use on our transaction and confirmation
        let latestBlockhash = await connection.getLatestBlockhash()

        // Create a new TransactionMessage with version and compile it to legacy
        const messageLegacy = new TransactionMessage({
            payerKey: publicKey,
            recentBlockhash: latestBlockhash.blockhash,
            instructions,
        }).compileToLegacyMessage();

        // Create a new VersionedTransacction which supports legacy and v0
        const transation = new VersionedTransaction(messageLegacy)

        // Send transaction and await for signature
        signature = await sendTransaction(transation, connection);

        // Send transaction and await for signature
        await connection.confirmTransaction({ signature, ...latestBlockhash }, 'confirmed');

        console.log(signature);
        notify({ type: 'success', message: 'Transaction successful!', txid: signature });
    } catch (error: any) {
        notify({ type: 'error', message: `Transaction failed!`, description: error?.message, txid: signature });
        console.log('error', `Transaction failed! ${error?.message}`, signature);
        return;
    }
}, [publicKey, notify, connection, sendTransaction]);

  return (
    <div className="flex flex-col m  w-2/5 items-center justify-center">
      <div>ALL POSTS</div>
      {
        posts.map((post,key)=>{
          console.log(post)
          return(
            <div key={key} className="w-3/5 my-20 mx-4 py-4 px-4 border-4 rounded-xl">
        <div className="relative pb-[110%]">
          <div className="absolute z-20 top-3 left-12 text-white">{post.userName}</div>
          <div className="absolute z-10 left-3 top-2">
          <Image
                    className="rounded-full border-black border-2"
                    src={profilePicture}
                    alt="Picture of the author"
                    width="30"
                    height="30"
                  />
          </div>  
          <div className="absolute z-0 left-0 top-0">
        { post.fileUrl && < Image
                    className=""
                    src={post.fileUrl}
                    alt="Picture of the author"
                    width="400"
                    height="400"
                  />}
          </div>

        </div> 
        <div className="relative text-center mb-10 z-40" >
          <select className="bg-zinc-300 text-black w-full text-center">
            {
              post.select && post.select.map((select,key)=>{
                return(
                <option key={key}>
                  {select}
                </option>
                )
              })
            }
          </select>
        {post.walletId ? false:true && <div className="absolute right-0 bottom-100 text-red-700" >User not add wallet!</div>}
        </div>
        <div   className="relative text-center"><button disabled={!post.walletId ? true:false}  onClick={async()=>{
          await onClick(post.walletId)
          // await SendTransaction({walletID:})
        }} className="bg-red-600 p-3 w-1/2 text-center rounded text-white disabled:opacity-25">
          SEND</button></div>
                      
      </div>
          )
        })
      }
      
    </div>
  );
};
