import { StyleSheet, Text, View, Image, Platform } from "react-native";

export default function imageContainer({ purpose , url}) {

  return (
    <Image 
      source={{uri: url}} 
      style={{
        width: purpose === 'card' ? '50%' :
              purpose === 'recipe' ? '85%' : '30%',
        height: purpose === 'card' ? '15%' :
              purpose === 'recipe' ? '25%' : '30%',
        ...Platform.select({
          android: {elevation: 50},
        }),
        borderRadius: 10,
        marginBottom: 10,
      }}
    />
  );
}

const styles = StyleSheet.create({
  imageContainer: {
  },
});
