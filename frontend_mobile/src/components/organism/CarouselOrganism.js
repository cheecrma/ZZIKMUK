import React, { useRef } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Animated, useWindowDimensions } from "react-native";
import CarouselCard from "./CarouselCard";

const images = new Array(6).fill("https://images.unsplash.com/photo-1556740749-887f6717d7e4");

export default function CarouselOrganism() {
  const scrollX = useRef(new Animated.Value(0)).current;

  const { width: windowWidth } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollContainer}>
        <ScrollView
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ],
            { useNativeDriver: false },
          )}
          scrollEventThrottle={1}
        >
          {images.map((image, imageIndex) => {
            return (
              <View
                style={{ width: windowWidth, height: 330, alignItems: "center", justifyContent: "center" }}
                key={imageIndex}
              >
                <CarouselCard />
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.indicatorContainer}>
          {images.map((image, imageIndex) => {
            const width = scrollX.interpolate({
              inputRange: [windowWidth * (imageIndex - 1), windowWidth * imageIndex, windowWidth * (imageIndex + 1)],
              outputRange: [8, 16, 8],
              extrapolate: "clamp",
            });
            return <Animated.View key={imageIndex} style={[styles.normalDot, { width }]} />;
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    height: 350,
    alignItems: "center",
    justifyContent: "center",
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "silver",
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
