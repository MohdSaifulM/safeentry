import React from "react";
import { Card } from "react-bootstrap";

function Home({ companies }) {
  return (
    <div>
      {companies.map((company) => (
        <Card key={company._id}>
          <Card.Body>
            {company.name}
            <img src={company.qrcode} alt={company.slug} />
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Home;
