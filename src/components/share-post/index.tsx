import { FC, useEffect, useState } from "react";
import Image from "next/image";
import profilePicture from "../../../public/profile-picture.jpg";
import { getCurrentUser } from "components/login-register/login";

export const PostList: FC = () => {
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();

  const handleUpload = async () => {
    setUploading(true);
    try {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append("myImage", selectedFile);
      //  const { data } = await fetch("/api/image");
      const data = await fetch(`api/upload`, {
        method: "POST",
        body: formData,
      });
      console.log(data);
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
                  console.log(selectedImage);
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
          {/* <div>
            {profilePicture && (
              <Image
                className="rounded-full"
                src={profilePicture}
                alt="Picture of the author"
                width="350"
                height="300"
              />
            )}
          </div> */}

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
