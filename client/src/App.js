import React, { useEffect, useState, useContext, createContext } from "react";
import Axios from "axios";
import Home from "./Home";
import Company from "./Company";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import { Button } from "react-bootstrap";
import PrivateRoute from "./PrivateRoute";
import { decode } from "jsonwebtoken";

function App() {
  const [companies, setCompanies] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  // const authContext = createContext();

  // const useAuth = () => {
  //   return useContext(authContext);
  // };

  useEffect(() => {
    function checkUser() {
      let token = localStorage.getItem("token");
      console.log(token);
      if (!(token == null)) {
        let user = decode(token);
        console.log(user);
        if (!user) {
          localStorage.removeItem("token");
        }

        setIsAuth(true);
      }
    }
    checkUser();
    // fetchCompanies();
  }, []);

  console.log(isAuth);

  function logout() {
    localStorage.removeItem("token");
    setIsAuth(false);
  }

  async function loginFunc(user) {
    try {
      let resp = await Axios.post(
        "http://localhost:80/api/v1/auth/login",
        user
      );
      console.log(resp.data);
      localStorage.setItem("token", resp.data.token);
      setIsAuth(true);
    } catch (e) {
      console.log(e);
    }
  }
  function login() {
    setIsAuth(true);
  }

  return (
    <BrowserRouter>
      {isAuth && <Button onClick={logout}>Logout</Button>}

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
          component={Company}
          path="/company/:slug"
          isAuth={isAuth}
          exact
        />

        {/* <Route exact path="/lo" component={Register} />
        <Route exact path="/lo2" render={(props) => isAuth? <Register ebere="me" {...props} /> : <Login />} /> */}

        {/* <Route path="/">
          {isAuth ? (
            <Home companies={companies} />
          ) : (
            <Login isAuth={isAuth} loginFunc={loginFunc} />
          )}
        </Route> */}

        {/* <Route path="/company/:slug">
          {/* get the slug
          use the slug to make api request to fetch the most recent company data
        
          <Company companies={companies} />
        </Route> */}

        <Route path="/login">
          <Login isAuth={isAuth} loginFunc={loginFunc} />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
