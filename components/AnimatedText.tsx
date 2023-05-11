import { LayoutChangeEvent, ScrollView, TextProps, View } from "react-native";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface AnimatedTextType extends TextProps {
  children: ReactNode;
  duration: number;
  repeatSpacer: number;
}

const AnimatedText: React.FC<AnimatedTextType> = ({
  children,
  duration,
  repeatSpacer,
  style,
  ...props
}) => {
  const [containerSize, setContainerSize] = useState<number | undefined>(
    undefined
  );
  const [textSize, setTextSize] = useState<number | undefined>(undefined);
  const [contentFits, setContentFits] = useState(true);

  const syncTextSize = useSharedValue(0);
  const animatedValue = useSharedValue(0);

  function onContainerLayout(event: LayoutChangeEvent) {
    // if (!!containerSize) return;
    console.log("testt", event.nativeEvent.layout);
    setContainerSize(event.nativeEvent.layout.width);
  }

  function onTextLayout(event: LayoutChangeEvent) {
    // if (!!textSize) return;

    setTextSize(event.nativeEvent.layout.width);
    syncTextSize.value = event.nativeEvent.layout.width;
  }

  const startAnimation = useCallback(() => {
    const scrollTo = -Math.round(syncTextSize.value) - repeatSpacer;
    animatedValue.value = withRepeat(
      withTiming(scrollTo, {
        duration: duration,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      false
    );
  }, [repeatSpacer, syncTextSize.value, contentFits]);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: animatedValue.value }],
    };
  });

  useEffect(() => {
    return function () {
      cancelAnimation(animatedValue);
      setContainerSize(undefined);
      setTextSize(undefined);
      setContentFits(true);
      animatedValue.value = 0;
      syncTextSize.value = 0;
    };
  }, [children]);

  useEffect(() => {
    console.log(textSize, containerSize);
    if (!!textSize && !!containerSize) {
      setContentFits(Math.round(textSize) <= Math.round(containerSize));
    }
  }, [textSize, containerSize]);

  useEffect(() => {
    if (!contentFits && textSize && containerSize) startAnimation();
  }, [contentFits, containerSize, textSize]);

  return (
    <View>
      <View
        key={children as string}
        style={{
          backgroundColor: "yellow",
          flexDirection: "row",
          overflow: "scroll",
          width: containerSize,
        }}
        onLayout={onContainerLayout}
      >
        <Animated.Text
          {...props}
          onLayout={onTextLayout}
          style={[style, rStyle]}
        >
          {children}
        </Animated.Text>
        {!contentFits && (
          <Animated.Text
            {...props}
            style={[style, { paddingLeft: repeatSpacer }, rStyle]}
          >
            {children}
          </Animated.Text>
        )}
      </View>
    </View>
  );
};

export default AnimatedText;
