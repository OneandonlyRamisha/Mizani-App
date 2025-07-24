import { StyleSheet, View, Text } from "react-native";

export default function PayWall() {
  return (
    <View style={styles.container}>
      <Text>Get Your Custom Plan To Reach Your Goals Faster</Text>
      <Text>
        Get full access to Mizani including: personilized plans, customizable
        plan, stat tracking, radar chart for stats, crud for habits, daily
        feedback and many more
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
