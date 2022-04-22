import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const Card = ({
  content,
  id,
  owner,
}: {
  content: string;
  id: number;
  owner: boolean;
}) => {
  //{ content }: { content: string }

  const deletePost = async () => {
    const res = await axios.delete("http://localhost:3000/post/" + id, {
      withCredentials: true,
    });
    if (res.status == 200) {
      window.location.reload();
    }
  };

  return (
    <div className="col">
      <div className="card shadow-sm">
        <svg
          className="bd-placeholder-img card-img-top"
          width="100%"
          height="225"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Placeholder: Thumbnail"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#55595c" />
          <text x="50%" y="50%" fill="#eceeef" dy=".3em">
            Thumbnail
          </text>
        </svg>

        <div className="card-body">
          <p className="card-text">{content}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={deletePost}
              >
                Delete
              </button>
              {owner && (
                <Link
                  to={"/update-post/" + id}
                  className="btn btn-sm btn-outline-secondary"
                >
                  Edit
                </Link>
              )}
            </div>
            <small className="text-muted">9 mins</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
