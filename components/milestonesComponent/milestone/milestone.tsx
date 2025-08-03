import { StyleSheet, Text, View } from "react-native";
import { Milestone } from "../../../types/milestones";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { GLOBAL_STYLES } from "../../../lib/globalStyles";

export default function MilestoneItem({ milestone }: { milestone: Milestone }) {
  return (
    <View style={styles.container}>
      <View
        style={[milestone.completed ? styles.iconActive : styles.iconInActive]}
      >
        {milestone.completed ? (
          <MaterialCommunityIcons
            name="crown-outline"
            size={24}
            color={GLOBAL_STYLES.accentColor}
          />
        ) : (
          <AntDesign name="lock1" size={24} color="#2f2f2f" />
        )}
      </View>
      <View>
        <Text
          style={[
            styles.header,
            milestone.completed ? undefined : { color: "#2f2f2f" },
          ]}
        >
          {milestone.title}
        </Text>
        <Text
          style={[
            styles.subHeader,
            milestone.completed ? undefined : { color: "#2f2f2f" },
          ]}
        >
          {milestone.description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconActive: {
    borderWidth: 1,
    borderColor: GLOBAL_STYLES.accentColor,
    borderRadius: "50%",
    padding: 8,
  },
  iconInActive: {
    borderWidth: 1,
    borderColor: "#2f2f2f",
    borderRadius: "50%",
    padding: 8,
  },
  header: {
    color: GLOBAL_STYLES.primaryColor,
    fontFamily: "Cinzel-Regular",
  },
  subHeader: {
    fontSize: 12,
    color: GLOBAL_STYLES.secondaryColor,
  },
});
