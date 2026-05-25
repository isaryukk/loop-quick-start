export type Chapter = {
  id: number;
  title: string;
  date: string;
  keyFigure: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  xpReward: number;

  description: string;
  learn: string;

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
  /* ─────────────────────────────── CHAPTER 1 ─────────────────────────────── */
  {
    id: 1,
    title: "Financial Collapse of France",
    date: "1788–1789",
    keyFigure: "Louis XVI",
    isUnlocked: true,
    isCompleted: false,
    xpReward: 120,

    description:
      "France enters a deep financial and social crisis driven by debt, inequality, and food shortages.",

    learn: `By 1788, France was not just in debt — it was structurally bankrupt.

The monarchy had borrowed heavily to fund wars, especially the American Revolution. Interest payments alone consumed a massive portion of state revenue.

Meanwhile, France’s taxation system was deeply unequal. The First Estate (clergy) and Second Estate (nobility) paid almost no taxes, while the Third Estate — over 95% of the population — carried the entire burden.

Two consecutive harvest failures caused grain shortages. Bread prices tripled, and since bread made up most of the daily diet of ordinary people, starvation and unrest spread rapidly.

King Louis XVI lacked political authority and decisiveness. His attempts at reform were blocked by elites, leaving the system unable to adapt.

This combination of debt, inequality, and food crisis created the perfect conditions for revolution.`,

    questions: [
      {
        text: "What was the main cause of France’s financial collapse?",
        options: [
          "Industrial decline",
          "War debt and unfair taxation",
          "Foreign invasion",
          "Bank failure",
        ],
        correct: 1,
        explanation:
          "France was crippled by war debt and a tax system that burdened only the poor.",
      },
      {
        text: "Which group paid most taxes?",
        options: ["Nobility", "Clergy", "Third Estate", "Royal family"],
        correct: 2,
        explanation:
          "The Third Estate carried nearly all tax responsibility.",
      },
    ],

    orderingEvents: [
      { id: 1, text: "War debt accumulates", correctIndex: 0 },
      { id: 2, text: "Harvest failures", correctIndex: 1 },
      { id: 3, text: "Bread prices rise", correctIndex: 2 },
      { id: 4, text: "Urban unrest spreads", correctIndex: 3 },
      { id: 5, text: "Political crisis begins", correctIndex: 4 },
    ],

    swipeScenario: {
      date: "1789",
      situation: "Paris is starving and riots are forming.",
      context: "You advise King Louis XVI on how to respond.",
      leftChoice: "Raise Taxes",
      rightChoice: "Subsidise Grain",

      leftOutcome: {
        title: "Taxation triggers revolt",
        text: "Riots spread across Paris as resentment explodes.",
        historical:
          "This reflects real policies that accelerated the Revolution.",
        reactions: [{ label: "Anger", color: "red" }],
      },

      rightOutcome: {
        title: "Temporary relief",
        text: "Food stabilises briefly but debt worsens.",
        historical:
          "Short-term relief could not fix structural collapse.",
        reactions: [{ label: "Short calm", color: "green" }],
      },
    },
  },

  /* ─────────────────────────────── CHAPTER 2 ─────────────────────────────── */
  {
    id: 2,
    title: "The Estates-General Crisis",
    date: "May 1789",
    keyFigure: "Louis XVI",
    isUnlocked: false,
    isCompleted: false,
    xpReward: 140,

    description:
      "The king calls the Estates-General for the first time in over 150 years.",

    learn: `The Estates-General was a political assembly representing the three estates of French society.

It had not been convened since 1614, meaning there was no modern precedent for how it should function.

The Third Estate demanded voting by population rather than by estate, because they represented the vast majority of the population.

The nobility and clergy resisted, fearing loss of privilege and political control.

This deadlock marked the first major political rupture between the monarchy and the people.`,

    questions: [
      {
        text: "What was the main dispute in the Estates-General?",
        options: [
          "Tax levels",
          "Voting system",
          "Military power",
          "Trade policy",
        ],
        correct: 1,
        explanation: "The key conflict was how voting should be structured.",
      },
    ],

    orderingEvents: [
      { id: 1, text: "Estates-General summoned", correctIndex: 0 },
      { id: 2, text: "Voting dispute begins", correctIndex: 1 },
      { id: 3, text: "Third Estate protests", correctIndex: 2 },
      { id: 4, text: "Deadlock forms", correctIndex: 3 },
      { id: 5, text: "Breakdown of authority", correctIndex: 4 },
    ],

    swipeScenario: {
      date: "1789",
      situation: "Voting system must be decided.",
      context: "Three estates cannot agree on fair representation.",
      leftChoice: "Vote by Estate",
      rightChoice: "Vote by Population",

      leftOutcome: {
        title: "Elite control maintained",
        text: "Nobility retains power.",
        historical:
          "This would preserve inequality and deepen unrest.",
        reactions: [{ label: "Elite win", color: "green" }],
      },

      rightOutcome: {
        title: "Democratic shift begins",
        text: "Third Estate gains real influence.",
        historical:
          "This leads toward formation of National Assembly.",
        reactions: [{ label: "Change", color: "green" }],
      },
    },
  },

  /* ─────────────────────────────── CHAPTER 3 ─────────────────────────────── */
  {
    id: 3,
    title: "Storming of the Bastille",
    date: "July 1789",
    keyFigure: "Parisian Revolutionaries",
    isUnlocked: false,
    isCompleted: false,
    xpReward: 160,

    description:
      "The Bastille prison is stormed, marking the symbolic start of the Revolution.",

    learn: `On 14 July 1789, Parisian crowds stormed the Bastille fortress.

Although it held few prisoners, it symbolised royal tyranny and arbitrary power.

Tensions were driven by food shortages, fear of military repression, and political instability.

The governor was killed and the fortress destroyed.

This moment transformed unrest into full-scale revolution.`,

    questions: [
      {
        text: "Why was the Bastille important?",
        options: [
          "Military base",
          "Symbol of royal authority",
          "Economic center",
          "Religious site",
        ],
        correct: 1,
        explanation:
          "It represented royal imprisonment and state oppression.",
      },
    ],

    orderingEvents: [
      { id: 1, text: "Crowds gather", correctIndex: 0 },
      { id: 2, text: "Weapons seized", correctIndex: 1 },
      { id: 3, text: "Attack begins", correctIndex: 2 },
      { id: 4, text: "Governor killed", correctIndex: 3 },
      { id: 5, text: "Symbol of revolution spreads", correctIndex: 4 },
    ],

    swipeScenario: {
      date: "1789",
      situation: "Crowds demand weapons from Bastille.",
      context: "Paris is on the edge of collapse.",
      leftChoice: "Defend fortress",
      rightChoice: "Negotiate surrender",

      leftOutcome: {
        title: "Violent escalation",
        text: "Bloodshed increases dramatically.",
        historical:
          "Resistance likely accelerates revolution.",
        reactions: [{ label: "Violence", color: "red" }],
      },

      rightOutcome: {
        title: "Temporary calm",
        text: "Conflict is delayed.",
        historical:
          "But revolution momentum remains unstoppable.",
        reactions: [{ label: "Pause", color: "green" }],
      },
    },
  },

  /* ─────────────────────────────── CHAPTER 4 ─────────────────────────────── */
  {
    id: 4,
    title: "Rise of the National Assembly",
    date: "1789",
    keyFigure: "Third Estate Leaders",
    isUnlocked: false,
    isCompleted: false,
    xpReward: 180,

    description:
      "The Third Estate declares itself the National Assembly.",

    learn: `Frustrated by political deadlock, the Third Estate broke away and declared itself the National Assembly.

This act directly challenged royal authority.

Members swore the Tennis Court Oath, promising not to disband until France had a constitution.

This was the first formal step toward ending absolute monarchy in France.`,

    questions: [
      {
        text: "What was the Tennis Court Oath?",
        options: [
          "Military alliance",
          "Pledge to create constitution",
          "Tax agreement",
          "War declaration",
        ],
        correct: 1,
        explanation:
          "They swore to remain united until a constitution was created.",
      },
    ],

    orderingEvents: [
      { id: 1, text: "Third Estate breaks away", correctIndex: 0 },
      { id: 2, text: "National Assembly formed", correctIndex: 1 },
      { id: 3, text: "Tennis Court Oath", correctIndex: 2 },
      { id: 4, text: "King attempts control", correctIndex: 3 },
      { id: 5, text: "Revolution escalates", correctIndex: 4 },
    ],

    swipeScenario: {
      date: "1789",
      situation: "Assembly demands constitutional reform.",
      context: "The monarchy must decide how to respond.",
      leftChoice: "Dissolve Assembly",
      rightChoice: "Recognise Assembly",

      leftOutcome: {
        title: "Repression attempt",
        text: "Tensions explode.",
        historical:
          "Would likely trigger further rebellion.",
        reactions: [{ label: "Conflict", color: "red" }],
      },

      rightOutcome: {
        title: "Power shift begins",
        text: "Monarchy weakens politically.",
        historical:
          "Legitimises revolutionary authority.",
        reactions: [{ label: "Shift", color: "green" }],
      },
    },
  },

  /* ─────────────────────────────── CHAPTER 5 ─────────────────────────────── */
  {
    id: 5,
    title: "Reign of Terror Begins",
    date: "1793",
    keyFigure: "Robespierre",
    isUnlocked: false,
    isCompleted: false,
    xpReward: 200,

    description:
      "Radical revolution leads to mass executions and political paranoia.",

    learn: `During the Reign of Terror, revolutionary leaders used extreme measures to protect the revolution.

Thousands were executed by guillotine under suspicion of being enemies of the state.

Maximilien Robespierre justified violence as necessary to preserve the republic.

Fear became a political tool used to maintain control.`,

    questions: [
      {
        text: "What was the main tool of the Reign of Terror?",
        options: ["Democracy", "Fear and execution", "Trade reform", "Monarchy restoration"],
        correct: 1,
        explanation:
          "Political fear and mass executions defined this period.",
      },
    ],

    orderingEvents: [
      { id: 1, text: "Committee of Public Safety formed", correctIndex: 0 },
      { id: 2, text: "Mass arrests begin", correctIndex: 1 },
      { id: 3, text: "Guillotine used widely", correctIndex: 2 },
      { id: 4, text: "Robespierre rises", correctIndex: 3 },
      { id: 5, text: "Terror peaks", correctIndex: 4 },
    ],

    swipeScenario: {
      date: "1793",
      situation: "Enemies of the revolution are increasing.",
      context: "Leadership must decide how to maintain control.",
      leftChoice: "Mass executions",
      rightChoice: "Legal trials",

      leftOutcome: {
        title: "Fear-based control",
        text: "Order is maintained through terror.",
        historical:
          "This defines the Reign of Terror.",
        reactions: [{ label: "Fear", color: "red" }],
      },

      rightOutcome: {
        title: "Slower justice",
        text: "Stability weakens short-term.",
        historical:
          "Seen as too slow during crisis.",
        reactions: [{ label: "Delay", color: "gray" }],
      },
    },
  },

  /* ─────────────────────────────── CHAPTER 6 ─────────────────────────────── */
  {
    id: 6,
    title: "Execution of Louis XVI",
    date: "1793",
    keyFigure: "Louis XVI",
    isUnlocked: false,
    isCompleted: false,
    xpReward: 220,

    description:
      "The king is executed, ending monarchy in France.",

    learn: `Louis XVI was executed in January 1793 after being convicted of treason.

His death marked the official end of absolute monarchy in France.

The execution shocked Europe and intensified foreign opposition to the revolution.

Internally, it deepened divisions and accelerated radicalisation.`,

    questions: [
      {
        text: "Why was Louis XVI executed?",
        options: ["Tax fraud", "Treason", "Military failure", "Religious dispute"],
        correct: 1,
        explanation:
          "He was convicted of treason against the revolutionary state.",
      },
    ],

    orderingEvents: [
      { id: 1, text: "Arrest of king", correctIndex: 0 },
      { id: 2, text: "Trial begins", correctIndex: 1 },
      { id: 3, text: "Guilty verdict", correctIndex: 2 },
      { id: 4, text: "Execution ordered", correctIndex: 3 },
      { id: 5, text: "Monarchy ends", correctIndex: 4 },
    ],

    swipeScenario: {
      date: "1793",
      situation: "What to do with the king?",
      context: "Revolutionary government debates fate of Louis XVI.",
      leftChoice: "Execute him",
      rightChoice: "Exile him",

      leftOutcome: {
        title: "Final break",
        text: "Monarchy ends permanently.",
        historical:
          "Execution radicalises Europe.",
        reactions: [{ label: "Irreversible", color: "red" }],
      },

      rightOutcome: {
        title: "Monarchy survives abroad",
        text: "Symbol of monarchy remains.",
        historical:
          "Could preserve royal legitimacy.",
        reactions: [{ label: "Moderate", color: "green" }],
      },
    },
  },

  /* ─────────────────────────────── CHAPTER 7 ─────────────────────────────── */
  {
    id: 7,
    title: "Rise of Napoleon",
    date: "1799",
    keyFigure: "Napoleon Bonaparte",
    isUnlocked: false,
    isCompleted: false,
    xpReward: 250,

    description:
      "The Revolution ends as Napoleon takes power.",

    learn: `By 1799, revolutionary France was unstable after years of political chaos and war.

Napoleon Bonaparte rose through the military ranks due to his strategic success.

He seized power in a coup and established the Consulate, effectively ending the Revolution.

This marked the transition from revolution to authoritarian rule.`,

    questions: [
      {
        text: "How did Napoleon come to power?",
        options: ["Election", "Coup", "Inheritance", "Rebellion vote"],
        correct: 1,
        explanation:
          "He seized power through a coup d'état.",
      },
    ],

    orderingEvents: [
      { id: 1, text: "Military success rises", correctIndex: 0 },
      { id: 2, text: "Political instability", correctIndex: 1 },
      { id: 3, text: "Coup planned", correctIndex: 2 },
      { id: 4, text: "Power seized", correctIndex: 3 },
      { id: 5, text: "Consulate formed", correctIndex: 4 },
    ],

    swipeScenario: {
      date: "1799",
      situation: "France is unstable after years of revolution.",
      context: "Leadership vacuum threatens collapse.",
      leftChoice: "Military takeover",
      rightChoice: "Restore republic",

      leftOutcome: {
        title: "Order restored",
        text: "Stability returns under strong rule.",
        historical:
          "Leads to Napoleonic era.",
        reactions: [{ label: "Control", color: "green" }],
      },

      rightOutcome: {
        title: "Continued instability",
        text: "Government remains weak.",
        historical:
          "Risk of collapse continues.",
        reactions: [{ label: "Chaos", color: "red" }],
      },
    },
  },
];
