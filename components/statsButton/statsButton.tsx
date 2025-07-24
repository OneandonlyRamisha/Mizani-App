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
      <Pressable>
        <Text
          style={[styles.btn, statType === "Grid" ? styles.active : undefined]}
          onPress={() => setStatType("Grid")}
        >
          Grid
        </Text>
      </Pressable>

      <Pressable>
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
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    borderRadius: 1000,
    alignSelf: "center",
    backgroundColor: GLOBAL_STYLES.secondaryBg,
  },
  btn: {
    fontSize: GLOBAL_STYLES.subHeader,
    color: "#fff",
    paddingVertical: 12,
    borderRadius: 1000,
    paddingHorizontal: 40,
  },
  active: {
    backgroundColor: GLOBAL_STYLES.accentColor75,
  },
});
function useState(arg0: string): [any, any] {
  throw new Error("Function not implemented.");
}
