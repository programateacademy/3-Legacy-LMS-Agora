import { React, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Card } from "react-bootstrap";
import LinkForm from "./links/LinkForm";
import LinkRow from "./links/LinkRow";
import "./addLink.css";
import Button from "@restart/ui/esm/Button";

const AddLink = () => {
  const [links, setLinks] = useState([]);

  const addNewLink = (link) => {
    const newLinks = [...links, { link }];
    setLinks(newLinks);
  };

  const removeLink = (index) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);
  };

  return (
    <>
      <Formik
        initialValues={{
          links: [],
          message: "",
        }}
        onSubmit={(values, { resetForm }) => {
          values.links = links;
          resetForm();
          setLinks([]);
          console.log(values);
        }}
        validate={(values) => {
          let errors = {};

          // Validación picture
          if (!values.message) errors.message = "Este campo es requerido";

          return errors;
        }}
      >
        {({ errors }) => (
          <Form className="AddLinkForm">
            <label htmlFor="links">Links</label>
            <div className="app">
              <div className="container">
                <LinkForm addNewLink={addNewLink} />
                <div>
                  {links.map((link, index) => (
                    <Card key={index}>
                      <Card.Body>
                        <LinkRow
                          key={index}
                          index={index}
                          link={link}
                          removeLink={removeLink}
                        />
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <div className="input-group mb-3">
              <Field
                placeholder="Escribe tu mensaje"
                type="text"
                name="message"
                id="message"
                className="form-control"
              />
              <ErrorMessage
                name="message"
                component={() => <div className="error">{errors.message}</div>}
              />

              <Button
                variant="warning  font-weight-bold text-2 btn-sm px-3"
                type="submit"
              >
                Enviar
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddLink;
