import React, { useEffect, useState } from "react";
import styles from "./ModalEntrega.module.css";
import { VscError } from "react-icons/vsc";
import { BsArrowLeftCircle } from "react-icons/bs";
import { MdDeleteForever, MdOutlineAddCircle } from "react-icons/md";
import { AiOutlineLink } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import apiAgora from '../../api'
import { showErrMsg, showSuccessMsg } from "../../utils/notification";


const initialState = {
  message:"",
  delivery: [],
  success:"",
};

export function ModalDeliveryStudent() {
  const auth = useSelector((state) => state.auth);
  const userID = auth.user.id;
  const cohortID = auth.user.cohortID;
  const params = useParams();
  const deliveryKind = params.kind;
  const activityID = params.id
  
  const [bootcamps, setBootcamps] = useState([]);

  const activity = (deliveryKind) => {
    if(deliveryKind === "project")
    {      setDeliveryStudent({
        ...deliveryStudent,
        projectID: activityID,
        err: "",
        success: "",
      })}
    if(deliveryKind === "workbook")
    {      setDeliveryStudent({
      ...deliveryStudent,
      workbookID: activityID,
      err: "",
      success: "",
    })}
    if(deliveryKind === "query")
    {      setDeliveryStudent({
      ...deliveryStudent,
      queryID: activityID,
      err: "",
      success: "",
    })}
  };
  
  useEffect(() => {
    activity(deliveryKind)
  }, [deliveryKind]);

  const fetchBootcamps = async (activityid, id) => {
    const res = await apiAgora.get(`/api/agora/get-delivery/${activityid}/${id}`,
     {
      headers: { Authorization: id }});
    setBootcamps(res);
  };
  useEffect(() => {
    fetchBootcamps(activityID, userID);
  }, [activityID, userID]);

  const [deliveryStudent, setDeliveryStudent] = useState(initialState);

  const [objectLink, setObjectLink] = useState({
    nameLink: "",
    link: "",
  });

  const { delivery,
    message,
    projectID,
    success,
    workbookID,
    queryID} = deliveryStudent;

  const { nameLink, link } = objectLink;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setDeliveryStudent({
      ...deliveryStudent,
      [name]: value,
      err: "",
      success: "",
    });
  };

  const handleChangeLink = (e) => {
    const { name, value } = e.target;
    setObjectLink({
      ...objectLink,
      [name]: value,
      err: "",
      success: "",
    });
  };

  const onClickObject = (name) => {
    if (objectLink.link.trim() && objectLink.nameLink.trim()) {
      setDeliveryStudent({
        ...deliveryStudent,
        [name]: [...deliveryStudent[name], objectLink],
        err: "",
        success: "",
      });
    }
  };

  const deleteItemArray = (name, item) => {
    setDeliveryStudent({
      ...deliveryStudent,
      [name]: deliveryStudent[name].filter((e) => e !== item),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (auth.isStudent) {
        const res = await apiAgora.post(
          "/api/agora/new-delivery",
          {
            delivery,
            message,
            deliveryKind,
            projectID,
            workbookID,
            queryID,
            userID,
            cohortID
          },
          {
            headers: { Authorization: userID },
          }
        );
        showSuccessMsg(success);
        setDeliveryStudent({ ...deliveryStudent, err: "", success: res.data.msg });
      }
    } catch (err) {
      showErrMsg(err.response.data.msg);
      err.response.data.msg &&
        setDeliveryStudent({ ...deliveryStudent, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <form className={styles.containerModal} onSubmit={handleSubmit}>
      <div className={styles.cajaTitle}>
        <div className={styles.title}>
          <h2>cambiamos</h2>
        </div>
        <div className={styles.close}>
          <button>
            <VscError size={30} />
          </button>
        </div>
      </div>

      <div className={styles.cajaDiv}>
        <div className={styles.cajaMedia}>
          <div className={styles.primerFondo}>
            <div className={styles.segundoFondoestudiantes}>
              <p>descripcion</p>
            </div>
            <div className={styles.inputDes}>
              <textarea
                name="message"
                value={message}
                placeholder="Descripcion"
                onChange={handleChangeInput}
              ></textarea>
              <button type="submit">enviar</button>
            </div>
            <div className={styles.contInpLink}>
              <div className={styles.contInpLinkIntern}>
                <input
                  type="text"
                  className={styles.inputLink}
                  placeholder="Link de entrega"
                  name="nameLink"
                  value={nameLink}
                  onChange={handleChangeLink}
                />
                <input
                  type="text"
                  className={styles.inputLink}
                  placeholder="Link de entrega"
                  name="link"
                  value={link}
                  onChange={handleChangeLink}
                />
              </div>

              <button
                className={styles.addTagsProject}
                type="button"
                onClick={() => onClickObject("delivery")}
              >
                <MdOutlineAddCircle size={30} />
              </button>
            </div>
            <div>
              {delivery.length !== 0
                ? delivery.map((item, index) => (
                    <div className={styles.tagContainer} key={index}>
                      <AiOutlineLink className={styles.linkIcon} size={30} />
                      <div className={styles.tagText}>
                        <a
                          className={styles.tag}
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {item.nameLink}
                        </a>
                      </div>
                      <button
                        className={styles.deleteTag}
                        type="button"
                        onClick={() => deleteItemArray("delivery", item)}
                      >
                        <MdDeleteForever size={30} />
                      </button>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
