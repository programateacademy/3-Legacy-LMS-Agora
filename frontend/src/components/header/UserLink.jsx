import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";

import './UserLink.css';

const UserLink = ({ user, handleLogout}) => {
  const auth = useSelector((state) => state.auth);
  const { isStudent } = auth;

  return (
    <>
      <div className="container-main-avatarContainer">
        <div className="containerMenu">
          <Dropdown>
            <Dropdown.Toggle variant="bg-transparent" id="dropdown-basic">
              <div className="avatarContainer">
                <div className="icon">
                  <i className="ri-user-5-fill"></i>
                </div>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {isStudent ? (
                <Dropdown.Item>
                  <Link to="/profile">Perfil</Link>
                </Dropdown.Item>
              ) : null}

             <Dropdown.Item>
             <Link to="/configuration">
                configuracion
              </Link>
              </Dropdown.Item>
             

              <Link to="!#" onClick={handleLogout}>
                <Dropdown.Item>Salir</Dropdown.Item>
              </Link>

            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default UserLink;
