import React, { SyntheticEvent, useState } from "react";
import Nav from "../components/nav";
import axios from "axios";

import "./Register.css";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");

  const navigation = useNavigate();
  const sumbit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };
    console.log(data);
    const response = await axios.post(
      "http://localhost:3000/auth/login",
      data,
      { withCredentials: true }
    );
    if (response.status == 200) {
      navigation({
        pathname: "/",
      });
    }
  };

  return (
    <>
      <Nav />
      <main className="form-signin">
        <form onSubmit={sumbit}>
          <h1 className="h3 mb-3 fw-normal">Login</h1>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              onChange={(e) => set_email(e.target.value)}
            />
            <label htmlFor="email">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              onChange={(e) => set_password(e.target.value)}
            />
            <label htmlFor="password">Password</label>
          </div>

          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Login
          </button>
        </form>
      </main>
    </>
  );
};

export default Login;
