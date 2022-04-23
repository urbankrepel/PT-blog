import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const Card = ({
  content,
  id,
  owner,
  created_at,
  title,
  user_display_name,
  reloadPosts,
}: {
  content: string;
  id: number;
  owner: boolean;
  created_at: Date;
  title: string;
  user_display_name: string;
  reloadPosts: any;
}) => {
  //{ content }: { content: string }

  const deletePost = async () => {
    const res = await axios.delete("http://localhost:3000/post/" + id, {
      withCredentials: true,
    });
    if (res.status == 200) {
      await reloadPosts();
    }
  };

  return (
    <div className="col">
      <div className="card shadow-sm">
        <img
          src={`http://localhost:3000/post/image/${id}`}
          className="img-thumbnail"
        ></img>

        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{content}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              {owner && (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={deletePost}
                >
                  Delete
                </button>
              )}
              {owner && (
                <Link
                  to={"/update-post/" + id}
                  className="btn btn-sm btn-outline-secondary"
                >
                  Edit
                </Link>
              )}
            </div>
            <div className="d-flex flex-column">
              <small className="text-muted">{user_display_name}</small>
              <small className="text-muted">{created_at.toDateString()}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
