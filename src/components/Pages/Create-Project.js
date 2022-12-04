import "./Create-Project.css";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Get, Post } from "../../scripts";
import { Buffer } from "buffer";

function CreateProject() {
  const [state, setState] = useState({
    title: "Default Title",
    subtitle: "Default SubTitle",
    description: "Default Description",
    goal: 1,
    duration: 1,
    mainImage: "638ae54cd4f54a8e23b56c4e",
  });
  const [loading, setLoading] = useState(false);
  const [mainImage, setMainImage] = useState(null);

  const uploadImage = (e) => {
    // console.log(e.target.files);
    setLoading(true);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    Post("/images", formData)
      .then((res) => {
        // we successfully posted to the server.
        setState({ ...state, mainImage: res });
        setMainImage(URL.createObjectURL(e.target.files[0]));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitNewCampaign = async (e) => {};

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <div className="create-project">
      <h1>Upload Image</h1>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <img src={mainImage ? mainImage : ""} style={{ width: "300px" }} />
      )}
      <div className="flex-col">
        <input
          type="text"
          value={state.title}
          name="title"
          onChange={handleChange}
        />
        <input
          type="text"
          value={state.subtitle}
          name="subtitle"
          onChange={handleChange}
        />
        <input
          type="text"
          value={state.description}
          name="description"
          onChange={handleChange}
        />
        <input
          type="number"
          value={state.goal}
          name="goal"
          onChange={handleChange}
        />
        <input
          type="number"
          value={state.duration}
          name="duration"
          onChange={handleChange}
        />
        <input type="file" onChange={uploadImage} />
        <button onClick={submitNewCampaign} style={{ color: "black" }}>
          {" "}
          SUBMIT{" "}
        </button>
      </div>
    </div>
  );
}
export default CreateProject;
