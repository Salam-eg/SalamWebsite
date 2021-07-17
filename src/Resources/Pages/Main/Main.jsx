import React from "react";
import backgroundDot from "../../../Assets/salam_background_edited1.png";
import logo from "../../../Assets/SLogo1.png";
import "./Main.css";
import { useRecoilState } from "recoil";
import { websiteLanguageState } from "../../../RecoilResources/Atoms";
import { getLanguagePhrase } from "../../../Utilities/Helpers";
import { AboutUs, DualAboutUs } from "../../Reusables";
import { SignUpBar } from "../../Components";
import visionLogo from '../../../Assets/vision.jpeg';
import missionLogo from '../../../Assets/mission.png';
const Main = function () {
  const [lang] = useRecoilState(websiteLanguageState);
  return (
    <div
      className="Body"
      style={{
        backgroundImage: `url(${backgroundDot})`,
        backgroundSize: "50px",
      }}
    >
      <div className="intro">
        <img src={logo} width={350} alt="logo"></img>
        <br />
        <p className="sub-text">{getLanguagePhrase(lang, "contactUs")}</p>
      </div>
      <SignUpBar />
      <AboutUs
        title={getLanguagePhrase(lang, "WhatsSalam")}
        description={getLanguagePhrase(lang, "SalamIs")}
      />
      <DualAboutUs
        theAbouts={[
          {
            title: getLanguagePhrase(lang, "Mission"),
            description: getLanguagePhrase(lang, "MissionPhrase"),
            icon: missionLogo
          },
          {
            title: getLanguagePhrase(lang, "Vision"),
            description: getLanguagePhrase(lang, "VisionPhrase"),
            icon: visionLogo
          },
        ]}
      />
      <SignUpBar />

    </div>
  );
};

export default Main;
