import {
  MaterialCommunityIcons,
  SimpleLineIcons,
  Feather,
} from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../../../lib/globalStyles";

export default function YearlyPlan() {
  return (
    <View style={styles.yearlyPlanContainer}>
      <View style={styles.highlight}>
        <MaterialCommunityIcons name="crown-outline" size={24} color="black" />
        <Text>Best Value</Text>
      </View>
      <View style={styles.yearlyHeaderContainer}>
        <SimpleLineIcons
          name="trophy"
          size={24}
          color={GLOBAL_STYLES.accentColor}
        />
        <Text style={styles.yearlyHeader}>Yearly Plan</Text>
      </View>
      <Text style={styles.price}>$39.99</Text>
      <Text style={styles.subPrice}>€3.33/month • Save 33%</Text>
      <View>
        <View style={styles.priceBenefits}>
          <Feather
            name="check-circle"
            size={18}
            color={GLOBAL_STYLES.accentColor}
          />
          <Text style={styles.priceBenefitText}>7-day FREE trial</Text>
        </View>
        <View style={styles.priceBenefits}>
          <Feather
            name="clock"
            size={18}
            color={GLOBAL_STYLES.secondaryColor}
          />
          <Text style={styles.secondaryPriceBenefitText}>
            Cancel anytime during trial
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  yearlyPlanContainer: {
    marginTop: 15,
    backgroundColor: GLOBAL_STYLES.secondaryBg,
    paddingHorizontal: 30,
    paddingVertical: 45,
    borderRadius: 12,
    borderColor: GLOBAL_STYLES.accentColor75,
    borderWidth: 2,
    gap: 9,
  },
  highlight: {
    backgroundColor: GLOBAL_STYLES.accentColor,
    position: "absolute",
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 2,
    alignItems: "center",
    borderRadius: 100000,
    top: -15,
    // left: "50%",
    // transform: [{ translateX: "-50%" }],
    alignSelf: "center",
  },
  yearlyHeaderContainer: {
    flexDirection: "row",
    alignSelf: "center",
    gap: 10,
    alignItems: "center",
  },
  yearlyHeader: {
    fontSize: 26,
    color: GLOBAL_STYLES.primaryColor,
    fontFamily: "Cinzel-Semi-Bold",
  },
  price: {
    fontWeight: 900,
    fontSize: 36,
    color: GLOBAL_STYLES.accentColor,
    textAlign: "center",
    letterSpacing: 3,
  },
  subPrice: {
    color: GLOBAL_STYLES.secondaryColor,
    textAlign: "center",
    fontSize: 16,
  },
  priceBenefits: {
    marginTop: 12,
    flexDirection: "row",
    gap: 10,
  },
  priceBenefitText: {
    color: GLOBAL_STYLES.accentColor,
  },
  secondaryPriceBenefitText: {
    color: GLOBAL_STYLES.secondaryColor,
  },
});
