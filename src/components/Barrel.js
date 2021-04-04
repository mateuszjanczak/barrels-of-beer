import BarrelImg from './../assets/barrel.png';
import styled from "styled-components";

const Barrel = () => (
    <Wrapper>
        <GrayImg src={BarrelImg} alt={"Barrel"}/>
        <ColorImg src={BarrelImg} alt={"Barrel"}/>
        <Status>50%</Status>
    </Wrapper>
);

const Wrapper = styled.div`
  position: relative;
  height: 300px;
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