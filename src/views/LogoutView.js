import React from "react";
import AuthService from "../service/AuthService";
import {routes} from "../routes/Routes";
import {AppContext} from "../context/AppContext";

class Logout extends React.Component {

    static contextType = AppContext;

    componentDidMount() {
        AuthService.logout();
        this.context.toggleAuthenticated(false);
        this.props.history.push(routes.login);
    }

    render() {
        return (
            <></>
        )
    }
}

export default Logout;
