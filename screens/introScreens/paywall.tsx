import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useProfile } from "../../store/profile";
import { GLOBAL_STYLES } from "../../lib/globalStyles";
import PayWallLogo from "../../components/introScreenComponents/paywallComponents/pawWallLogo/payWallLogo";
import PayWallHeader from "../../components/introScreenComponents/paywallComponents/pawyWallHeader/payWallHeader";
import PayWallBenefits from "../../components/introScreenComponents/paywallComponents/payWallBenefits/payWallBenefits";
import YearlyPlan from "../../components/introScreenComponents/paywallComponents/yearlyPlan/yearlyPlan";
import MonthlyPlan from "../../components/introScreenComponents/paywallComponents/monthlyPlan/monthlyPlan";
import PayWallCta from "../../components/introScreenComponents/paywallComponents/payWallCta/payWallCta";
import PayWallSecondaryCta from "../../components/introScreenComponents/paywallComponents/payWallSecondaryCta/payWallSecondaryCta";
import { PAYWALL_BENEFITS_DATA } from "../../lib/payWallBenfitsData";

export default function PayWall() {
  const { setProfile } = useProfile();
  function handlePress() {
    setProfile((prev) => ({ ...prev, paid: true }));
  }

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, gap: 20 }}>
        <View style={styles.container}>
          <PayWallLogo />
          <PayWallHeader />
          <View style={styles.benefitsContainer}>
            <Text style={styles.benefitHeader}>WHAT YOU GET</Text>
            {PAYWALL_BENEFITS_DATA.map((benefit) => (
              <PayWallBenefits
                header={benefit.header}
                icon={benefit.icon}
                subHeader={benefit.subHeader}
              />
            ))}
          </View>
          <View style={styles.pricePlanContainer}>
            <Text style={styles.pricePlanHeader}>CHOOSE YOUR PATH</Text>
            <YearlyPlan />
            <MonthlyPlan />
          </View>
        </View>
        <PayWallSecondaryCta handlePress={handlePress} />
        <PayWallCta handlePress={handlePress} />
        <Text
          style={{
            textAlign: "center",
            fontStyle: "italic",
            color: GLOBAL_STYLES.accentColor50,
            marginTop: 10,
          }}
        >
          Discipline is the soul of an army. It makes small numbers formidable."
          - George Washington
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 35,
  },

  benefitsContainer: {
    marginTop: 24,
    gap: 10,
  },
  benefitHeader: {
    fontSize: 24,
    fontFamily: "Cinzel-Medium",
    color: GLOBAL_STYLES.accentColor,
    textAlign: "center",
    marginBottom: 15,
  },

  pricePlanHeader: {
    fontSize: 24,
    fontFamily: "Cinzel-Medium",
    color: GLOBAL_STYLES.primaryColor,
    textAlign: "center",
    marginBottom: 15,
  },
  pricePlanContainer: { gap: 20 },
});
