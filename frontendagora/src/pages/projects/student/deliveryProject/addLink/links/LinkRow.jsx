import { React } from "react";
import { Button } from "react-bootstrap";

export default function LinkRow({ link, index, removeLink }) {
  return (
    <div className="resourceCard">
      <a href={link.link} target="_blank" rel="noreferrer">
        {link.link}
      </a>
      <div>
        <Button
          variant="outline-danger btn-sm"
          onClick={() => removeLink(index)}
        >
          ✕
        </Button>
      </div>
    </div>
  );
}
