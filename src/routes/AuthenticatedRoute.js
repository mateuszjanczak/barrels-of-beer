import React from "react";
import {Redirect, Route} from 'react-router-dom'
import AuthService from "../service/AuthService";
import {routes} from "./Routes";

class AuthenticatedRoute extends React.Component {

    render() {
        if (AuthService.isLogged()) {
            return <Route {...this.props}/>
        } else {
            return <Redirect to={routes.login}/>
        }
    }
}

export default AuthenticatedRoute;
