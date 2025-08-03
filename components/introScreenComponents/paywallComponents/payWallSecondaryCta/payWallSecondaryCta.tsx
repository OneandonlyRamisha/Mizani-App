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
          backgroundColor: GLOBAL_STYLES.accentColor,
          borderRadius: 7,
          padding: 20,
          textAlign: "center",
          fontWeight: 800,
          textTransform: "uppercase",
          fontSize: 16,
        }}
      >
        Start free trail &#183; 7 Days
      </Text>
    </Pressable>
  );
}
