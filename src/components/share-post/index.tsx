import { FC, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import path from "path";
import fs from "fs/promises";
import { getCurrentUser } from "components/login-register/login";

export const PostList: FC = () => {
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const [currentUser, setCurrentUser] = useState(null);

  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  const handleUpload = async () => {
    setUploading(true);
    try {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append("myImage", selectedFile);
      //  const { data } = await fetch("/api/image");
      const token = localStorage.getItem("token");

      const currentUser = await getCurrentUser(token);
      setCurrentUser(currentUser);
      const uploadFile = await fetch(`api/upload`, {
        method: "POST",
        body: formData,
      });
      const file = await uploadFile.json();
      const postData = {
        fileUrl: file.fileUrl,
        input1,
        input2,
        userId: currentUser._id,
        userName: currentUser.username
      };
      const sharePost = await fetch(`api/share-post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(postData),
      });
    } catch (error: any) {
      console.log(error.response?.data);
    }
    setUploading(false);
  };
  return (
    <div className="flex flex-col base-containers pt-5">
      <div className="genelGrid">
        <div className="px-5 py-5 card mx-10  flex flex-col border-solid border-2 border-slate-400d">
          <div className="name self-center pb-5 underline decoration-[#a742e0] decoration-2 underline-offset-4 font-bold">
            SELECT IMAGE
          </div>
          <label>
            <input
              type="file"
              hidden
              onChange={({ target }) => {
                if (target.files) {
                  const file = target.files[0];
                  setSelectedImage(URL.createObjectURL(file));
                  setSelectedFile(file);
                }
              }}
            />
            <div className="hover:bg-stone-500	 w-80 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer">
              {selectedImage ? (
                <img src={selectedImage} alt="" />
              ) : (
                <span>Select Image</span>
              )}
            </div>
          </label>
          <div className="pt-5 flex flex-col align-center text-center justify-center ">
            <label className="pb-5">
              <input
                className="w-full text-[#000] rounded-md"
                type="text"
                value={input1}
                onChange={(e) => {
                  setInput1(e.currentTarget.value);
                }}
              ></input>
            </label>

            <label className="pb-5">
              <input
                className="w-full text-[#000] rounded-md"
                type="text"
                value={input2}
                onChange={(e) => {
                  setInput2(e.currentTarget.value);
                }}
              ></input>
            </label>
          </div>
          <div className="flex justify-center pt-3">
            <button
              onClick={handleUpload}
              disabled={uploading}
              style={{ opacity: uploading ? ".5" : "1" }}
              className="bg-red-600 p-3 w-32 text-center rounded text-white"
            >
              {uploading ? "Uploading.." : "Upload"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
