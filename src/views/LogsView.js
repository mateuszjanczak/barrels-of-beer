import * as React from "react";
import styled from "styled-components";
import {API_URL} from "../service/Api";

export class LogsView extends React.Component {

    state = {
        logs: []
    }

    componentDidMount() {
        this.fetchLogs();
    }

    fetchLogs = () => {
        fetch(API_URL + '/logs')
            .then(data => data.json())
            .then(logs  => this.setState({ logs }));
    }

    render() {
        return (
            <div>
                <Heading>Logi</Heading>
                {this.state.logs.length === 0 && <p className="text-center">Brak danych</p>}
                <div className="bg-light">
                    <table className="table">
                        <thead>
                        {this.state.logs.length > 0 &&
                        <tr>
                            <th scope="col">Identyfikator operacji</th>
                            <th scope="col">Numer kraniku</th>
                            <th scope="col">Kod beczki</th>
                            <th scope="col">Zawartość beczki</th>
                            <th scope="col">Stan</th>
                            <th scope="col">Data</th>
                            <th scope="col">Typ operacji</th>
                        </tr>}
                        </thead>
                        <tbody>
                        {this.state.logs.map(({id, barrelTapId, barrelName, barrelContent, capacity, date, logType}) => (
                            <tr key={id}>
                                <th scope="row">{id}</th>
                                <td>{barrelTapId}</td>
                                <td>{barrelName}</td>
                                <td>{barrelContent}</td>
                                <td>{capacity/1000} L</td>
                                <td>{date.substring(0, 19).replace('T', ' ')}</td>
                                <td>{logType}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const Heading = styled.h1`
  text-align: center;
  margin: 2rem 0;
`;
