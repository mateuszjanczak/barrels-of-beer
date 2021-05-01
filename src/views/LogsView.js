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
        },
        beerLogs: {
            content: [],
            totalPages: 0
        }
    }

    componentDidMount() {
        this.fetchLogs();
    }

    handleChangePageTapLogs = (event, value) => {
        this.fetchBarrelTapLogs(value - 1);
    }

    handleChangePageTemperatureLogs = (event, value) => {
        this.fetchBarrelTemperatureLogs(value - 1);
    }

    handleChangePageBeerLogs = (event, value) => {
        this.fetchBeerLogs(value - 1);
    }

    fetchLogs = () => {
        this.fetchBarrelTapLogs(0);
        this.fetchBarrelTemperatureLogs(0);
        this.fetchBeerLogs(0);
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

    fetchBeerLogs = (page) => {
        fetch(API_URL + '/logs/beers/' + page)
            .then(data => data.json())
            .then(beerLogs  => this.setState({ beerLogs }));
    }

    generateBeerStatistics = () => {
        fetch(API_URL + '/logs/beers/update', { method: 'POST'})
            .then(() => {
                this.fetchBeerLogs(0);
            })
    }

    render() {
        const { barrelTapLogs, barrelTemperatureLogs, beerLogs } = this.state;

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
                            <th scope="col">Ogólne zużycie</th>
                            <th scope="col">Zużycie</th>
                            <th scope="col">Data</th>
                            <th scope="col">Typ operacji</th>
                        </tr>}
                        </thead>
                        <tbody>
                        {barrelTapLogs.content.map(({id, barrelTapId, barrelName, barrelContent, currentLevel, totalUsage, singleUsage, date, logType}) => (
                            <tr key={id}>
                                <th scope="row">{id}</th>
                                <td>{barrelTapId}</td>
                                <td>{barrelName}</td>
                                <td>{barrelContent}</td>
                                <td>{currentLevel/1000} L</td>
                                <td>{totalUsage/1000} L</td>
                                <td>{singleUsage/1000} L</td>
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
                {barrelTapLogs.content.length > 0 && <Nav>
                    <a className="btn btn-light" href={API_URL + "/logs/barrelTaps/csv"} role="button">Eksportuj dane</a>
                </Nav>}

                <h3>Piwo</h3>
                {beerLogs.content.length === 0 && <p className="text-center">Brak danych</p>}
                <Container className="table-responsive bg-light">
                    <table className="table mb-0">
                        <thead>
                        {beerLogs.content.length > 0 &&
                        <tr>
                            <th scope="col">Identyfikator operacji</th>
                            <th scope="col">Zawartość beczki</th>
                            <th scope="col">Operacje z kraników</th>
                            <th scope="col">Ilość</th>
                            <th scope="col">Początkowa data</th>
                            <th scope="col">Końcowa data</th>
                        </tr>}
                        </thead>
                        <tbody>
                        {beerLogs.content.map(({id, barrelContent, barrelTapLogs, amount, startDate, endDate}) => (
                            <tr key={id}>
                                <th scope="row">{id}</th>
                                <td>{barrelContent}</td>
                                <td>[{barrelTapLogs.join(", ")}]</td>
                                <td>{amount / 1000} L</td>
                                <td>{startDate.substring(0, 19).replace('T', ' ')}</td>
                                <td>{endDate.substring(0, 19).replace('T', ' ')}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {beerLogs.content.length > 0 && <PaginationContainer>
                        <Pagination count={beerLogs.totalPages} color="primary" onChange={this.handleChangePageBeerLogs}/>
                    </PaginationContainer>}
                </Container>

                {barrelTapLogs.content.length > 0 && <Nav>
                    <button className="btn btn-light" onClick={this.generateBeerStatistics}>Oblicz dane</button>
                </Nav>}

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

const Nav = styled.div`
  text-align: right;
  margin: 2rem 0;
  > * {
    margin: 0 0.5rem;
  }
`;
