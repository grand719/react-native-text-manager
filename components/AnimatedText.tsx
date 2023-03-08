import { LayoutChangeEvent, StyleProp, TextStyle, View } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type AnimatedTextType = {
  textStyle?: StyleProp<Animated.AnimateStyle<StyleProp<TextStyle>>>;
};

const AnimatedText: React.FC<AnimatedTextType> = ({ textStyle }) => {
  const containerSize = useSharedValue(0);
  const textSize = useSharedValue(0);
  // const translateX = useSharedValue(0);

  function onContainerLayout(event: LayoutChangeEvent) {
    containerSize.value = event.nativeEvent.layout.width;
  }

  function onTextLayout(event: LayoutChangeEvent) {
    textSize.value = event.nativeEvent.layout.width;
  }

  const rStyle = useAnimatedStyle(() => {
    const range = -(textSize.value - containerSize.value);

    return {
      transform: [
        {
          translateX: withRepeat(
            withTiming(range, {
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
    <View
      style={{
        backgroundColor: "green",
        flexDirection: "row",
        overflow: "scroll",
      }}
      onLayout={onContainerLayout}
    >
      <Animated.Text onLayout={onTextLayout} style={[textStyle, rStyle]}>
        &AnimatedText long text AnimatedText long text AnimatedText long text
        AnimatedText long textAnimatedText long textAnimatedText long
        textAnimatedText long text**
      </Animated.Text>
    </View>
  );
};

export default AnimatedText;
