import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { TiUser } from "react-icons/ti";
import { useSelector } from "react-redux";

const UserLink = ({ user, handleLogout }) => {
  const auth = useSelector((state) => state.auth);
  const { isStudent } = auth;

  return (
    <>
      <div className="container-main-avatarContainer">
        <div className="avatarContainer">
          <div>
            <TiUser size={30} />
          </div>
          <p>{user.firstName}</p>
        </div>
        <div>
          <Dropdown>
            <Dropdown.Toggle
              variant="bg-transparent"
              id="dropdown-basic"
            ></Dropdown.Toggle>
            <Dropdown.Menu>
              {isStudent ? (
                <Dropdown.Item>
                  <Link style={{ color: "black" }} to="/badges">
                  Perfil
                </Link>
                </Dropdown.Item>
                
              ) : null}
              <Dropdown.Item>
                <Link style={{ color: "black" }} to="/configuration">
                  Configuración
                </Link>
              </Dropdown.Item>
              <Link style={{ color: "black" }} to="!#" onClick={handleLogout}>
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
