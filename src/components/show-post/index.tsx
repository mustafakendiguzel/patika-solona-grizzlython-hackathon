import { FC, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import path from "path";
import fs from "fs/promises";
import { getCurrentUser } from "components/login-register/login";
import Image from "next/image";
import profilePicture from '../../../public/profile-photo.jpg';
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


   useEffect(() => {
    const token = localStorage.getItem("token");
      getCurrentUser(token).then((currentUser)=>{
       setCurrentUser(currentUser);
       showAllPost(currentUser).then((post)=>{
        setPosts(post)
       })
     });
  }, []);
  console.log(posts)

  return (
    <div className="flex flex-col m  w-2/5 items-center justify-center">
      <div>ALL POSTS</div>
      {
        posts.map((post,key)=>{
          return(
            <div key={key} className="w-3/5 my-20 mx-4 py-4 px-4 border-4 rounded-xl">
        <div className="relative pb-[110%]">
          <div className="absolute z-20 top-3 left-12 text-black">{post.userName}</div>
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
        </div>
        <div className="relative text-center"><button className="bg-red-600 p-3 w-1/2 text-center rounded text-white">
          SEND</button></div>
                      
      </div>
          )
        })
      }
      
    </div>
  );
};
