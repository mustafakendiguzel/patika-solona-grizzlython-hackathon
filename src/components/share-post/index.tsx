import { FC, useEffect, useState } from "react";
import Image from "next/image";
import profilePicture from "../../../public/profile-picture.jpg";
import { getCurrentUser } from "components/login-register/login";

export const PostList: FC = () => {
  useEffect(() => {}, []);
  return (
    <div className="flex flex-col base-containers pt-5">
      <div className="genelGrid grid grid-cols-4 gap-y-10 gap-x-10">
        <div className="px-5 py-5 card mx-10 my-10 flex flex-col border-solid border-2 border-slate-400d">
          <div className="name self-center pb-5 underline decoration-[#a742e0] decoration-2 underline-offset-4 font-bold"></div>
          <div>
            {profilePicture && (
              <Image
                className="rounded-full"
                src={profilePicture}
                alt="Picture of the author"
                width="350"
                height="300"
              />
            )}
          </div>
          <div className="flex justify-center pt-3">
            <button
              onClick={() => {}}
              className="followButton mt-2 px-5 rounded-md font-medium "
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
};
