import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../lib/globalStyles";

export default function StatusContainer({ loader }: { loader: number }) {
  return (
    <View style={styles.statusContainer}>
      <Text style={styles.statusHeader}>Status</Text>
      <View style={styles.statuses}>
        <View style={styles.status}>
          <Text style={styles.statusText}>Faith</Text>
          {loader > 20 ? (
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={GLOBAL_STYLES.accentColor}
            />
          ) : undefined}
        </View>
        <View style={styles.status}>
          <Text style={styles.statusText}>Focus Level</Text>
          {loader > 45 ? (
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={GLOBAL_STYLES.accentColor}
            />
          ) : undefined}
        </View>
        <View style={styles.status}>
          <Text style={styles.statusText}>Discipline Level</Text>
          {loader > 60 ? (
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={GLOBAL_STYLES.accentColor}
            />
          ) : undefined}
        </View>
        <View style={styles.status}>
          <Text style={styles.statusText}>Fitness Level</Text>
          {loader > 75 ? (
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={GLOBAL_STYLES.accentColor}
            />
          ) : undefined}
        </View>
        <View style={styles.status}>
          <Text style={styles.statusText}>Financial Level</Text>
          {loader > 90 ? (
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={GLOBAL_STYLES.accentColor}
            />
          ) : undefined}
        </View>
        <View style={styles.status}>
          <Text style={styles.statusText}>Wisdom Level</Text>
          {loader > 99 ? (
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={GLOBAL_STYLES.accentColor}
            />
          ) : undefined}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statusContainer: {
    width: "100%",
    padding: 30,
    marginTop: 30,
    backgroundColor: GLOBAL_STYLES.card,
    borderColor: GLOBAL_STYLES.secondaryBg,
    borderWidth: 1,
    gap: 20,
  },
  statusHeader: {
    textAlign: "center",
    fontSize: 22,
    color: GLOBAL_STYLES.primaryColor,
    // fontWeight: 500,
    fontFamily: "Cinzel-Semi-Bold",
  },
  statuses: { gap: 2 },
  status: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 35,
  },
  statusText: {
    color: GLOBAL_STYLES.primaryColor,
    // fontWeight: 500,
    fontFamily: "Cinzel-Regular",
    fontSize: 15,
  },
});
