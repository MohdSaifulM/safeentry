import React, { useEffect, useState } from "react";
import Axios from "axios";
import Home from "./Home";
import Company from "./Company";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";

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
          <Company companies={companies} />
        </Route>
        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
