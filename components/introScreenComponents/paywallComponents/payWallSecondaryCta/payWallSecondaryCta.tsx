import { Pressable, Text } from "react-native";
import { GLOBAL_STYLES } from "../../../../lib/globalStyles";

export default function PayWallSecondaryCta({
  handlePress,
}: {
  handlePress: () => void;
}) {
  return (
    <Pressable onPress={handlePress}>
      <Text
        style={{
          backgroundColor: GLOBAL_STYLES.card,
          color: GLOBAL_STYLES.accentColor75,
          fontFamily: "Cinzel-Medium",
          borderWidth: 1,
          borderColor: GLOBAL_STYLES.accentColor20,

          padding: 20,
          textAlign: "center",
          textTransform: "uppercase",
          fontSize: 16,
        }}
      >
        Start free trail &#183; 7 Days
      </Text>
    </Pressable>
  );
}
