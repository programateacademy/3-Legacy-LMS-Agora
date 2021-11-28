import React from "react";
import { Button, Form } from "react-bootstrap";

const InputSend = () => {
  return (
    <div>
      <Form.Group className="input-group " style={{ flexWrap: "nowrap" }}>
        <Form.Control
          id="inputResource"
          className="input"
          name="message"
          placeholder="Escriba un mensaje"
        />
        <Button variant="warning  font-weight-bold text-2 btn-sm px-3 ">
          Enviar
        </Button>
      </Form.Group>
    </div>
  );
};

export default InputSend;
