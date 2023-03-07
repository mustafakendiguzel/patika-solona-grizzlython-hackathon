import { FC, useEffect, useState } from "react";
import Image from "next/image";
import profilePicture from "../../../public/profile-picture.jpg";
import { getCurrentUser } from "components/login-register/login";

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

async function getAllUser() {
  const allUser = await fetch("api/user", {
    method: "GET",
  });
  const users: Array<String> = await allUser.json();
  return users;
}

async function getUser(id: string) {
  const findUser = await fetch(`api/user/${id}`, {
    method: "GET",
  });
  const user = await findUser.json();
  return user;
}

async function followUser(id: string, followId: string) {
  const findUser = await fetch(`api/user/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ followId }),
  });
  const user = await findUser.json();
  return user;
}

export const PeopleList: FC = () => {
  const [image, setImage] = useState(null);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    randomImage().then((imageLink) => {
      setImage(imageLink);
    });
    getAllUser().then((users) => {
      setUsers(users);
    });
  }, []);
  return (
    <div className="flex flex-col base-containers pt-5">
      <div className="genelGrid grid grid-cols-4 gap-y-10 gap-x-10">
        {users.map((user, key) => {
          return (
            <div
              key={key}
              className="px-5 py-5 card mx-10 my-10 flex flex-col border-solid border-2 border-slate-400d"
            >
              <div className="name self-center pb-5 underline decoration-[#a742e0] decoration-2 underline-offset-4 font-bold">
                {user.username}
              </div>
              <div>
                {image && (
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
                  onClick={() => {
                    const token = localStorage.getItem("token");
                    getCurrentUser(token).then((currentUser) => {
                      followUser(currentUser.id, user._id).then((res) => {
                        console.log(res);
                      });
                    });
                  }}
                  className="followButton mt-2 px-5 rounded-md font-medium "
                >
                  FOLLOW
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
