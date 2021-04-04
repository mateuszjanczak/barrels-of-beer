import * as React from "react";
import Barrel from "../components/Barrel";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {routes} from "../routes/Routes";

export class BarrelsView extends React.Component {

    state = {
        barrels: []
    }


    componentDidMount() {
        this.fetchBarrels();
    }

    fetchBarrels = () => {
        fetch('http://localhost:8080/barrels')
            .then(data => data.json())
            .then(barrels  => this.setState({ barrels }));
    }

    render() {
        return (
            <Wrapper>
                <Heading>Beczki z piwem</Heading>

                <Nav>
                    <Link to={routes.barrelsAdd}>
                        <button type="button" className="btn btn-light">Dodaj beczkę</button>
                    </Link>
                </Nav>

                <Items>
                    {this.state.barrels.map(details => (<Barrel key={details.id} fetchBarrelsFn={this.fetchBarrels} details={details}/>))}
                </Items>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
  margin-bottom: 5rem;
`;

const Heading = styled.h1`
  text-align: center;
  margin: 2rem 0;
`;

const Nav = styled.div`
  text-align: center;
  margin: 2rem 0;
`;

const Items = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
`;