import * as React from "react";
import styled from "styled-components";
import LineChart from "../components/LineChart";
import {API_URL} from "../service/Api";

export class StatisticsView extends React.Component {

    state = {
        title: "Codzienne statystyki",
        statistics: [
/*            {
                date: "2021-04-05T00:26:34.321+00:00",
                barrelName: "Beczka #1",
                beerType: "Tyskie",
                count: 10
            },
            {
                date: "2021-04-05T00:26:34.321+00:00",
                barrelName: "Beczka #2",
                beerType: "Harnaś",
                count: 8
            },
            {
                date: "2021-04-05T00:26:34.321+00:00",
                barrelName: "Beczka #3",
                beerType: "Kustosz",
                count: 5
            },
            {
                date: "2021-04-05T00:26:34.321+00:00",
                barrelName: "Beczka #4",
                beerType: "Książ czarny",
                count: 5
            },
            {
                date: "2021-04-05T00:26:34.321+00:00",
                barrelName: "Beczka #4",
                beerType: "Piwo ekipy",
                count: 5
            }*/
        ]
    }


    componentDidMount() {
        this.fetchDailyStatistics();
    }

    fetchDailyStatistics = () => {
        fetch(API_URL + '/statistics/daily')
            .then(data => data.json())
            .then(statistics => this.setState({ statistics }))
    }

    render() {
        const { title, statistics } = this.state;
        return (
            <div>
                <Heading>{title}</Heading>
                {statistics.length === 0 && <p className="text-center">Brak danych</p>}
                {statistics.length > 0 &&
                    <div className="bg-light p-5">
                        <LineChart data={statistics} title={title} />
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