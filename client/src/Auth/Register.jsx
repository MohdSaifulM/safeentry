import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Register() {
  function changeHandler(e) {}

  return (
    <div>
      <h1>Register</h1>
      <NavLink to="/login"> Already a user</NavLink>
      <Container>
        <Form.Row className="mb-3">
          <Form.Control
            placeholder="firstname"
            onChange={changeHandler}
            name="firstname"
          />
        </Form.Row>
        <Form.Row className="mb-3">
          <Form.Control
            placeholder="lastname"
            onChange={changeHandler}
            name="lastname"
          />
        </Form.Row>
        <Form.Row className="mb-3">
          <Form.Control
            placeholder="username"
            onChange={changeHandler}
            name="username"
          />
        </Form.Row>
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

export default Register;
