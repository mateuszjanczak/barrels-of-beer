import * as React from "react";
import styled from "styled-components";
import AddForm from "../components/barrelsadd/AddForm";

export class BarrelsFormAddView extends React.Component {
    render() {
        return (
            <Wrapper className="container">
                <AddForm />
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`

`;