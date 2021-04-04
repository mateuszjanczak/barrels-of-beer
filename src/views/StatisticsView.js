import * as React from "react";
import styled from "styled-components";

export class StatisticsView extends React.Component {
    render() {
        return (
            <div>
                <Heading>Statystyki</Heading>
                <p className="text-center">W trakcie tworzenia...</p>
            </div>
        )
    }
}

const Heading = styled.h1`
  text-align: center;
  margin: 2rem 0;
`;