import React from "react";
import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Home({ companies }) {
  return (
    <div>
      {companies.map((company) => (
        <Card key={company._id}>
          <Card.Body>
            {company.name}
            <img src={company.qrcode} alt={company.slug} />
            <NavLink to={`/company/${company.slug}`}>Add Visitor</NavLink>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Home;
