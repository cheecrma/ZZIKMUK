import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback, ImageBackground, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import RecipePagination from "../organism/RecipePagination";
import Button from "../atom/Button";
import TopNav from "../organism/TopNav";
import * as Speech from "expo-speech";
import { fetchRecipeStep } from "../../apis/recipes";

export default function RecipeStepPage({ route, navigation }) {
  const [stepInfo, setStepInfo] = useState([]);
  const [isPlayed, setIsPlayed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  function requestRecipeStepSuccess(res) {
    console.log(res.data);
    setStepInfo(res.data);
  }

  function requestRecipeStepFail(err) {
    console.log(err);
    setStepInfo([]);
  }

  useEffect(() => {
    fetchRecipeStep(route.params.id, route.params.step, requestRecipeStepSuccess, requestRecipeStepFail);
  }, []);

  function changeStep(newStep) {
    navigation.push("RecipeStep", { id: route.params.id, step: newStep });
  }

  function finish() {
    navigation.push("Complete", { id: stepInfo[0], totalSteps: stepInfo[5] });
  }

  // expo tts
  function playPauseToggle() {
    if (!isPlayed) {
      const thingToSay = stepInfo[4];
      Speech.speak(thingToSay);
    } else {
      Speech.stop();
    }
    setIsPlayed(!isPlayed);
  }

  function muteUnmuteToggle() {
    setIsMuted(!isMuted);
  }

  return (
    <View style={styles.container}>
      <TopNav title={stepInfo[1]} />
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <ImageBackground
            style={styles.image}
            source={{ uri: stepInfo[3] }}
            imageStyle={{ borderRadius: 10 }}
          ></ImageBackground>
        </View>
        <View style={styles.step}>
          <Text style={styles.stepText}>{stepInfo[4]}</Text>
        </View>
        <View style={styles.soundBtnContainer}>
          <TouchableWithoutFeedback onPress={playPauseToggle}>
            <View style={styles.soundBtn}>
              {isPlayed ? (
                <Entypo name="controller-stop" size={24} color="white" />
              ) : (
                <AntDesign name="caretright" size={20} color="white" />
              )}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={muteUnmuteToggle}>
            <View style={styles.soundBtn}>
              {!isMuted ? (
                <Feather name="volume-2" size={20} color="white" />
              ) : (
                <Feather name="volume-x" size={20} color="white" />
              )}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={styles.soundBtn}>
              <FontAwesome name="microphone" size={20} color="white" />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.explain}>
          <Text>오케이 구글~ 레시피 넘겨줘</Text>
        </View>
        <RecipePagination totalSteps={stepInfo[5]} checkedIndex={route.params.step} check={changeStep} />
        <View style={styles.stepBtn}>
          {stepInfo[2] > 1 ? (
            <Button variant="white" color="black" size="small" onPress={() => changeStep(stepInfo[2] - 1)}>
              <Text style={styles.btnText}>이전 단계</Text>
            </Button>
          ) : null}
          {stepInfo[2] === stepInfo[5] ? (
            <Button variant="MainColor" color="white" size="small" onPress={() => finish()}>
              <Text style={styles.btnText}>요리 끝</Text>
            </Button>
          ) : (
            <Button variant="MainColor" color="white" size="small" onPress={() => changeStep(stepInfo[2] + 1)}>
              <Text style={styles.btnText}>다음 단계</Text>
            </Button>
          )}
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
  content: {
    flex: 24,
    alignItems: "center",
    justifyContent: "space-evenly",
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
    backgroundColor: "white",
    shadowColor: "black",
  },
  image: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  btnText: {
    fontSize: 20,
  },
});
