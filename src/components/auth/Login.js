import React from "react";
import styled from "styled-components";
import AuthService from "../../service/AuthService";
import {AppContext} from "../../context/AppContext";

class Login extends React.Component {

    static contextType = AppContext;

    state = {
        username: "",
        password: "",
        error: false,
        errorMsg: ""
    }

    handleChange = (event: { target: { name: string; value: any; }; }) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    };

    handleClick = () => {
        const {username, password} = this.state;
        this.userAuthorization(username, password);
    }

    userAuthorization = (username: string, password: string) => {
        const {toggleRedirect} = this.props;

        AuthService.executeJwtAuthenticationService(username, password)
            .then(({token}) => AuthService.registerSuccessfulLoginForJwt(username, token))
            .then(() => {
                this.context.toggleAuthenticated(true);
                toggleRedirect();
            })
            .catch(() => this.setState({error: true, errorMsg: "Error"}))
    }

    render() {
        return (
            <Wrapper>
                {this.state.error && <Error>{this.state.errorMsg}</Error>}
                <Label>
                    <input placeholder="username" name="username" value={this.state.username}
                           onChange={this.handleChange}/>
                </Label>
                <Label>
                    <input type="password" placeholder="password" name="password" value={this.state.password}
                           onChange={this.handleChange}/>
                </Label>
                <button onClick={this.handleClick}>LOG IN</button>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
  display: grid;
  border: 1px solid #333;
  background: linear-gradient(0deg, rgba(255, 255, 200, 1) 20%, rgba(255, 255, 225, 1) 100%);
  padding: 2.5rem 5rem;
  justify-items: center;
  align-self: start;
  justify-self: end;

  @media (max-width: 992px) {
    justify-self: center;
  }

  @media (max-width: 575px) {
    justify-self: unset;
  }
`;

const Label = styled.div`
  margin: 1rem;
`;

const Error = styled.div`
  width: 30rem;
  padding: 0.25rem 1rem;
  background: #F39191;
  border: 1px solid #24292e;
`;

export default Login;
