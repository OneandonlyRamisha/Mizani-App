import { Alert, StyleSheet, Text, View } from "react-native";
import IntroInput from "../../components/introScreenComponents/introInput/introInput";
import NextBtn from "../../components/introScreenComponents/nextBtn/nextBtn";
import ProgressBarIntroPage from "../../components/introScreenComponents/progressBar/progressBar";
import QuestionHeader from "../../components/introScreenComponents/questionHeader/questionHeader";
import { QUESTIONERY } from "../../lib/questionery";
import { useEffect, useState } from "react";
import { Profile } from "../../types/profile";
import { useProfile } from "../../store/profile";
import { MILESTONES_DATA } from "../../lib/milestonesData";

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
    streak: [],
    stats: {
      overall: 0,
      discipline: 0,
      focus: 0,
      wisdom: 0,
      fitness: 0,
      faith: 0,
      finance: 0,
    },
    milestones: MILESTONES_DATA,
  });

  const [selected, setSelected] = useState<boolean>(true);

  useEffect(() => {
    if (form.name.length >= 1 && (question === 0 || active)) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [form.name, active, question]);

  const handlePress = async () => {
    setActive(null);

    if (question < QUESTIONERY.length - 1) {
      setQuestion(question + 1);
    } else {
      const overall = Object.values(form.stats).reduce((a, b) => a + b, 0) / 6;

      setProfile({
        ...form,
        stats: {
          ...form.stats,
          overall: overall,
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

      <NextBtn onPress={handlePress} selected={selected} />
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
