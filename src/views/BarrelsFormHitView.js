import * as React from "react";
import styled from "styled-components";
import HitForm from "../components/hit/HitForm";

export class BarrelsFormHitView extends React.Component {
    render() {
        const {id} = this.props.match.params;

        return (
            <Wrapper className="container">
                <HitForm id={id}/>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`

`;
