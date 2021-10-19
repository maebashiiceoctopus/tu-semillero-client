import React from "react";
import homeImage from "../../../assets/img/svg/Knowledge-rafiki.svg";


import "./HomeBanner.scss";

export default function HomeBanner() {
  return (
  
      <section className="home-banner">
        <div className="home-banner__title">
        <h1 >¡Descubre los temas de estudio desarrollados en nuestros semilleros de investigación!</h1>
        </div>
         

          <figure className="home-banner__img">
            <img src={homeImage} alt="Banner svisi" />
          </figure>

      </section>
  );
}
