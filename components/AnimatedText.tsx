import {
  LayoutChangeEvent,
  ScrollView,
  StyleProp,
  StyleSheet,
  TextStyle,
} from "react-native";
import React, { useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type AnimatedTextType = {
  style?: StyleProp<Animated.AnimateStyle<StyleProp<TextStyle>>>;
};

const AnimatedText: React.FC<AnimatedTextType> = ({ style }) => {
  const containerSize = useSharedValue(0);
  const textSize = useSharedValue(0);

  function onContainerLayout(event: LayoutChangeEvent) {
    containerSize.value = event.nativeEvent.layout.width;
  }

  function onTextLayout(event: LayoutChangeEvent) {
    textSize.value = event.nativeEvent.layout.width;
  }

  const rStyle = useAnimatedStyle(() => {
    const scrollTo = -(textSize.value - containerSize.value);

    return {
      transform: [
        {
          translateX: withRepeat(
            withTiming(scrollTo, {
              duration: 5000,
            }),
            -1,
            true
          ),
        },
      ],
    };
  });

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{
        display: "flex",
        backgroundColor: "lightblue",
      }}
      onLayout={onContainerLayout}
    >
      <Animated.Text
        onLayout={onTextLayout}
        style={[rStyle, style]}
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
