import * as React from "react";
import styled from "styled-components";

export class LogsView extends React.Component {

    state = {
        logs: []
    }

    componentDidMount() {
        this.fetchLogs();
    }

    fetchLogs = () => {
        fetch('http://localhost:8080/logs')
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
                            <th scope="col">Id operacji</th>
                            <th scope="col">Nazwa beczki</th>
                            <th scope="col">Typ piwa</th>
                            <th scope="col">Stan</th>
                            <th scope="col">Data</th>
                            <th scope="col">Typ operacji</th>
                        </tr>}
                        </thead>
                        <tbody>
                        {this.state.logs.map(({id, barrelId, barrelName, beerType, capacity, date, logType}) => (
                            <tr key={id}>
                                <th scope="row">{id}</th>
                                <td>{barrelName}</td>
                                <td>{beerType}</td>
                                <td>{capacity} L</td>
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
