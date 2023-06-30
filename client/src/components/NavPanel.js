import { useContext, useState } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { Navbar, Container, Nav, Button, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import Modals from "./Modals";

const NavPanel = observer(() => {
  const [deviceVisible, setDeviceVisible] = useState(false);
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const LogOut = () => {
    user.setUser({});
    user.setIsAuth(false);
  };
  return (
    <Navbar bg="dark" expand="lg" className="max-auto" variant="dark">
      <Container>
        <Navbar.Brand
          href="#"
          className="me-5"
          onClick={() => navigate(SHOP_ROUTE)}
        >
          Wax Works
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNavAltMarkup" />
        <Navbar.Collapse id="navbarNavAltMarkup">
          {user.isAuth ? (
            <Nav className="navbar-nav ms-auto">
              <NavDropdown title={`Пользователь`} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => setDeviceVisible(true)}>
                  Добавить пластинку
                </NavDropdown.Item>
                <Modals
                  show={deviceVisible}
                  onHide={() => setDeviceVisible(false)}
                >
                  Создать пластинку
                </Modals>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => LogOut()}>
                  Выйти
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav className="navbar-nav ms-auto">
              <Button
                variant="outline-light"
                className="rounded-pill px-4 py-2 me-2"
                onClick={() => navigate(LOGIN_ROUTE)}
              >
                Авторизация
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});

export default NavPanel;
