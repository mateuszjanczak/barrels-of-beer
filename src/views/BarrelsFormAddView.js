import * as React from "react";
import styled from "styled-components";
import AddForm from "../components/AddForm";

export class BarrelsFormAddView extends React.Component {
    render() {
        return (
            <Wrapper>
                <AddForm />
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`

`;