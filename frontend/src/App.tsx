import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import { User } from "./classes/user.dto";
import Nav from "./components/nav";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UpdatePost from "./pages/UpdatePost";

function App() {
  const [user, setUser] = useState<User>(new User(1, "", "", ""));
  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/me", {
        withCredentials: true,
      });
      if (res.status == 200) {
        let user: User = {
          ...res.data,
          is_loged_in: true,
        };
        setUser(user);
      } else {
        setUser(new User(1, "", "", ""));
      }
    } catch (e) {
      setUser(new User(1, "", "", ""));
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Nav user={user} refreshUser={getUser} />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login refreshUser={getUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<UpdatePost user={user} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
