import { 
    Card, 
    Left,
    Image,
    Right,
    Title,
    Price,

 } from "./card.styles";
 import CustomButton from "../custom-buttom/custom-button.component";

const CardItem = ({title, price, imageUrl})=> {    
    console.log(imageUrl);
    return(
    <Card>
        <Left>
            <Image src={imageUrl && imageUrl[0]}/>
        </Left>
        <Right>
        <Title>{title}</Title>
        <Price>{price}</Price>
        <CustomButton>Buy Now</CustomButton>
        </Right>
    </Card>
)}

export default CardItem