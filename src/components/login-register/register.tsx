import React from "react";
import loginImg from "../../../public/login.svg";
import Image from "next/image";

export class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
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
                name="username"
                placeholder="username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                className="text-[#000000]"
                type="text"
                name="email"
                placeholder="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                className="text-[#000000]"
                type="text"
                name="password"
                placeholder="password"
              />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn">
            Register
          </button>
        </div>
      </div>
    );
  }
}
