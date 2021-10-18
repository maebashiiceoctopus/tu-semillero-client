import React from "react";
import {ReactComponent as FacebookLogo }from "../../../assets/img/svg/facebook.svg";
import {ReactComponent as SiteLogo} from "../../../assets/img/svg/siteInge.svg";
import {ReactComponent as LinkedinLogo} from "../../../assets/img/svg/linkedin.svg";



import "./SocialMedia.scss";

export default function SocialMedia() {
  return (
    <div className="social-media">
        <a  className="facebook" target="_blank" rel="noopener noreferrer" href="https://web.facebook.com/areandina">
            <FacebookLogo/>
        </a>
        <a  className="site" target="_blank" rel="noopener noreferrer" href="https://sites.google.com/areandina.edu.co/fuaa-ingenieradesistema">
            <SiteLogo/>
        </a>

        <a  className="linkedin" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/school/fundacion-universitaria-del-area-andina/">
            <LinkedinLogo/>
        </a>


    </div>
  );
}
