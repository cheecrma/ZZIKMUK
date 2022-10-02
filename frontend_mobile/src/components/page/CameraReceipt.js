import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import Button from "../atom/Button";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function CameraReceipt() {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const navigation = useNavigation();
  const [receipt, setReceipt] = React.useState([]);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

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
      quality: 0.1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    // let sharePic = () => {
    //   shareAsync(photo.uri).then(() => {
    //     setPhoto(undefined);
    //   });
    // };

    {
      axios
        .post(
          "https://j7a102.p.ssafy.io/api/receipts/ocr/",
          {
            //보내고자 하는 데이터
            path: photo.base64,
          },
          {
            headers: { "Content-Type": "application/json" },
          },
        )

        .then(function (response) {
          // console.log(response.data);
          setReceipt([response.data]);
        })
        .catch(function (error) {
          // console.log(error.response.headers);
          console.log(error);
          setReceipt([]);
        });
    }

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        {/* <Button title="Share" onPress={sharePic} color="white" variant="BoldColor">
          공유하기
        </Button> */}
        {/* {console.log(photo.base64)} */}

        <View style={styles.containerCheck}>
          {hasMediaLibraryPermission ? (
            <Button
              onPress={() => {
                savePhoto;
                goReceiptPage();
              }}
              color="white"
              variant="BoldColor"
            >
              재료인식
            </Button>
          ) : undefined}
          <Button onPress={() => setPhoto(undefined)} color="white" variant="BoldColor">
            다시찍기
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <Text style={{ color: "white", fontSize: 18, borderColor: "black", margin: 3 }}>
          영수증 전체를 촬영해 주세요.
        </Text>
        <FontAwesome name="circle" size={80} color="white" onPress={takePic} />
      </View>
      <StatusBar style="auto" />
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerCheck: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  preview: {
    // alignSelf: "stretch",
    alignItems: "center",
    // flex: 1,
    width: "90%",
    height: "90%",
  },
});
