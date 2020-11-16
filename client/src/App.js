import React, { useEffect, useState } from "react";
import Axios from "axios";
import Home from "./Home";
import Company from "./Company";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    fetchCompanies();
  }, []);

  async function fetchCompanies() {
    try {
      let response = await Axios.get("http://localhost:80/api/v1/company");
      console.log(response.data);
      setCompanies(response.data.companies);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Home companies={companies} />
        </Route>
        <Route path="/company/:slug">
          <Company />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
