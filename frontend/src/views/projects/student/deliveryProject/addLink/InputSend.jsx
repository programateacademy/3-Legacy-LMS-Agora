import React from "react";
import { Button, Form } from "react-bootstrap";

const InputSend = () => {
  return (
    <div className="inputContainer">
      <Form.Group className="input-group ">
        <Form.Control
          id="inputResource"
          className="input"
          name="message"
          /*    value={value}
                  onChange={(e) => setValue(e.target.value)} */
          placeholder="Escriba un mensaje"
        />
        <Button
          variant="warning  font-weight-bold text-2 btn-sm px-3"
          /* onClick={addResource} */
        >
          Enviar
        </Button>
      </Form.Group>
    </div>
  );
};

export default InputSend;
