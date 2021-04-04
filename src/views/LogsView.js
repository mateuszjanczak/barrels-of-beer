import * as React from "react";
import styled from "styled-components";

export class LogsView extends React.Component {
    render() {
        return (
            <Heading>Logi</Heading>
        )
    }
}

const Heading = styled.h1`
  text-align: center;
  margin: 2rem 0;
`;
