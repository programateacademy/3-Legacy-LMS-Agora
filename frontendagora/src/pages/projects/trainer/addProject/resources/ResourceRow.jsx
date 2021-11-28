import { React } from "react";
import { Button } from "react-bootstrap";

export default function ResourceRow({ resource, index, removeResource }) {
  return (
    <div className="resourceCard">
      <a href={resource.link} target="_blank" rel="noreferrer">
        {resource.link}
      </a>
      <div>
        <Button
          variant="outline-danger btn-sm"
          onClick={() => removeResource(index)}
        >
          ✕
        </Button>
      </div>
    </div>
  );
}
