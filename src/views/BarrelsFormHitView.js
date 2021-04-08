import * as React from "react";
import styled from "styled-components";
import HitForm from "../components/HitForm";

export class BarrelsFormHitView extends React.Component {
    render() {
        const { id } = this.props.match.params;

        return (
            <Wrapper>
                <HitForm id={id} />
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`

`;