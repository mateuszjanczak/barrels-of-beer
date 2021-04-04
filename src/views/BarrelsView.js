import * as React from "react";
import Barrel from "../components/Barrel";
import styled from "styled-components";

export class BarrelsView extends React.Component {
    render() {
        return (
            <Wrapper>
                <Barrel />
                <Barrel />
                <Barrel />
                <Barrel />
                <Barrel />
                <Barrel />

            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;
`;