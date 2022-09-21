import { Image, View } from "react-native";
import styled from 'styled-components/native'

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
      return "50%"
    case "recipe":
      return "85%"
    default:
      return "30%"
  }
}

function getHeight(purpose) {
  switch (purpose) {
    case "card":
      return "15%"
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


export default function imageContainer({ purpose , url}) {

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
