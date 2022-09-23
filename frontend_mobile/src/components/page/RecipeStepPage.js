import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback, ImageBackground } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import RecipePagination from "../organism/RecipePagination"
import Button from "../atom/Button"


export default function RecipeStepPage({ food }) {
  const [step, setStep] = useState(0)
  const [isPlayed, setIsPlayed] = useState(true)
  const [isMuted, setIsMuted] = useState(false)

  function changeStep(index) {
    setStep(index)
  }

  function playPauseToggle() {
    setIsPlayed(!isPlayed)
  }

  function muteUnmuteToggle() {
    setIsMuted(!isMuted)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableWithoutFeedback>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableWithoutFeedback>
        <Text style={styles.title}>{food.name}</Text>
        <View></View>
      </View>
      <View style={styles.content}>
      <View style={styles.imageContainer}>
        <ImageBackground 
          style={styles.image}
          source={{uri: food.thumbnail}}
          imageStyle={{borderRadius: 10}}
        >
        </ImageBackground>
      </View>
        <View style={styles.step}>
          <Text style={styles.stepText}>{food.recipe[step]}</Text>
        </View>
        <View style={styles.soundBtnContainer}>
          <TouchableWithoutFeedback onPress={playPauseToggle}>
            <View style={styles.soundBtn}>
              {
                isPlayed ? 
                <AntDesign name="caretright" size={20} color="white" /> :
                <Entypo name="controller-paus" size={20} color="white" />
              }
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={muteUnmuteToggle}>
            <View style={styles.soundBtn}>
              {
                !isMuted ? 
                <Feather name="volume-2" size={20} color="white" /> :
                <Feather name="volume-x" size={20} color="white" />
              }
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.explain}>
          <Text>오케이 구글~ 레시피 넘겨줘</Text>
        </View>
        <RecipePagination totalSteps={food.recipe} checkedIndex={step} check={changeStep} />
        <View style={styles.stepBtn}>
          {
            step > 0 ?
            <Button 
              variant="white" 
              color="black" 
              children="이전 단계"
              size="small"
            /> :
            null
          }
          {
            step === food.recipe.length - 1 ?
            <Button 
              variant="MainColor" 
              color="white" 
              children="요리 끝"
              size="small"
            /> :
            <Button 
              variant="MainColor" 
              color="white" 
              children="다음 단계"
              size="small"
            />
          }
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    margin: 15,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
  },
  content: {
    flex: 24,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  step: {
    backgroundColor: "white",
    width: "90%",
    height: 160,
    borderRadius: 15,
    justifyContent: "center",
    padding: 5,
  },
  stepText: {
    fontSize: 20,
  },
  soundBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "80%",
  },
  soundBtn: {
    backgroundColor: "#FF8B34",
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  explain: {
    backgroundColor: "#FFE48E",
    width: "90%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  stepBtn: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
  imageContainer: {
    width: 300, 
    height: 160, 
    borderRadius: 10, 
    elevation: 10, 
    backgroundColor: 'white', 
    shadowColor: 'black'
  },
  image: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
