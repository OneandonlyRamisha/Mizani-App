import { ReactNode } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../lib/globalStyles";

export default function ScreenContainer({ children }: { children: ReactNode }) {
  return <ScrollView style={styles.container}>{children}</ScrollView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GLOBAL_STYLES.bg,
    paddingHorizontal: 20,
    paddingBottom: 40,
    position: "relative",
  },
});
