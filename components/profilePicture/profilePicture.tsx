import { Text, StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../lib/globalStyles";
import { useProfile } from "../../store/profile";

export default function ProfilePicture() {
  const { profile } = useProfile();
  const nameLogo = profile.name.slice(0, 2).toUpperCase();
  return <Text style={styles.pfp}>{nameLogo}</Text>;
}

const styles = StyleSheet.create({
  pfp: {
    backgroundColor: GLOBAL_STYLES.accentColor20,
    color: GLOBAL_STYLES.accentColor,
    fontWeight: "bold",
    fontSize: 30,
    alignSelf: "flex-start",
    padding: 20,
    borderRadius: 90,
  },
});
