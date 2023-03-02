import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AnimatedText from "./components/AnimatedText";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={{ height: 270, width: 200, backgroundColor: "yellow" }}>
        <View style={{ height: 200, width: "100%", backgroundColor: "red" }} />
        <AnimatedText style={{ fontSize: 40 }} />
        <Text>Dasdasdasdasdas</Text>
      </View>
      <StatusBar style="auto" />
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
