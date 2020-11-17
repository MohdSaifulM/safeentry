import Axios from "axios";
import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

function Company({ companies }) {
  const [visitor, setVisitor] = useState({});
  let { slug } = useParams();

  async function addVisitor() {
    let findCompany = companies.find((el) => el.slug === slug);
    // console.log(findCompany);
    try {
      let resp = await Axios.put(
        `http://localhost:80/api/v1/company/${findCompany._id}`,
        visitor
      );
    } catch (error) {
      console.log(error.response);
    }
  }

  function changeHandler(e) {
    setVisitor((visitor) => ({ ...visitor, [e.target.name]: e.target.value }));
  }

  return (
    <div>
      {slug}
      <h1>Company Visitor Information</h1>
      <Container>
        <Form.Row className="mb-3">
          <Form.Control
            placeholder="nric"
            onChange={changeHandler}
            name="nric"
          />
        </Form.Row>
        <Form.Row className="mb-3">
          <Form.Control
            placeholder="passport"
            onChange={changeHandler}
            name="passport"
          />
        </Form.Row>
        <Form.Row className="mb-3">
          <Form.Control
            onChange={changeHandler}
            placeholder="phone"
            name="phone"
          />
        </Form.Row>
        <Form.Row className="mb-3">
          <Button block onClick={addVisitor}>
            Check-In
          </Button>
        </Form.Row>
      </Container>
    </div>
  );
}

export default Company;
