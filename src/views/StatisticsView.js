import * as React from "react";
import styled from "styled-components";
import {API_URL} from "../service/Api";
import StatisticsChart from "../components/statistics/StatisticsChart";
import AuthService from "../service/AuthService";
import {routes} from "../routes/Routes";

export class StatisticsView extends React.Component {

    state = {
        title: "Statystyki",
        statistics: [],
        from: "",
        to: "",
        interval: 0
    }

    fetchStatistics = (from, to, interval) => {
        fetch(`${API_URL}/statistics/from/${from}/to/${to}/interval/${interval}`, {
            headers: {
                'Authorization': AuthService.getHeaders()
            }
        })
            .then(res => {
                if (!res.ok) throw res;
                return res.json();
            })
            .then(statistics => this.setState({statistics}))
            .catch(error => {
                if (error.status === 401) {
                    this.props.history.push(routes.logout);
                }
            });
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleClick = () => {
        let {from, to, interval} = this.state;
        from = from.replace('T', ' ');
        to = to.replace('T', ' ');
        this.fetchStatistics(from, to, interval);
    }

    render() {
        const {title, statistics} = this.state;
        return (
            <div className="container">
                <Heading>{title}</Heading>

                <div className="container bg-light text-dark py-3 mb-5">
                    <div className="mb-3">
                        <label htmlFor="from" className="form-label">Data początkowa</label>
                        <input type="datetime-local" className="form-control" id="from" name="from"
                               onChange={this.handleChange}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="to" className="form-label">Data końcowa</label>
                        <input type="datetime-local" className="form-control" id="to" name="to"
                               onChange={this.handleChange}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="counter" className="form-label">Interwał w minutach</label>
                        <input type="number" className="form-control" id="interval" name="interval"
                               onChange={this.handleChange}/>
                    </div>

                    <button className="btn btn-primary" onClick={this.handleClick}>Ustaw</button>
                </div>

                {statistics.map((item) => (
                    <div className="container bg-light text-dark py-3 mb-5">
                        <h3>{item.name}</h3>
                        <StatisticsChart data={item} title={item.name}/>
                    </div>
                ))}
            </div>
        )
    }
}

const Heading = styled.h1`
  text-align: center;
  margin: 2rem 0;
`;
