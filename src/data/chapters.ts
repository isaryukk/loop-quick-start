export type SwipeScenario = {
  id: number;
  situation: string;
  context: string;
  leftChoice: string;
  rightChoice: string;

  leftOutcome: {
    title: string;
    text: string;
    xp: number;
  };

  rightOutcome: {
    title: string;
    text: string;
    xp: number;
  };
};

export type Chapter = {
  id: number;
  title: string;
  date: string;

  learnContent: string[]; // 🔥 EXPANDED LEARN SECTION

  swipeScenarios: SwipeScenario[]; // 🔥 5 PER CHAPTER

  quizPassXP: number;
};

export const chapters: Chapter[] = [
  {
    id: 1,
    title: "Causes of the Revolution",
    date: "1788–1789",

    learnContent: [
      "By 1789 France was on the edge of financial collapse after decades of war spending and royal debt accumulation.",
      "King Louis XVI inherited a broken tax system where the nobility were largely exempt, placing pressure on the poorest citizens.",
      "Two consecutive poor harvests caused bread prices to triple, and bread made up the majority of a working-class diet.",
      "Widespread famine created anger not just at hunger, but at the monarchy’s inability to respond effectively.",
      "Enlightenment thinkers like Rousseau and Voltaire had already begun challenging the idea of absolute monarchy.",
      "The Estates-General had not been called since 1614, showing how politically stagnant France had become.",
    ],

    swipeScenarios: [
      {
        id: 1,
        situation: "Bread riots begin spreading across Paris.",
        context: "Crowds are forming outside bakeries demanding food and justice.",
        leftChoice: "Deploy troops",
        rightChoice: "Lower bread price",

        leftOutcome: {
          title: "Military crackdown",
          text: "Violence escalates as soldiers clash with civilians.",
          xp: 10,
        },
        rightOutcome: {
          title: "Short-term relief",
          text: "Crowds calm temporarily, but treasury weakens.",
          xp: 15,
        },
      },

      {
        id: 2,
        situation: "Nobles refuse to pay taxes.",
        context: "The financial system is collapsing under inequality.",
        leftChoice: "Force taxation",
        rightChoice: "Negotiate exemptions",

        leftOutcome: {
          title: "Elite resistance grows",
          text: "Aristocracy begins political opposition to the crown.",
          xp: 10,
        },
        rightOutcome: {
          title: "System weakens further",
          text: "State income falls even more rapidly.",
          xp: 5,
        },
      },

      {
        id: 3,
        situation: "Paris is politically unstable.",
        context: "Pamphlets and revolutionary ideas spread quickly.",
        leftChoice: "Censor press",
        rightChoice: "Allow free speech",

        leftOutcome: {
          title: "Public anger rises",
          text: "Censorship fuels distrust of the monarchy.",
          xp: 10,
        },
        rightOutcome: {
          title: "Revolution spreads faster",
          text: "Ideas of democracy spread across France.",
          xp: 20,
        },
      },

      {
        id: 4,
        situation: "Royal treasury is nearly empty.",
        context: "France cannot borrow more money.",
        leftChoice: "Borrow from banks",
        rightChoice: "Cut royal spending",

        leftOutcome: {
          title: "Debt crisis deepens",
          text: "Foreign lenders lose confidence.",
          xp: 5,
        },
        rightOutcome: {
          title: "Royal resistance",
          text: "Court refuses to reduce luxury spending.",
          xp: 10,
        },
      },

      {
        id: 5,
        situation: "Estates-General must be called.",
        context: "Pressure from all social classes forces political action.",
        leftChoice: "Give equal votes",
        rightChoice: "Maintain noble privilege",

        leftOutcome: {
          title: "Revolutionary breakthrough",
          text: "Third Estate gains power.",
          xp: 25,
        },
        rightOutcome: {
          title: "Political breakdown",
          text: "Third Estate walks out.",
          xp: 10,
        },
      },
    ],

    quizPassXP: 50,
  },
];
