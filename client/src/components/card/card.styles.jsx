import styled from 'styled-components';

export const Card = styled.div`
cursor: pointer;
display: flex;
justify-content: space-between;
align-items: center;
margin-top: 10px;
height: 200px;
width: 40vw;
box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.4);
padding: 10px;
/* border: 1px solid grey; */
border-radius: 5px;
@media screen and (max-width: 768px){
    width: 80vw;
}
`
export const Left = styled.div`
/* border: 1px solid red; */
`
export const Image = styled.img`
height: 200px;
/* margin-top: 25px; */
@media screen and (max-width: 450px) {
      height: 150px;
  }
`

export const Right = styled.div`
/* border: 1px solid blue; */
display: flex;
flex-direction: column;
justify-content: center;
font-size: 16px;
height: 80%;
width: 55%;
`


export const Title = styled.h5`
    font-weight: 500;
    text-transform: uppercase;
    font-weight: 600;
`

export const Price = styled.p`
    
`

