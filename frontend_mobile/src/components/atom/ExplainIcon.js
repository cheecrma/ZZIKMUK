import { StyleSheet, Text, View } from "react-native";
import styled from 'styled-components/native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const StyledContainer = styled(View)(({purpose}) => `
  width: ${ getWidth(purpose) };
  height: 7%;
  border-radius: ${ getBorderRadius(purpose) };
  background-color: ${ getBackgroundColor(purpose) };
  justify-content: center;
  align-items: center;
`)

function getWidth(purpose) {
  switch (purpose) {
    case "card":
      return "20%"
    default:
      return "12%"
  }
}

function getBackgroundColor(purpose) {
  switch (purpose) {
    case "card":
      return "#FDB954"
    default:
      return "white"
  }
}

function getBorderRadius(purpose) {
  switch (purpose) {
    case "card":
      return "5px"
    default:
      return "10px"
  }
}

export default function explainIcon({ difficulty, people, time, purpose }) {

  return (
    <StyledContainer purpose={purpose}>
      {
        difficulty ?

        <MaterialCommunityIcons 
          name={difficulty === 'hard' ? 'speedometer' : 
                difficulty === 'normal' ? 'speedometer-medium' :
                'speedometer-slow'} 
          size={24} 
          color={purpose === 'card' ? 'white' : 'black'}
        /> :

        people ?

        <Ionicons 
          name="people-sharp" 
          size={24} 
          color={purpose === 'card' ? 'white' : 'black'} 
        /> :

        <MaterialIcons 
          name="timer" 
          size={24} 
          color={purpose === 'card' ? 'white' : 'black'} 
        />
      }
      <Text style={{color: purpose === 'card' ? 'white' : 'black'}}>
        {
          difficulty === 'hard' ? '어려움' :
          difficulty === 'normal' ? '보통' :
          difficulty === 'easy' ? '쉬움' :
          people ? `${people}명` :
          time ? `${time}분` :
          null
        }
      </Text>
    </StyledContainer>
  );
}
