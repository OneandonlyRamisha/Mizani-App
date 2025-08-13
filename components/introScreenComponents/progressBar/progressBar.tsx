import { LinearGradient } from "expo-linear-gradient";
import { View, ColorValue, StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../../lib/globalStyles";
import { Animated, Easing } from "react-native";
import { useRef, useEffect } from "react";

export default function ProgressBarIntroPage({
  progress,
}: {
  progress: number;
}) {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progress,
      duration: 800,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [progress]);

  return (
    <Animated.View
      style={{
        width: animatedWidth.interpolate({
          inputRange: [0, 100],
          outputRange: ["0%", "100%"],
        }),
        height: 7,
        overflow: "hidden", // keeps gradient inside
      }}
    >
      <LinearGradient
        style={{ flex: 1 }}
        colors={GLOBAL_STYLES.mainGradient as [ColorValue, ColorValue]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
    </Animated.View>
  );
}
