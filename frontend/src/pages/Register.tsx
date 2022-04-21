import React, { SyntheticEvent, useState } from "react";
import Nav from "../components/nav";
import axios from "axios";

import "./Register.css";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");
  const [password_confirm, set_password_confirm] = useState("");

  const navigation = useNavigate();
  const sumbit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const data = {
      first_name,
      last_name,
      email,
      password,
      password_confirm,
    };
    const response = await axios.post(
      "http://localhost:3000/auth/register",
      data
    );
    if (response.status == 201) {
      const loginData = {
        email,
        password,
      };
      const loginRes = await axios.post(
        "http://localhost:3000/auth/login",
        loginData,
        { withCredentials: true }
      );
      if (loginRes.status == 200) {
        navigation({
          pathname: "/",
        });
      }
    }
  };

  return (
    <>
      <Nav />
      <main className="form-signin">
        <form onSubmit={sumbit}>
          <h1 className="h3 mb-3 fw-normal">Register</h1>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="first_name"
              placeholder="Janaz"
              onChange={(e) => set_first_name(e.target.value)}
            />
            <label htmlFor="first_name">First Name</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="last_name"
              placeholder="Novak"
              onChange={(e) => set_last_name(e.target.value)}
            />
            <label htmlFor="last_name">Last Name</label>
          </div>
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
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="password_confirm"
              placeholder="Password confirem"
              onChange={(e) => set_password_confirm(e.target.value)}
            />
            <label htmlFor="password_confirm">Password Retype</label>
          </div>

          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Register
          </button>
        </form>
      </main>
    </>
  );
};

export default Register;
