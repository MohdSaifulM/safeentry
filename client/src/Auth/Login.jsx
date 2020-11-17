import Axios from "axios";
import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
function Login({ setAuth }) {
  console.log("here");
  const [user, setUser] = useState({});
  function changeHandler(e) {
    setUser((visitor) => ({ ...visitor, [e.target.name]: e.target.value }));
  }

  async function login() {
    try {
      let resp = await Axios.post(
        "http://localhost:80/api/v1/auth/login",
        user
      );
      console.log(resp.data);
      localStorage.setItem("token", resp.data.token);
      setAuth();
    } catch (e) {
      console.log(e);
    }
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
