import { LinearGradient } from "expo-linear-gradient";
import { Text, View, StyleSheet, ColorValue, Pressable } from "react-native";
import { GLOBAL_STYLES } from "../../lib/globalStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useEffect } from "react";
import { startTimer } from "../../lib/startTimer";
import NextBtn from "../../components/introScreenComponents/nextBtn/nextBtn";
import ProgressBarIntroPage from "../../components/introScreenComponents/progressBar/progressBar";
import LoaderSubHeader from "../../components/introScreenComponents/loaderSubheader/loaderSubHeader";
import StatusContainer from "../../components/statusContainer/statusContainer";

export default function LoadingScreen({
  setActiveScreen,
}: {
  setActiveScreen: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [loader, setLoader] = useState(0);

  function handlePress() {
    if (loader < 100) {
      return;
    }
    setActiveScreen("statsScreen");
  }

  useEffect(() => {
    startTimer(setLoader);
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ width: "100%", alignItems: "center", gap: 20 }}>
        <Text style={styles.percentageCounter}>{loader}%</Text>
        <Text style={styles.header}>We're calculating your stats</Text>

        <ProgressBarIntroPage progress={loader} />
        <LoaderSubHeader loader={loader} />
        <StatusContainer loader={loader} />
      </View>

      <NextBtn
        onPress={handlePress}
        customStyles={[styles.btn, loader !== 100 ? undefined : styles.active]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,

    paddingBottom: 20,
    justifyContent: "space-between",
  },
  percentageCounter: {
    fontSize: 55,
    letterSpacing: 3,
    fontWeight: 700,
    color: GLOBAL_STYLES.primaryColor,
  },
  header: {
    color: GLOBAL_STYLES.primaryColor,
    fontSize: 24,
    textAlign: "center",
    fontWeight: 600,
  },

  btn: {
    flexDirection: "row",
    gap: 10,
    borderRadius: 10000,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GLOBAL_STYLES.accentColor20,
    // width: "100%",
    textAlign: "center",
    padding: 12,
    fontSize: 16,
    fontWeight: 600,
    color: GLOBAL_STYLES.primaryColor,
  },
  active: {
    backgroundColor: GLOBAL_STYLES.accentColor75,
  },
});
