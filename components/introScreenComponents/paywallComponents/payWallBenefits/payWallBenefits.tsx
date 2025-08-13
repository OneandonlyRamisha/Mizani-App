import { View, Text, StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../../../lib/globalStyles";
import { JSX } from "react";

export default function PayWallBenefits({
  header,
  subHeader,
  icon,
}: {
  header: string;
  subHeader: string;
  icon: JSX.Element;
}) {
  return (
    <View style={styles.benefit}>
      {icon}
      <View>
        <Text style={styles.benefitsheader}>{header}</Text>
        <Text style={styles.benefitsSubheader}>{subHeader}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  benefit: {
    backgroundColor: GLOBAL_STYLES.card,
    padding: 20,

    // borderRadius: 7,
    borderColor: GLOBAL_STYLES.progressBarBg,
    borderWidth: 1,
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },
  benefitsheader: {
    color: GLOBAL_STYLES.primaryColor,
    fontWeight: 600,
    fontSize: 16,
    marginBottom: 7,
  },
  benefitsSubheader: {
    color: GLOBAL_STYLES.secondaryColor,
  },
});
