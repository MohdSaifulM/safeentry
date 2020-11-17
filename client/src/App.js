import React, { useEffect, useState } from "react";
import Axios from "axios";
import Home from "./Home";
import Company from "./Company";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import { Button } from "react-bootstrap";
import PrivateRoute from "./PrivateRoute";

function App() {
  const [companies, setCompanies] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  function checkUser() {
    let token = localStorage.getItem("token");

    if (token) {
      //try to decode
      //if valid
      //i can make a call to api
      //if api returns true
      //set isAuth to true
    }
  }
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

  function logout() {
    localStorage.removeItem("token");
    setIsAuth(false);
  }

  function login() {
    setIsAuth(true);
  }

  return (
    <BrowserRouter>
      <Button onClick={logout}>Logout</Button>

      <Switch>
        <PrivateRoute
          companies={companies}
          component={Home}
          path="/"
          isAuth={isAuth}
          exact
        />

        <PrivateRoute
          companies={companies}
          component={Home}
          path="/company/:slug"
          isAuth={isAuth}
          exact
        />

        {/* <Route exact path="/lo" component={Register} />
        <Route exact path="/lo2" render={(props) => isAuth? <Register ebere="me" {...props} /> : <Login />} /> */}

        {/* <Route path="/company/:slug">
          <Company companies={companies} />
        </Route> */}
        <Route path="/login">
          <Login setAuth={login} />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
