import { Image, View } from "react-native";
import styled from 'styled-components/native'

/* 
purpose에 따라 width, heigth, 그림자 설정이 바뀐다.
purpose는 card, recipe가 있고 card일 때를 제외하고 그림자가 들어간다.
*/

export default function ImageContainer({ purpose , url}) {

  return (
    <StyledImageContainer 
      purpose={purpose}
      style={{
        marginBottom: 30
      }}
    >
      <Image
        source={{uri: url}}
        style={{
            width: '100%',
            height: '100%',
            borderRadius: 5
          }} 
        />
    </StyledImageContainer>
  );
}

// 이미지 컨테이너
const StyledImageContainer = styled(View)(({purpose}) => `
  width: ${ getWidth(purpose) };
  height: ${ getHeight(purpose) };
  border-radius: 10px;
  elevation: ${ getElevation(purpose) };
  shadow-color: ${ getShadowColor(purpose) };
`)

function getWidth(purpose) {
  switch (purpose) {
    case "card":
      return "250px"
    case "recipe":
      return "85%"
    default:
      return "30%"
  }
}

function getHeight(purpose) {
  switch (purpose) {
    case "card":
      return "132px"
    case "recipe":
      return "25%"
    default:
      return "30%"
  }
}

function getElevation(purpose) {
  switch (purpose) {
    case "card":
      return "0px"
    default:
      return "8px"
  }
}

function getShadowColor(purpose) {
  switch (purpose) {
    case "card":
      return "white"
    default:
      return "black"
  }
}
