import React, { useState, useEffect } from "react";
import loginImg from "../../../public/login.svg";
import Image from "next/image";
import { FC } from "react";
import useUserAuthenticateStore from "stores/useUserAuthenticateStore";
import { useRouter } from "next/router";

type registerData = {
  email: string;
  username: string;
  password: string;
};

async function register(data: registerData) {
  const res = await fetch("api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.status === 201) {
    await res.ok;
  } else {
    return new Error("error");
  }
}

export const Register: FC = () => {
  const isLogginActive = useUserAuthenticateStore((s) => s.isLogginActive);
  const { loggingScreen } = useUserAuthenticateStore();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="base-container">
      <div className="header">Register</div>
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
            <label htmlFor="username">Username</label>
            <input
              className="text-[#000000]"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.currentTarget.value);
              }}
              name="username"
              placeholder="username"
            />
          </div>
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
            Do you have already
            <button
              className="text-green-400		"
              onClick={() => loggingScreen(true)}
            >
              &nbsp;&nbsp;account?
            </button>
          </div>
        </div>
      </div>
      <div className="footer">
        <button
          onClick={async () => {
            try {
              await register({ email, username, password });
              await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 sec
              router.reload();
            } catch (error) {}
          }}
          type="button"
          className="btn"
        >
          Register
        </button>
      </div>
    </div>
  );
};
