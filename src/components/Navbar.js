import {NavLink} from "react-router-dom";
import {routes} from "../routes/Routes";
import styled from "styled-components";
import {Component} from "react";

class Navbar extends Component {

    state = {
        visible: false
    }

    toggleNav = () => {
        this.setState({
            visible: !this.state.visible
        })
    }

    offNav = () => {
        this.setState({
            visible: false
        })
    }

    render() {
        return (
            <Nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <NavLink to={routes.homepage} className="navbar-brand" href="#">Browar Trzy Korony</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation" onClick={this.toggleNav}>
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className={`collapse navbar-collapse ${this.state.visible ? "show" : ""}`} id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to={routes.barrels} className="nav-link active" onClick={this.offNav}>Beczki</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={routes.statistics} className="nav-link active" onClick={this.offNav}>Statystyki</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={routes.extendedStatistics} className="nav-link active" onClick={this.offNav}>Statystyki 2</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={routes.logs} className="nav-link active" onClick={this.offNav}>Logi</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={routes.readme} className="nav-link active fw-bold" onClick={this.offNav}>Instrukcja</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </Nav>
        );
    }
}

const Nav = styled.nav`

`;

export default Navbar;