import styled from 'styled-components';

export const Card = styled.div`
cursor: pointer;
display: flex;
justify-content: space-between;
align-items: center;
margin-top: 10px;
height: 200px;
width: 40vw;
box-shadow: 0px 1px 4px rgba(124, 116, 116, 0.392);
padding: 10px;
/* border: 1px solid grey; */
border-radius: 5px;
@media screen and (max-width: 768px){
    width: 90vw;
    box-shadow: 0px 1px 4px rgba(124, 116, 116, 0.238);

}
`
export const Left = styled.div`
/* border: 1px solid red; */
`
export const Image = styled.img`
height: 180px;
/* margin-top: 25px; */
@media screen and (max-width: 450px) {
      height: 150px;
  }
`

export const Right = styled.div`
    position: relative;

/* border: 1px solid blue; */
/* display: flex; */
/* flex-direction: column; */
/* justify-content: center; */
/* align-items: center; */
font-size: 16px;
height: 80%;
width: 55%;
`


export const Title = styled.p`
    font-weight: 500;
    text-transform: uppercase;
    font-weight: 500;
    align-self: flex-start;
`

export const Price = styled.p`
align-self: flex-start;
`
export const QualityContainer = styled.div`
    position: absolute;
    right: 5%;
    top: 0%;
    /* top: 10px; */
    background-color: aqua;
    height: 75px;
    width: 75px;
    border-radius: 100%;
`
export const Quality = styled.p`
    text-align: center;
    position: relative;
    top: 7px;
    
    /* display: flex;
    justify-content: center;
    align-items: center; */
    /* transform: translatex(-50%); */
`