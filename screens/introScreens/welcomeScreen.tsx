import { Animated, Text, View, Image, Easing, StyleSheet } from "react-native";
import NextBtn from "../../components/introScreenComponents/nextBtn/nextBtn";
import { useRef, useEffect } from "react";
import PayWallLogo from "../../components/introScreenComponents/paywallComponents/pawWallLogo/payWallLogo";
import { GLOBAL_STYLES } from "../../lib/globalStyles";
export default function WelcomeScreen({
  setActiveScreen,
}: {
  setActiveScreen: React.Dispatch<React.SetStateAction<string>>;
}) {
  function handlePress() {
    setActiveScreen("questionary");
  }
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -9, // move up 5px
          duration: 2700,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0, // back down
          duration: 2700,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <PayWallLogo />
        <Animated.View
          style={[
            styles.imgContainer,
            { transform: [{ translateY: floatAnim }] },
          ]}
        >
          <Image
            source={require("../../assets/welcomeIcon.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </Animated.View>
        <Text style={styles.header}>Welcome To Mizani</Text>
        <View style={{ gap: 10 }}>
          <Text style={styles.subHeader}>Gamified Habits:</Text>
          <Text style={styles.subHeader}>Level Up In Real Life As in Game</Text>
        </View>
      </View>
      <NextBtn onPress={handlePress} selected={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: "space-between", flex: 1 },
  imgContainer: {
    alignSelf: "center",
  },
  contentContainer: {
    gap: 35,
  },
  image: {
    width: 320,
    height: 320,
    // backgroundColor: "red",
    // height: "50%",

    // aspectRatio: 1,

    alignSelf: "center",
  },
  header: {
    fontSize: 26,
    fontFamily: "Cinzel-Medium",
    color: GLOBAL_STYLES.accentColor75,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 18,
    fontFamily: "Cinzel-Medium",
    textAlign: "center",
    color: GLOBAL_STYLES.secondaryColor,
  },
});
