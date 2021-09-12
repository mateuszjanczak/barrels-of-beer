import React from "react";
import styled from "styled-components";
import AuthService from "../../service/AuthService";
import {AppContext} from "../../context/AppContext";

class Register extends React.Component {

    static contextType = AppContext;

    state = {
        username: "",
        password: "",
        email: "",
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
        const {username, password, email} = this.state;
        const {toggleRedirect} = this.props;

        AuthService.registerAccount(username, password, email)
            .then(() => AuthService.executeJwtAuthenticationService(username, password))
            .then(data => AuthService.registerSuccessfulLoginForJwt(username, data.token))
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
                    <input type="email" placeholder="email" name="email" value={this.state.email}
                           onChange={this.handleChange}/>
                </Label>
                <Label>
                    <input placeholder="username" name="username" value={this.state.username}
                           onChange={this.handleChange}/>
                </Label>
                <Label>
                    <input type="password" placeholder="password" name="password" value={this.state.password}
                           onChange={this.handleChange}/>
                </Label>
                <button onClick={this.handleClick}>REGISTER</button>
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
  justify-self: start;

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

export default Register;
