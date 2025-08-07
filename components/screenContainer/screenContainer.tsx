import { ReactNode } from "react";
import { ImageBackground, ScrollView, StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../lib/globalStyles";

export default function ScreenContainer({ children }: { children: ReactNode }) {
  return <ScrollView style={styles.container}>{children}</ScrollView>;
  // return (
  //   <ScrollView>
  //     <ImageBackground
  //       resizeMode="cover"
  //       source={require("../../assets/bg.png")}
  //       style={styles.container}
  //     >
  //       {children}
  //     </ImageBackground>
  //   </ScrollView>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GLOBAL_STYLES.bg,
    paddingHorizontal: 9,
    paddingBottom: 40,
    position: "relative",
  },
});

// Fix Overall
// Fix stats HeADER
// aDD sqlLight
