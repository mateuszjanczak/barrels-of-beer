import * as React from "react";
import styled from "styled-components";
import RankingChart from "../components/ranking/RankingChart";
import {API_URL} from "../service/Api";

export class RankingView extends React.Component {

    state = {
        title: "Ranking",
        statistics: []
    }


    componentDidMount() {
        this.fetchRanking();
    }

    fetchRanking = () => {
        fetch(API_URL + '/ranking')
            .then(data => data.json())
            .then(statistics => this.setState({ statistics }))
    }

    render() {
        const { title, statistics } = this.state;
        return (
            <div className="container">
                <Heading>{title}</Heading>
                {statistics.length === 0 && <p className="text-center">Brak danych</p>}
                {statistics.length > 0 &&
                    <div className="container bg-light py-3">
                        <RankingChart data={statistics} title={title} />
                    </div>
                }
            </div>
        )
    }
}

const Heading = styled.h1`
  text-align: center;
  margin: 2rem 0;
`;