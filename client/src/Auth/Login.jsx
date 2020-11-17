import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { NavLink, Redirect, useLocation } from "react-router-dom";

function Login({ setAuth, isAuth, loginFunc }) {
  console.log(isAuth);
  const [user, setUser] = useState({});
  const { state } = useLocation();
  console.log(state);
  //   useEffect(() => {}, [isAuth]);
  function changeHandler(e) {
    setUser((visitor) => ({ ...visitor, [e.target.name]: e.target.value }));
  }

  async function login() {
    loginFunc(user);
  }

  if (isAuth) {
    return <Redirect to={"/"} />;
  }

  return (
    <div>
      <h1>Login</h1>

      <NavLink to="/register"> Not a user</NavLink>
      <Container>
        <Form.Row className="mb-3">
          <Form.Control
            placeholder="email@email.com"
            onChange={changeHandler}
            name="email"
          />
        </Form.Row>
        <Form.Row className="mb-3">
          <Form.Control
            onChange={changeHandler}
            placeholder="password"
            name="password"
            type="password"
          />
        </Form.Row>
        <Form.Row className="mb-3">
          <Button block onClick={login}>
            Login
          </Button>
        </Form.Row>
      </Container>
    </div>
  );
}

export default Login;
