import React from "react";
import { Text } from "react-native";

export default function DottedLine() {
  return (
    <Text ellipsizeMode="clip" numberOfLines={1}>
      - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    </Text>
  );
}
