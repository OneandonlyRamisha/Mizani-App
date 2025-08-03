import { View, Text, Image, StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../../../lib/globalStyles";

export default function PayWallLogo() {
  return (
    <View style={styles.logoContainer}>
      <Image
        source={require("../../../../assets/Mizani.png")}
        style={{ width: 35, height: 35 }}
      />
      <Text style={styles.logoText}>MIZANI</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
  },
  logoText: {
    color: GLOBAL_STYLES.primaryColor,
    letterSpacing: 7,
    fontSize: 24,
    fontFamily: "Cinzel-Medium",
  },
});
