import { FC, useEffect, useState } from "react";
import Image from "next/image";
import profilePicture from "../../../public/profile-picture.jpg";
import { getCurrentUser } from "components/login-register/login";
import useCurrentUserStore from "stores/useCurrentUserStore";

async function getAllUser(currentUserId: string) {
  const allUser = await fetch("api/user", {
    method: "GET",
  });
  const users: Array<String> = await allUser.json();
  const filteredUser = users.filter((user: any) => {
    return user._id.toString() !== currentUserId;
  });
  return filteredUser;
}

export async function getUser(id: string) {
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

async function unFollowUser(id: string, followId: string) {
  const findUser = await fetch(`api/user/unfollow/${id}`, {
    method: "DELETE",
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
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [follow, setFollow] = useState(null);

   useEffect(() => {
    const test = async() =>{
      const token = localStorage.getItem("token");
      const currentUser = await getCurrentUser(token)
      setCurrentUser(currentUser);
      const allUser = await getAllUser(currentUser._id)
      console.log()
      allUser.map((el:any)=>{
        const isFollowing = currentUser.following &&  currentUser.following.includes(el._id)
        el['isFollowing'] = isFollowing ? true:false
      })
      console.log(allUser)
      setUsers(allUser);
    }
      test()
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
                  onClick={() => {
                    if (
                      user.isFollowing
                      ) {
                      unFollowUser(currentUser._id, user._id).then(() => {
                         const usersMap = users.map((userL)=>{
                           if(userL._id === user._id) [
                              userL.isFollowing = false
                           ]
                           return userL
                         })
                         console.log(usersMap)
                         setUsers(usersMap);
                      });
                    } else {
                      followUser(currentUser._id, user._id).then((res) => {
                        const usersMap = users.map((userL)=>{
                          if(userL._id === user._id) [
                             userL.isFollowing = true
                          ]
                          return userL
                        })
                        setUsers(usersMap);
                      });
                    }
                  }}
                  className="followButton mt-2 px-5 rounded-md font-medium "
                >
                  {currentUser.following && (
                      <p>{user.isFollowing ? "UNFOLLOW": "FOLLOW"}</p>
                    )}
                  {!currentUser.following && <p>{"FOLLOW"}</p>}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
