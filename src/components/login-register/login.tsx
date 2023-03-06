import React, { useState } from "react";
import loginImg from "../../../public/login.svg";
import Image from "next/image";
import useUserAuthenticateStore from "stores/useUserAuthenticateStore";
import { FC } from "react";
import { useRouter } from "next/router";

type loginData = {
  email: string;
  password: string;
};

async function login(data: loginData) {
  const res = await fetch("api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.status === 200) {
    const response = await res.json();
    localStorage.setItem("token", response.token);
    return response;
  }
}

export const Login: FC = () => {
  const { loggingScreen } = useUserAuthenticateStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const homePage = "/basics";
  return (
    <div className="base-container p-12">
      <div className="header">Login</div>
      <div className="content">
        <div className="image">
          <Image
            src={loginImg}
            alt="Picture of the author"
            width="350"
            height="300"
          />
        </div>
        <div className="form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              className="text-[#000000]"
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
              name="email"
              placeholder="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="text-[#000000]"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
              name="password"
              placeholder="password"
            />
          </div>
          <div className="switchLoginRegister">
            Don't have an
            <button
              className="text-green-400	"
              onClick={() => loggingScreen(false)}
            >
              &nbsp;&nbsp;account?
            </button>
          </div>
        </div>
      </div>
      <div className="footer">
        <button
          onClick={async () =>
            await login({ email, password }).then((res) => {
              if (res) router.replace(homePage);
            })
          }
          type="button"
          className="login btn place-items-center "
        >
          Login
        </button>
      </div>
    </div>
  );
};
