import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./titleSectionStyles.css";

const TitleSectionWithButton = ({ name, btnName, url }) => {
  return (
    <div>
      <div className="TitleSectionContainer">
        <h3 className="title">{name}</h3>
        <Link to={url}>
          <Button
            variant="warning mb-3 font-weight-bold text-2 btn-sm p-2 px-3"
            type="submit"
          >
            {btnName}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TitleSectionWithButton;
