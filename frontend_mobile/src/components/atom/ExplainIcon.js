import { StyleSheet, Text, View } from "react-native";
import styled from 'styled-components/native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


/*
아이콘은 type은 difficulty, amount, time 선택 가능하며 
difficulty에 대한 정도는 degree로 hard, normal, easy 선택 가능하고 기본은 easy입니다.
purpose가 card인지 아닌지에 따라 크기와 배경색이 변합니다.
iconText는 음식의 양과 조리 시간을 나타낼 때 사용되는 매개변수 입니다.
*/

export default function ExplainIcon({ type, iconText, purpose, degree='easy' }) {

  return (
    <StyledContainer purpose={purpose}>
      {
        getIcon(type, purpose, degree)
      }
      <IconText purpose={purpose}>
        {
          getIconText(type, iconText, degree)
        }
      </IconText>
    </StyledContainer>
  );
}

// 아이콘 배경
const StyledContainer = styled(View)(({purpose}) => `
  width: ${ getWidth(purpose) };
  height: 45px;
  border-radius: ${ getBorderRadius(purpose) };
  background-color: ${ getBackgroundColor(purpose) };
  justify-content: center;
  align-items: center;
`)

// 아이콘 텍스트
const IconText = styled(Text)(({purpose}) => `
  color: ${ getColor(purpose) }
`)

function getWidth(purpose) {
  switch (purpose) {
    case "card":
      return "75px"
    default:
      return "35px"
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

function getColor(purpose) {
  switch (purpose) {
    case "card":
      return "white"
    default:
      return "black"
  }
}

function getIcon(type, purpose, degree) {
  switch (type) {
    case "difficulty":
      return (
        <MaterialCommunityIcons 
          name={degree === 'hard' ? 'speedometer' : 
                degree === 'normal' ? 'speedometer-medium' :
                'speedometer-slow'} 
          size={24} 
          color={getColor(purpose)}
        />
      )
    case "amount":
      return (
        <Ionicons 
          name="people-sharp" 
          size={24} 
          color={getColor(purpose)} 
        />
      )
    case "time":
      return (
        <MaterialIcons 
          name="timer" 
          size={24} 
          color={getColor(purpose)} 
        />
      )
  }
}

function getIconText(type, iconText, degree) {
  switch (type) {
    case "difficulty":
      switch (degree) {
        case "hard":
          return '어려움'
        case "normal":
          return '보통'
        case "easy":
          return '쉬움'
      }
    case "amount":
      return `${iconText}인분`
    case "time":
      return `${iconText}분`
  }
}