import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "../components/nav";

const UpdatePost = () => {
  const [content, setContent] = useState("");
  const navigation = useNavigate();

  let { id } = useParams();

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    let data = {
      title: "", //tega ne vi prepisvat
      content,
    };
    const res = await axios.put("http://localhost:3000/post/"+id, data, {
      withCredentials: true,
    });
    if (res.status == 200) {
      navigation({
        pathname: "/",
      });
    }
  };

  const getPost = async () => {
    const res = await axios.get("http://localhost:3000/post/" + id, {
      withCredentials: true,
    });
    if (res.status == 200) {
      setContent(res.data.content);
    } else {
      navigation({
        pathname: "/",
      });
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <Nav />
      <main className="form-signin">
        <form onSubmit={submit}>
          <h1 className="h3 mb-3 fw-normal">Update Post</h1>
          <input
            type="text"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Update
          </button>
        </form>
      </main>
    </>
  );
};

export default UpdatePost;
