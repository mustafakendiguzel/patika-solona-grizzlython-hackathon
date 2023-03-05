import React, { useState } from "react";
import loginImg from "../../../public/login.svg";
import Image from "next/image";
import useUserAuthenticateStore from "stores/useUserAuthenticateStore";
import { FC } from "react";

type loginType = {
  email: string;
  password: string;
};

async function login(data: loginType) {
  try {
    await fetch("api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application:json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
  }
}

export const Login: FC = () => {
  const { loggingScreen } = useUserAuthenticateStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="base-container">
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
          onClick={() => login({ email, password })}
          type="button"
          className="login btn place-items-center "
        >
          Login
        </button>
      </div>
    </div>
  );
};
