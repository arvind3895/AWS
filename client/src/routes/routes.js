import { Route, Switch,Redirect,useHistory} from "react-router-dom";
import React from "react";
import SignIn from "../components/SignIn";
import SignUp from '../components/SignUp'
import Dashboard from "../components/Dashboard";
import {getCookie} from "../util";
import axios from "axios";

function Routes() {

    var history = useHistory();

    function initialSettings(){
      var token = getCookie("token");
      if(token){
        history.push("/dashboard");
        axios.interceptors.request.use(function (config) {
          config.headers.Authorization = `Bearer ${token}`;
          return config;
        });
      }
    }

    initialSettings();

    return (
        <Switch>
          <Route path="/login" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path='*'  >
            <Redirect to={getCookie("token")?"/dashboard":"/login"} /> 
          </Route>
        </Switch>
    );
}

export default Routes;
