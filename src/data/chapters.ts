export type Chapter = {
  id: number;
  title: string;
  date: string;
  keyFigure: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  xpReward: number;

  description: string;

  learn: {
    core: string[];
    key: string[];
    analysis: string[];
    stretch: string[];
  };

  questions: {
    text: string;
    options: string[];
    correct: number;
    explanation: string;
  }[];

  orderingEvents: {
    id: number;
    text: string;
    correctIndex: number;
  }[];

  swipeScenario: {
    date: string;
    situation: string;
    context: string;
    leftChoice: string;
    rightChoice: string;

    leftOutcome: {
      title: string;
      text: string;
      historical: string;
      reactions: { label: string; color: "red" | "green" | "gray" }[];
    };

    rightOutcome: {
      title: string;
      text: string;
      historical: string;
      reactions: { label: string; color: "red" | "green" | "gray" }[];
    };
  };
};

export const chapters: Chapter[] = [

  /* ───────────────────────── CHAPTER 1 ───────────────────────── */
  {
    id: 1,
    title: "Financial Collapse of France",
    date: "1788–1789",
    keyFigure: "Louis XVI",
    isUnlocked: true,
    isCompleted: false,
    xpReward: 120,
    description: "Structural economic collapse driven by debt and inequality.",

    learn: {
      core: [
        "France was in severe financial crisis by 1788 due to long-term war debt.",
        "The taxation system was deeply unequal across social estates."
      ],
      key: [
        "The Third Estate represented over 95% of the population but paid most taxes.",
        "Bread prices increased sharply after harvest failures."
      ],
      analysis: [
        "Economic inequality created systemic instability across French society.",
        "Food shortages triggered widespread unrest and riots."
      ],
      stretch: [
        "Failure of reform under absolutism intensified structural crisis.",
        "Enlightenment ideas undermined legitimacy of monarchy."
      ]
    },

    questions: [
      {
        text: "What was the main cause of France’s financial crisis?",
        options: ["Industrial growth", "War debt and taxation inequality", "Foreign invasion", "Trade boom"],
        correct: 1,
        explanation: "Debt from wars + unfair taxation caused collapse."
      }
    ],

    orderingEvents: [
      { id: 1, text: "War debt builds", correctIndex: 0 },
      { id: 2, text: "Harvest failure", correctIndex: 1 },
      { id: 3, text: "Bread prices rise", correctIndex: 2 },
      { id: 4, text: "Riots begin", correctIndex: 3 },
      { id: 5, text: "Political crisis", correctIndex: 4 }
    ],

    swipeScenario: {
      date: "1789",
      situation: "Paris is starving.",
      context: "King must respond.",
      leftChoice: "Raise Taxes",
      rightChoice: "Subsidise Grain",

      leftOutcome: {
        title: "Revolt increases",
        text: "Unrest spreads.",
        historical: "Tax pressure accelerated revolution.",
        reactions: [{ label: "Anger", color: "red" }]
      },

      rightOutcome: {
        title: "Temporary relief",
        text: "Food stabilises briefly.",
        historical: "Debt crisis remains unsolved.",
        reactions: [{ label: "Calm", color: "green" }]
      }
    }
  },

  /* ───────────────────────── CHAPTER 2 ───────────────────────── */
  {
    id: 2,
    title: "Estates-General Crisis",
    date: "May 1789",
    keyFigure: "Louis XVI",
    isUnlocked: false,
    isCompleted: false,
    xpReward: 140,
    description: "Political breakdown between estates over representation.",

    learn: {
      core: [
        "Estates-General was called in 1789 after 150+ years.",
        "France was divided into three estates."
      ],
      key: [
        "Voting was by estate, not population.",
        "Third Estate demanded fair representation."
      ],
      analysis: [
        "System gave minority groups disproportionate power.",
        "Deadlock exposed structural inequality."
      ],
      stretch: [
        "Ancien Régime legitimacy began collapsing."
      ]
    },

    questions: [
      {
        text: "Main dispute in Estates-General?",
        options: ["Taxation", "Voting system", "Trade", "War"],
        correct: 1,
        explanation: "Voting structure caused conflict."
      }
    ],

    orderingEvents: [
      { id: 1, text: "Summoned", correctIndex: 0 },
      { id: 2, text: "Voting dispute", correctIndex: 1 },
      { id: 3, text: "Deadlock", correctIndex: 2 },
      { id: 4, text: "Breakaway", correctIndex: 3 },
      { id: 5, text: "Crisis deepens", correctIndex: 4 }
    ],

    swipeScenario: {
      date: "1789",
      situation: "Voting system debate.",
      context: "Estates disagree.",
      leftChoice: "Vote by Estate",
      rightChoice: "Vote by Population",

      leftOutcome: {
        title: "Elite control",
        text: "Privilege preserved.",
        historical: "Maintained inequality.",
        reactions: [{ label: "Status quo", color: "red" }]
      },

      rightOutcome: {
        title: "Representation shift",
        text: "Power redistribution begins.",
        historical: "Leads to National Assembly.",
        reactions: [{ label: "Change", color: "green" }]
      }
    }
  },

  /* ───────────────────────── CHAPTER 3 ───────────────────────── */
  {
    id: 3,
    title: "Storming of the Bastille",
    date: "July 1789",
    keyFigure: "Parisian Revolutionaries",
    isUnlocked: false,
    isCompleted: false,
    xpReward: 160,
    description: "Symbolic fall of royal authority in Paris.",

    learn: {
      core: [
        "Bastille stormed on 14 July 1789.",
        "It symbolised royal authority."
      ],
      key: [
        "Crowds feared military repression.",
        "Weapons and gunpowder stored inside."
      ],
      analysis: [
        "Revolution shifted from political to violent phase.",
        "Royal control in Paris collapsed."
      ],
      stretch: [
        "Event triggered nationwide uprisings."
      ]
    },

    questions: [
      {
        text: "Why was the Bastille important?",
        options: ["Prison", "Symbol of monarchy", "Trade hub", "Church site"],
        correct: 1,
        explanation: "It represented royal power."
      }
    ],

    orderingEvents: [
      { id: 1, text: "Crowd gathers", correctIndex: 0 },
      { id: 2, text: "Weapons seized", correctIndex: 1 },
      { id: 3, text: "Attack begins", correctIndex: 2 },
      { id: 4, text: "Fall of Bastille", correctIndex: 3 },
      { id: 5, text: "Revolution spreads", correctIndex: 4 }
    ],

    swipeScenario: {
      date: "1789",
      situation: "Crowd demands weapons.",
      context: "Paris unstable.",
      leftChoice: "Defend Bastille",
      rightChoice: "Surrender",

      leftOutcome: {
        title: "Violence escalates",
        text: "Bloodshed increases.",
        historical: "Resistance strengthened revolution.",
        reactions: [{ label: "Conflict", color: "red" }]
      },

      rightOutcome: {
        title: "Temporary calm",
        text: "Conflict pauses.",
        historical: "But revolution continues.",
        reactions: [{ label: "Pause", color: "green" }]
      }
    }
  },

  /* ───────────────────────── CHAPTER 4 ───────────────────────── */
  {
    id: 4,
    title: "National Assembly",
    date: "1789",
    keyFigure: "Third Estate Leaders",
    isUnlocked: false,
    isCompleted: false,
    xpReward: 180,
    description: "Third Estate declares itself national authority.",

    learn: {
      core: [
        "Third Estate declared National Assembly.",
        "They rejected estate system."
      ],
      key: [
        "Tennis Court Oath sworn.",
        "Constitution demanded."
      ],
      analysis: [
        "Sovereignty shifted from king to people.",
        "Monarchy authority weakened."
      ],
      stretch: [
        "Elite defections increased legitimacy."
      ]
    },

    questions: [
      {
        text: "What was Tennis Court Oath?",
        options: ["Tax reform", "Constitution pledge", "War plan", "Treaty"],
        correct: 1,
        explanation: "They vowed to create constitution."
      }
    ],

    orderingEvents: [
      { id: 1, text: "Breakaway", correctIndex: 0 },
      { id: 2, text: "Assembly formed", correctIndex: 1 },
      { id: 3, text: "Oath", correctIndex: 2 },
      { id: 4, text: "King reacts", correctIndex: 3 },
      { id: 5, text: "Escalation", correctIndex: 4 }
    ],

    swipeScenario: {
      date: "1789",
      situation: "Reform demands rise.",
      context: "Monarchy reacts.",
      leftChoice: "Dissolve Assembly",
      rightChoice: "Accept Assembly",

      leftOutcome: {
        title: "Conflict rises",
        text: "Revolution intensifies.",
        historical: "Would escalate crisis.",
        reactions: [{ label: "Tension", color: "red" }]
      },

      rightOutcome: {
        title: "Authority shifts",
        text: "Monarchy weakens.",
        historical: "Revolution legitimised.",
        reactions: [{ label: "Shift", color: "green" }]
      }
    }
  },

  /* ───────────────────────── CHAPTER 5 ───────────────────────── */
  {
    id: 5,
    title: "Reign of Terror",
    date: "1793",
    keyFigure: "Robespierre",
    isUnlocked: false,
    isCompleted: false,
    xpReward: 200,
    description: "Radical phase of revolutionary violence.",

    learn: {
      core: [
        "Revolution enters radical phase.",
        "Committee of Public Safety dominates."
      ],
      key: [
        "Mass executions via guillotine.",
        "Enemies of revolution targeted."
      ],
      analysis: [
        "Fear used as political control tool.",
        "Civil liberties suspended."
      ],
      stretch: [
        "Robespierre justified violence morally."
      ]
    },

    questions: [
      {
        text: "Main feature of Reign of Terror?",
        options: ["Peace", "Fear and execution", "Trade reform", "Democracy"],
        correct: 1,
        explanation: "Mass executions defined the period."
      }
    ],

    orderingEvents: [
      { id: 1, text: "Committee formed", correctIndex: 0 },
      { id: 2, text: "Arrests increase", correctIndex: 1 },
      { id: 3, text: "Executions rise", correctIndex: 2 },
      { id: 4, text: "Terror peaks", correctIndex: 3 },
      { id: 5, text: "Backlash begins", correctIndex: 4 }
    ],

    swipeScenario: {
      date: "1793",
      situation: "Enemies increasing.",
      context: "Government response needed.",
      leftChoice: "Execute suspects",
      rightChoice: "Fair trials",

      leftOutcome: {
        title: "Fear control",
        text: "Order enforced.",
        historical: "Defines Terror.",
        reactions: [{ label: "Fear", color: "red" }]
      },

      rightOutcome: {
        title: "Slow justice",
        text: "Less efficient.",
        historical: "Seen as weak during crisis.",
        reactions: [{ label: "Delay", color: "gray" }]
      }
    }
  },

  /* ───────────────────────── CHAPTER 6 ───────────────────────── */
  {
    id: 6,
    title: "Execution of Louis XVI",
    date: "1793",
    keyFigure: "Louis XVI",
    isUnlocked: false,
    isCompleted: false,
    xpReward: 220,
    description: "End of monarchy in France.",

    learn: {
      core: [
        "Louis XVI executed in 1793.",
        "Monarchy abolished."
      ],
      key: [
        "Convicted of treason.",
        "Europe reacts strongly."
      ],
      analysis: [
        "Revolution becomes irreversible.",
        "Internal divisions deepen."
      ],
      stretch: [
        "Radicalisation accelerates across Europe."
      ]
    },

    questions: [
      {
        text: "Why was Louis XVI executed?",
        options: ["Tax fraud", "Treason", "War loss", "Religious conflict"],
        correct: 1,
        explanation: "He was convicted of treason."
      }
    ],

    orderingEvents: [
      { id: 1, text: "Arrest", correctIndex: 0 },
      { id: 2, text: "Trial", correctIndex: 1 },
      { id: 3, text: "Verdict", correctIndex: 2 },
      { id: 4, text: "Execution", correctIndex: 3 },
      { id: 5, text: "End monarchy", correctIndex: 4 }
    ],

    swipeScenario: {
      date: "1793",
      situation: "Fate of king decided.",
      context: "Revolution government debates.",
      leftChoice: "Execute",
      rightChoice: "Exile",

      leftOutcome: {
        title: "Final break",
        text: "Monarchy ends.",
        historical: "No return possible.",
        reactions: [{ label: "Final", color: "red" }]
      },

      rightOutcome: {
        title: "Symbol survives",
        text: "Monarchy remains abroad.",
        historical: "Could inspire restoration.",
        reactions: [{ label: "Moderate", color: "green" }]
      }
    }
  },

  /* ───────────────────────── CHAPTER 7 ───────────────────────── */
  {
    id: 7,
    title: "Rise of Napoleon",
    date: "1799",
    keyFigure: "Napoleon Bonaparte",
    isUnlocked: false,
    isCompleted: false,
    xpReward: 250,
    description: "End of Revolution and rise of military rule.",

    learn: {
      core: [
        "France unstable after revolution.",
        "Napoleon rises through military success."
      ],
      key: [
        "Coup of 1799 ends Revolution.",
        "Consulate established."
      ],
      analysis: [
        "Revolution fails to maintain stability.",
        "Military power fills vacuum."
      ],
      stretch: [
        "Authoritarian rule replaces revolutionary ideals."
      ]
    },

    questions: [
      {
        text: "How did Napoleon gain power?",
        options: ["Election", "Coup", "Inheritance", "Rebellion"],
        correct: 1,
        explanation: "He seized power via coup."
      }
    ],

    orderingEvents: [
      { id: 1, text: "Instability grows", correctIndex: 0 },
      { id: 2, text: "Military influence rises", correctIndex: 1 },
      { id: 3, text: "Coup planned", correctIndex: 2 },
      { id: 4, text: "Power seized", correctIndex: 3 },
      { id: 5, text: "Consulate formed", correctIndex: 4 }
    ],

    swipeScenario: {
      date: "1799",
      situation: "France unstable.",
      context: "Leadership vacuum exists.",
      leftChoice: "Military rule",
      rightChoice: "Republic restored",

      leftOutcome: {
        title: "Order returns",
        text: "Stability restored.",
        historical: "Begins Napoleonic era.",
        reactions: [{ label: "Control", color: "green" }]
      },

      rightOutcome: {
        title: "Chaos continues",
        text: "Instability remains.",
        historical: "System weakens further.",
        reactions: [{ label: "Chaos", color: "red" }]
      }
    }
  }
];
