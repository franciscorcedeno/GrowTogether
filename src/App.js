import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Home from "./components/homePage/1.home-page";
import Login from "./components/homePage/2.login";
import Register from "./components/homePage/3.register";
import Overview from "./components/Pages/Accounts/AccountOverview";
import EditCampaignSettings from "./components/Pages/CampaignEditing/EditCampaignSettings";
import EditContent from "./components/Pages/CampaignEditing/EditContent";
import EditRewards from "./components/Pages/CampaignEditing/EditRewards";
import UnpublishedCampaignOverview from "./components/Pages/CampaignEditing/UnpublishedCampaignOverview";
import CreateProject from "./components/Pages/Create-Project";
import Discover from "./components/Pages/Discover";
import PublicCampaign from "./components/Pages/PublicCampaign/PublicCampaign";
import Search from "./components/Pages/Search";

const App = () => {
  const [loginSetting, setloginSetting] = useState({
    path: "/login",
    text: "Log In/Register",
  });
  const [createProj, setCreateProj] = useState({
    path: "/Create-Project",
  });

  useEffect(() => {
    alterHeaderIfLoggedIn();
  }, []);

  const alterHeaderIfLoggedIn = () => {
    let storedUSER = localStorage.getItem("userID");
    if (storedUSER) {
      setloginSetting({
        path: "/overview",
        text: "Hello username",
      });
      setCreateProj({
        path: "/Create-Project",
      });
      return true;
    } else {
      setloginSetting({
        path: "/login",
        text: "Log In/Register",
      });
      setCreateProj({
        path: "/login",
      });
      return false;
    }
  };

  return (
    <Router>
      <header className="header">
        <div className="App">
          <div id="divHead">
            <Link className="nav-link" to="/Discover">
              Discover
            </Link>
            <Link className="nav-link" to={createProj.path}>
              Start A Project
            </Link>
            <Link className="Logo" to="/">
              <h1 id="h1Head">GrowTogether</h1>
            </Link>
            <Link className="nav-link" to="/Search">
              Search
            </Link>
            <Link className="nav-link" to={loginSetting.path}>
              {loginSetting.text}
            </Link>
          </div>

          <hr></hr>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onSuccess={alterHeaderIfLoggedIn} />} />
            <Route path="/register" element={<Register onSuccess={alterHeaderIfLoggedIn} />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/unpublishedCampaign/Overview/:campaignID" element={<UnpublishedCampaignOverview />} />
            <Route path="/unpublishedCampaign/Settings/:campaignID" element={<EditCampaignSettings />} />
            <Route path="/unpublishedCampaign/Content/:campaignID" element={<EditContent />} />
            <Route path="/unpublishedCampaign/Rewards/:campaignID" element={<EditRewards />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/search" element={<Search />} />
            <Route path="/create-project" element={<CreateProject />} />
            <Route path="/PublicCampaign" element={<PublicCampaign />} />
            <Route path="/test" element={<test />} />
          </Routes>
        </div>
        <Footer />
      </header>
    </Router>
  );
};

export default App;
