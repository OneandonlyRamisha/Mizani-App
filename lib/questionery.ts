export const QUESTIONERY = [
  { question: "What is your name?", field: "name" },

  {
    question: "What is your age?",
    field: "age",
    options: ["18-24", "25-34", "25-44", "45-54", "55+"],
  },

  {
    question: "How well do you keep your word to yourself?",
    field: "discipline",
    options: [
      { option: "I follow through with my goals everyday", stat: 80 },
      { option: "I stay consistent most of the time", stat: 60 },
      { option: "I struggle with consistency", stat: 45 },
      { option: "I never do What I say I will do", stat: 35 },
    ],
  },

  {
    question: "How often do you train?",
    field: "fitness",
    options: [
      { option: "5 times a week or more", stat: 79 },
      { option: "2-4 times a week", stat: 63 },
      { option: "once a week", stat: 44 },
      { option: "I never train", stat: 32 },
    ],
  },

  {
    question: "How often do you sharpen your mind?",
    field: "wisdom",
    options: [
      { option: "I read, reflect or learn something new everyday", stat: 82 },
      {
        option:
          "I try to learn something new but i struggle being consistent with it",
        stat: 62,
      },
      {
        option: "I rarely invest my time into thing that sharpen my mind",
        stat: 43,
      },
      { option: "I never do things that make me smarter", stat: 30 },
    ],
  },

  {
    question: "How connected do you feel with God?",
    field: "faith",
    options: [
      { option: "I practice my beliefs daily", stat: 85 },
      {
        option:
          "I believe in God but don't spend as much time as I think I should",
        stat: 55,
      },
      { option: "I rarely do spiritual practices", stat: 39 },
      { option: "I don't believe in God", stat: 18 },
    ],
  },

  {
    question: "How often do you engage in deep, focused work sessions?",
    field: "focus",
    options: [
      { option: "I engage in deep focused work every day", stat: 87 },
      {
        option: "I engage in focused work more than 3 times a week",
        stat: 67,
      },
      { option: "I rarely engage in deep focused work", stat: 49 },
      { option: "I struggle to keep my focus", stat: 36 },
    ],
  },
  {
    question: "How happy are you with your current financial situation?",
    field: "finance",
    options: [
      { option: "I'm very satisfied and feel financially secure", stat: 85 },
      { option: "I'm doing okay but want to improve", stat: 65 },
      { option: "I often feel stressed about money", stat: 45 },
      { option: "I'm not happy with my financial situation at all", stat: 30 },
    ],
  },
];
