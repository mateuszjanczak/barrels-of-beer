import BarrelImg from './../assets/barrel.png';
import styled from "styled-components";
import {routes} from "../routes/Routes";
import {Link} from "react-router-dom";

const Barrel = () => (
    <Wrapper>
        <Details>
            <h3>barrelName</h3>
            <h6>beerType</h6>
        </Details>

        <Container>
            <GrayImg src={BarrelImg} alt={"Barrel"}/>
            <ColorImg src={BarrelImg} alt={"Barrel"}/>
            <Status>50%</Status>
        </Container>

        <Nav>
            <button className="btn btn-primary">Impuls</button>
            <Link to={routes.barrelsSet}>
                <button className="btn btn-primary">Ustaw</button>
            </Link>
        </Nav>
    </Wrapper>
);

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
  filter: grayscale(100%);
`;

const ColorImg = styled.img`
  position: absolute;
  width: 300px;
  clip: rect(calc(300px - (300px * 0.5)), 300px, 300px, 0px);
  z-index: 100;
`;

const Status = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 200;
  font-size: 36px;
  font-weight: 600;
`;

export default Barrel;