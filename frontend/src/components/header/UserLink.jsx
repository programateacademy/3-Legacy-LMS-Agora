import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";

const UserLink = ({ user, handleLogout }) => {
  const auth = useSelector((state) => state.auth);
  const { isStudent } = auth;

  return (
    <>
      <div className="container-main-avatarContainer">
        <div className="avatarContainer">
          <div className="icon">
            <i class="ri-user-5-line"></i>
            <i class="ri-user-5-fill"></i>
            <i class="ri-user-6-line"></i>  
            { /*<TiUser size={100} />*/}
          </div>
        </div>
        <div className="containerMenu">
          <Dropdown>
            <Dropdown.Toggle
              variant="bg-transparent"
              id="dropdown-basic"
            ></Dropdown.Toggle>
            <Dropdown.Menu>
              {isStudent ? (
                <Dropdown.Item>
                  <Link style={{ color: "#010101" }} to="/profile">
                  Perfil
                </Link>
                </Dropdown.Item>
                
              ) : null}
              <Dropdown.Item>
                <Link style={{ color: "#010101" }} to="/configuration">
                  Configuración
                </Link>
              </Dropdown.Item>
              <Link style={{ color: "#010101" }} to="!#" onClick={handleLogout}>
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
