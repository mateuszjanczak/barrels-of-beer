import * as React from "react";
import styled from "styled-components";
import SetForm from "../components/SetForm";

export class BarrelsFormSetView extends React.Component {
    render() {
        const { id } = this.props.match.params;

        return (
            <Wrapper className="container">
                <SetForm id={id} />
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`

`;