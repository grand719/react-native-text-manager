import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import AnimatedText from "./components/AnimatedText";
import { useState } from "react";

let s = "Animated test not fit and text is to long";

export default function App() {
  const [text, setText] = useState(s);
  return (
    <View style={styles.container}>
      <View style={{ width: "50%" }}>
        <AnimatedText
          duration={s.length * 250}
          style={{ fontSize: 40 }}
          repeatSpacer={30}
        >
          {text}
        </AnimatedText>
      </View>
      <View style={{ width: "80%", height: 10, backgroundColor: "red" }} />
      <Text>TEST</Text>
      <Text>TEST</Text>
      <Text>TEST</Text>
      <Text>TEST</Text>
      <Text>TEST</Text>
      <Button
        title="change text"
        onPress={() => {
          setText("Test");
        }}
      />
      <Button
        title="change text2"
        onPress={() => {
          setText(s);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
