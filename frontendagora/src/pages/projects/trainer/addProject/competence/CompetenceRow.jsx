import React from "react";
import { Card, Button } from "react-bootstrap";

const CompetenceRow = ({ array, removeCompetence, getCompetencies }) => {
  getCompetencies(array);
  return (
    <div>
      {array.map((el, i) => (
        <Card key={i}>
          <Card.Body className="competenceCardContainer">
            <p>
              {el.competence}: <b className="tagLevel">{el.level}</b>
            </p>
            <Button
              className="removeCompetenceBtn"
              variant="outline-danger btn-sm"
              onClick={() => removeCompetence(i)}
            >
              ✕
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default CompetenceRow;
