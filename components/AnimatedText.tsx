import { LayoutChangeEvent, ScrollView, StyleSheet } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";

const AnimatedText = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[{ height: 18, display: "flex", backgroundColor: "lightblue" }]}
    >
      <Animated.Text
        onLayout={(e: LayoutChangeEvent) => {
          console.log(e.nativeEvent);
        }}
        style={{ transform: [{ translateX: -405 }] }}
        numberOfLines={1}
      >
        AnimatedText long text AnimatedText long text AnimatedText long text
        AnimatedText long text
      </Animated.Text>
    </ScrollView>
  );
};

export default AnimatedText;

const styles = StyleSheet.create({
  wrapper: {
    width: 300,
    height: 20,
    overflow: "hidden",
    backgroundColor: "red",
    // transform: [{ translateX: -100 }],
  },
});
