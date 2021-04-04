import * as React from "react";
import styled from "styled-components";

export class StatisticsView extends React.Component {
    render() {
        return (
            <Heading>Statystyki</Heading>
        )
    }
}

const Heading = styled.h1`
  text-align: center;
  margin: 2rem 0;
`;