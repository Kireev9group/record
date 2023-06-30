import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "..";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const click = async () => {
    try {
      let data;

      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }

      user.setUser(data);
      user.setIsAuth(true);
      navigate(SHOP_ROUTE);
    } catch (e) {
      if (e.response && e.response.data && e.response.data.message) {
        alert(e.response.data.message);
      } else {
        alert(e.message);
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="text-center mb-4">
          {isLogin ? "Авторизация" : "Регистрация"}
        </h2>
        <Form className="d-flex flex-column" onSubmit={click}>
          <Form.Control
            value={email}
            className="mt-2"
            placeholder="Введите ваш email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            value={password}
            className="mt-2"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите ваш пароль"
            type="password"
          />
          <div className="d-flex justify-content-between mt-3 pl-3 pr-3">
            {isLogin ? (
              <div>
                Нет аккаунта?
                <NavLink to={REGISTRATION_ROUTE}> Зарегистрируйтесь! </NavLink>
              </div>
            ) : (
              <div>
                Есть аккаунт?
                <NavLink to={LOGIN_ROUTE}> Войдите! </NavLink>
              </div>
            )}
            <Button
              onClick={async () => click()}
              className="btn-sm"
              variant="dark"
              type="button"
              style={{
                borderRadius: "0",
                marginTop: "10px",
                padding: "10px 20px",
                fontWeight: "bold",
              }}
            >
              {isLogin ? "Войти" : "Регистрация"}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
