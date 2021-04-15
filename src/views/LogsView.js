import * as React from "react";
import styled from "styled-components";
import {API_URL} from "../service/Api";

export class LogsView extends React.Component {

    state = {
        barrelTapLogs: [],
        barrelTemperatureLogs: []
    }

    componentDidMount() {
        this.fetchLogs();
    }

    handleRefresh = () => {
        this.fetchLogs();
    }

    fetchLogs = () => {
        fetch(API_URL + '/logs/barrelTaps')
            .then(data => data.json())
            .then(barrelTapLogs  => this.setState({ barrelTapLogs }));

        fetch(API_URL + '/logs/barrelTemperature')
            .then(data => data.json())
            .then(barrelTemperatureLogs  => this.setState({ barrelTemperatureLogs }));
    }

    render() {
        return (
            <div className="container-fluid">
                <Heading>Logi</Heading>
                <Nav>
                    <button type="button" className="btn btn-light" onClick={this.handleRefresh}>Odśwież</button>
                </Nav>

                <h1>Zużycie</h1>
                {this.state.barrelTapLogs.length === 0 && <p className="text-center">Brak danych</p>}
                <Container className="table-responsive">
                    <table className="bg-light table mb-0">
                        <thead>
                        {this.state.barrelTapLogs.length > 0 &&
                        <tr>
                            <th scope="col">Identyfikator operacji</th>
                            <th scope="col">Numer kraniku</th>
                            <th scope="col">Kod beczki</th>
                            <th scope="col">Zawartość beczki</th>
                            <th scope="col">Stan</th>
                            <th scope="col">Zużycie</th>
                            <th scope="col">Data</th>
                            <th scope="col">Typ operacji</th>
                        </tr>}
                        </thead>
                        <tbody>
                        {this.state.barrelTapLogs.map(({id, barrelTapId, barrelName, barrelContent, capacity, usage, date, logType}) => (
                            <tr key={id}>
                                <th scope="row">{id}</th>
                                <td>{barrelTapId}</td>
                                <td>{barrelName}</td>
                                <td>{barrelContent}</td>
                                <td>{capacity/1000} L</td>
                                <td>{usage/1000} L</td>
                                <td>{date.substring(0, 19).replace('T', ' ')}</td>
                                <td>{logType}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </Container>
                <h1>Temperatura</h1>
                {this.state.barrelTemperatureLogs.length === 0 && <p className="text-center">Brak danych</p>}
                <Container className="table-responsive">
                    <table className="table bg-light">
                        <thead>
                        {this.state.barrelTemperatureLogs.length > 0 &&
                        <tr>
                            <th scope="col">Identyfikator operacji</th>
                            <th scope="col">Numer kraniku</th>
                            <th scope="col">Kod beczki</th>
                            <th scope="col">Zawartość beczki</th>
                            <th scope="col">Temperatura</th>
                            <th scope="col">Data</th>
                        </tr>}
                        </thead>
                        <tbody>
                        {this.state.barrelTemperatureLogs.map(({id, barrelTapId, barrelName, barrelContent, temperature, date}) => (
                            <tr key={id}>
                                <th scope="row">{id}</th>
                                <td>{barrelTapId}</td>
                                <td>{barrelName}</td>
                                <td>{barrelContent}</td>
                                <td>{temperature} °C</td>
                                <td>{date.substring(0, 19).replace('T', ' ')}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </Container>
            </div>
        )
    }
}

const Heading = styled.h1`
  text-align: center;
  margin: 2rem 0;
`;

const Container = styled.div`
  margin-bottom: 2rem;
`;

const Nav = styled.div`
  text-align: center;
  margin: 2rem 0;
  > * {
    margin: 0 0.5rem;
  }
`;