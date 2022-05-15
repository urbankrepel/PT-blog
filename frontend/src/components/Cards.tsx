import axios from "axios";
import React, { useEffect, useState } from "react";
import { User } from "../classes/user.dto";
import Card from "./Card";

const Cards = ({ user }: { user: User }) => {
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    const res = await axios.get("http://localhost:3000/post", {
      withCredentials: true,
    });
    if (res.status == 200) {
      setPosts(res.data);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  if (posts.length > 0) {
    return (
      <>
        {posts.map((post: any, i) => {
          let owner = false;
          if (user.is_loged_in && post.user.id == user.id) {
            owner = true;
          }
          return (
            <Card
              key={i}
              content={post.content}
              id={post.id}
              owner={owner}
              created_at={new Date(post.created_at)}
              title={post.title}
              user_display_name={
                post.user.first_name + " " + post.user.last_name
              }
              reloadPosts={loadPosts}
              hasImage={post.picture_path !== ""}
            />
          );
        })}
      </>
    );
  }

  return (
    <>
      {user.is_loged_in ? (
        <p>Ni dobenih objav</p>
      ) : (
        <p>Za ogled objav se morate najprej prijaviti</p>
      )}
    </>
  );
};

export default Cards;
