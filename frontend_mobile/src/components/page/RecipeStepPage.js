import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ImageBackground,
  ScrollView,
  BackHandler,
} from "react-native";
import { AntDesign, FontAwesome, Entypo, MaterialIcons } from "@expo/vector-icons";
import RecipePagination from "../organism/RecipePagination";
import Button from "../atom/Button";
import TopNav from "../organism/TopNav";
import * as Speech from "expo-speech";
import { fetchRecipeStep } from "../../apis/recipes";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { EncodingType } from "expo-file-system";
import axios from "axios";
import Loading from "../atom/Loading";

export default function RecipeStepPage({ route, navigation }) {
  const [stepInfo, setStepInfo] = useState([]);
  const [isPlayed, setIsPlayed] = useState(false);
  const [recording, setRecording] = useState();
  const [can, setCan] = useState("");

  async function requestRecipeStepSuccess(res) {
    setStepInfo(res.data);
  }

  function requestRecipeStepFail(err) {
    setStepInfo([]);
  }

  useEffect(() => {
    fetchRecipeStep(route.params.id, route.params.step, requestRecipeStepSuccess, requestRecipeStepFail);
  }, []);

  useEffect(() => {
    if (stepInfo.length > 0) {
      playPauseToggle();
    }
  }, [stepInfo]);

  function stopSpeech() {
    if (isPlayed) {
      Speech.stop();
    }
  }

  function changeStep(newStep) {
    if (newStep !== route.params.step) {
      if (recording) {
        setRecording(undefined);
        recording.stopAndUnloadAsync();
      }
      stopSpeech();
      navigation.replace("RecipeStep", { id: route.params.id, step: newStep });
    }
  }

  function finish() {
    stopSpeech();
    navigation.navigate("Complete", { id: stepInfo[0], totalSteps: stepInfo[5] });
  }

  function backAction() {
    stopSpeech();
  }

  // 기기에서 뒤로가기 버튼을 눌렀을 때
  BackHandler.addEventListener("hardwareBackPress", backAction);

  // expo tts
  function playPauseToggle() {
    setIsPlayed(!isPlayed);
    if (!isPlayed) {
      const thingToSay = stepInfo[4].replace(" ", "").length > 7 ? stepInfo[4] : stepInfo[4] + " ".repeat(14);
      Speech.speak(thingToSay);
      setTimeout(() => {
        setIsPlayed(false);
      }, (stepInfo[4].replace(" ", "").length / 5.7) * 1000);
    } else {
      Speech.stop();
    }
  }

  async function startRecordingTest() {
    setRecording(1);

    await wait(3000);

    setRecording(undefined);
  }

  // 음성 녹음 시작
  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      setRecording(recording);

      await wait(4000);

      // 음성녹음 정지
      setRecording(undefined);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      let file = "";
      await FileSystem.readAsStringAsync(uri, { encoding: EncodingType.Base64 }).then(content => {
        file = content;
      });
      let rlt = "";
      await axios
        .post(`https://j7a102.p.ssafy.io/api/languages/stt/`, {
          base_64: file,
        })
        .then(res => {
          rlt = res.data.status_code;
          setCan(rlt);

          if (route.params.step < stepInfo[5] && rlt == 3) {
            navigation.push("RecipeStep", { id: route.params.id, step: route.params.step + 1 });
          } else if (route.params.step > 1 && rlt == 1) {
            navigation.push("RecipeStep", { id: route.params.id, step: route.params.step - 1 });
          } else if (rlt == 2) {
            playPauseToggle();
          } else {
            setCan("없음");
          }
        })
        .catch(err => {
          setCan(err);
        });
    } catch (err) {}
  }

  function wait(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  return stepInfo.length === 0 ? (
    <Loading />
  ) : (
    <View style={styles.container}>
      <TopNav title={stepInfo[1]} page="recipeStep" stopSpeech={stopSpeech} />
      <View style={styles.content}>
        <View style={{ flex: 1 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20 }}>
            <Text style={{ color: "#FF8B34" }}>{route.params.step} </Text>/ {stepInfo[5]}
          </Text>
        </View>
        <View style={{ flex: 1 }} />
        <View style={{ ...styles.imageContainer, flex: 9 }}>
          <ImageBackground
            style={styles.image}
            source={{ uri: stepInfo[3] }}
            imageStyle={{ borderRadius: 10 }}
          ></ImageBackground>
        </View>
        <View style={{ flex: 1 }} />
        <View style={{ ...styles.step, flex: 4 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.stepText}>{stepInfo[4]}</Text>
          </ScrollView>
        </View>
        <View style={{ flex: 1 }} />
        <View style={{ ...styles.soundBtnContainer, flex: 2 }}>
          <TouchableWithoutFeedback onPress={playPauseToggle}>
            <View style={styles.soundBtn}>
              {isPlayed ? (
                <Entypo name="controller-stop" size={34} color="white" />
              ) : (
                <AntDesign name="caretright" size={28} color="white" />
              )}
            </View>
          </TouchableWithoutFeedback>
          {/* <TouchableWithoutFeedback onPress={recording ? null : startRecordingTest}>
            {recording ? (
              <View style={{ ...styles.soundBtn, backgroundColor: "#FFE48E" }}>
                <MaterialIcons name="hearing" size={20} color="black" />
              </View>
            ) : (
              <View style={styles.soundBtn}>
                <FontAwesome name="microphone" size={20} color="white" />
              </View>
            )}
          </TouchableWithoutFeedback> */}
        </View>
        <View style={{ flex: 1 }} />
        {/* <View style={styles.explain}>
          <Text>마이크 버튼을 누르고 말해보세요</Text>
          <Text>다음으로 넘겨줘, 이전으로 이동해줘, 다시 읽어줘</Text>
        </View> */}
        <RecipePagination totalSteps={stepInfo[5]} checkedIndex={route.params.step} check={changeStep} />

        <View style={{ flex: 1 }} />
        <View style={{ ...styles.stepBtn, flex: 2 }}>
          {stepInfo[2] > 1 ? (
            <Button variant="white" color="black" size="smaller" onPress={() => changeStep(stepInfo[2] - 1)}>
              <Text style={styles.btnText}>이전 단계</Text>
            </Button>
          ) : null}
          {stepInfo[2] === stepInfo[5] ? (
            <Button variant="MainColor" color="white" size="smaller" onPress={() => finish()}>
              <Text style={styles.btnText}>요리 끝</Text>
            </Button>
          ) : (
            <Button variant="MainColor" color="white" size="smaller" onPress={() => changeStep(stepInfo[2] + 1)}>
              <Text style={styles.btnText}>다음 단계</Text>
            </Button>
          )}
        </View>
        <View style={{ flex: 1 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff9f9",
  },
  content: {
    flex: 24,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  step: {
    backgroundColor: "#fff9f9",
    width: "90%",
    height: "28%",
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
    width: 55,
    height: 55,
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
    width: "100%",
    height: 300,
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
