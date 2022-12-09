import "./Create-Project.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Post } from "../../scripts";

function CreateProject(props) {
  const navigate = useNavigate();
  const [userID, setUserID] = useState(localStorage.getItem("userID"));
  const [state, setState] = useState({
    title: "Default Title",
    subtitle: "Default SubTitle",
    description: "Default Description",
    goal: 1,
    duration: 1,
    mainImage: "",
  });
  const [loading, setLoading] = useState(false);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    console.log(userID);
    if (!userID) {
      // then user is not logged in!!! they shouldn't ever be here!
      navigate("/Login");
    }
  }, []);

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

  const submitNewCampaign = async (e) => {
    Post(`/unpublishedCampaigns/${userID}`, state)
      .then((response) => {
        console.log("Campaign successfully created! It returned:");
        console.log(response);
        // successfully created!
        navigate("/campaign/Overview/" + response._id, { state: { campaign: response, userID: userID } });
      })
      .catch((error) => {
        console.log(error);
        switch (error.response.status) {
          case 428: {
            alert("You provided invalid information, please try again");
            break;
          }
          case 404: {
            // Image Not Found
            alert("We are having trouble finding your image, please try uploading it again");
            break;
          }
          default: {
            alert("There is an error with the server. Sorry");
            break;
          }
        }
      });
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <div className="create-project">
      <h1>Upload Image</h1>
      {loading ? <h3>Loading...</h3> : <img src={mainImage ? mainImage : ""} style={{ width: "300px" }} />}
      <div className="flex-col">
        <input type="text" value={state.title} name="title" onChange={handleChange} />
        <input type="text" value={state.subtitle} name="subtitle" onChange={handleChange} />
        <input type="text" value={state.description} name="description" onChange={handleChange} />
        <input type="number" value={state.goal} name="goal" onChange={handleChange} />
        <input type="number" value={state.duration} name="duration" onChange={handleChange} />
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
