import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  ToastAndroid,
} from "react-native";
import Button from "../atom/Button";
import DottedLine from "../atom/DottedLine";
import { EvilIcons } from "@expo/vector-icons";
import Input from "../atom/input";
import axios from "axios";
import TopNav from "./TopNav";
import { useEffect } from "react";

export default function Receipt({ receipt, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  function gravityToast() {
    ToastAndroid.showWithGravity("재료가 추가되었습니다.", ToastAndroid.SHORT, ToastAndroid.CENTER);
  }

  const ingAlert = () =>
    Alert.alert("인식된 재료가 없습니다.", "재료 추가 혹은 다시 촬영해 주세요.", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  useEffect(() => {
    if (receipt[0].length === 0) {
      ingAlert();
    }
  }, [receipt]);

  const newIngredient = receipt[0];
  const [key, setKey] = React.useState(0);
  const reload = React.useCallback(() => setKey(prevKey => prevKey + 1), []);

  const [ing, setIng] = useState("");

  function goReceiptRecommendPage() {
    navigation.navigate("Recommend", { newIngredient });
  }

  function ingList(data) {
    axios
      .post("https://j7a102.p.ssafy.io/api/recipes/search/ingr/", {
        text: data,
      })
      .then(function (res) {
        // console.log(res);
        console.log(res.data);
        setIng(res.data);
      })
      .catch(function (err) {
        console.log(err.data);
      });
  }

  function onDelete(i) {
    newIngredient.splice(i, 1);

    // console.log("<<<<<<<<삭제된 newIngredient");
    // console.log(newIngredient);
  }

  // console.log("<<<<<<<<기존&바뀐최종 newIngredient");
  console.log(newIngredient);

  function onAdd(element) {
    newIngredient.push(element);
    // console.log("<<<<<<<<추가된 newIngredient");
    // console.log(newIngredient);
    Keyboard.dismiss(); // 키보드 닫기
  }

  return (
    <View style={styles.receipt}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ width: 300, height: 300 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 25,
                }}
              >
                <View style={{ flex: 1 }}>
                  <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                  </TouchableWithoutFeedback>
                </View>
                <Text style={styles.title}>재료 추가 하기</Text>
                <View style={{ flex: 1 }}></View>
              </View>
              <Input status="modal" onChangeText={ingList} />
              <ScrollView>
                {Array.isArray(ing) ? (
                  ing?.map((ing, a) => {
                    return (
                      <View key={a}>
                        <Pressable
                          onPress={() => {
                            onAdd(ing?.[1]);
                            reload();
                            gravityToast();
                          }}
                        >
                          <Text style={{ fontSize: 18, marginTop: 5, marginBottom: 5 }}>{ing?.[1]}</Text>
                        </Pressable>
                      </View>
                    );
                  })
                ) : (
                  <Text>{ing}</Text>
                )}
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
      <Text style={styles.receiptName}>재료확인</Text>
      <DottedLine />
      <View style={styles.receiptBox}>
        <Text style={styles.receiptBoxName}>재료명</Text>
        <Text style={styles.receiptBoxNameDelete}>삭제</Text>
      </View>
      <DottedLine />
      <View style={styles.receiptIngredient}>
        <ScrollView style={styles.receiptScrollIngredient}>
          {newIngredient?.map((re, i) => {
            return (
              <View style={styles.receiptBoxNameIngredient} key={i}>
                <Text style={styles.receiptScrollIngredient}>{re}</Text>
                <Pressable
                  onPress={() => {
                    onDelete(i);
                    console.log(i);
                    reload();
                  }}
                >
                  <Text>
                    <EvilIcons name="trash" size={33} color="black" />
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <DottedLine />
      <View style={styles.receiptTotal}>
        <Text style={styles.receiptTotalName}>Total: {newIngredient?.length}</Text>
        <Button
          size="small"
          color="BoldColor"
          variant="white"
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>재료 추가</Text>
        </Button>
      </View>
      <DottedLine />
      {/* 영수증 하단 레시피 이동 부분 */}
      <Text style={{ flex: 2 }}>원하는 재료를 추가해서 다양한 레시피를 제공 받아 보세요.</Text>
      <View style={{ flex: 3 }}>
        <Button
          color="white"
          variant="BoldColor"
          size="mediumer"
          onPress={() => {
            if (newIngredient.length > 0) {
              goReceiptRecommendPage();
            } else {
              ingAlert();
            }
          }}
        >
          추천 레시피 확인하러 가기
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  receipt: {
    width: 350,
    height: 620,
    alignItems: "center",
    justifyContent: "space-evenly",
    elevation: 4,
    shadowColor: "black",
    backgroundColor: "#FFE48E",
    padding: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    flex: 2,
  },
  receiptName: {
    flex: 1,
    fontSize: 22,
    fontWeight: "bold",
    alignItems: "center",
  },
  receiptBox: {
    flex: 1,
    flexDirection: "row",
    paddingRight: 15,
    paddingLeft: 15,
    alignItems: "center",
  },
  receiptBoxName: {
    fontSize: 18,
    flex: 1,
    justifyContent: "space-between",
  },
  receiptBoxNameIngredient: {
    width: 300,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  receiptBoxNameDelete: {
    fontSize: 18,
  },
  receiptScrollIngredient: {
    fontSize: 18,
  },
  receiptIngredient: {
    fontSize: 18,
    flex: 10,
    justifyContent: "space-between",
    paddingRight: 15,
    paddingLeft: 15,
  },
  receiptTotal: {
    flex: 2,
    flexDirection: "row",
    paddingRight: 5,
    paddingLeft: 15,
    alignItems: "center",
  },
  receiptTotalName: {
    fontSize: 18,
    flex: 1,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  centeredView: { backgroundColor: "rgba(0,0,0,0.5)", flex: 1 },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
