import { Text, StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../../lib/globalStyles";
export default function LoaderSubHeader({ loader }: { loader: number }) {
  return (
    <Text style={styles.subHeader}>
      {loader <= 10
        ? "[Initializing... Gathering your core stats]"
        : loader <= 20
        ? "[Analyzing your faith attributes]"
        : loader <= 45
        ? "[Calibrating your focus levels]"
        : loader <= 60
        ? "[Optimizing your discipline score]"
        : loader <= 75
        ? "[Assessing your physical performance]"
        : loader <= 90
        ? "[Reviewing your financial metrics]"
        : loader < 100
        ? "[Processing your intelligence index]"
        : "Your stats are ready — tap continue"}
    </Text>
  );
}

const styles = StyleSheet.create({
  subHeader: {
    color: GLOBAL_STYLES.secondaryColor,
    fontFamily: "Cinzel-Regular",
  },
});
