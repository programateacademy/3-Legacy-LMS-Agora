import React from "react";
import "./titleSectionStyles.css";

export function TitleSection ({ name }){
  return (
    <>
      <div className="TitleSectionContainer">
        <h3 className="title">{name}</h3>
      </div>
    </>
  );
};
