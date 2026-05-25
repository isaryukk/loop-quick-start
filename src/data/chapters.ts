export type SwipeOutcome = {
  title: string;
  text: string;
  historical: string;
  reactions: { label: string; color: "red" | "green" | "neutral" }[];
};

export type SwipeScenario = {
  date: string;
  situation: string;
  context: string;
  leftChoice: string;
  rightChoice: string;
  leftOutcome: SwipeOutcome;
  rightOutcome: SwipeOutcome;
};

export type QuizQuestion = {
  text: string;
  options: string[];
  correct: number;
  explanation: string;
};

export type OrderingEvent = {
  id: number;
  text: string;
  correctOrder: number;
};

export type Chapter = {
  id: number;
  title: string;
  date: string;
  description: string;
  keyFigure: string;

  isUnlocked: boolean;
  isCompleted: boolean;

  xpReward: number;

  swipeScenario: SwipeScenario;
  questions: QuizQuestion[];
  orderingEvents: OrderingEvent[];
};

export const chapters: Chapter[] = [
  {
    id: 1,
    title: "Causes of the Revolution",
    date: "1788–1789",
    keyFigure: "King Louis XVI",
    description:
      "France was collapsing under financial pressure, famine, and political failure. The monarchy had lost trust, and society was reaching breaking point.",
    isUnlocked: true,
    isCompleted: false,
    xpReward: 50,

    swipeScenario: {
      date: "1789",
      situation: "Bread prices are exploding across Paris.",
      context:
        "Two failed harvests, rising debt from war, and public anger are pushing France toward collapse.",
      leftChoice: "Raise Taxes",
      rightChoice: "Subsidise Grain",

      leftOutcome: {
        title: "Tax Burden Increases",
        text: "Riots erupt across Paris as the poor refuse to pay.",
        historical:
          "This mirrors the real escalation that led to the Storming of the Bastille and collapse of royal authority.",
        reactions: [
          { label: "Peasants: furious", color: "red" },
          { label: "Nobles: satisfied", color: "green" },
        ],
      },

      rightOutcome: {
        title: "Temporary Relief",
        text: "Bread prices stabilise briefly, calming unrest.",
        historical:
          "Subsidies delay unrest but cannot fix the underlying financial collapse of the French state.",
        reactions: [
          { label: "Peasants: relieved", color: "green" },
          { label: "State: bankrupt", color: "red" },
        ],
      },
    },

    questions: [
      {
        text: "What was the main cause of France’s financial crisis?",
        options: ["War debt", "Industrial growth", "Trade surplus", "Colonisation profits"],
        correct: 0,
        explanation: "France was heavily in debt after funding wars, including the American Revolution.",
      },
      {
        text: "What worsened food shortages?",
        options: ["Two failed harvests", "Overproduction", "Imports", "Industrialisation"],
        correct: 0,
        explanation: "Poor harvests caused bread prices to rise dramatically.",
      },
    ],

    orderingEvents: [
      { id: 1, text: "Estates-General is called", correctOrder: 0 },
      { id: 2, text: "National Assembly forms", correctOrder: 1 },
      { id: 3, text: "Storming of Bastille", correctOrder: 2 },
    ],
  },
];
