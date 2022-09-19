import React from 'react';
import styled from 'styled-components/native';
import { Text, View } from "react-native";

const Container = styled(View)(
    `
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`);

function getColor(color) {
    switch (color) {
      case "white":
        return "white";
      case "red":
        return "red";
      default:
        return "red";
    }
  }

const Title = styled(Text)(({color}) =>`
  color: ${getColor(color)};
  text-align: center;
  font-size: 16px;
`);

export default function Button({children, color}){
    return (
        <Container>
            <Title color={color}>{children}</Title>
        </Container>
    )
};