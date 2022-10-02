import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View, Pressable, Alert, Modal, TouchableWithoutFeedback, ScrollView } from "react-native";
import Button from "../atom/Button";
import DottedLine from "../atom/DottedLine";
import { EvilIcons } from "@expo/vector-icons";
import Input from "../atom/input";

export default function Receipt({ receipt }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.receipt}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ width: 300, height: 200 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 25,
                }}
              >
                <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
                  <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableWithoutFeedback>
                <Text style={styles.title}>재료 추가 하기</Text>
                <View></View>
              </View>
              <Input status="modal" />
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
          {receipt[0].map((re, i) => {
            return (
              <View style={styles.receiptBoxNameIngredient} key={i}>
                <Text style={styles.receiptScrollIngredient}>{re}</Text>
                <EvilIcons name="trash" size={33} color="black" />
              </View>
            );
          })}
        </ScrollView>
      </View>
      <DottedLine />
      <View style={styles.receiptTotal}>
        <Text style={styles.receiptTotalName}>Total: {receipt[0].length}</Text>
        <Button size="small" color="BoldColor" variant="white" onPress={() => setModalVisible(true)}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>재료 추가</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  receipt: {
    width: 350,
    height: 480,
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
