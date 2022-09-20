import React from "react";
import styled from "styled-components/native";
import { Text, Pressable, StyleSheet } from "react-native";

/*
글씨, 배경 색상은 BoldColor, MainColor, SubColor, White 선택할 수 있으며 
default 컬러는 black이다.
다른 컴포넌트에서 버튼안에 들어가는 내용을 기입할 수 있으며 눌렀을 경우 이벤트 발생이 가능하다.
*/

export default function Button({ children, color, size, variant, onPress }) {
  return (
    <Container
      size={size}
      variant={variant}
      onPress={onPress}
      style={styles.buttonBox}
    >
      <Title color={color}>{children}</Title>
    </Container>
  );
}

// 버튼 그림자
const styles = StyleSheet.create({
  buttonBox: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

// 버튼 누르는 곳
const Container = styled(Pressable)(
  ({ size, variant }) =>
    `
  width: ${getSizeWidth(size)};
  height: ${getSizeHeight(size)};
  background-color: #fff;
  align-items: center;
  border-radius: 10px;
  justify-content: center;
  background-color: ${getBackgroundColor(variant)};
`
);

// 버튼 내부에 들어갈 내용
const Title = styled(Text)(
  ({ color }) => `
  color: ${getColor(color)};
  text-align: center;
  font-size: 26px;
`
);

function getBackgroundColor(variant) {
  switch (variant) {
    case "BoldColor":
      return "#FF8B34";
    case "MainColor":
      return "#FDB954";
    case "SubColor":
      return "#FFE48E";
    case "White":
      return "white";
    default:
      return "black";
  }
}

function getColor(color) {
  switch (color) {
    case "BoldColor":
      return "#FF8B34";
    case "MainColor":
      return "#FDB954";
    case "SubColor":
      return "#FFE48E";
    case "white":
      return "white";
    default:
      return "black";
  }
}

function getSizeWidth(size) {
  switch (size) {
    case "large":
      return "370px";
    case "medium":
      return "200px";
    case "small":
      return "100px";
    default:
      return "180px";
  }
}

function getSizeHeight(size) {
  switch (size) {
    case "large":
      return "70px";
    case "medium":
      return "70px";
    case "small":
      return "50px";
    default:
      return "70px";
  }
}
