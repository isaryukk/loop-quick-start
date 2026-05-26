/* ─────────────────────────────────────────────
   src/data/chapter.ts
   Pure data layer — do not put UI logic here
───────────────────────────────────────────── */

export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export type LearnContent = {
  core: string[];       // shown to all users
  key: string[];        // intermediate+
  analysis: string[];   // advanced+
  stretch: string[];    // advanced only
};

export type Question = {
  text: string;
  options: string[];
  correct: number;
  explanation: string;
  tier: "core" | "key" | "analysis" | "stretch";
};

export type OrderingEvent = {
  id: number;
  text: string;
  correctIndex: number;
};

export type SwipeOutcome = {
  title: string;
  text: string;
  historical: string;
  reactions: { label: string; color: "red" | "green" | "gray" }[];
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

export type Chapter = {
  id: number;
  title: string;
  date: string;
  keyFigure: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  xpReward: number;
  description: string;
  learn: LearnContent;
  questions: Question[];
  orderingEvents: OrderingEvent[];
  swipeScenario: SwipeScenario;
};

/* ─────────────────────────────────────────────
   CHAPTERS
───────────────────────────────────────────── */

export const chapters: Chapter[] = [

  /* ── CHAPTER 1 ── */
  {
    id: 1,
    title: "Financial Collapse of France",
    date: "1788–1789",
    keyFigure: "Louis XVI",
    isUnlocked: true,
    isCompleted: false,
    xpReward: 120,
    description: "France enters a deep financial and social crisis driven by debt, inequality, and food shortages.",

    learn: {
      core: [
        "By 1788, France was structurally bankrupt due to decades of war debt.",
        "The taxation system was deeply unequal — the Third Estate paid almost all taxes while clergy and nobility were largely exempt.",
        "Consecutive harvest failures caused grain shortages and sharp bread price rises across France.",
      ],
      key: [
        "Interest payments on war debt consumed a huge share of state revenue, leaving little for reform.",
        "Bread made up most of the working-class diet, so price rises immediately threatened survival.",
        "Louis XVI's reform attempts were blocked by privileged elites, leaving the system unable to adapt.",
      ],
      analysis: [
        "The structural contradiction between a bankrupt state and a tax-exempt nobility made peaceful reform almost impossible.",
        "Food insecurity combined with political exclusion turned economic desperation into political action.",
        "Louis XVI's weak leadership was shaped by his court environment — surrounded by advisers protecting elite interests.",
      ],
      stretch: [
        "France's funding of the American Revolution simultaneously worsened its debt and imported Enlightenment republican ideas into a society now in crisis.",
        "Economists debated physiocratic land reform versus mercantilist trade policy — neither was implemented before the crisis point.",
        "France's financial collapse mirrors later debt-crisis revolutions studied in 20th-century development economics.",
      ],
    },

    questions: [
      {
        text: "What was the primary cause of France's financial crisis by 1788?",
        options: [
          "A collapse in foreign trade",
          "War debt combined with an unequal taxation system",
          "A banking crisis caused by private lenders",
          "Military spending on domestic repression",
        ],
        correct: 1,
        explanation: "France had accumulated enormous war debt — especially from supporting the American Revolution — while the tax burden fell almost entirely on the Third Estate.",
        tier: "core",
      },
      {
        text: "Why did bread price increases cause such widespread crisis?",
        options: [
          "Bread was exported, creating artificial shortages",
          "The government taxed bread to raise revenue",
          "Bread formed the majority of the working-class diet, so price rises directly threatened survival",
          "Bakers went on strike, cutting off supply",
        ],
        correct: 2,
        explanation: "For ordinary French people, bread was the foundation of daily caloric intake. When prices tripled, starvation became a realistic threat for millions.",
        tier: "core",
      },
      {
        text: "Why were Louis XVI's reform efforts unsuccessful?",
        options: [
          "He lacked any interest in governing France",
          "Foreign powers blocked internal French reforms",
          "Privileged elites resisted reforms that would reduce their tax exemptions",
          "The National Assembly voted down all reform proposals",
        ],
        correct: 2,
        explanation: "The French nobility and clergy had strong incentives to block any reform extending taxation to them. Louis XVI's indecisive leadership meant he couldn't overcome this resistance.",
        tier: "key",
      },
      {
        text: "What structural contradiction made peaceful reform almost impossible?",
        options: [
          "A bankrupt state that could not afford to pay its army",
          "A bankrupt state relying on tax revenue from groups exempt from paying taxes",
          "A monarchy with no legal authority to raise taxes",
          "A parliament that controlled all fiscal decisions",
        ],
        correct: 1,
        explanation: "The state desperately needed tax revenue while the groups holding political power were the very groups exempt from paying it — a deadlock irresolvable without dismantling privilege.",
        tier: "analysis",
      },
      {
        text: "What irony connects France's financial crisis to the American Revolution?",
        options: [
          "America repaid its debt, flooding France with American goods",
          "France funded the American Revolution to weaken Britain, but the cost and the ideas it spread destabilised France itself",
          "American grain imports replaced French harvests during the shortage",
          "American diplomats persuaded Louis XVI to implement reforms",
        ],
        correct: 1,
        explanation: "France's support for American independence accelerated French debt AND brought Enlightenment republican ideas into a society now in economic crisis — a doubly damaging consequence.",
        tier: "stretch",
      },
    ],

    orderingEvents: [
      { id: 1, text: "War debt accumulates from American Revolution funding", correctIndex: 0 },
      { id: 2, text: "Consecutive harvest failures across France", correctIndex: 1 },
      { id: 3, text: "Bread prices rise sharply", correctIndex: 2 },
      { id: 4, text: "Urban food riots spread", correctIndex: 3 },
      { id: 5, text: "Political crisis forces Estates-General", correctIndex: 4 },
    ],

    swipeScenario: {
      date: "1789",
      situation: "Paris is starving and riots are spreading.",
      context: "You advise King Louis XVI on how to respond to the food crisis.",
      leftChoice: "Raise Taxes",
      rightChoice: "Subsidise Grain",
      leftOutcome: {
        title: "Taxation triggers revolt",
        text: "Riots spread across Paris as resentment turns to open rebellion.",
        historical: "This mirrors real policies that accelerated revolutionary sentiment — each new tax on the Third Estate increased calls for systemic change.",
        reactions: [
          { label: "Anger surges", color: "red" },
          { label: "Debt unchanged", color: "gray" },
        ],
      },
      rightOutcome: {
        title: "Temporary relief",
        text: "Food prices stabilise briefly. Unrest slows, but the underlying debt worsens.",
        historical: "Short-term grain subsidies were attempted but could not address structural debt — relief only delayed the crisis.",
        reactions: [
          { label: "Short calm", color: "green" },
          { label: "Debt grows", color: "red" },
        ],
      },
    },
  },

  /* ── CHAPTER 2 ── */
  {
    id: 2,
    title: "The Estates-General Crisis",
    date: "May 1789",
    keyFigure: "Louis XVI",
    isUnlocked: false,
    isCompleted: false,
    xpReward: 140,
    description: "The king calls the Estates-General for the first time in 175 years — and it immediately fractures.",

    learn: {
      core: [
        "The Estates-General was called in 1789 for the first time since 1614 to address the financial crisis.",
        "French society was divided into three estates: clergy (First), nobility (Second), and everyone else (Third).",
        "The Third Estate represented about 98% of the population but had equal voting weight to each other estate.",
      ],
      key: [
        "Voting was conducted by estate, not by individual — so clergy and nobility could always outvote the Third Estate two-to-one.",
        "The Third Estate demanded voting by population (by head), which would reflect their numerical majority.",
        "The nobility and clergy refused, knowing fair representation would end their political dominance.",
      ],
      analysis: [
        "The debate exposed a core contradiction: a system claiming to represent France while structurally excluding 98% of French people from real power.",
        "The deadlock was not just procedural — it was a proxy war over whether privilege or population should determine political authority.",
        "This institutional deadlock forced the Third Estate to seek legitimacy outside the existing system, setting up the National Assembly.",
      ],
      stretch: [
        "Rousseau's concept of the general will implicitly supported headcount voting as the measure of legitimate sovereignty.",
        "No clear procedural rules existed for the 1789 Estates-General, giving both sides ammunition to claim legitimacy.",
        "Political scientists identify this as a classic veto-player crisis — multiple actors each holding blocking power, making collective decisions impossible.",
      ],
    },

    questions: [
      {
        text: "Why was the Estates-General called in 1789?",
        options: [
          "To declare war on Britain",
          "To address France's financial crisis and authorise new taxes",
          "To elect a new king",
          "To reform the church",
        ],
        correct: 1,
        explanation: "Louis XVI had no other way to legitimately raise new taxes — only the Estates-General could authorise them. It was a last resort.",
        tier: "core",
      },
      {
        text: "What was the key dispute about voting in the Estates-General?",
        options: [
          "Whether the king had a vote",
          "Whether voting should be by estate or by individual headcount",
          "Whether foreign representatives could attend",
          "Whether clergy could vote on tax matters",
        ],
        correct: 1,
        explanation: "Voting by estate meant the minority (clergy + nobility) could always outvote the Third Estate. Voting by head would give the Third Estate real power for the first time.",
        tier: "core",
      },
      {
        text: "Why did the nobility resist voting by population?",
        options: [
          "They believed the Third Estate lacked education to vote responsibly",
          "Voting by head would eliminate their structural political dominance",
          "It would have required them to attend more sessions",
          "The king personally instructed them to resist",
        ],
        correct: 1,
        explanation: "Under estate-based voting, two estates could always outvote one. Switching to headcount would give the numerically dominant Third Estate real legislative power — ending aristocratic control.",
        tier: "key",
      },
      {
        text: "What deeper contradiction did the Estates-General debate reveal?",
        options: [
          "That France lacked a trained diplomatic corps",
          "That the church and state had conflicting financial interests",
          "That a system claiming to represent France structurally excluded 98% of French people from power",
          "That the king's veto made all legislation impossible",
        ],
        correct: 2,
        explanation: "The three-estate system was designed for a feudal society where privilege determined status. By 1789, Enlightenment ideas made that arrangement increasingly untenable.",
        tier: "analysis",
      },
      {
        text: "What political science concept best describes the Estates-General deadlock?",
        options: [
          "A constitutional crisis requiring judicial review",
          "A veto-player crisis where each actor held blocking power, making decisions impossible",
          "A principal-agent problem between king and parliament",
          "A collective action failure based on prisoner's dilemma logic",
        ],
        correct: 1,
        explanation: "Each estate could block the others, and the king could block everyone. With no mechanism to force resolution, the assembly structurally couldn't function.",
        tier: "stretch",
      },
    ],

    orderingEvents: [
      { id: 1, text: "Estates-General summoned by Louis XVI", correctIndex: 0 },
      { id: 2, text: "Dispute over voting rules begins", correctIndex: 1 },
      { id: 3, text: "Third Estate demands headcount voting", correctIndex: 2 },
      { id: 4, text: "Nobility and clergy refuse reform", correctIndex: 3 },
      { id: 5, text: "Assembly reaches complete deadlock", correctIndex: 4 },
    ],

    swipeScenario: {
      date: "May 1789",
      situation: "The voting system of the Estates-General must be decided.",
      context: "Three estates cannot agree on how representation should work.",
      leftChoice: "Vote by Estate",
      rightChoice: "Vote by Population",
      leftOutcome: {
        title: "Elite control maintained",
        text: "Clergy and nobility retain their structural majority. Third Estate complaints go unheard.",
        historical: "Maintaining estate-based voting preserved inequality and deepened resentment, making revolutionary escalation more likely.",
        reactions: [
          { label: "Elite win", color: "green" },
          { label: "Anger builds", color: "red" },
        ],
      },
      rightOutcome: {
        title: "Democratic shift begins",
        text: "The Third Estate gains real influence. Political authority begins shifting toward the majority.",
        historical: "This leads toward formation of the National Assembly and the first real break with absolute monarchy.",
        reactions: [
          { label: "Power shifts", color: "green" },
          { label: "Nobles resist", color: "red" },
        ],
      },
    },
  },

  /* ── CHAPTER 3 ── */
  {
    id: 3,
    title: "Storming of the Bastille",
    date: "July 1789",
    keyFigure: "Parisian Revolutionaries",
    isUnlocked: false,
    isCompleted: false,
    xpReward: 160,
    description: "The Bastille prison is stormed — marking the symbolic start of the Revolution.",

    learn: {
      core: [
        "On 14 July 1789, Parisian crowds stormed the Bastille fortress.",
        "Although it held only seven prisoners, the Bastille symbolised royal tyranny and arbitrary state power.",
        "The governor was killed and the fortress was destroyed.",
      ],
      key: [
        "Tensions were driven by food shortages, fear of military repression, and political instability.",
        "The crowd's primary target was weapons and gunpowder stored inside — not the prisoners.",
        "The fall of the Bastille triggered uprisings across France and transformed unrest into revolution.",
      ],
      analysis: [
        "The Bastille's symbolic importance far outweighed its military significance — a nearly empty prison became the image of an entire political system.",
        "The violence on July 14th marked a threshold: the state's monopoly on force had been broken by its own population.",
        "Louis XVI's failure to defend the Bastille signalled that the monarchy lacked the military will to suppress the revolution.",
      ],
      stretch: [
        "The storming was partly improvised — the crowd did not plan a coordinated attack but converged organically as rumours spread.",
        "Historians debate whether it was a true popular uprising or was catalysed by political clubs and pamphleteers organising for months.",
        "Tocqueville argued revolutions occur not at peak oppression, but when conditions begin improving — the 'revolution of rising expectations'.",
      ],
    },

    questions: [
      {
        text: "What did the Bastille primarily symbolise?",
        options: [
          "Military power and foreign defence",
          "Royal tyranny and arbitrary state authority",
          "Economic inequality and taxation",
          "Religious authority and clerical power",
        ],
        correct: 1,
        explanation: "The Bastille was a royal prison where people could be imprisoned without trial by royal decree. It represented the unchecked power of the king over individual liberty.",
        tier: "core",
      },
      {
        text: "What was the crowd's primary target when storming the Bastille?",
        options: [
          "Freeing political prisoners held inside",
          "Weapons and gunpowder stored in the fortress",
          "The governor of the prison",
          "Documents and royal decrees",
        ],
        correct: 1,
        explanation: "While prisoners were freed, the crowd's main goal was seizing arms and ammunition — they needed weapons to defend the National Assembly against feared royal military repression.",
        tier: "key",
      },
      {
        text: "What did the monarchy's failure to defend the Bastille signal?",
        options: [
          "That Louis XVI had secretly supported the revolution",
          "That the army had been deployed elsewhere",
          "That the monarchy lacked the will and authority to suppress the revolution",
          "That the Bastille's defenders had been bribed",
        ],
        correct: 2,
        explanation: "When the monarchy couldn't defend one of its own fortresses, it signalled to France and Europe that royal authority had fundamentally weakened.",
        tier: "analysis",
      },
      {
        text: "What does Tocqueville's 'revolution of rising expectations' suggest about 1789?",
        options: [
          "Revolutions happen when conditions are at their absolute worst",
          "Revolutions occur when improving conditions raise hopes that then collide with continued frustration",
          "The Bastille fell because bread prices had started to fall",
          "Political education drives revolutionary action more than economics",
        ],
        correct: 1,
        explanation: "French society had been slowly reforming before 1789, raising expectations. When reforms stalled and crisis hit, the gap between expectation and reality became explosive.",
        tier: "stretch",
      },
    ],

    orderingEvents: [
      { id: 1, text: "Rumours spread of royal troops mobilising", correctIndex: 0 },
      { id: 2, text: "Crowds gather around the Bastille", correctIndex: 1 },
      { id: 3, text: "Attack on the fortress begins", correctIndex: 2 },
      { id: 4, text: "Governor de Launay killed", correctIndex: 3 },
      { id: 5, text: "Revolution spreads across France", correctIndex: 4 },
    ],

    swipeScenario: {
      date: "14 July 1789",
      situation: "Crowds are demanding weapons from the Bastille.",
      context: "You are the governor of the Bastille facing a massive armed crowd.",
      leftChoice: "Defend the fortress",
      rightChoice: "Negotiate surrender",
      leftOutcome: {
        title: "Violent escalation",
        text: "Armed resistance leads to heavy casualties. The fortress eventually falls and the governor is killed.",
        historical: "The historical governor attempted resistance but was overwhelmed. Early negotiation could have reduced bloodshed without preventing the symbolic fall.",
        reactions: [
          { label: "Violence peaks", color: "red" },
          { label: "Revolution accelerates", color: "red" },
        ],
      },
      rightOutcome: {
        title: "Controlled surrender",
        text: "The fortress is handed over peacefully. Casualties are limited but the symbolic outcome is the same.",
        historical: "Even peaceful surrender would not have stopped the Revolution — the Bastille's fall was as much symbolic as military.",
        reactions: [
          { label: "Less bloodshed", color: "green" },
          { label: "Revolution continues", color: "gray" },
        ],
      },
    },
  },

  /* ── CHAPTER 4 ── */
  {
    id: 4,
    title: "Rise of the National Assembly",
    date: "June–July 1789",
    keyFigure: "Third Estate Deputies",
    isUnlocked: false,
    isCompleted: false,
    xpReward: 180,
    description: "The Third Estate breaks from the Estates-General and declares itself the National Assembly.",

    learn: {
      core: [
        "Frustrated by the deadlocked Estates-General, the Third Estate declared itself the National Assembly in June 1789.",
        "This was the first formal assertion that political authority comes from the nation, not the king.",
        "Deputies took the Tennis Court Oath — swearing not to disband until France had a written constitution.",
      ],
      key: [
        "When locked out of their meeting hall, deputies moved to a nearby indoor tennis court to continue.",
        "The oath was signed by 576 of 577 deputies present, demonstrating near-total unity.",
        "Some clergy and liberal nobles began joining, weakening the old estate system from within.",
      ],
      analysis: [
        "The National Assembly's formation relocated the source of political legitimacy from the crown to the people.",
        "The Tennis Court Oath was a performative political act — its power came from collective commitment to constitutional governance over royal command.",
        "Louis XVI's eventual recognition of the Assembly legitimised the revolutionary body he had tried to prevent.",
      ],
      stretch: [
        "Constitutional theorists identify this as a 'constituent power' moment — when a body claims the right to create the rules governing all other institutions.",
        "Sieyès's pamphlet 'What is the Third Estate?' had provided the ideological foundation: the Third Estate was not part of France — it was France.",
        "The model directly influenced later constitutional conventions, creating a transatlantic constitutional moment alongside the U.S. Constitution.",
      ],
    },

    questions: [
      {
        text: "What did the Third Estate declare itself in June 1789?",
        options: [
          "The Revolutionary Committee",
          "The National Assembly",
          "The People's Council",
          "The Constitutional Senate",
        ],
        correct: 1,
        explanation: "By declaring itself the National Assembly, the Third Estate claimed to represent the whole French nation — a direct challenge to the king's authority.",
        tier: "core",
      },
      {
        text: "What did the Tennis Court Oath commit its signers to?",
        options: [
          "Armed revolution against the monarchy",
          "Refusing to pay taxes until reform happened",
          "Not disbanding until France had a written constitution",
          "Electing a new king from the nobility",
        ],
        correct: 2,
        explanation: "The oath was a pledge of unity and persistence — members committed to staying together until constitutional governance was established.",
        tier: "core",
      },
      {
        text: "Why was Louis XVI's recognition of the National Assembly significant?",
        options: [
          "It ended the Revolution by giving reformers what they wanted",
          "It legitimised a revolutionary body he had tried to prevent, signalling the monarchy's weakening",
          "It transferred all tax-raising powers to the Assembly",
          "It forced clergy and nobility to accept reforms immediately",
        ],
        correct: 1,
        explanation: "By recognising the Assembly, Louis XVI acknowledged he could no longer govern through royal prerogative alone — accelerating the transfer of authority away from the crown.",
        tier: "analysis",
      },
      {
        text: "What concept does the National Assembly's formation illustrate in constitutional theory?",
        options: [
          "Popular sovereignty exercised through referendum",
          "Constituent power — a body claiming authority to create the rules governing all other institutions",
          "Federalism — dividing power between regional and national bodies",
          "Parliamentary supremacy over executive authority",
        ],
        correct: 1,
        explanation: "The National Assembly didn't just pass laws — it claimed the authority to write the constitution itself, creating the framework for all future institutions.",
        tier: "stretch",
      },
    ],

    orderingEvents: [
      { id: 1, text: "Third Estate locked out of meeting hall", correctIndex: 0 },
      { id: 2, text: "Deputies move to nearby tennis court", correctIndex: 1 },
      { id: 3, text: "Tennis Court Oath sworn", correctIndex: 2 },
      { id: 4, text: "National Assembly formally declared", correctIndex: 3 },
      { id: 5, text: "Louis XVI reluctantly recognises the Assembly", correctIndex: 4 },
    ],

    swipeScenario: {
      date: "June 1789",
      situation: "The National Assembly demands constitutional reform and refuses to disband.",
      context: "Louis XVI must decide how to respond.",
      leftChoice: "Dissolve the Assembly",
      rightChoice: "Recognise the Assembly",
      leftOutcome: {
        title: "Repression attempt",
        text: "The king orders the Assembly dissolved. Deputies refuse to leave. Troops are called. Tensions explode.",
        historical: "Attempting to dissolve the Assembly by force would almost certainly have accelerated armed revolution.",
        reactions: [
          { label: "Conflict erupts", color: "red" },
          { label: "Revolution accelerates", color: "red" },
        ],
      },
      rightOutcome: {
        title: "Power shifts permanently",
        text: "The monarchy acknowledges the Assembly's authority. Political legitimacy moves from crown to nation.",
        historical: "This is what Louis XVI did — reluctantly. It legitimised the revolutionary body and permanently weakened royal authority.",
        reactions: [
          { label: "Authority shifts", color: "green" },
          { label: "Monarchy weakens", color: "gray" },
        ],
      },
    },
  },

  /* ── CHAPTER 5 ── */
  {
    id: 5,
    title: "Reign of Terror",
    date: "1793–1794",
    keyFigure: "Robespierre",
    isUnlocked: false,
    isCompleted: false,
    xpReward: 200,
    description: "Radical revolution turns inward — mass executions and political paranoia define France.",

    learn: {
      core: [
        "During the Reign of Terror, revolutionary leaders used mass executions to suppress perceived enemies of the state.",
        "Approximately 17,000 people were officially executed, with many more dying in prison.",
        "Maximilien Robespierre justified violence as necessary to protect the republic.",
      ],
      key: [
        "The Committee of Public Safety, led by Robespierre, held effective executive power during this period.",
        "Fear became a deliberate political tool — the threat of accusation was used to silence opposition.",
        "The Law of Suspects (1793) broadened definitions of treason so widely that almost anyone could be accused.",
      ],
      analysis: [
        "The Terror reflected a deep tension within revolutionary ideology: ideals of liberty and equality were being enforced through authoritarian means.",
        "Robespierre's concept of 'virtue and terror' argued that terror was inseparable from virtue in times of crisis — justifying unlimited state violence.",
        "The Terror consumed its own leaders — Robespierre himself was eventually arrested and executed, showing the system had no natural stopping point.",
      ],
      stretch: [
        "Hannah Arendt argued the Terror demonstrated the danger of ideological politics — when abstract principles become ends justifying any means, political violence becomes limitless.",
        "Historians debate whether the Terror was inevitable from revolutionary ideology or a contingent response to genuine military emergency.",
        "The Thermidorian Reaction showed that even revolutionary systems have internal limits when elite self-preservation instincts kick in.",
      ],
    },

    questions: [
      {
        text: "What was the primary political tool of the Reign of Terror?",
        options: [
          "Democratic elections to remove unpopular leaders",
          "Fear and mass execution to suppress opposition",
          "Economic sanctions against enemy factions",
          "Exile of political opponents to French colonies",
        ],
        correct: 1,
        explanation: "The Committee of Public Safety used the threat and reality of execution to maintain control. Fear was not a side effect — it was the mechanism of governance.",
        tier: "core",
      },
      {
        text: "What was the Law of Suspects (1793)?",
        options: [
          "A law requiring trials for all political prisoners",
          "A law that defined treason so broadly that almost anyone could be accused",
          "A law protecting revolutionary leaders from prosecution",
          "A law banning public assembly during wartime",
        ],
        correct: 1,
        explanation: "The Law of Suspects defined 'enemies of the revolution' so broadly — including those who showed insufficient enthusiasm for the republic — that it created climate of total paranoia.",
        tier: "key",
      },
      {
        text: "What fundamental contradiction did the Terror expose within the Revolution?",
        options: [
          "That the French economy could not sustain democratic government",
          "That ideals of liberty and equality were being enforced through authoritarian means",
          "That the military was more powerful than the civilian government",
          "That Robespierre secretly wanted to restore the monarchy",
        ],
        correct: 1,
        explanation: "The Revolution began with the Declaration of the Rights of Man. The Terror systematically violated both liberty and legal equality — revealing deep tension between ideals and practice.",
        tier: "analysis",
      },
      {
        text: "What did Robespierre's own execution ultimately demonstrate about the Terror?",
        options: [
          "That the Committee of Public Safety had been infiltrated by royalists",
          "That the paranoid logic of the system had no natural stopping point — it consumed its own architects",
          "That Napoleon had orchestrated a coup to seize power early",
          "That the French public had turned against the Revolution entirely",
        ],
        correct: 1,
        explanation: "Robespierre's arrest by fellow revolutionary leaders who feared they would be next showed the Terror's logic — suspect everyone, trust no one — made its self-destruction inevitable.",
        tier: "stretch",
      },
    ],

    orderingEvents: [
      { id: 1, text: "Committee of Public Safety formed", correctIndex: 0 },
      { id: 2, text: "Law of Suspects passed", correctIndex: 1 },
      { id: 3, text: "Mass arrests and trials begin", correctIndex: 2 },
      { id: 4, text: "Robespierre reaches peak political power", correctIndex: 3 },
      { id: 5, text: "Robespierre arrested and executed — Terror ends", correctIndex: 4 },
    ],

    swipeScenario: {
      date: "1793",
      situation: "Enemies of the Revolution are increasing. France faces war from outside and betrayal from within.",
      context: "The Committee of Public Safety must decide how to maintain order.",
      leftChoice: "Mass executions",
      rightChoice: "Legal trials",
      leftOutcome: {
        title: "Terror-based control",
        text: "Order is maintained through fear. The guillotine becomes the symbol of the republic.",
        historical: "This is the path taken. While it suppressed opposition, it created a climate where no one was safe — including revolutionary leaders themselves.",
        reactions: [
          { label: "Order imposed", color: "green" },
          { label: "Terror spreads", color: "red" },
        ],
      },
      rightOutcome: {
        title: "Slower, uncertain justice",
        text: "Proper trials take time. Some enemies escape through legal process.",
        historical: "In a genuine military emergency, legal process was seen as too slow. But it would have prevented many unjust deaths.",
        reactions: [
          { label: "Due process", color: "green" },
          { label: "Seen as weak", color: "gray" },
        ],
      },
    },
  },

  /* ── CHAPTER 6 ── */
  {
    id: 6,
    title: "Execution of Louis XVI",
    date: "January 1793",
    keyFigure: "Louis XVI",
    isUnlocked: false,
    isCompleted: false,
    xpReward: 220,
    description: "The king is tried for treason and executed — ending monarchy in France.",

    learn: {
      core: [
        "Louis XVI was executed by guillotine on 21 January 1793, after being convicted of treason.",
        "His death marked the definitive end of absolute monarchy in France.",
        "The execution shocked European monarchies and intensified their opposition to the revolutionary government.",
      ],
      key: [
        "The trial was controversial — some argued a king could not be tried by his own subjects under any legal framework.",
        "The vote for execution was close: 361 for death versus 288 for imprisonment or conditional exile.",
        "Internally, the execution deepened divisions and accelerated the radicalisation leading to the Reign of Terror.",
      ],
      analysis: [
        "Executing the king was not just political — it was a symbolic destruction of the entire concept of divinely-ordained monarchy.",
        "By putting Louis XVI on trial, the Revolution asserted that no individual — including a monarch — stood above the law.",
        "The execution made compromise with European monarchies nearly impossible, locking France into revolutionary war.",
      ],
      stretch: [
        "Hegel interpreted the execution as the moment abstract Enlightenment principles met the concrete terror of their implications.",
        "The close vote reflects genuine revolutionary disagreement — some believed execution would be a propaganda gift to European enemies.",
        "French revolutionaries were aware of Charles I of England's execution in 1649, drawing explicit parallels for both legitimacy and warning.",
      ],
    },

    questions: [
      {
        text: "On what charge was Louis XVI convicted and executed?",
        options: [
          "Financial corruption and misuse of royal funds",
          "Treason against the French nation",
          "Religious heresy against the revolutionary state",
          "Military incompetence leading to French defeats",
        ],
        correct: 1,
        explanation: "Louis XVI was convicted of conspiracy against liberty and treason — specifically for secret communications with foreign powers aimed at restoring his absolute authority.",
        tier: "core",
      },
      {
        text: "How close was the vote on Louis XVI's execution?",
        options: [
          "A landslide — over 90% voted for death",
          "Close — 361 for death versus 288 for imprisonment or exile",
          "Unanimous — all deputies voted for execution",
          "A majority favoured exile, but Robespierre overruled",
        ],
        correct: 1,
        explanation: "361 voted for immediate execution, 288 for some form of imprisonment or exile. The closeness reflects real disagreement about how far the Revolution should go.",
        tier: "key",
      },
      {
        text: "What did putting Louis XVI on trial symbolically assert?",
        options: [
          "That France would restore monarchy after proving royal guilt",
          "That no individual — including a monarch — stood above the law or the nation",
          "That the church no longer had authority over political decisions",
          "That France was adopting a republican constitution based on American principles",
        ],
        correct: 1,
        explanation: "The trial treated the king as a citizen accountable to the nation's laws — rather than as God's representative whose authority was above human judgment.",
        tier: "analysis",
      },
      {
        text: "What historical precedent were French revolutionaries aware of when debating the execution?",
        options: [
          "The assassination of Julius Caesar in 44 BC",
          "The execution of Charles I of England in 1649",
          "The exile of Napoleon's Spanish predecessors in 1808",
          "The abdication of Holy Roman Emperor Charles V in 1556",
        ],
        correct: 1,
        explanation: "The execution of Charles I by the English Parliament was a direct precedent studied by French revolutionaries — both for legitimacy arguments and as a warning about what followed.",
        tier: "stretch",
      },
    ],

    orderingEvents: [
      { id: 1, text: "Louis XVI discovered communicating with foreign powers", correctIndex: 0 },
      { id: 2, text: "Trial of Louis XVI begins in the Convention", correctIndex: 1 },
      { id: 3, text: "Guilty verdict for treason", correctIndex: 2 },
      { id: 4, text: "Close vote — 361 for execution", correctIndex: 3 },
      { id: 5, text: "Louis XVI executed by guillotine", correctIndex: 4 },
    ],

    swipeScenario: {
      date: "January 1793",
      situation: "Louis XVI has been convicted of treason. His fate must be decided.",
      context: "The National Convention debates whether to execute or exile the king.",
      leftChoice: "Execute him",
      rightChoice: "Exile him",
      leftOutcome: {
        title: "Monarchy ends permanently",
        text: "Execution removes any symbolic rallying point for royalists. But it shocks Europe and hardens opposition.",
        historical: "The execution radicalised both the Revolution and its European enemies — making a negotiated peace far more difficult.",
        reactions: [
          { label: "Monarchy ended", color: "green" },
          { label: "War intensifies", color: "red" },
        ],
      },
      rightOutcome: {
        title: "Symbol of monarchy survives",
        text: "Louis lives in exile, becoming a potential rallying point for royalist counter-revolution.",
        historical: "Exile would have preserved a living symbol of legitimate monarchy — potentially undermining the republic for years.",
        reactions: [
          { label: "Less escalation", color: "green" },
          { label: "Royalist threat persists", color: "gray" },
        ],
      },
    },
  },

  /* ── CHAPTER 7 ── */
  {
    id: 7,
    title: "Rise of Napoleon",
    date: "1799",
    keyFigure: "Napoleon Bonaparte",
    isUnlocked: false,
    isCompleted: false,
    xpReward: 250,
    description: "The Revolution ends as Napoleon seizes power — trading liberty for order.",

    learn: {
      core: [
        "By 1799, France was politically unstable after years of revolutionary government and continuous war.",
        "Napoleon Bonaparte rose through military ranks due to brilliant strategic victories.",
        "He seized power in the 18 Brumaire coup and established the Consulate, effectively ending the Revolution.",
      ],
      key: [
        "The Directory — the government preceding Napoleon — was unpopular, corrupt, and militarily dependent on army commanders.",
        "Napoleon presented himself as a stabilising force who could preserve revolutionary gains while ending political chaos.",
        "The Consulate concentrated power in Napoleon's hands while maintaining the surface appearance of republican institutions.",
      ],
      analysis: [
        "Napoleon's rise reflects a recurring historical pattern: periods of revolutionary instability creating conditions for authoritarian consolidation.",
        "The Revolution dismantled old power structures but failed to build durable new ones — creating a vacuum military force could fill.",
        "Napoleon co-opted revolutionary language (liberty, nation, law) while dismantling revolutionary institutions.",
      ],
      stretch: [
        "Historians debate whether Napoleon was the Revolution's completion or betrayal — he codified its legal reforms (Napoleonic Code) while abolishing its political freedoms.",
        "Max Weber's concept of 'charismatic authority' fits Napoleon precisely: his legitimacy came from personal extraordinary qualities, not tradition or law.",
        "Napoleon illustrates the tension between Enlightenment ideals and Realpolitik — ideals are used instrumentally when they serve power, discarded when they don't.",
      ],
    },

    questions: [
      {
        text: "How did Napoleon come to power in 1799?",
        options: [
          "He was elected president of the French Republic",
          "He seized power through a military coup (18 Brumaire)",
          "He was appointed by the National Convention",
          "He inherited power after Robespierre's death",
        ],
        correct: 1,
        explanation: "Napoleon orchestrated the coup of 18 Brumaire, dissolving the Directory and replacing it with the Consulate — with himself as First Consul and effective dictator.",
        tier: "core",
      },
      {
        text: "Why was the Directory vulnerable to Napoleon's coup?",
        options: [
          "It had lost support after executing thousands of royalists",
          "It was unpopular, corrupt, and militarily dependent on army commanders",
          "Napoleon had bribed all members of the Directory",
          "The Directory had already decided to hand power to a military leader",
        ],
        correct: 1,
        explanation: "The Directory was politically weak, widely seen as corrupt, and had become dependent on the military to suppress opposition — making it vulnerable to exactly the coup Napoleon executed.",
        tier: "key",
      },
      {
        text: "What recurring historical pattern does Napoleon's rise illustrate?",
        options: [
          "Democratic republics eventually become monarchies",
          "Military leaders always betray the revolutions they serve",
          "Revolutionary instability creates conditions for authoritarian consolidation",
          "Economic recovery follows political chaos with a 10-year lag",
        ],
        correct: 2,
        explanation: "This pattern — revolution, instability, authoritarian consolidation — appears repeatedly in history: the Roman Republic, 20th-century revolutions, and post-colonial state-building.",
        tier: "analysis",
      },
      {
        text: "Why do historians debate whether Napoleon was the Revolution's completion or betrayal?",
        options: [
          "Because Napoleon restored the monarchy in all but name",
          "Because he codified many revolutionary legal reforms while abolishing its political freedoms",
          "Because Napoleon secretly corresponded with Louis XVI's descendants",
          "Because the Napoleonic Code reversed all revolutionary property reforms",
        ],
        correct: 1,
        explanation: "The Napoleonic Code enshrined revolutionary principles like legal equality — but Napoleon abolished press freedom, rigged elections, and made himself Emperor. He preserved the legal fruits while destroying the political ones.",
        tier: "stretch",
      },
    ],

    orderingEvents: [
      { id: 1, text: "Directory government becomes unstable and corrupt", correctIndex: 0 },
      { id: 2, text: "Napoleon wins series of military victories", correctIndex: 1 },
      { id: 3, text: "18 Brumaire coup planned with key allies", correctIndex: 2 },
      { id: 4, text: "Directory dissolved by force", correctIndex: 3 },
      { id: 5, text: "Consulate established — Napoleon as First Consul", correctIndex: 4 },
    ],

    swipeScenario: {
      date: "November 1799",
      situation: "France is unstable. The Directory is failing. War continues.",
      context: "A powerful military general proposes to take control and restore order.",
      leftChoice: "Military takeover",
      rightChoice: "Restore the republic",
      leftOutcome: {
        title: "Order restored under strong rule",
        text: "Stability returns quickly. Wars are managed effectively. But political freedom is curtailed.",
        historical: "This is what happened. Napoleon's Consulate brought stability but ended genuine republican government in France.",
        reactions: [
          { label: "Stability restored", color: "green" },
          { label: "Liberty curtailed", color: "red" },
        ],
      },
      rightOutcome: {
        title: "Continued instability",
        text: "Without strong leadership, the republic struggles. Political factions continue to clash.",
        historical: "The Directory had already tried this and failed. Without structural reform, instability was likely to continue.",
        reactions: [
          { label: "Freedom preserved", color: "green" },
          { label: "Chaos continues", color: "red" },
        ],
      },
    },
  },
];
