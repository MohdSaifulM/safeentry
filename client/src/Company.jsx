import Axios from "axios";
import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

function Company() {
  const [visitor, setVisitor] = useState({});
  let { slug } = useParams();

  async function addVisitor() {
    try {
      let resp = await Axios.put(
        `http://localhost:80/api/v1/company/${slug}`,
        visitor
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {slug}
      <h1>Company Visitor Information</h1>
      <Container>
        <Form.Row className="mb-3">
          <Form.Control placeholder="nric" />
        </Form.Row>
        <Form.Row className="mb-3">
          <Form.Control placeholder="phone" />
        </Form.Row>
        <Form.Row className="mb-3">
          <Button block>Check-In</Button>
        </Form.Row>
      </Container>
    </div>
  );
}

export default Company;
