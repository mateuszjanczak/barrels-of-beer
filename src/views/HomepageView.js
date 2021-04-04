import * as React from "react";
import styled from "styled-components";

export class HomepageView extends React.Component {
    render() {
        return (
            <Heading>Strona główna</Heading>
        )
    }
}

const Heading = styled.h1`
  text-align: center;
  margin: 2rem 0;
`;