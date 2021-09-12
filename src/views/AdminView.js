import * as React from "react";
import styled from "styled-components";
import {API_URL} from "../service/Api";
import AuthService from "../service/AuthService";
import {routes} from "../routes/Routes";

export class AdminView extends React.Component {

    state = {
        barrels: [],
        isDev: true
    }

    componentDidMount() {
        this.fetchBarrels();
    }

    fetchBarrels = () => {
        fetch(`${API_URL}/barrelTaps`, {
            headers: {
                'Authorization': AuthService.getHeaders()
            }
        })
            .then(res => {
                if (!res.ok) throw res;
                return res.json();
            })
            .then(barrels => this.setState({barrels}))
            .catch(error => {
                if (error.status === 401) {
                    this.props.history.push(routes.logout);
                }
            });
    }

    handleResetDatabase = (table) => {
        const c = window.confirm("Czy na pewno chcesz usunąć tą zawartość bazy danych?");
        if (c) fetch(`${API_URL}/admin/resetDatabase/${table}`, {
            method: 'POST',
            headers: {
                'Authorization': AuthService.getHeaders()
            }
        }).then(res => {
            if (!res.ok) throw res;
            return res.json();
        })
            .catch(error => {
                if (error.status === 401) {
                    this.props.history.push(routes.logout);
                }
            });
    }

    handleEnableTap = (id) => {
        fetch(`${API_URL}/admin/barrelTaps/${id}/enable/1`, {
            method: 'POST',
            headers: {
                'Authorization': AuthService.getHeaders()
            }
        }).then(res => {
            if (!res.ok) throw res;
            return res.json();
        })
            .catch(error => {
                if (error.status === 401) {
                    this.props.history.push(routes.logout);
                }
            });
    }

    handleDisableTap = (id) => {
        fetch(`${API_URL}/admin/barrelTaps/${id}/enable/0`, {
            method: 'POST',
            headers: {
                'Authorization': AuthService.getHeaders()
            }
        })
            .then(res => {
                if (!res.ok) throw res;
                return res.json();
            })
            .catch(error => {
                if (error.status === 401) {
                    this.props.history.push(routes.logout);
                }
            });
    }

    render() {
        const {barrels, isDev} = this.state;
        return (
            <div className="container">
                <Heading>Panel administratora</Heading>

                {isDev && <div className="alert alert-danger" role="alert">
                    Uwaga! Pracujesz w środowisku testowym.
                </div>}

                <Instruction>
                    <h2>Komunikacja ze sterownikiem</h2>
                    <ul className="list-group">
                        {barrels.length === 0 && <p>Brak beczek w systemie.</p>}
                        {barrels.map(barrel => (
                            <li className="list-group-item list-group-item-info">
                                <span>
                                    Kran beczki nr {barrel.barrelTapId}
                                </span>
                                <span className="d-flex justify-content-end">
                                    <Button type="button" className="btn btn-success"
                                            onClick={() => this.handleEnableTap(barrel.barrelTapId)}>Aktywuj</Button>
                                    <Button type="button" className="btn btn-danger"
                                            onClick={() => this.handleDisableTap(barrel.barrelTapId)}>Dezaktywuj</Button>
                                </span>
                            </li>
                        ))}
                    </ul>
                </Instruction>

                <Instruction>
                    <h2>Zarejestrowane kraniki w systemie</h2>
                    <ul className="list-group">
                        {barrels.length === 0 && <p>Brak beczek w systemie.</p>}
                        {barrels.map(barrel => (
                            <li className="list-group-item list-group-item-info">{API_URL}/barrelTaps/{barrel.barrelTapId}/hex/DANE_HEX</li>
                        ))}
                    </ul>
                </Instruction>

                <Instruction>
                    <h2>Baza danych</h2>
                    <ul className="list-group">
                        <li className="list-group-item list-group-item-info">
                            <span>
                                Dane o zarejestrowanych kranikach
                            </span>
                            <span className="d-flex justify-content-end">
                                <Button type="button" className="btn btn-danger"
                                        onClick={() => this.handleResetDatabase('BARREL_TAP')}>Wyczyść bazę danych</Button>
                            </span>
                        </li>
                        <li className="list-group-item list-group-item-info">
                            <span>
                                Logi z kraników - przepływ cieczy
                            </span>
                            <span className="d-flex justify-content-end">
                                <Button type="button" className="btn btn-danger"
                                        onClick={() => this.handleResetDatabase('BARREL_TAP_LOG')}>Wyczyść bazę danych</Button>
                            </span>
                        </li>
                        <li className="list-group-item list-group-item-info">
                            <span>
                                Logi z kraników - temperatura
                            </span>
                            <span className="d-flex justify-content-end">
                                <Button type="button" className="btn btn-danger"
                                        onClick={() => this.handleResetDatabase('BARREL_TEMPERATURE_LOG')}>Wyczyść bazę danych</Button>
                            </span>
                        </li>
                        <li className="list-group-item list-group-item-info">
                            <span>
                                Logi z piwem
                            </span>
                            <span className="d-flex justify-content-end">
                                <Button type="button" className="btn btn-danger"
                                        onClick={() => this.handleResetDatabase('BEER_LOG')}>Wyczyść bazę danych</Button>
                            </span>
                        </li>
                    </ul>
                </Instruction>
            </div>
        )
    }
}

const Heading = styled.h1`
  text-align: center;
  margin: 2rem 0;
`;

const Instruction = styled.div`
  margin-bottom: 2rem;

  > h2 {
    margin-bottom: 1rem;
  }
`;

const Button = styled.button`
  margin-right: 0.5rem;
`;
