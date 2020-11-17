import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Home() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchCompanies();
  }, []);
  async function fetchCompanies() {
    console.log(localStorage.getItem("token"));
    try {
      let response = await Axios.get("http://localhost:80/api/v1/company", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      console.log(response.data);
      setCompanies(response.data.companies);
    } catch (error) {
      console.log(error.repsonse);
      console.log(error);
    }
  }

  console.log("home page");
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
