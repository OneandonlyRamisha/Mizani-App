import { View, Pressable, StyleSheet, Text } from "react-native";
import { GLOBAL_STYLES } from "../../lib/globalStyles";

export default function StatsButton({
  statType,
  setStatType,
}: {
  statType: string;
  setStatType: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <View style={styles.btnContainer}>
      <Pressable style={{ width: "50%", borderRadius: 7 }}>
        <Text
          style={[styles.btn, statType === "Grid" ? styles.active : undefined]}
          onPress={() => setStatType("Grid")}
        >
          Grid
        </Text>
      </Pressable>

      <Pressable style={{ width: "50%", borderRadius: 7 }}>
        <Text
          style={[styles.btn, statType === "Graph" ? styles.active : undefined]}
          onPress={() => setStatType("Graph")}
        >
          Graph
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    marginVertical: 20,
    borderRadius: 7,
    backgroundColor: GLOBAL_STYLES.secondaryBg,
    padding: 5,
  },
  btn: {
    fontSize: 16,
    color: "#fff",
    paddingVertical: 13,
    borderRadius: 7,
    width: "100%",
    textAlign: "center",
  },
  active: {
    backgroundColor: GLOBAL_STYLES.accentColor50,
  },
});
