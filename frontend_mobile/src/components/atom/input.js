import React from "react";
import { TextInput, View } from "react-native";
import styled from "styled-components/native";

/*
status가 modal일 때와 아닐 때 width, height, borderColor, border, borderRadius가 변합니다.
onChange로 함수를 받습니다.
*/

export default function Input({ status, onChangeText }) {
  return (
    <StyledInput
      status={status}
      placeholder={status === "modal" ? "검색" : "재료, 음식 검색"}
      onChangeText={onChangeText}
    />
  );
}

// 입력창
const StyledInput = styled(TextInput)(
  ({ status }) => `
  border-color: ${getBorderColor(status)};
  border: ${getBorderWidth(status)};
  width: ${getWidth(status)};
  height: ${getHeight(status)};
  border-radius: ${getBorderRadius(status)};
  padding: 2px;
`,
);

function getBorderWidth(status) {
  switch (status) {
    case "modal":
      return "2px";
    default:
      return "0px";
  }
}

function getBorderColor(status) {
  switch (status) {
    case "modal":
      return "#D9D9D9";
    default:
      return "white";
  }
}

function getWidth(status) {
  switch (status) {
    case "modal":
      return "90%";
    default:
      return "80%";
  }
}

function getHeight(status) {
  switch (status) {
    case "modal":
      return "40px";
    default:
      return "40px";
  }
}

function getBorderRadius(status) {
  switch (status) {
    case "modal":
      return "5px";
    default:
      return "0px";
  }
}
