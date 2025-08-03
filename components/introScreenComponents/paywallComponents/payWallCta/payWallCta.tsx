import { Pressable, Text } from "react-native";
import { GLOBAL_STYLES } from "../../../../lib/globalStyles";

export default function PayWallCta({
  handlePress,
}: {
  handlePress: () => void;
}) {
  return (
    <Pressable onPress={handlePress}>
      <Text
        style={{
          color: GLOBAL_STYLES.secondaryColor,
          textDecorationLine: "underline",
          textAlign: "center",
        }}
      >
        Continue with Monthly Plan
      </Text>
    </Pressable>
  );
}
