import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";

const UserLink = ({ user, handleLogout }) => {
  const auth = useSelector((state) => state.auth);
  const { isTeacher, isAdmin } = auth;

  return (
    <>
      <div className="container-main-avatarContainer">
        <div className="avatarContainer">
          <img className="img-avatar" src={user.avatar} alt="Avatar" />
          <p>{user.name}</p>
        </div>
        <div>
          <Dropdown>
            <Dropdown.Toggle
              variant="bg-transparent"
              id="dropdown-basic"
            ></Dropdown.Toggle>
            <Dropdown.Menu>
            <Dropdown.Item>
            {isAdmin || isTeacher ? (
                <Link style={{color:'black'}} to="/badges">Insignias</Link>
                ) : (
                  ''
                )}
              </Dropdown.Item>
              <Dropdown.Item>
              
                <Link style={{color:'black'}} to="/profile">Perfil</Link>
                
              </Dropdown.Item>
             
              <Dropdown.Item>
              
                <Link style={{color:'black'}} to="/" onClick={handleLogout}>
                  Salir
                </Link>
              
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default UserLink;
