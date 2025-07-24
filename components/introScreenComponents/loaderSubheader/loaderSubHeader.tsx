import { Text, StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../../lib/globalStyles";
export default function LoaderSubHeader({ loader }: { loader: number }) {
  return (
    <Text style={styles.subHeader}>
      {loader <= 20
        ? "[sit back, we are calculating your stats]"
        : loader <= 40
        ? "[elevating your focus attributes]"
        : loader <= 60
        ? "[elevating your discipline level]"
        : loader <= 80
        ? "[elevating your fitness level]"
        : loader < 100
        ? "[elevating your intelligence stats]"
        : "Your Stats are ready, click continue"}
    </Text>
  );
}

const styles = StyleSheet.create({
  subHeader: { color: GLOBAL_STYLES.secondaryColor },
});
