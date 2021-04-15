import * as React from "react";
import styled from "styled-components";
import {API_URL} from "../service/Api";
import {Pagination} from "@material-ui/lab";

export class LogsView extends React.Component {

    state = {
        barrelTapLogs: {
            content: [],
            totalPages: 0
        },
        barrelTemperatureLogs: {
            content: [],
            totalPages: 0
        }
    }

    componentDidMount() {
        this.fetchLogs();
    }

    handleRefresh = () => {
        this.fetchLogs();
    }

    handleChangePageTapLogs = (event, value) => {
        this.fetchBarrelTapLogs(value - 1);
    }

    handleChangePageTemperatureLogs = (event, value) => {
        this.fetchBarrelTemperatureLogs(value - 1);
    }

    fetchLogs = () => {
        this.fetchBarrelTapLogs(0);
        this.fetchBarrelTemperatureLogs(0);
    }

    fetchBarrelTapLogs = (page) => {
        fetch(API_URL + '/logs/barrelTaps/' + page)
            .then(data => data.json())
            .then(barrelTapLogs  => this.setState({ barrelTapLogs }));
    }

    fetchBarrelTemperatureLogs = (page) => {
        fetch(API_URL + '/logs/barrelTemperature/' + page)
            .then(data => data.json())
            .then(barrelTemperatureLogs  => this.setState({ barrelTemperatureLogs }));
    }

    render() {
        const { barrelTapLogs, barrelTemperatureLogs } = this.state;

        return (
            <div className="container-fluid">
                <Heading>Logi</Heading>

                <h3>Zużycie</h3>
                {barrelTapLogs.content.length === 0 && <p className="text-center">Brak danych</p>}
                <Container className="table-responsive bg-light">
                    <table className="table mb-0">
                        <thead>
                        {barrelTapLogs.content.length > 0 &&
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
                        {barrelTapLogs.content.map(({id, barrelTapId, barrelName, barrelContent, capacity, usage, date, logType}) => (
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
                    {barrelTapLogs.content.length > 0 && <PaginationContainer>
                        <Pagination count={barrelTapLogs.totalPages} color="primary" onChange={this.handleChangePageTapLogs}/>
                    </PaginationContainer>}
                </Container>
                <h3>Temperatura</h3>
                {barrelTemperatureLogs.content.length === 0 && <p className="text-center">Brak danych</p>}
                <Container className="table-responsive bg-light">
                    <table className="table mb-0">
                        <thead>
                        {barrelTemperatureLogs.content.length > 0 &&
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
                        {barrelTemperatureLogs.content.map(({id, barrelTapId, barrelName, barrelContent, temperature, date}) => (
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
                    {barrelTemperatureLogs.content.length > 0 && <PaginationContainer>
                        <Pagination count={barrelTemperatureLogs.totalPages} color="primary" onChange={this.handleChangePageTemperatureLogs}/>
                    </PaginationContainer>}
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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;