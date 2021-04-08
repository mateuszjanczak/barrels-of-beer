import * as React from "react";
import Barrel from "../components/Barrel";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {routes} from "../routes/Routes";
import {API_URL} from "../service/Api";

export class BarrelsView extends React.Component {

    state = {
        barrels: []
    }

    componentDidMount() {
        this.fetchBarrels();
    }

    fetchBarrels = () => {
        fetch(API_URL + '/barrelTaps')
            .then(data => data.json())
            .then(barrels  => this.setState({ barrels }));
    }

    handleRefresh = () => {
        this.fetchBarrels();
    }

    render() {
        return (
            <Wrapper>
                <Heading>Beczki z piwem</Heading>

                <Nav>
                    <Link to={routes.barrelsAdd}>
                        <button type="button" className="btn btn-light">Dodaj kranik</button>
                    </Link>
                    <button type="button" className="btn btn-light" onClick={this.handleRefresh}>Odśwież</button>
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
  > * {
    margin: 0 0.5rem;
  }
`;

const Items = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;
`;