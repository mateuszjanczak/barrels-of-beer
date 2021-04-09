import BarrelImg from './../assets/barrel.png';
import styled from "styled-components";
import {routes} from "../routes/Routes";
import {withRouter} from "react-router-dom";
import {Component} from "react";

class Barrel extends Component {

    handleHit = (barrelTapId) => {
        const { history } = this.props;
        history.push(`${routes.barrelsHit}/${barrelTapId}`);
    }

    handleSet = (barrelTapId) => {
        const { history } = this.props;
        history.push(`${routes.barrelsSet}/${barrelTapId}`);
    }

    render() {
        const { details } = this.props;
        const { barrelTapId, barrelName, barrelContent, capacity, totalCapacity, temperature} = details;
        const percent = isNaN(capacity / totalCapacity) ? 0 : capacity / totalCapacity;

        return (
            <Wrapper>
                <Details>
                    <h3>Kranik {barrelTapId}</h3>
{/*
                    <h4>{barrelName}</h4>
*/}
                    <h4>{barrelContent}</h4>
                </Details>

                <Container>
                    <GrayImg src={BarrelImg} alt={"Barrel"}/>
                    <ColorImg percent={percent} src={BarrelImg} alt={"Barrel"}/>
                    <Status>
                        <p>{(percent * 100).toFixed(0)}%</p>
                        <p>{temperature} °C</p>
                        <p>{capacity/1000} / {totalCapacity/1000} L</p>
                    </Status>
                </Container>

                <Nav>
                    {/*
                    <button className="btn btn-primary" onClick={() => this.handleHit(barrelTapId)}>Nowy stan</button>
*/}
                    <button className="btn btn-primary" onClick={() => this.handleSet(barrelTapId)}>Ustaw beczkę</button>
                </Nav>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    
`;

const Details = styled.div`
    text-align: center;
`;

const Container = styled.div`
  position: relative;
  height: 300px;
`;

const Nav = styled.div`
  text-align: center;
  margin-top: 1rem;
  
  > button {
    margin: 0 0.5rem;
  }
`;

const GrayImg = styled.img`
  position: absolute;
  width: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: grayscale(100%);
`;

const ColorImg = styled.img`
  position: absolute;
  width: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  clip: rect(calc(300px - (300px * ${props => props.percent})), 300px, 300px, 0px);
  z-index: 100;
`;

const Status = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 200;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  text-shadow: 2px 2px 8px #000000;
`;

export default withRouter(Barrel);