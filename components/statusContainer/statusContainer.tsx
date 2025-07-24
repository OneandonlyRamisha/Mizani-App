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
          {loader > 40 ? (
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
          {loader > 80 ? (
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={GLOBAL_STYLES.accentColor}
            />
          ) : undefined}
        </View>
        <View style={styles.status}>
          <Text style={styles.statusText}>Wisdom Level</Text>
          {loader > 98 ? (
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
    borderRadius: 12,
    gap: 20,
  },
  statusHeader: {
    textAlign: "center",
    fontSize: 20,
    color: GLOBAL_STYLES.primaryColor,
    fontWeight: 500,
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
    fontWeight: 500,
    fontSize: 15,
  },
});
