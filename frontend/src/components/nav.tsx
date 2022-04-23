import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { User } from "../classes/user.dto";

const Nav = ({ user, refreshUser }: { user: User; refreshUser: any }) => {
  const navigation = useNavigate();
  const odjava = async () => {
    const res = await axios.post(
      "http://localhost:3000/auth/logout",
      {},
      { withCredentials: true }
    );
    if (res.status == 201) {
      //izbrisi window.location.reload();//spremenjeno
      await refreshUser();
      navigation({
        pathname: "/login",
      });
    }
  };

  return (
    <header className="p-3 bg-dark text-white">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Link
            to="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            <b>PT Blog</b>
          </Link>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link to="/" className="nav-link px-2 text-secondary">
                Home
              </Link>
            </li>
          </ul>

          <div className="text-end">
            {!user.is_loged_in && (
              <Link to="/login" className="btn btn-outline-light me-2">
                Prijava
              </Link>
            )}
            {!user.is_loged_in && (
              <Link to="/register" className="btn btn-warning">
                Ustvari račun
              </Link>
            )}
            {user.is_loged_in && (
              <Link to="/" className="btn btn-outline-light me-2">
                Ustvari objavo
              </Link>
            )}
            {user.is_loged_in && (
              <button onClick={odjava} className="btn btn-warning">
                Odjava
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;
