import styled from 'styled-components';

export const Button = styled.button`
    font-family: poppins;
    box-sizing: border-box;
    width: 140px;
    background-color: #32cd85;
    color: #fff;
    font-size: 16px;
    border-radius: 3px;
    border: none;
    padding: 10px 13px;
    cursor: pointer;
    font-weight: 500;
    align-self: flex-end;
    margin-right: 10px;

    :hover{
        background-color: #fff;
        color: #32cd85;
        border: 2px solid #32cd85;
    }
`