import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Cards = () => {
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    const res = await axios.get("http://localhost:3000/post", {
      withCredentials: true,
    });
    if (res.status == 200) {
      setPosts(res.data);
    }
  };

  const getUser = async () => {
    const res = await axios.get("http://localhost:3000/user/me", {
      withCredentials: true,
    });
    if (res.status == 200) {
      setUser(res.data);
    }
  };

  useEffect(() => {
    loadPosts();
    getUser();
  }, []);

  if (posts.length > 0) {
    return (
      <>
        {posts.map((post: any, i) => {
          let owner = false;
          if (user && post.user.id == user.id) {
            owner = true;
          }
          return (
            <Card key={i} content={post.content} id={post.id} owner={owner} />
          );
        })}
      </>
    );
  }

  return <></>;
};

export default Cards;
