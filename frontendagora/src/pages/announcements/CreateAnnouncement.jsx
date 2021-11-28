import { React, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as controllerAnnounce from "../../controllers/controllerAnnounce";
import "./announcementStyles.css";
import TitleSection from "../../componentes/titles/TitleSection";

const CreateAnnouncement = () => {
  const [formsent, setFormsent] = useState(false);

  return (
    <>
      <TitleSection name="CREAR ANUNCIO" />
      <div className="formAnnouncementContainer">
        <Formik
          initialValues={{
            titleAnnouncement: "",
            textAnnouncement: "",
          }}
          onSubmit={(values, { resetForm }) => {
            //values.tags = tags;
            resetForm();
            setFormsent(true);
            setTimeout(() => setFormsent(false), 3000);
            console.log(values);
            controllerAnnounce.registerAnnounce(values);
          }}
          validate={(values) => {
            let errors = {};
            // Validación nombre
            if (!values.titleAnnouncement)
              errors.titleAnnouncement = "Este campo es requerido";

            // Validación descripcion
            if (!values.textAnnouncement)
              errors.textAnnouncement = "Este campo es requerido";

            return errors;
          }}
        >
          {({ errors }) => (
            <Form className="announcementForm">
              <div>
                <label htmlFor="titleAnnouncement">Titulo del anuncio</label>
                <Field
                  type="text"
                  name="titleAnnouncement"
                  id="titleAnnouncement"
                />
                <ErrorMessage
                  name="titleAnnouncement"
                  component={() => (
                    <div className="error">{errors.titleAnnouncement}</div>
                  )}
                />
              </div>

              <div>
                <label htmlFor="textAnnouncement">Texto del anuncio</label>
                <Field
                  as="textarea"
                  name="textAnnouncement"
                  id="textAnnouncement"
                  rows="5"
                />
                <ErrorMessage
                  name="textAnnouncement"
                  component={() => (
                    <div className="error">{errors.textAnnouncement}</div>
                  )}
                />
              </div>

              <button
                variant="warning mb-3 font-weight-bold text-2 btn-sm"
                type="submit"
              >
                Enviar
              </button>
              {formsent && (
                <p className="exito">Anuncio agregado exitosamente</p>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default CreateAnnouncement;
