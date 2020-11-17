import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
function Login() {
  function changeHandler(e) {}

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
          <Button block>Check-In</Button>
        </Form.Row>
      </Container>
    </div>
  );
}

export default Login;
