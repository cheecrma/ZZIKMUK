import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, Image, ImageBackground } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import Button from "../atom/Button";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Loading from "../atom/Loading";
import { fetchOcrReceipts } from "../../apis/receipts";

export default function CameraReceipt() {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const navigation = useNavigation();
  const [receipt, setReceipt] = React.useState([]);

  function requestOcrSuccess(response) {
    setReceipt([response.data]);
  }
  function requestOcrFail(error) {
    setReceipt([[]]);
  }

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (photo) {
      fetchOcrReceipts(photo.base64, requestOcrSuccess, requestOcrFail);
    }
  }, [photo]);

  function goReceiptPage() {
    navigation.navigate("Receipt", { receipt });
  }

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>;
  }

  let takePic = async () => {
    let options = {
      quality: 0.3,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  let today = new Date();
  let time = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    date: today.getDate(),
  };

  if (photo) {
    // let sharePic = () => {
    //   shareAsync(photo.uri).then(() => {
    //     setPhoto(undefined);
    //   });
    // };

    // let savePhoto = () => {
    //   MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
    //     setPhoto(undefined);
    //   });
    // };

    return receipt.length === 0 ? (
      <Loading />
    ) : (
      <SafeAreaView style={styles.container}>
        <View style={styles.logoBoxText}>
          <Text style={styles.logoText} onPress={() => navigation.navigate("Main")}>
            ZZIKMUK
          </Text>
        </View>
        <View style={{ flex: 0.8 }}></View>
        <View style={styles.previewBox}>
          <ImageBackground style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }}>
            <View style={{ flex: 7 }}></View>
            <View style={{ flex: 1, alignSelf: "flex-end", marginRight: 10 }}>
              <Image
                source={require("../../../static/LogoBlack.png")}
                resizeMode="contain"
                style={{
                  width: 50,
                  height: 50,
                }}
              />
            </View>
          </ImageBackground>
        </View>

        <View style={styles.containerCheck}>
          <View style={{ flex: 1 }}>
            <Button onPress={() => setPhoto(undefined)} color="BoldColor" variant="white" size="mediumer">
              다시찍기
            </Button>
          </View>
          {hasMediaLibraryPermission ? (
            <View style={{ flex: 1 }}>
              <Button
                disabled={receipt.length === 0 ? true : false}
                onPress={() => {
                  goReceiptPage();
                }}
                color="white"
                variant="BoldColor"
                size="mediumer"
              >
                재료인식
              </Button>
            </View>
          ) : undefined}
        </View>
        <View style={{ flex: 1 }}></View>
      </SafeAreaView>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={styles.container} ref={cameraRef}>
        <View style={{ flex: 2 }}></View>
        <View style={{ flex: 18 }}>
          <Text style={{ color: "white" }}>
            Zzikmuk_Filter_{time.year}/{time.month > 9 ? time.month : "0" + String(time.month)}/
            {time.date > 9 ? time.date : "0" + String(time.date)}
          </Text>
          <View style={{ borderColor: "white", width: 330, height: 500, borderWidth: 2 }}></View>
        </View>

        <View style={{ flex: 1 }}></View>
        <StatusBar style="auto" />
      </Camera>
      <View style={{ flex: 4 }}>
        <View style={{ ...styles.buttonContainer, backgroundColor: "black" }}>
          <View style={{ flex: 1 }}></View>
          <Text style={{ color: "white", fontSize: 18, borderColor: "black", margin: 3 }}>영수증을 촬영해 주세요.</Text>
          <FontAwesome name="circle" size={80} color="#fff" onPress={takePic} />
          <View style={{ flex: 1 }}></View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff9f9",
  },
  containerCheck: {
    alignItems: "center",
    justifyContent: "center",
    flex: 2,
  },
  buttonContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  preview: {
    alignItems: "center",
    width: 330,
    height: 430,
  },
  previewBox: {
    flex: 7,
  },
  logoBoxText: {
    backgroundColor: "#FFFFFF",
    alignSelf: "stretch",
    height: 60,
    justifyContent: "center",
    elevation: 5,
  },
  logoText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FDB954",
    textAlign: "center",
  },
});
