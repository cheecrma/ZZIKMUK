import React from "react";
import { TextInput, View } from "react-native";
import styled from 'styled-components/native'

const StyledInput = styled(TextInput)(({status}) => `
  border-color: ${ getBorderColor(status) };
  border: ${ getBorderWidth(status) };
  width: ${ getWidth(status) };
  height: ${ getHeight(status) };
  border-radius: ${ getBorderRadius(status) };
  padding: 2px;
`)

function getBorderWidth(status) {
  switch (status) {
    case "modal":
      return "2px"
    default:
      return "0px"
  }
}

function getBorderColor(status) {
  switch (status) {
    case "modal":
      return "#D9D9D9"
    default:
      return "white"
  }
}

function getWidth(status) {
  switch (status) {
    case "modal":
      return "50%"
    default:
      return "60%"
  }
}

function getHeight(status) {
  switch (status) {
    case "modal":
      return "4%"
    default:
      return "5%"
  }
}

function getBorderRadius(status) {
  switch (status) {
    case "modal":
      return "5px"
    default:
      return "0px"
  }
}

export default function Input({status, onChange = () => {}}) {

  return (
    <StyledInput 
      status={status}
      placeholder={
        status === 'modal' ? '검색' : '재료, 음식 검색'
      }
      onChange={onChange}
    />
  );
}