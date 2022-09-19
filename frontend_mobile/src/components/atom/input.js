import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function input({status}) {
  const [search, setSearch] = useState('')
  function onChangeText(payload) { setSearch(payload) }

  return (
    <TextInput
      placeholder={status === 'modal' ? ' 검색' : ' 재료, 음식 검색'}
      onChangeText={onChangeText}
      style={{...styles.input, 
              width: status === 'modal' ? '50%' : '60%',
              borderColor: status === 'modal' ? '#D9D9D9' : null,
              borderWidth: status === 'modal' ? 2.5 : null,
              borderRadius: status === 'modal' ? 5 : null,
              height: status === 'modal' ? '3%' : '5%'
            }}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    borderColor: "gray",
  },
});
