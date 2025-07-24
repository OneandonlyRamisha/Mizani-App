import { Alert, StyleSheet, Text, View } from "react-native";
import IntroInput from "../../components/introScreenComponents/introInput/introInput";
import NextBtn from "../../components/introScreenComponents/nextBtn/nextBtn";
import ProgressBarIntroPage from "../../components/introScreenComponents/progressBar/progressBar";
import QuestionHeader from "../../components/introScreenComponents/questionHeader/questionHeader";
import { QUESTIONERY } from "../../lib/questionery";
import { useState } from "react";
import { Profile } from "../../types/profile";
import { useProfile } from "../../store/profile";

export default function QuestionaryScreen({
  question,
  setQuestion,
  activeScreen,
  setActiveScreen,
}: {
  question: number;
  setQuestion: React.Dispatch<React.SetStateAction<number>>;
  activeScreen: string;
  setActiveScreen: React.Dispatch<React.SetStateAction<string>>;
}) {
  const current = QUESTIONERY[question];
  const [active, setActive] = useState<string | null>(null);
  const { profile, setProfile } = useProfile();

  const [form, setForm] = useState<Profile>({
    name: "",
    level: 1,
    currentXP: 0,
    totalXP: 0,
    paid: false,
    age: "",
    stats: {
      overall: 0,
      discipline: 0,
      focus: 0,
      wisdom: 0,
      health: 0,
      faith: 0,
    },
  });

  const handlePress = () => {
    setActive(null);

    if (form.name.length < 2 || (question > 0 && !active)) {
      Alert.alert(
        "All Field Must Be Filled",
        "You need to feel out all the field so we can give you exact stats"
      );
      return;
    }

    if (question < QUESTIONERY.length - 1) {
      setQuestion(question + 1);
    } else {
      const overall = Object.values(form.stats).reduce((a, b) => a + b, 0) / 5;

      setProfile({
        ...form,
        stats: {
          ...form.stats,
          overall: Math.round(overall),
        },
      });
      setActiveScreen("loadingScreen");
    }
  };

  return (
    <View style={styles.contentContainer}>
      <View style={{ gap: 20 }}>
        <ProgressBarIntroPage
          progress={(question / QUESTIONERY.length) * 100}
        />
        <QuestionHeader question={current.question} />
        <IntroInput
          options={current.options}
          setForm={setForm}
          fieldKey={current.field}
          form={form}
          setActive={setActive}
          active={active}
        />
      </View>

      <NextBtn onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    gap: 20,
    justifyContent: "space-between",
  },
});
