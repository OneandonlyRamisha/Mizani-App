import { Feather } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../../../lib/globalStyles";

export default function MonthlyPlan() {
  return (
    <View style={styles.monthlyPlanContainer}>
      <Text style={styles.monthlyHeader}>Monthly Plan</Text>
      <Text style={styles.price}>$9.99</Text>
      <Text
        style={[
          styles.priceBenefitText,
          { color: GLOBAL_STYLES.secondaryColor },
        ]}
      >
        /month
      </Text>
      <View style={styles.commitment}>
        <Feather name="shield" size={20} color={GLOBAL_STYLES.secondaryColor} />
        <Text style={styles.commitmentText}>No Commitment</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  commitment: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  commitmentText: {
    color: GLOBAL_STYLES.secondaryColor,
  },
  monthlyPlanContainer: {
    alignItems: "center",
    backgroundColor: GLOBAL_STYLES.card,
    borderWidth: 1,
    borderColor: GLOBAL_STYLES.progressBarBg,
    paddingHorizontal: 30,
    paddingVertical: 45,

    gap: 9,
  },
  priceBenefitText: {
    color: GLOBAL_STYLES.accentColor,
  },
  price: {
    fontWeight: 900,
    fontSize: 36,
    color: GLOBAL_STYLES.primaryColor,
    textAlign: "center",
    letterSpacing: 3,
  },
  monthlyHeader: {
    fontSize: 26,
    color: GLOBAL_STYLES.primaryColor,
    fontFamily: "Cinzel-Semi-Bold",
  },
});
