import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GLOBAL_STYLES } from "../../lib/globalStyles";
import { useState } from "react";
import LoadingScreen from "./loadingScreen";
import StatsShowScreen from "./statsShowScreen";
import QuestionaryScreen from "./questionaryScreen";
import PayWall from "./paywall";

export default function IntroScreen({}: {}) {
  const [question, setQuestion] = useState<number>(0);
  const [activeScreen, setActiveScreen] = useState("questionary");

  const screens = [
    {
      name: "questionary",
      component: (
        <QuestionaryScreen
          question={question}
          setQuestion={setQuestion}
          setActiveScreen={setActiveScreen}
          activeScreen={activeScreen}
        />
      ),
    },
    {
      name: "loadingScreen",
      component: <LoadingScreen setActiveScreen={setActiveScreen} />,
    },
    {
      name: "statsScreen",
      component: <StatsShowScreen setActiveScreen={setActiveScreen} />,
    },
    { name: "paywall", component: <PayWall /> },
  ];

  return (
    <SafeAreaView style={styles.screenContainer}>
      {screens.map((item) => item.name === activeScreen && item.component)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: GLOBAL_STYLES.bg,
    alignContent: "center",
    justifyContent: "space-between",
    padding: 20,
  },
});
