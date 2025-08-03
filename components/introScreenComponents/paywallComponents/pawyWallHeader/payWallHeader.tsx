import { View, StyleSheet, Text } from "react-native";
import { GLOBAL_STYLES } from "../../../../lib/globalStyles";

export default function PayWallHeader() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>UNLOCK YOUR FULL POTENTIAL</Text>
      <View style={styles.underLine}></View>
      <Text style={styles.subHeader}>
        Join 50,000+ warriors building unbreakable discipline
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    gap: 15,
  },
  header: {
    fontFamily: "Cinzel-Semi-Bold",
    color: GLOBAL_STYLES.primaryColor,
    fontSize: 36,
    textAlign: "center",
  },
  underLine: {
    height: 5,
    width: "35%",
    borderRadius: 10000,
    backgroundColor: GLOBAL_STYLES.accentColor75,
  },
  subHeader: {
    fontSize: 18,
    textAlign: "center",
    color: GLOBAL_STYLES.secondaryColor,
  },
});
