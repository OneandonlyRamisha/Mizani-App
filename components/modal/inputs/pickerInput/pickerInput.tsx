import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { GLOBAL_STYLES } from "../../../../lib/globalStyles";

export default function PickerInput({
  sliderValue,
  setSliderValue,
  handleChangeText,
}: {
  sliderValue: number;
  setSliderValue: React.Dispatch<React.SetStateAction<number>>;
  handleChangeText: (field: string, value: any) => void;
}) {
  const difficultyLabels = ["Easy", "Medium", "Hard"];

  return (
    <View>
      <Text style={styles.inputTitle}>{`Difficulty (XP: +${
        sliderValue === 0 ? 10 : sliderValue === 1 ? 25 : 50
      })`}</Text>

      <Slider
        minimumValue={0}
        maximumValue={2}
        step={1}
        value={sliderValue}
        onValueChange={(val) => {
          setSliderValue(val);
          handleChangeText("difficulty", difficultyLabels[val]);
        }}
        style={{ width: "100%", marginTop: 12 }}
        minimumTrackTintColor={GLOBAL_STYLES.accentColor}
        maximumTrackTintColor={GLOBAL_STYLES.secondaryColor}
        thumbTintColor={GLOBAL_STYLES.accentColor}
      />

      <Text style={styles.inputTitle}>{difficultyLabels[sliderValue]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  inputTitle: {
    fontSize: GLOBAL_STYLES.subHeader,
    color: GLOBAL_STYLES.secondaryColor,
    fontWeight: 500,
  },
});
