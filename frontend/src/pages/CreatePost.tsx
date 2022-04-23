import axios from "axios";
import React, { BaseSyntheticEvent, SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/nav";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>();
  const [imageUrl, setImageUrl] = useState<string>("");
  const navigation = useNavigate();

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    let data = {
      title: title, //tega ne vi prepisvat
      content,
    };
    if (!image) {
      const res = await axios.post("http://localhost:3000/post", data, {
        withCredentials: true,
      });
      if (res.status == 201) {
        navigation({
          pathname: "/",
        });
      }
    } else {
      const form = new FormData();
      form.set("image", image);
      form.set("title", title);
      form.set("content", content);
      const res = await axios.post("http://localhost:3000/post", form, {
        withCredentials: true,
      });
      if (res.status == 201) {
        navigation({
          pathname: "/",
        });
      }
    }
  };

  const imageData = (e: BaseSyntheticEvent) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setImage(file);
    }
  };

  return (
    <>
      <main className="form-signin">
        <form onSubmit={submit}>
          <h1 className="h3 mb-3 fw-normal">Create Post</h1>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Napis</label>
            <input
              type="text"
              className="form-control"
              placeholder="Napis"
              onChange={(e) => setTitle(e.target.value)}
              maxLength={80}
              max={80}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Objava</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows={3}
              maxLength={500}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="formFileSm" className="form-label">
              Nalozi sliko
            </label>
            <input
              className="form-control form-control-sm"
              id="formFileSm"
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => imageData(e)}
            />
          </div>
          {imageUrl !== "" && (
            <img src={imageUrl} alt="..." className="img-thumbnail"></img>
          )}
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Create
          </button>
        </form>
      </main>
    </>
  );
};

export default CreatePost;
