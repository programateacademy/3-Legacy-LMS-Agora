import { React, useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function LinkForm({ addNewLink }) {
  const [value, setValue] = useState("");

  const addLink = (e) => {
    let inputResource = document.getElementById("inputResource").value;

    if (
      inputResource.includes("http://") ||
      inputResource.includes("https://")
    ) {
      if (!value) return;
      addNewLink(value);
      setValue("");
    } else {
      alert("El recurso no contiene una URL valida");
    }
  };

  return (
    <>
      <Form.Group className="input-group " style={{ flexWrap: "nowrap" }}>
        <Form.Control
          id="inputResource"
          className="input"
          name="resources"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Agregar recurso"
        />
        <Button
          variant="warning  font-weight-bold text-2 btn-sm px-3"
          onClick={addLink}
        >
          Agregar
        </Button>
      </Form.Group>
    </>
  );
}
