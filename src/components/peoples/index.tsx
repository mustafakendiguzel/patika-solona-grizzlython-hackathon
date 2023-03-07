import { FC, useEffect, useState } from "react";
import Image from "next/image";

async function randomImage() {
  const res = await fetch("https://randomuser.me/api/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const response = await res.json();
  return await response.results[0].picture.large;
}

export const PeopleList: FC = () => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    randomImage().then((imageLink) => {
      setImage(imageLink);
    });
  }, []);
  return (
    <div className="flex flex-col base-containers pt-5">
      <div className="genelGrid grid grid-cols-4 gap-y-10 gap-x-10">
        <div className="px-5 py-5 card mx-10 my-10 flex flex-col border-solid border-2 border-slate-400d">
          <div className="self-center pb-5 underline decoration-[#a742e0] decoration-2 underline-offset-4">
            Mustafa Kendigüzel
          </div>
          <div>
            {image && (
              <Image
                className="rounded-full"
                src={image}
                alt="Picture of the author"
                width="350"
                height="300"
              />
            )}
          </div>
          <div className="flex justify-center pt-3">
            <button className="followButton mt-2 px-5 rounded-md">
              FOLLOW
            </button>
          </div>
        </div>
        <div className="px-5 py-5 card mx-10 my-10 flex flex-col border-solid border-2 border-slate-400d">
          <div className="self-center pb-5 underline decoration-[#a742e0] decoration-2 underline-offset-4">
            Mustafa Kendigüzel
          </div>
          <div>
            {image && (
              <Image
                className="rounded-full"
                src={image}
                alt="Picture of the author"
                width="350"
                height="300"
              />
            )}
          </div>
          <div className="flex justify-center pt-3">
            <button className="followButton mt-2 px-5 rounded-md">
              FOLLOW
            </button>
          </div>
        </div>
        <div className="px-5 py-5 card mx-10 my-10 flex flex-col border-solid border-2 border-slate-400d">
          <div className="self-center pb-5 underline decoration-[#a742e0] decoration-2 underline-offset-4">
            Mustafa Kendigüzel
          </div>
          <div>
            {image && (
              <Image
                className="rounded-full"
                src={image}
                alt="Picture of the author"
                width="350"
                height="300"
              />
            )}
          </div>
          <div className="flex justify-center pt-3">
            <button className="followButton mt-2 px-5 rounded-md">
              FOLLOW
            </button>
          </div>
        </div>
        <div className="px-5 py-5 card mx-10 my-10 flex flex-col border-solid border-2 border-slate-400d">
          <div className="self-center pb-5 underline decoration-[#a742e0] decoration-2 underline-offset-4">
            Mustafa Kendigüzel
          </div>
          <div>
            {image && (
              <Image
                className="rounded-full"
                src={image}
                alt="Picture of the author"
                width="350"
                height="300"
              />
            )}
          </div>
          <div className="flex justify-center pt-3">
            <button className="followButton mt-2 px-5 rounded-md">
              FOLLOW
            </button>
          </div>
        </div>
        <div className="px-5 py-5 card mx-10 my-10 flex flex-col border-solid border-2 border-slate-400d">
          <div className="self-center pb-5 underline decoration-[#a742e0] decoration-2 underline-offset-4">
            Mustafa Kendigüzel
          </div>
          <div>
            {image && (
              <Image
                className="rounded-full"
                src={image}
                alt="Picture of the author"
                width="350"
                height="300"
              />
            )}
          </div>
          <div className="flex justify-center pt-3">
            <button className="followButton mt-2 px-5 rounded-md">
              FOLLOW
            </button>
          </div>
        </div>
        <div className="px-5 py-5 card mx-10 my-10 flex flex-col border-solid border-2 border-slate-400d">
          <div className="self-center pb-5 underline decoration-[#a742e0] decoration-2 underline-offset-4">
            Mustafa Kendigüzel
          </div>
          <div>
            {image && (
              <Image
                className="rounded-full"
                src={image}
                alt="Picture of the author"
                width="350"
                height="300"
              />
            )}
          </div>
          <div className="flex justify-center pt-3">
            <button className="followButton mt-2 px-5 rounded-md">
              FOLLOW
            </button>
          </div>
        </div>
        <div className="px-5 py-5 card mx-10 my-10 flex flex-col border-solid border-2 border-slate-400d">
          <div className="self-center pb-5 underline decoration-[#a742e0] decoration-2 underline-offset-4">
            Mustafa Kendigüzel
          </div>
          <div>
            {image && (
              <Image
                className="rounded-full"
                src={image}
                alt="Picture of the author"
                width="350"
                height="300"
              />
            )}
          </div>
          <div className="flex justify-center pt-3">
            <button className="followButton mt-2 px-5 rounded-md">
              FOLLOW
            </button>
          </div>
        </div>
        <div className="px-5 py-5 card mx-10 my-10 flex flex-col border-solid border-2 border-slate-400d">
          <div className="self-center pb-5 underline decoration-[#a742e0] decoration-2 underline-offset-4">
            Mustafa Kendigüzel
          </div>
          <div>
            {image && (
              <Image
                className="rounded-full"
                src={image}
                alt="Picture of the author"
                width="350"
                height="300"
              />
            )}
          </div>
          <div className="flex justify-center pt-3">
            <button className="followButton mt-2 px-5 rounded-md">
              FOLLOW
            </button>
          </div>
        </div>
        <div className="px-5 py-5 card mx-10 my-10 flex flex-col border-solid border-2 border-slate-400d">
          <div className="self-center pb-5 underline decoration-[#a742e0] decoration-2 underline-offset-4">
            Mustafa Kendigüzel
          </div>
          <div>
            {image && (
              <Image
                className="rounded-full"
                src={image}
                alt="Picture of the author"
                width="350"
                height="300"
              />
            )}
          </div>
          <div className="flex justify-center pt-3">
            <button className="followButton mt-2 px-5 rounded-md">
              FOLLOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
