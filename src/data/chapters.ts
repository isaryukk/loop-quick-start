/* ─────────────────────────────────────────────
   src/data/chapter.ts  —  Pure data layer
   Learn content: minimum 3 rich paragraphs at
   core level, expanding with difficulty tier.
───────────────────────────────────────────── */

export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export type LearnContent = {
  core: string[];       // 3 paragraphs — shown to everyone
  key: string[];        // 2–3 more paragraphs — intermediate+
  analysis: string[];   // 2 paragraphs — advanced+
  stretch: string[];    // 2 paragraphs — advanced, highest tier
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

/* ═══════════════════════════════════════════════
   CHAPTER DATA
═══════════════════════════════════════════════ */

export const chapters: Chapter[] = [

  /* ══════════════ CHAPTER 1 ══════════════ */
  {
    id: 1,
    title: "Financial Collapse of France",
    date: "1788–1789",
    keyFigure: "Louis XVI",
    isUnlocked: true,
    isCompleted: false,
    xpReward: 120,
    description: "France enters a deep financial and social crisis driven by debt, inequality, and food shortages — creating the conditions for revolution.",

    learn: {
      core: [
        "By 1788, France was not simply facing a budget shortfall — it was structurally bankrupt. Decades of costly wars, including France's direct support for the American Revolution, had piled up debt so severe that nearly 60% of all government income went solely to paying interest. The treasury was empty, creditors were refusing new loans, and King Louis XVI had no legal way to raise new taxes without summoning a political assembly that had not met in over 175 years. The monarchy had spent itself into a corner it could not escape.",

        "The taxation system made recovery almost impossible. The First Estate (clergy) and Second Estate (nobility) were largely exempt from direct taxation, leaving the Third Estate — merchants, artisans, labourers, and the emerging middle class — to carry virtually the entire fiscal burden of the kingdom. This was not simply unfair; it was structurally suicidal. The groups with the most accumulated wealth contributed almost nothing, while those who could least afford it were taxed most heavily. Every attempt to reform this arrangement was blocked by powerful elites who had no incentive to change a system that protected them.",

        "Two consecutive harvest failures in 1787 and 1788 turned financial crisis into human catastrophe. Grain shortages sent bread prices spiralling upward at precisely the moment when millions of French people had the least money to spend. In Paris, a working labourer might spend 80 to 90 percent of their daily wage on bread alone. When prices doubled and then tripled, the combination of hunger, economic desperation, and political exclusion created a level of social pressure that no royal decree could contain. Bread riots erupted across France, grain convoys were attacked on roads, and local officials attempting to enforce rationing were driven from their posts by angry crowds.",
      ],
      key: [
        "Louis XVI's response to the crisis was characterised by indecision and political weakness at the worst possible moment. He understood reform was necessary and appointed capable finance ministers — including Turgot, Necker, and Calonne — each of whom proposed extending taxation to the nobility and restructuring government spending. Each time, the privileged classes used their political influence to resist, delay, or neutralise reform proposals. Louis XVI consistently lacked the political will to impose reform by force, choosing instead to retreat. By 1789, the repeated failure of moderate reform had closed the window for peaceful resolution entirely.",

        "The scale of France's war debt was staggering even by the standards of the era. France spent approximately 1.3 billion livres supporting the American Revolution — a vast sum that delivered no direct economic return to the French state and left its finances permanently compromised. Unlike Britain, which had developed sophisticated financial institutions including the Bank of England and a mature bond market, France lacked the infrastructure to manage large-scale debt efficiently. The result was a vicious cycle: France borrowed at increasingly punishing interest rates, which required more borrowing to service the debt, which worsened creditworthiness, which raised rates further.",

        "Urban unrest began visibly in 1788, well before the events of 1789 that historians typically mark as the Revolution's opening. Grain warehouses were attacked in dozens of provincial towns. Tax collectors were assaulted. Municipal authorities lost control of local food distribution in several cities. The inability of the royal government to maintain basic order in these episodes sent a clear signal — to the French public, to foreign powers, and to the politically aware within France — that royal authority was already fragmenting under the weight of accumulated crisis.",
      ],
      analysis: [
        "What transformed France's crisis from a financial problem into a revolutionary situation was not any single factor, but the alignment of multiple pressures at the same historical moment. Economic distress, political exclusion, institutional paralysis, and the ideological challenge of Enlightenment thought all converged in 1788–89. Each factor alone might have been managed or absorbed by an adaptable system. Together, they overwhelmed every mechanism the monarchy possessed for maintaining stability. This kind of multi-causal convergence is precisely what distinguishes revolutionary crises from ordinary political difficulties.",

        "The Enlightenment's role in converting economic grievance into political consciousness cannot be overstated. Philosophers including Rousseau, Voltaire, and Montesquieu had spent decades arguing that legitimate authority derived from the consent of the governed rather than divine right, and that natural equality was the birthright of every human being regardless of birth. By 1789, these ideas had filtered from academic salons into the pamphlets, coffeehouses, and conversations of ordinary urban life. When French people began connecting their suffering to political arrangements that systematically concentrated power in the hands of a privileged minority, abstract philosophy became concrete demand for structural change.",
      ],
      stretch: [
        "France's fiscal crisis had a deeply paradoxical relationship with its own foreign policy ambitions. The very intervention that gave France a strategic victory over Britain — support for American independence — was the financial act that pushed the monarchy toward bankruptcy. Historians describe this as a kind of imperial boomerang: the resources spent projecting power abroad ultimately destroyed the domestic political order that funded that power. The American Revolution also returned something more dangerous than debt — it exported Enlightenment republican ideas directly back into a France that was simultaneously too inspired and too economically broken to contain them.",

        "The parallels between France's 1789 crisis and later revolutionary situations have been studied extensively in economic and political history. From the debt-driven instabilities of Latin America in the 1980s to the food-price shocks that preceded the Arab Spring of 2011, the combination of state fiscal collapse, commodity price crises, and political exclusion has repeatedly generated revolutionary conditions. France in 1789 might be understood as history's first fully documented case of what political economists now call a systemic legitimacy crisis — where financial failure does not merely discredit a government, but destroys the population's belief in the entire political order.",
      ],
    },

    questions: [
      {
        text: "What was the primary cause of France's financial crisis by 1788?",
        options: [
          "A collapse in foreign trade and agricultural exports",
          "War debt combined with a deeply unequal taxation system",
          "A banking crisis caused by private lenders refusing to operate",
          "Military spending on domestic repression of early protests",
        ],
        correct: 1,
        explanation: "France had accumulated enormous war debt — especially from supporting the American Revolution — while the tax burden fell almost entirely on the Third Estate. This combination of debt and structural tax inequality made financial recovery impossible without dismantling the entire social order.",
        tier: "core",
      },
      {
        text: "Why did bread price increases cause such severe crisis in 1788–89?",
        options: [
          "Bread was primarily an export product and shortages were artificially created",
          "The government specifically taxed bread to raise emergency revenue",
          "Bread formed the vast majority of the working-class diet, so price rises directly threatened survival",
          "Bakers coordinated a strike, cutting off supply to major cities",
        ],
        correct: 2,
        explanation: "For ordinary French people, bread was not merely one food among many — it was the foundation of daily caloric intake. When harvest failures caused prices to double and triple, working families faced genuine starvation. A Parisian labourer in 1789 might spend nearly 90% of their daily wage on bread alone.",
        tier: "core",
      },
      {
        text: "Why were Louis XVI's reform attempts unsuccessful?",
        options: [
          "He had no interest in governing and left all decisions to advisers",
          "Foreign powers actively blocked French internal reforms through diplomatic pressure",
          "Privileged elites blocked reforms that would have extended taxation to them, and Louis XVI lacked the will to override them",
          "The National Assembly voted down all reform proposals presented by the king",
        ],
        correct: 2,
        explanation: "Louis XVI appointed capable reforming ministers but consistently failed to support them when the nobility and clergy resisted. The aristocracy had strong structural incentives to maintain their tax exemption, and Louis XVI's indecisive character meant he repeatedly retreated rather than forcing the issue.",
        tier: "core",
      },
      {
        text: "What made France's debt crisis particularly difficult to escape?",
        options: [
          "France had no legal mechanism for declaring bankruptcy",
          "The groups with the most wealth were exempt from the taxes needed to service the debt",
          "All French gold reserves had been sent abroad to fund foreign wars",
          "The church controlled all financial institutions and refused to release funds",
        ],
        correct: 1,
        explanation: "This is the structural trap at the heart of the crisis. The clergy and nobility — who collectively held most of France's wealth — paid almost no tax. The Third Estate, who had far less, paid almost everything. Solving the debt required taxing wealth; taxing wealth required dismantling privilege; dismantling privilege required a revolution.",
        tier: "key",
      },
      {
        text: "What irony connects France's financial crisis directly to the American Revolution?",
        options: [
          "American exports flooded French markets after independence, undercutting French producers",
          "France funded American independence to weaken Britain, but the debt and the ideas it spread destabilised France itself",
          "American grain was supposed to replace French harvests during the shortage but arrived too late",
          "American diplomats urged Louis XVI to implement democratic reforms France could not afford",
        ],
        correct: 1,
        explanation: "France's intervention in the American Revolution accelerated its debt to near-catastrophic levels AND brought republican Enlightenment ideas back into a society now in economic crisis. France aimed to weaken its great rival Britain — and succeeded strategically — but at a domestic cost that proved terminal.",
        tier: "stretch",
      },
    ],

    orderingEvents: [
      { id: 1, text: "War debt accumulates from American Revolution funding", correctIndex: 0 },
      { id: 2, text: "Consecutive harvest failures devastate grain supply", correctIndex: 1 },
      { id: 3, text: "Bread prices double and triple across France", correctIndex: 2 },
      { id: 4, text: "Urban food riots and grain convoy attacks spread", correctIndex: 3 },
      { id: 5, text: "Political crisis forces Louis XVI to call Estates-General", correctIndex: 4 },
    ],

    swipeScenario: {
      date: "1789",
      situation: "Paris is starving. Bread riots are spreading and royal authority is visibly weakening.",
      context: "You advise King Louis XVI on how to respond to the food crisis before it becomes a political one.",
      leftChoice: "Raise Taxes",
      rightChoice: "Subsidise Grain",
      leftOutcome: {
        title: "Taxation triggers revolt",
        text: "Raising taxes on a population already spending 90% of their wages on bread turns economic desperation into open rebellion. The measure collapses within weeks as crowds refuse to comply and officials flee.",
        historical: "This mirrors real policies that accelerated revolutionary sentiment. Every additional tax burden on the Third Estate increased demands for the entire system to be abolished, not merely reformed.",
        reactions: [{ label: "Anger surges", color: "red" }, { label: "Debt unchanged", color: "gray" }],
      },
      rightOutcome: {
        title: "Temporary relief",
        text: "Subsidised grain brings food prices down briefly. Unrest slows. But the treasury, already bankrupt, cannot sustain the programme — and the structural debt that caused the crisis grows larger.",
        historical: "Short-term grain subsidies were tried by several French ministers in preceding years. They bought temporary calm but could not address the structural collapse underneath. The crisis was postponed, not resolved.",
        reactions: [{ label: "Short calm", color: "green" }, { label: "Debt worsens", color: "red" }],
      },
    },
  },

  /* ══════════════ CHAPTER 2 ══════════════ */
  {
    id: 2,
    title: "The Estates-General Crisis",
    date: "May 1789",
    keyFigure: "Louis XVI",
    isUnlocked: false,
    isCompleted: false,
    xpReward: 140,
    description: "The king calls the Estates-General for the first time in 175 years — and it immediately fractures over the fundamental question of who has the right to speak for France.",

    learn: {
      core: [
        "The Estates-General was an ancient consultative assembly representing the three estates of French society: the clergy (First Estate), the nobility (Second Estate), and everyone else — nearly 98% of the population — in the Third Estate. It had not been convened since 1614, meaning that for 175 years, French kings had governed without seeking any formal approval from their subjects. Louis XVI called it in 1789 as a last resort, needing political cover to push through tax reforms that the nobility had repeatedly blocked. He did not anticipate that the assembly would become the forum in which the entire political order would be challenged.",

        "The moment the Estates-General opened, it fractured immediately over a single procedural question: how should voting work? Under the traditional rules, each estate cast one vote — meaning the First and Second Estates together always held two votes against the Third Estate's one. Since the clergy and nobility almost always voted together to protect their shared privileges, this structure guaranteed that the minority could permanently outvote the majority, regardless of how many delegates the Third Estate sent. The Third Estate's deputies — many of them lawyers, doctors, and educated professionals — recognised this immediately and refused to accept it.",

        "The Third Estate demanded voting by head rather than by order — that is, each individual delegate casting one vote, which would reflect their numerical majority of 578 out of 1,165 delegates. This was not merely a procedural request; it was a demand that political representation be based on population rather than on inherited status. The nobility and clergy understood exactly what this meant and refused. What had begun as a fiscal crisis rapidly became a constitutional confrontation about the most fundamental question in politics: who has the legitimate right to speak for the nation?",
      ],
      key: [
        "The deadlock in the Estates-General exposed a contradiction that had been building in French political culture for decades. The Enlightenment had spread ideas about natural equality, rational governance, and the social contract throughout educated French society. Many Third Estate deputies had read Rousseau, Locke, and Montesquieu. They arrived at Versailles not merely as tax-payers' representatives but as people who genuinely believed that legitimate government required the consent of the governed — and that the governed, in any meaningful sense, was the 98% of France they represented, not the privileged 2%.",

        "The political stakes could not have been higher. Under estate-based voting, the clergy and nobility could block any reform that threatened their privileges, regardless of how many people supported that reform. Under headcount voting, the Third Estate — if joined by even a small number of sympathetic clergy or liberal nobles — would hold an effective majority. This would allow them to pass tax reforms, limit royal power, and potentially rewrite the entire constitutional basis of French governance. It was, in other words, a vote not just about procedure but about whether the old France or a new France would win.",

        "Several sympathetic clergy members and liberal-minded nobles began breaking ranks and joining the Third Estate's position as the standoff continued. This defection was significant: it showed that the estate system was already losing its cohesion from within, and that the sharp boundary between privileged and unprivileged France was more permeable than the traditional structure suggested. It also gave the Third Estate deputies the confidence to take a more radical step — declaring that they alone constituted a legitimate national assembly, with or without the other two orders.",
      ],
      analysis: [
        "The Estates-General dispute reveals something important about how revolutions begin. They rarely start with violence or dramatic confrontation — they begin with procedural disagreements that force deeper questions to the surface. The voting-method debate was, on its face, a technical matter. But beneath it lay the irreconcilable conflict between two fundamentally different theories of political legitimacy: one based on inherited status and divine sanction, the other based on natural equality and popular sovereignty. Once that deeper conflict was visible, no procedural compromise could resolve it.",

        "The Third Estate's approach was strategically sophisticated in a way that historians sometimes underappreciate. By framing their demands in the language of national representation rather than class interest, they claimed the moral high ground. They were not, they argued, representing the poor against the rich — they were representing France against a privileged minority that had captured the state for its own benefit. This framing made it very difficult for the king to simply dismiss their claims without appearing to side explicitly with a self-serving elite against the nation as a whole.",
      ],
      stretch: [
        "Political theorists identify the Estates-General crisis as a textbook 'veto-player' crisis — a situation in which multiple actors each hold blocking power, making collective decisions structurally impossible. The king could veto the assembly; the nobility could veto reform; the Third Estate could refuse to participate in a rigged process. With no mechanism capable of forcing resolution, the assembly was paralysed. The only exit from a veto-player crisis, as political scientists note, is either one player overwhelming the others by force or the entire system being replaced. The National Assembly was that replacement.",

        "Abbé Sieyès's pamphlet 'What is the Third Estate?', published in January 1789 just months before the Estates-General opened, had already framed the ideological stakes with devastating clarity. His opening questions — 'What is the Third Estate? Everything. What has it been until now in the political order? Nothing. What does it demand? To become something.' — circulated widely and gave the Third Estate's deputies a shared intellectual framework before they even arrived at Versailles. The Estates-General crisis was not spontaneous; it had been theorised and anticipated.",
      ],
    },

    questions: [
      {
        text: "Why was the Estates-General called in 1789 for the first time since 1614?",
        options: [
          "To celebrate 175 years of French monarchical stability",
          "To declare war on Austria and Prussia",
          "To address France's financial crisis and gain political approval for new taxes",
          "To formally elect a constitutional monarchy",
        ],
        correct: 2,
        explanation: "Louis XVI had exhausted every other option. Only the Estates-General had the traditional authority to sanction new taxes — but calling it opened a political process the king could not control.",
        tier: "core",
      },
      {
        text: "What was the fundamental dispute about voting in the Estates-General?",
        options: [
          "Whether the king should have a personal vote in the assembly",
          "Whether voting should be by estate (giving minority elites two votes to one) or by head (reflecting population)",
          "Whether foreign observers should be allowed to attend sessions",
          "Whether clergy should be able to vote on financial matters affecting the church",
        ],
        correct: 1,
        explanation: "Voting by estate let two minority groups (clergy + nobility) permanently outvote 98% of the population. Voting by head would give the Third Estate real power for the first time in history.",
        tier: "core",
      },
      {
        text: "Why did the nobility resist the Third Estate's demands so strongly?",
        options: [
          "They believed the Third Estate lacked sufficient education to participate in governance",
          "Estate-based voting was their structural guarantee of political dominance — losing it meant losing everything",
          "Royal protocol required unanimous consent before any procedural changes",
          "The clergy had privately promised the nobility full support in exchange for tax exemptions",
        ],
        correct: 1,
        explanation: "Under estate-based voting, the nobility and clergy could block any reform threatening their privileges. Headcount voting would strip away that protection entirely. For the nobility, this was existential — the difference between maintaining power indefinitely or losing it immediately.",
        tier: "key",
      },
      {
        text: "How did the Estates-General debate reveal the limits of reforming the Ancien Régime from within?",
        options: [
          "It showed that the king had secretly opposed all reform from the start",
          "It demonstrated that the institutional structure gave veto power to exactly the groups who benefited from the status quo",
          "It proved that the Third Estate was too radical to work within any existing framework",
          "It revealed that the Enlightenment had had no real influence on French political thought",
        ],
        correct: 1,
        explanation: "The groups most needing to be reformed — the tax-exempt privileged orders — held the institutional power to block that reform. This is the definition of a system that cannot reform itself, and it made some form of structural rupture almost inevitable.",
        tier: "analysis",
      },
      {
        text: "What did Sieyès mean when he wrote that the Third Estate was 'everything' but had been 'nothing' in the political order?",
        options: [
          "That the Third Estate produced all of France's wealth and labour but had no political representation proportional to that contribution",
          "That Third Estate members were morally superior to the nobility and clergy",
          "That the Third Estate had secretly controlled France through economic power for decades",
          "That the Third Estate's population size made all other political actors irrelevant",
        ],
        correct: 0,
        explanation: "Sieyès's point was that the Third Estate performed all the productive functions of French society — farming, manufacturing, trade, professional services — while the privileged orders contributed almost nothing economically or militarily, yet held all political power. This mismatch between contribution and representation was the core injustice.",
        tier: "stretch",
      },
    ],

    orderingEvents: [
      { id: 1, text: "Estates-General summoned by Louis XVI for first time since 1614", correctIndex: 0 },
      { id: 2, text: "Dispute erupts immediately over voting rules", correctIndex: 1 },
      { id: 3, text: "Third Estate demands voting by individual headcount", correctIndex: 2 },
      { id: 4, text: "Clergy and nobility refuse — deadlock forms", correctIndex: 3 },
      { id: 5, text: "Third Estate begins planning to act independently", correctIndex: 4 },
    ],

    swipeScenario: {
      date: "May 1789",
      situation: "The Estates-General is paralysed. The voting dispute threatens to collapse the entire assembly before it has done anything.",
      context: "As an adviser to Louis XVI, you must recommend how to resolve the standoff.",
      leftChoice: "Vote by Estate",
      rightChoice: "Vote by Population",
      leftOutcome: {
        title: "Elite control maintained",
        text: "The traditional voting method is upheld. Clergy and nobility can continue blocking any reform that threatens their privileges. The Third Estate, outvoted on every measure, grows increasingly radicalised.",
        historical: "Maintaining estate-based voting was the path the nobility fought for. In the short term it preserved their power — but it made the National Assembly's formation and the eventual breakdown of the entire system almost inevitable.",
        reactions: [{ label: "Elite hold power", color: "green" }, { label: "Resentment builds", color: "red" }],
      },
      rightOutcome: {
        title: "Democratic shift begins",
        text: "Headcount voting is adopted. The Third Estate gains real legislative influence for the first time. The political centre of gravity shifts visibly toward the majority of France.",
        historical: "This is effectively what happened after the National Assembly formed. The shift to representative politics was the first genuine rupture with the old order — and once made, it could not be taken back.",
        reactions: [{ label: "Power shifts", color: "green" }, { label: "Nobles resist", color: "red" }],
      },
    },
  },

  /* ══════════════ CHAPTER 3 ══════════════ */
  {
    id: 3,
    title: "Storming of the Bastille",
    date: "14 July 1789",
    keyFigure: "Parisian Crowd",
    isUnlocked: false,
    isCompleted: false,
    xpReward: 160,
    description: "Armed Parisians storm the Bastille fortress — transforming a political crisis into a full revolution and permanently breaking the state's monopoly on force.",

    learn: {
      core: [
        "On the morning of 14 July 1789, Paris was gripped by rumours that the king was about to use military force to dissolve the National Assembly, which had been meeting defiantly for weeks. Troops had been visibly massing around Versailles and Paris, and when Louis XVI dismissed the popular finance minister Necker — seen as the last reform-minded voice in government — Parisian crowds interpreted it as a declaration of war against the people. Within hours, a crowd of thousands had gathered and begun marching toward the Bastille, a royal fortress in the east of the city.",

        "The Bastille itself was, by 1789, a nearly empty prison. It held only seven inmates at the time of the attack, and its days as a functioning jail were already numbered — the government had considered demolishing it. But as a symbol, it was powerful beyond its practical significance. The Bastille represented the darkest face of royal absolutism: the lettre de cachet, a royal order that could imprison any person indefinitely without trial or explanation. The fortress stood for the principle that the king's will was above the law, above justice, and above the rights of individual subjects. Destroying it meant destroying that principle.",

        "The attack unfolded with improvised violence. The crowd first negotiated with the governor, the Marquis de Launay, who initially agreed to talks but refused to lower the drawbridge or hand over the gunpowder stored inside. As negotiations stalled, soldiers in the crowd fired on the fortress and eventually breached the outer courtyard. When the inner gates were finally opened after hours of fighting, the governor was seized, marched through the streets, and killed by the crowd. The fortress was systematically dismantled over the following days. News of the Bastille's fall spread across France within 24 hours — and with it, the unmistakable signal that the Revolution had truly begun.",
      ],
      key: [
        "The Bastille's military significance was minor; its symbolic significance was total. When news of its fall reached Versailles, the court was shaken not because France had lost a strategic asset — it hadn't — but because it meant the king's own subjects had violently overridden royal authority in the capital city and faced no effective consequence. The royal army did not march. No punishment followed. The state had been defied and had done nothing. This signal — that the government lacked either the will or the ability to use force against the population — changed everything about how both sides understood their position.",

        "The crowd's primary tactical goal was not to free prisoners but to seize the arms and gunpowder stored inside the Bastille. In the preceding days, Parisians had already broken into the Hôtel des Invalides and taken thousands of muskets from its arsenal, but without powder, the weapons were useless. The Bastille held the gunpowder. This detail matters because it clarifies the nature of the crowd's action: it was not a spontaneous emotional outbreak but a strategically motivated attempt to arm the population against a feared military crackdown on the newly formed National Assembly.",

        "The events of 14 July triggered an immediate national cascade. Within days, uprisings broke out in cities across France — Lyon, Bordeaux, Rennes, Strasbourg — as local populations learned of the Bastille's fall and interpreted it as permission to act. Provincial governors were dismissed or fled. Local militias formed. Royal authority in much of France effectively collapsed within a week of the Bastille's fall, not because of any coordinated plan, but because a single dramatic event had demonstrated that popular action could succeed against the state's power.",
      ],
      analysis: [
        "The Bastille's fall illustrates a crucial mechanism in revolutionary politics: the threshold effect. Before July 14th, most Parisians were unwilling to take violent action against the state, not because they were satisfied with the regime, but because they feared being crushed. The Bastille changed the calculation. Once it was clear that a large crowd could take on a royal fortress and win, the perceived cost of action dropped dramatically while the perceived likelihood of success rose. Each successful act of resistance lowered the threshold for the next.",

        "Historians have debated how 'popular' the storming of the Bastille truly was. Recent scholarship suggests the event was partly shaped by political networks — radical journalists, members of the newly formed National Guard, organisers connected to political clubs — who helped direct crowd energy toward the Bastille specifically. This does not make the event less significant, but it does complicate the romantic image of a purely spontaneous popular uprising. The Revolution was already developing an organisational infrastructure that could channel public anger toward specific targets.",
      ],
      stretch: [
        "Alexis de Tocqueville, writing decades later, observed that revolutions rarely occur when oppression is at its absolute maximum. They occur most often when conditions are beginning to improve — when rising expectations collide with the continued reality of constraint. France in 1789 had been experiencing cautious reform efforts, Enlightenment optimism, and growing political engagement. This had raised expectations about what was possible. The Bastille's fall can be read as the moment when those raised expectations finally collided with the brick wall of royal resistance — and refused to accept it.",

        "The legal and political architecture of the Bastille — specifically the lettre de cachet system it embodied — was the direct target of one of the Revolution's most important early documents: the Declaration of the Rights of Man, adopted weeks later. Article 7 explicitly prohibited arbitrary arrest and detention, striking at the core of what the Bastille had represented. The physical destruction of the fortress and the legal abolition of the power it symbolised were two sides of the same revolutionary act — one material, one textual.",
      ],
    },

    questions: [
      {
        text: "Why did Parisians attack the Bastille on 14 July 1789?",
        options: [
          "To free the large number of political prisoners they believed were held inside",
          "To protest the high price of bread at the fortress's market",
          "To seize weapons and powder, and to strike against the symbol of royal tyranny amid fears of military repression",
          "To burn the royal tax records stored in its archives",
        ],
        correct: 2,
        explanation: "The crowd's motivations were layered: seizing gunpowder for the muskets already taken from the Invalides, and destroying the symbol of royal arbitrary power. The Bastille had only 7 prisoners — freeing them was incidental, not the purpose.",
        tier: "core",
      },
      {
        text: "What did the Bastille symbolise to ordinary French people?",
        options: [
          "Military might and France's historical victories",
          "Royal tyranny — the power to imprison anyone indefinitely without trial",
          "Economic inequality and the wealth of the aristocracy",
          "The church's political influence over the monarchy",
        ],
        correct: 1,
        explanation: "The lettre de cachet allowed the king to imprison anyone, at will, without charge, trial, or explanation. The Bastille was where those people went. Destroying it meant symbolically ending the principle that the king's will stood above individual rights.",
        tier: "core",
      },
      {
        text: "Why was the monarchy's failure to respond to the Bastille's fall so significant?",
        options: [
          "It meant France had no military left to defend itself from foreign invasion",
          "It signalled that the state lacked either the will or ability to use force against its own population — changing both sides' calculations permanently",
          "Louis XVI secretly approved of the Bastille's destruction as a reform signal",
          "The army refused to march because they supported the Revolution entirely",
        ],
        correct: 1,
        explanation: "When the royal army did not respond to the Bastille's fall, it demonstrated the government's effective paralysis. Once the population knew the state would not or could not crush resistance, the threshold for further action dropped dramatically across France.",
        tier: "key",
      },
      {
        text: "What does the 'threshold effect' in revolutionary politics explain about the Bastille's impact?",
        options: [
          "That revolutions always begin at medieval fortresses because of their symbolic value",
          "That once a successful act of resistance occurs, it lowers the perceived cost of further action and raises expectations of success across the population",
          "That all political change requires a single dramatic triggering event to succeed",
          "That urban populations are always more revolutionary than rural ones because of density",
        ],
        correct: 1,
        explanation: "Before July 14th, most people feared acting against the state. The successful storming of the Bastille showed that popular action could overcome royal force. This 'proof of concept' dramatically changed the risk calculus for millions of people across France — and triggered a national cascade of uprisings within days.",
        tier: "analysis",
      },
      {
        text: "How did the Declaration of the Rights of Man directly respond to what the Bastille represented?",
        options: [
          "It ordered the physical demolition of all remaining royal fortresses in France",
          "Article 7 explicitly prohibited arbitrary arrest and detention — legally abolishing the power the Bastille had embodied",
          "It transferred ownership of all royal prisons to the newly formed National Assembly",
          "It established a new court system to retry all prisoners held without charge",
        ],
        correct: 1,
        explanation: "The physical destruction of the Bastille and the legal abolition of arbitrary imprisonment were two sides of the same revolutionary act. The Declaration of Rights did in law what the crowd had done in stone.",
        tier: "stretch",
      },
    ],

    orderingEvents: [
      { id: 1, text: "Louis XVI dismisses finance minister Necker — crowds interpret it as attack on reform", correctIndex: 0 },
      { id: 2, text: "Parisians break into the Invalides and seize muskets", correctIndex: 1 },
      { id: 3, text: "Crowd marches to the Bastille seeking gunpowder", correctIndex: 2 },
      { id: 4, text: "Negotiations fail — the fortress is stormed and governor killed", correctIndex: 3 },
      { id: 5, text: "News spreads — uprisings cascade across France within days", correctIndex: 4 },
    ],

    swipeScenario: {
      date: "14 July 1789",
      situation: "Thousands of armed Parisians surround the Bastille. Negotiations have broken down.",
      context: "You are Governor de Launay. You must decide how to respond to the crowd.",
      leftChoice: "Defend the fortress",
      rightChoice: "Surrender and negotiate",
      leftOutcome: {
        title: "Violent escalation",
        text: "Armed resistance leads to hours of fighting, dozens of casualties on both sides, and ultimately the fortress falls anyway. De Launay is seized and killed in the streets.",
        historical: "This is exactly what happened historically. Resistance did not prevent the Bastille's fall — it only increased the bloodshed and inflamed public anger further across France.",
        reactions: [{ label: "Bloodshed peaks", color: "red" }, { label: "Revolution accelerates", color: "red" }],
      },
      rightOutcome: {
        title: "Controlled handover",
        text: "The fortress is handed over without major violence. The symbolic outcome is identical — the Bastille has fallen — but casualties are minimised and the governor survives.",
        historical: "Some historians believe early negotiated surrender was de Launay's best option. The Revolution's momentum was already unstoppable — controlling its immediate violence was the only variable within his power.",
        reactions: [{ label: "Less bloodshed", color: "green" }, { label: "Revolution continues", color: "gray" }],
      },
    },
  },

  /* ══════════════ CHAPTER 4 ══════════════ */
  {
    id: 4,
    title: "The National Assembly & Tennis Court Oath",
    date: "June 1789",
    keyFigure: "Third Estate Deputies",
    isUnlocked: false,
    isCompleted: false,
    xpReward: 180,
    description: "The Third Estate breaks from the Estates-General, declares itself the National Assembly, and swears to create a constitution — directly challenging the foundations of royal authority.",

    learn: {
      core: [
        "After weeks of deadlock in the Estates-General, the Third Estate made its decisive move on 17 June 1789. Led by deputies including the lawyer Jean-Sylvain Bailly and the radical clergyman Abbé Sieyès, they unilaterally declared themselves the National Assembly — claiming not to represent one-third of France, but France as a whole. This was not merely a procedural manoeuvre; it was a constitutional revolution. By claiming to speak for the nation rather than for an estate, the deputies were asserting that political legitimacy came from the people, not from the king's invitation or the traditional three-estate structure.",

        "Louis XVI's response was to lock the Third Estate deputies out of their usual meeting hall. When they arrived on the morning of 20 June, they found the doors bolted and royal guards posted outside. Rather than accepting this as a signal to disperse, the deputies walked to a nearby indoor tennis court — the Jeu de Paume — and there, in an improvised space with no formal trappings of power, they took one of the most significant oaths in European history. By a vote of 576 to 1, they swore not to dissolve until France had a written constitution. The single dissenting vote came from a deputy who argued they should disperse and reconvene elsewhere — a procedural objection, not a rejection of the cause.",

        "The Tennis Court Oath was remarkable not just for what it said but for what it demonstrated. In taking the oath, nearly 600 deputies — lawyers, merchants, doctors, minor clergy — showed they were prepared to defy royal authority directly and collectively. The oath was a public, binding commitment that created a political community with shared stakes in a common project. If any one of them backed down, all of them failed. The oath transformed a collection of frustrated delegates into something closer to a revolutionary movement — one with a clear goal, a shared commitment, and the courage to maintain it under royal pressure.",
      ],
      key: [
        "Within days of the Tennis Court Oath, the political situation shifted dramatically in the National Assembly's favour. Sympathetic clergy members began crossing over to join the Assembly. Then, under pressure from his more liberal advisers, Louis XVI appeared to concede: he instructed the remaining clergy and nobility to join the National Assembly on 27 June. This apparent royal capitulation was strategically significant. By recognising the National Assembly — even grudgingly — the king had legitimised the body he had tried to prevent. He had acknowledged that its authority was real enough to require his endorsement rather than dismissal.",

        "The Assembly's first priority was to establish itself as a permanent constitutional body. Its members created internal committees, adopted procedural rules, and began drafting legislation — acting, in other words, as a governing body rather than a protest movement. This rapid institutionalisation was crucial. Revolutionary moments are fragile: without organisation, they dissipate. The National Assembly's ability to quickly build the infrastructure of a governing institution gave the Revolution a durability it might otherwise have lacked.",

        "The composition of the National Assembly itself told an important story about France's social transformation. Among its members were not traditional landed aristocrats or senior clergy, but professional men — lawyers, physicians, local officials — who had risen through merit in a society that still officially rewarded birth. These were people who had succeeded despite the system, not because of it. Their very presence in an assembly challenging royal authority represented the emergence of a new social class that the old order had created but could no longer contain.",
      ],
      analysis: [
        "The National Assembly's formation represents what constitutional theorists call a 'constituent power' moment — the rarest and most consequential event in political life. Ordinary legislation works within an existing constitutional framework; constituent power creates the framework itself. By claiming the authority to write a constitution, the National Assembly was not passing a law within the existing system — it was declaring the right to create an entirely new system from the ground up. This is categorically different from reform; it is replacement.",

        "Louis XVI's recognition of the National Assembly, forced though it was, created an immediate legitimacy paradox. If he had recognised it, the Assembly's authority was real. But if its authority was real, it was no longer dependent on royal recognition — it derived its power from the nation it claimed to represent. The king had backed himself into a position where refusing to recognise the Assembly would have been an act of war against the French nation, while recognising it meant accepting the permanent curtailment of his own authority. There was no comfortable middle ground.",
      ],
      stretch: [
        "The Tennis Court Oath has an interesting relationship with the idea of performative political action — acts whose significance lies not in what they accomplish directly but in the commitment they publicly create. By swearing collectively and on record, the deputies made retreat much more costly than advance. They had staked their reputations, and in some cases their safety, on the constitutional project. Scholars of collective action theory note that public oaths function as credible commitment devices — they change the incentive structure for everyone who takes them by making defection socially and politically devastating.",

        "The National Assembly's constitutional project drew heavily on two recent precedents: the British constitutional tradition (going back to Magna Carta and the 1689 Bill of Rights) and the American constitutional experiment of 1787. Many deputies had read the Federalist Papers. Some, including Lafayette, had fought in the American Revolution. The Atlantic dimension of the French Revolution is often underemphasised: the Tennis Court Oath was partly a French response to questions that Americans had just answered — and an attempt to go further, building a constitutional order that acknowledged no hereditary privilege whatsoever.",
      ],
    },

    questions: [
      {
        text: "What did the Third Estate declare itself on 17 June 1789?",
        options: [
          "The Revolutionary Council of France",
          "The National Assembly — claiming to represent the French nation, not merely one estate",
          "The People's Constitutional Convention",
          "The Committee of Public Safety",
        ],
        correct: 1,
        explanation: "By declaring itself the National Assembly, the Third Estate made a constitutional claim: that it represented France as a whole, and that political authority came from the nation rather than from royal invitation or traditional estate structure.",
        tier: "core",
      },
      {
        text: "Why was the Tennis Court Oath significant beyond its immediate content?",
        options: [
          "It was the first legal document to use the word 'citizen' in French law",
          "It demonstrated that nearly 600 deputies were prepared to defy royal authority publicly and collectively — transforming delegates into a movement",
          "It gave the National Assembly military authority over the royal army",
          "It was signed in the presence of Louis XVI himself, giving it royal sanction",
        ],
        correct: 1,
        explanation: "The Oath's significance was as much psychological and political as textual. By taking a public, binding collective commitment, the deputies created shared stakes in a common project — making retreat far more costly than advance, and transforming individual frustration into collective revolutionary will.",
        tier: "core",
      },
      {
        text: "What was the political consequence of Louis XVI recognising the National Assembly?",
        options: [
          "It ended the Revolution by giving reformers what they had asked for",
          "It created a legitimacy paradox: recognising the Assembly meant acknowledging its authority, which then no longer depended on royal approval",
          "It transferred executive power from the king to the Assembly immediately",
          "It required the clergy and nobility to dissolve their own estates permanently",
        ],
        correct: 1,
        explanation: "Royal recognition was a trap Louis XVI could not escape. Refusing to recognise the Assembly meant war with the majority of France; recognising it meant acknowledging an authority independent of his own. Either way, absolute monarchy was over.",
        tier: "key",
      },
      {
        text: "What does the Tennis Court Oath illustrate about 'credible commitment devices' in political action?",
        options: [
          "That written documents are always more legally binding than spoken oaths",
          "That public collective oaths change incentive structures by making defection socially and politically devastating — turning individual actors into a unified movement",
          "That constitutional assemblies only succeed when they meet in unusual venues",
          "That radical political change requires the endorsement of traditional institutions to succeed",
        ],
        correct: 1,
        explanation: "Public oaths in front of hundreds of witnesses create accountability that private decisions cannot. By staking their reputations publicly, the deputies made it extremely difficult for any individual to back down — aligning everyone's interests with collective success.",
        tier: "stretch",
      },
    ],

    orderingEvents: [
      { id: 1, text: "Third Estate deputies locked out of their meeting hall by royal order", correctIndex: 0 },
      { id: 2, text: "Deputies move to nearby tennis court (Jeu de Paume)", correctIndex: 1 },
      { id: 3, text: "Tennis Court Oath sworn — 576 to 1", correctIndex: 2 },
      { id: 4, text: "National Assembly formally declared on 17 June", correctIndex: 3 },
      { id: 5, text: "Louis XVI instructs clergy and nobility to join the Assembly", correctIndex: 4 },
    ],

    swipeScenario: {
      date: "June 1789",
      situation: "The National Assembly has been declared. Louis XVI must decide how to respond.",
      context: "Military force is available. But so is negotiation. The choice will define his reign.",
      leftChoice: "Dissolve by force",
      rightChoice: "Recognise the Assembly",
      leftOutcome: {
        title: "Repression triggers war",
        text: "Royal troops are ordered to disperse the Assembly. Deputies refuse to leave. Street fighting breaks out in Paris. The attempted crackdown becomes the Revolution's declaration of war.",
        historical: "Using force against the Assembly would almost certainly have provoked immediate armed uprising. Louis XVI's apparent strength of hand in 1789 was largely illusory — the troops were unreliable and the public mood overwhelmingly hostile.",
        reactions: [{ label: "Conflict erupts", color: "red" }, { label: "Revolution intensifies", color: "red" }],
      },
      rightOutcome: {
        title: "Power shifts irrevocably",
        text: "The king recognises the Assembly. Political authority begins flowing visibly away from the crown toward the nation's elected representatives.",
        historical: "This is what happened — Louis XVI capitulated. It preserved short-term peace but permanently weakened royal authority. The monarchy that emerged from this moment was fundamentally different from what had existed before.",
        reactions: [{ label: "Peace maintained", color: "green" }, { label: "Royal power declines", color: "gray" }],
      },
    },
  },

  /* ══════════════ CHAPTER 5 ══════════════ */
  {
    id: 5,
    title: "Reign of Terror",
    date: "1793–1794",
    keyFigure: "Robespierre",
    isUnlocked: false,
    isCompleted: false,
    xpReward: 200,
    description: "The Revolution turns against itself. The Committee of Public Safety uses mass execution, informants, and political paranoia to maintain power — consuming its own architects in the process.",

    learn: {
      core: [
        "By 1793, the French Revolution had entered its most violent and ideologically extreme phase. France was simultaneously fighting wars on multiple fronts against Austria, Prussia, Britain, and Spain, while battling internal counter-revolutionary uprisings in regions like the Vendée, where royalist and Catholic sentiment remained strong. In this atmosphere of genuine crisis and perceived existential threat, the National Convention granted extraordinary emergency powers to a twelve-member executive body called the Committee of Public Safety. Under the effective leadership of Maximilien Robespierre — a lawyer from Arras who had been an early champion of popular rights — the Committee quickly transformed from a wartime emergency body into the central instrument of revolutionary terror.",

        "The scale of the Terror was staggering. Between September 1793 and July 1794, approximately 17,000 people were officially executed — the majority by guillotine — with an estimated 40,000 more dying in prison or without formal trial. The victims were not drawn exclusively from the nobility or clergy; they included former revolutionary leaders, moderate republicans, Girondin politicians who had supported the Revolution from its earliest days, and ordinary people whose expressions of doubt, religious practice, or commercial activity had attracted denunciation. The Law of Suspects, passed in September 1793, defined potential enemies of the republic so broadly that it effectively criminalised scepticism itself.",

        "Robespierre justified the Terror through a coherent — if terrifying — political logic. In his view, the republic was surrounded by enemies both external and internal, and virtue could only be defended through force. He argued that terror and virtue were inseparable in a time of revolutionary crisis: without terror, virtue was powerless; without virtue, terror was merely criminal. This framework allowed him to authorise executions not just of genuine counter-revolutionaries but of anyone deemed insufficiently enthusiastic for the republic — including, eventually, other revolutionary leaders who challenged his authority. The Terror was not irrational violence; it was systematic state violence built on a coherent, if monstrous, political philosophy.",
      ],
      key: [
        "The Committee of Public Safety's power rested on several interlocking mechanisms that reinforced each other. The Revolutionary Tribunals operated without normal legal protections — the accused had no right to call witnesses in their defence, trials were often concluded in hours, and the only available sentences were acquittal or death. The network of local surveillance committees, established across France, encouraged citizens to report neighbours, colleagues, and family members for counter-revolutionary activity. The constant threat of denunciation meant that private dissent — even private thought — became dangerous. This is the defining characteristic of totalitarian terror: it does not merely punish action; it attempts to control consciousness.",

        "The Terror's most revealing feature was its escalation over time. What began as emergency measures against genuine enemies of the state gradually expanded in scope until it was consuming the Revolution's own leadership. Danton, who had been one of the most important figures of the early Revolution and had himself authorised violent measures, was arrested and executed in April 1794 on Robespierre's orders. The Hébertists — radical revolutionaries who had pushed for more extreme measures — were also purged. By the summer of 1794, the category of 'enemy of the republic' had expanded so broadly that almost anyone could plausibly be included, including people who had spent years risking their lives for the Revolution.",

        "The Terror ended abruptly with the Thermidorian Reaction on 9 Thermidor Year II (27 July 1794). Members of the National Convention who feared they were next on Robespierre's list conspired to have him arrested during a session. He was seized along with close allies, and executed the following day without trial — exactly the fate he had imposed on hundreds of others. The speed of his fall was extraordinary: a man who had controlled France through terror was stripped of power in a single afternoon by the people who had enabled him. The Terror's internal logic had finally consumed its chief architect.",
      ],
      analysis: [
        "The Reign of Terror presents one of political history's most disturbing case studies in what happens when ideological purity becomes the supreme political value. Robespierre and his colleagues were not cynics — they genuinely believed they were acting to protect the republic and its ideals of liberty and equality. But by making ideological conformity a matter of life and death, they created a political environment in which no one could safely express doubt, disagreement, or nuance. The result was that the Revolution became its own enemy: it destroyed the conditions of free political life that had been its founding purpose.",

        "The Terror also reveals the specific danger of emergency powers granted without time limits or external checks. The Committee of Public Safety was created as a temporary wartime measure. But emergency powers have a tendency to become self-perpetuating — each crisis justifies their continuation, and those wielding them develop institutional interests in maintaining them. Without an independent judiciary, a free press, or genuine parliamentary oversight, there was no mechanism to apply brakes to the escalation. The lesson was absorbed — imperfectly — by later constitutional designers who built sunset clauses and judicial review into emergency frameworks.",
      ],
      stretch: [
        "Hannah Arendt, writing in the 20th century after witnessing fascism and Stalinism, argued that the Terror demonstrated a specific pathology of ideological politics. When a political movement defines itself around abstract principles — virtue, the republic, purity, the nation — and treats those principles as ends that justify any means, the logic of violence becomes potentially limitless. There is always another impurity to cleanse, another deviation to punish, another insufficiently committed revolutionary to eliminate. Arendt saw in the Terror the same structural logic that would later produce the Nazi and Stalinist purges — not the same values, but the same terrifying mechanism.",

        "The historiography of the Terror remains genuinely contested. The 'circumstantial' interpretation, associated with Albert Mathiez and more recently with Jean-Pierre Bouloiseau, holds that the Terror was a pragmatic emergency response to genuine military crisis — France was being invaded from multiple directions simultaneously, and extreme measures were necessary for national survival. The 'ideological' interpretation, associated with François Furet, holds that the Terror was the inevitable consequence of Jacobin political theory, which contained the seeds of totalitarianism from the start. Both positions contain truth, and the debate has not been resolved.",
      ],
    },

    questions: [
      {
        text: "What body directed the Reign of Terror and held effective executive power in France from 1793–94?",
        options: [
          "The National Assembly",
          "The Committee of Public Safety, effectively led by Robespierre",
          "The Directory of Five",
          "The Revolutionary Senate",
        ],
        correct: 1,
        explanation: "The Committee of Public Safety was a twelve-member executive body created as a wartime emergency measure. Under Robespierre's effective leadership, it became the central instrument of the Terror — controlling tribunals, arrests, and executions across France.",
        tier: "core",
      },
      {
        text: "What was the Law of Suspects (1793) and why was it dangerous?",
        options: [
          "A law requiring trials for all political prisoners before execution",
          "A law defining 'enemies of the republic' so broadly that almost any behaviour could lead to arrest",
          "A law protecting revolutionary leaders from criminal prosecution",
          "A law banning public assembly to prevent royalist organising",
        ],
        correct: 1,
        explanation: "By defining treason to include those who 'had shown insufficient enthusiasm for the republic,' the Law of Suspects effectively criminalised private doubt. It enabled mass arrests based on denunciation, rumour, and ideological suspicion — removing any meaningful legal protection for citizens.",
        tier: "core",
      },
      {
        text: "How did Robespierre justify the systematic use of terror as a political tool?",
        options: [
          "He argued it was a temporary measure that would end once the war was won",
          "He claimed terror and virtue were inseparable — that protecting the republic's ideals required eliminating all who threatened them, however broadly defined",
          "He presented it as the will of the French people expressed through popular referenda",
          "He said it was commanded by the laws of the revolution as written in the constitution",
        ],
        correct: 1,
        explanation: "Robespierre's 'virtue and terror' framework was internally coherent: if the republic embodied virtue, then anything threatening the republic threatened virtue itself, and eliminating such threats was morally necessary. This logic had no natural stopping point — which is exactly why it escalated until it consumed its own architects.",
        tier: "key",
      },
      {
        text: "What does Robespierre's own execution reveal about the internal logic of the Terror?",
        options: [
          "That Napoleon had been secretly planning to seize power since 1793",
          "That the Terror's escalating paranoid logic had no natural stopping point and inevitably consumed its own creators",
          "That the French public had fundamentally rejected revolutionary ideals by 1794",
          "That the Committee of Public Safety had been controlled by royalist agents throughout",
        ],
        correct: 1,
        explanation: "The colleagues who arrested Robespierre did so because they feared they would be his next targets. The same mechanism — expand the definition of 'enemy,' arrest before being arrested — had driven the entire Terror. Its internal logic made Robespierre's fall almost mathematically inevitable.",
        tier: "analysis",
      },
      {
        text: "What did Hannah Arendt identify as the specific pathology the Terror shared with later 20th-century totalitarian movements?",
        options: [
          "That all revolutionary governments eventually become monarchies",
          "That when abstract principles become ends justifying any means, the logic of political violence becomes potentially limitless — consuming ever more 'impure' targets",
          "That economic inequality always produces political violence regardless of ideology",
          "That charismatic leaders inevitably abuse emergency powers granted to them",
        ],
        correct: 1,
        explanation: "Arendt's insight was structural, not about specific values: any political system that defines itself around ideological purity and treats deviation as an existential threat contains within itself the logic of unlimited violence. The specific ideology — Jacobin virtue, Nazi racial purity, Stalinist class purity — differs; the mechanism is the same.",
        tier: "stretch",
      },
    ],

    orderingEvents: [
      { id: 1, text: "Committee of Public Safety formed as wartime emergency measure", correctIndex: 0 },
      { id: 2, text: "Law of Suspects passed — mass arrests begin", correctIndex: 1 },
      { id: 3, text: "Danton and Hébertists purged — Terror consumes revolutionary leaders", correctIndex: 2 },
      { id: 4, text: "Robespierre reaches peak power — executions accelerate", correctIndex: 3 },
      { id: 5, text: "Thermidorian Reaction — Robespierre arrested and executed", correctIndex: 4 },
    ],

    swipeScenario: {
      date: "1793",
      situation: "France faces invasion from four directions and internal royalist uprisings. The republic appears genuinely at risk of collapse.",
      context: "The Committee of Public Safety must decide how to maintain order and suppress counter-revolution.",
      leftChoice: "Mass executions",
      rightChoice: "Legal trials for all",
      leftOutcome: {
        title: "Terror-based control",
        text: "Rapid executions suppress opposition quickly. The military situation stabilises. But the category of 'enemy' expands month by month until no one — including Committee members themselves — feels safe.",
        historical: "This is the historical path taken. The Terror did help stabilise the military situation, but at the cost of thousands of lives, the destruction of civil liberties, and ultimately the Revolution's own internal collapse.",
        reactions: [{ label: "Military stabilised", color: "green" }, { label: "Terror escalates", color: "red" }],
      },
      rightOutcome: {
        title: "Slower justice",
        text: "Legal proceedings take weeks and months. Some genuine enemies escape or organise during that time. The government appears weak in a genuine crisis.",
        historical: "In a situation of real military emergency, legal process was seen as dangerously slow. But it would have prevented thousands of unjust deaths and avoided the self-destructive spiral that ended the Terror.",
        reactions: [{ label: "Rights preserved", color: "green" }, { label: "Seen as weak", color: "gray" }],
      },
    },
  },

  /* ══════════════ CHAPTER 6 ══════════════ */
  {
    id: 6,
    title: "Execution of Louis XVI",
    date: "21 January 1793",
    keyFigure: "Louis XVI",
    isUnlocked: false,
    isCompleted: false,
    xpReward: 220,
    description: "The king of France is tried for treason by his own subjects and executed — an act that shocked Europe, radicalised the Revolution, and permanently ended the age of divine-right monarchy in France.",

    learn: {
      core: [
        "The trial and execution of Louis XVI was one of the most consequential acts of the entire French Revolution. Following the discovery of the armoire de fer — a secret iron safe hidden behind a wall panel in the Tuileries Palace — the National Convention found correspondence proving that Louis XVI had been secretly communicating with foreign powers and émigré nobles, working behind the scenes to undermine the revolutionary government he had publicly accepted. This was not suspicion or inference; it was documentary evidence. The Convention voted to put the king on trial in December 1792, and the trial itself was conducted publicly, with Louis XVI given the right to defend himself — a procedural respect for due process that stood in sharp contrast to what followed under the Terror.",

        "The verdict was essentially predetermined — the evidence of treason was clear, and the political dynamics of the Convention made acquittal almost impossible. But the question of punishment produced genuine, fierce debate. The vote on whether to execute Louis XVI was 361 for immediate death against 288 who favoured some alternative — imprisonment, conditional exile, or postponement pending a popular referendum. The closeness of that margin is important: it shows that a substantial fraction of the revolutionary leadership had serious doubts about whether execution was wise, even if they agreed about guilt. Ultimately, the majority prevailed, and Louis XVI was guillotined in the Place de la Révolution on 21 January 1793 before a large crowd.",

        "The execution's immediate effects were felt across Europe within days. Foreign powers that had been cautiously watching the Revolution now had an unambiguous signal: the French republic was prepared to kill kings. Austria, Prussia, Britain, Spain, and the Netherlands formed a military coalition against France. The execution also transformed the domestic political situation. Those who had hoped for a constitutional monarchy — a settlement that preserved the king's person while limiting his power — now had nothing to hope for. The moderates lost their position; the radicals who had pushed hardest for execution were temporarily ascendant. The path from the execution of Louis XVI to the Reign of Terror was direct and short.",
      ],
      key: [
        "The legal and philosophical basis for trying a king was itself revolutionary. Monarchs had traditionally been understood as standing above the law — not subject to it — by virtue of divine sanction and hereditary succession. By bringing Louis XVI before a court of elected representatives and requiring him to answer for his actions, the National Convention was asserting a principle that would have been literally unthinkable twenty years earlier: that no individual, regardless of birth or title, was exempt from accountability to the nation. This was Enlightenment political philosophy translated into the most dramatic practical act imaginable.",

        "The king's defence, conducted by the lawyer Raymond de Sèze, was actually legally competent. De Sèze argued that the Convention had no legitimate authority to try the king, that the evidence was circumstantial in some respects, and that executing Louis XVI would serve no practical revolutionary purpose while creating a martyr and inflaming foreign opposition. These were reasonable arguments, and they convinced nearly 300 members of the Convention. They were simply insufficient against the political momentum of the moment and the majority's conviction that a living king represented a permanent counter-revolutionary threat.",

        "The execution had a powerful effect on how other European monarchs understood their own position. The French Revolution had already been alarming — it had abolished feudalism, confiscated church property, and created a constitutional system limiting royal power. But monarchs could survive constitutional limitations; they could not survive execution. The death of Louis XVI made the stakes of revolutionary politics existential for every crowned head in Europe. It guaranteed that the wars between revolutionary France and the old monarchies of Europe would be fought not merely over territory but over the survival of two fundamentally incompatible political orders.",
      ],
      analysis: [
        "The execution of Louis XVI was simultaneously a political act, a symbolic act, and an irreversible act — and it was the third quality that mattered most. Political decisions can be reversed; symbolic gestures can be reinterpreted. But you cannot un-execute a king. By crossing this particular threshold, the Revolution committed itself permanently to a republican path. There was no going back to any version of the old order that included a Bourbon on the throne. This irreversibility was precisely what both its supporters and opponents understood — which is why the vote was so close and the debate so fierce.",

        "Historians have debated whether the execution was politically necessary or politically catastrophic. The argument for necessity holds that a living Louis XVI would have remained a permanent rallying point for counter-revolution — a symbol around which all enemies of the republic could organise. The argument against holds that the execution hardened foreign opposition, triggered the coalition wars that would consume France for decades, and accelerated the domestic radicalisation that produced the Terror. Both arguments have merit, and the historical record does not definitively resolve the question — which is itself revealing about the genuine difficulty of the decision.",
      ],
      stretch: [
        "The regicide — the killing of a king — had one important historical precedent that French revolutionaries knew well: the execution of Charles I of England by Parliament in 1649. The English republic that followed lasted only eleven years before the monarchy was restored under Charles II. French revolutionaries debated this precedent explicitly, with some arguing that France must learn from England's failure and ensure their republic was built on firmer foundations. The parallel proved uncomfortable: just as England's Interregnum ended with a military strongman (Cromwell) and then monarchical restoration, France's revolutionary republic ended with Napoleon and eventually Bourbon restoration.",

        "Hegel, reflecting on the Revolution in his philosophical writings, described the execution of Louis XVI as the moment at which abstract Enlightenment principles — liberty, reason, equality — collided with concrete political reality in the most literal and violent way possible. In his analysis, the guillotine was the physical embodiment of what he called 'abstract freedom' — the terrifying consequence of applying abstract universal principles without mediating institutions, traditions, or restraints. He saw in the Terror and the regicide not a betrayal of the Revolution's ideals but their logical culmination: pure abstract freedom expressed as pure abstract terror, because abstract principles recognise no limits.",
      ],
    },

    questions: [
      {
        text: "What evidence was used to convict Louis XVI of treason?",
        options: [
          "Testimony from arrested counter-revolutionary nobles",
          "Documents found in a secret iron safe (armoire de fer) proving communication with foreign powers",
          "A confession extracted during imprisonment in the Temple",
          "Letters intercepted by Revolutionary Tribunal agents on the border",
        ],
        correct: 1,
        explanation: "The armoire de fer discovered in the Tuileries Palace contained documentary proof that Louis XVI had been secretly communicating with foreign powers and émigré nobles, actively working to undermine the revolutionary government he had publicly accepted.",
        tier: "core",
      },
      {
        text: "How close was the vote on Louis XVI's execution in the National Convention?",
        options: [
          "Near unanimous — over 90% voted for immediate execution",
          "Close — 361 for immediate execution versus 288 for alternatives like imprisonment or exile",
          "The Convention was split exactly 50-50 and the chairman broke the tie",
          "A strong majority favoured exile, but Robespierre's faction overruled them",
        ],
        correct: 1,
        explanation: "361 voted for immediate death; 288 favoured alternatives. The margin is historically significant because it shows genuine serious disagreement within the revolutionary leadership — not unanimous radical consensus.",
        tier: "core",
      },
      {
        text: "What principle did putting Louis XVI on trial assert about political authority?",
        options: [
          "That France intended to restore monarchy after proving royal criminality",
          "That no individual — including a king — stood above accountability to the nation and its laws",
          "That elected assemblies had the right to execute any political opponent",
          "That the church's authority to sanction monarchy had been permanently revoked",
        ],
        correct: 1,
        explanation: "Trying a king was itself the revolutionary act — more than executing him. It asserted that sovereignty came from the nation, not from God, and that kings were accountable to their subjects. This overturned a thousand years of European political theory in a single proceeding.",
        tier: "key",
      },
      {
        text: "Why was the execution's irreversibility its most politically significant quality?",
        options: [
          "Because it meant France could never apply for membership of the Holy Roman Empire",
          "Because it permanently committed France to a republican path — closing off any return to a Bourbon constitutional monarchy",
          "Because it legally prohibited any future French government from using capital punishment",
          "Because it transferred all former royal property permanently to the republic",
        ],
        correct: 1,
        explanation: "You cannot un-execute a king. Every political decision that retains reversibility keeps future options open; this one did not. It forced all subsequent French politics — including Napoleon's — to reckon with a world in which the Bourbon monarchy was dead, not merely displaced.",
        tier: "analysis",
      },
      {
        text: "What did Hegel mean when he described the Revolution's violence as 'abstract freedom' expressed as 'abstract terror'?",
        options: [
          "That the Terror was caused by the Revolution's failure to develop a proper economic theory",
          "That pure abstract principles — liberty, virtue, equality — applied without mediating institutions or restraints, produce unlimited violence because they recognise no limits",
          "That the French people had never truly understood Enlightenment philosophy and misapplied it",
          "That freedom and terror are philosophically identical concepts in political theory",
        ],
        correct: 1,
        explanation: "Hegel's argument was that abstract principles, unconstrained by tradition, institutional limits, or practical wisdom, have no internal stopping mechanism. 'Freedom' applied abstractly — without particular loyalties, histories, or relationships to restrain it — becomes, paradoxically, total control: everyone must conform to the abstract ideal or be eliminated.",
        tier: "stretch",
      },
    ],

    orderingEvents: [
      { id: 1, text: "Armoire de fer discovered — secret correspondence found", correctIndex: 0 },
      { id: 2, text: "National Convention votes to put Louis XVI on trial", correctIndex: 1 },
      { id: 3, text: "Trial conducted — Louis XVI allowed to mount a defence", correctIndex: 2 },
      { id: 4, text: "Close vote — 361 for immediate execution", correctIndex: 3 },
      { id: 5, text: "Louis XVI guillotined in the Place de la Révolution", correctIndex: 4 },
    ],

    swipeScenario: {
      date: "January 1793",
      situation: "Louis XVI has been convicted of treason. His fate must now be decided by vote.",
      context: "You are a member of the National Convention. What do you vote for?",
      leftChoice: "Execute him",
      rightChoice: "Exile or imprison him",
      leftOutcome: {
        title: "Monarchy ends — but war begins",
        text: "Execution permanently closes the door on constitutional monarchy and removes a royalist rallying point inside France. But it shocks Europe and immediately hardens the military coalition against France.",
        historical: "This is what happened. The execution triggered the War of the First Coalition, accelerated domestic radicalisation, and set France on the path toward the Terror — all within months.",
        reactions: [{ label: "Republic secured", color: "green" }, { label: "War intensifies", color: "red" }],
      },
      rightOutcome: {
        title: "Symbol survives",
        text: "Louis lives. Foreign powers are somewhat less inflamed. But a living king remains a permanent rallying point for counter-revolution, and radical factions within France are furious at the perceived weakness.",
        historical: "Many moderate members of the Convention favoured this option. Historians remain genuinely divided on whether it would have produced better outcomes — or simply delayed the same confrontations.",
        reactions: [{ label: "Less escalation", color: "green" }, { label: "Royalist threat remains", color: "gray" }],
      },
    },
  },

  /* ══════════════ CHAPTER 7 ══════════════ */
  {
    id: 7,
    title: "Rise of Napoleon",
    date: "1799",
    keyFigure: "Napoleon Bonaparte",
    isUnlocked: false,
    isCompleted: false,
    xpReward: 250,
    description: "A decade of revolution ends not with the triumph of liberty, but with the rise of a military genius who trades republican freedom for order — and reshapes Europe in the process.",

    learn: {
      core: [
        "By 1799, the French Republic was exhausted. It had survived invasion, civil war, the Terror, and multiple coups, but had never achieved stable, legitimate governance. The Directory — the five-man executive body that had governed France since 1795 — was widely despised as corrupt, incompetent, and dependent on military commanders to suppress the internal opposition it could not manage politically. It had survived primarily because the alternative appeared to be royalist restoration or renewed Jacobin radicalism — neither of which commanded broad support. Into this vacuum stepped Napoleon Bonaparte, a 30-year-old general from Corsica who had become the most celebrated military commander in Europe through his campaigns in Italy and Egypt.",

        "Napoleon's coup of 18 Brumaire (9 November 1799) was actually a surprisingly chaotic and nearly disastrous affair. The plan was for Napoleon to appear before the Council of Five Hundred (the lower legislative house) and persuade them to transfer power to him voluntarily, under cover of a fabricated conspiracy. Instead, when he entered the chamber, deputies surrounded him shouting 'Outlaw! Outlaw!' and he was physically jostled and had to be helped out of the room. It was his brother Lucien, presiding over the session, who saved the coup — first by delaying proceedings, then by telling the troops outside that the deputies were assaulting the general. The soldiers cleared the chamber. What historians remember as a decisive seizure of power was, on the day, a remarkably improvised near-failure.",

        "The Consulate that Napoleon established placed France under the authority of three consuls, with Napoleon as First Consul holding dominant executive power. A new constitution, approved by plebiscite in late 1799, gave the appearance of republican government — elections, legislative assemblies, rights of citizens — while concentrating real decision-making power in Napoleon's hands. Within five years he would be Emperor. But his regime retained something genuinely new: it kept many of the Revolution's legal achievements — the abolition of feudalism, legal equality before the law, the Napoleonic Code — while dismantling its political freedoms. Napoleon's France was authoritarian in form and revolutionary in content.",
      ],
      key: [
        "Napoleon's rise was not simply a matter of military genius and political opportunism. The structural conditions that made it possible were created by a decade of revolutionary instability. The Directory had become dependent on the military precisely because civilian institutions had been so thoroughly discredited — by the Terror, by corruption, by factional violence, by the failure of multiple constitutional experiments. Each time civilian government failed, it called on the army. Each time the army saved it, military authority grew relative to civilian authority. Napoleon's coup was the logical endpoint of a process that had been building since 1794.",

        "The Napoleonic Code, promulgated in 1804, was perhaps Napoleon's most enduring contribution to France and to European civilisation. It codified and systematised the legal principles of the Revolution — equality before the law, the abolition of hereditary privilege, freedom of religion, secular civil registration of births and marriages — into a coherent legal framework that replaced the patchwork of feudal laws, regional customs, and church regulations that had governed France before 1789. The Code spread with French conquests across Europe and remains the foundation of civil law in many countries, including France itself, Belgium, Italy, Spain, and large parts of Latin America.",

        "Napoleon's relationship with the people of France was based on a kind of implicit contract quite different from either royal divine right or democratic sovereignty. He offered military glory, administrative competence, social stability, and the preservation of revolutionary legal gains. In return, he asked for political submission — no free press, no genuine elections, no independent judiciary. This bargain appealed to a French population exhausted by a decade of instability and war. The repeated plebiscites that endorsed Napoleon's growing power were not entirely fraudulent — substantial majorities genuinely supported him, at least until the endless wars began draining France of men and wealth.",
      ],
      analysis: [
        "Napoleon's emergence illustrates one of the most persistent patterns in political history: revolutionary instability as the precondition for authoritarian consolidation. The Revolution had dismantled the old power structures of monarchy, church, and nobility with great effectiveness, but had been far less successful at building durable new ones. The result was a political vacuum — not in the simple sense of no government, but in the deeper sense of no government that commanded stable, legitimate authority. Into vacuums of legitimate authority, force tends to flow. Napoleon was that force.",

        "The question of whether Napoleon represented the Revolution's completion or its betrayal is one of the most debated in French historiography, and no consensus has emerged. The 'completion' argument points to the Napoleonic Code, the preservation of revolutionary land settlements, the administrative rationalisation of France, and the export of revolutionary legal principles across Europe. The 'betrayal' argument points to the suppression of press freedom, the creation of a new nobility, the concordat with the Catholic Church that reversed the Revolution's secularism, and ultimately the restoration of hereditary dynastic rule under a different family. Both arguments are correct about their own evidence — which suggests the question itself may be slightly wrong. Napoleon was something new that used revolutionary materials to build an authoritarian structure.",
      ],
      stretch: [
        "Max Weber's typology of legitimate authority — traditional (based on custom and heredity), rational-legal (based on rules and procedures), and charismatic (based on extraordinary personal qualities) — provides a useful framework for understanding Napoleon's power. The Revolution had attempted to replace traditional authority with rational-legal authority (constitutions, elected assemblies, rule of law). When rational-legal institutions repeatedly failed, charismatic authority filled the gap. Napoleon's legitimacy was entirely personal — it depended on his continued success, his aura of invincibility, his claim to embody France's historical destiny. This is why his defeat at Waterloo was so completely fatal to his authority: charismatic legitimacy has no institutional reserves to draw on when the charisma fails.",

        "The long-run consequence of Napoleon's rule for European political development was deeply paradoxical. By conquering large parts of Europe and imposing French legal codes, administrative systems, and the abolition of feudal privilege, Napoleon spread revolutionary ideas more effectively than the Revolution itself had managed through propaganda or example. Countries that experienced Napoleonic rule — including much of Italy, Germany, Spain, and the Low Countries — were exposed to legal equality, religious tolerance, and rational administration in ways that would shape their political development throughout the 19th century. The man who ended the French Revolution may have done more to advance its ideas across Europe than any of the revolutionaries who preceded him.",
      ],
    },

    questions: [
      {
        text: "How did Napoleon actually come to power in November 1799?",
        options: [
          "He was elected First Consul in a free and fair republican election",
          "He led a military coup (18 Brumaire) that dissolved the Directory — a nearly chaotic affair saved by his brother Lucien",
          "He was appointed by the National Convention following Robespierre's execution",
          "He inherited power through succession after the last Directory member died",
        ],
        correct: 1,
        explanation: "The 18 Brumaire coup was messier than Napoleon's legend suggests — he was physically jostled out of the legislative chamber and nearly failed. Lucien Bonaparte's intervention with the troops outside was what actually secured the coup.",
        tier: "core",
      },
      {
        text: "What made the Directory structurally vulnerable to Napoleon's coup?",
        options: [
          "It had lost popular support by executing thousands of royalists after the Terror",
          "It was corrupt, incompetent, and had become dependent on military commanders to survive — steadily growing military authority at the expense of civilian government",
          "Napoleon had bribed all five Directory members to resign voluntarily",
          "The Directory had decided internally to transfer power to a military government",
        ],
        correct: 1,
        explanation: "The Directory survived not through legitimacy but through military dependence. Each time it faced a political crisis, it called on the army. This created exactly the structural conditions in which a popular general could present himself as the alternative to a failed civilian government.",
        tier: "key",
      },
      {
        text: "Why is the Napoleonic Code considered one of Napoleon's most enduring achievements?",
        options: [
          "Because it restored all the legal privileges of the nobility that the Revolution had abolished",
          "Because it codified revolutionary legal principles — equality before the law, abolition of privilege, religious freedom — into a systematic framework that spread across Europe",
          "Because it created France's first system of military courts",
          "Because it legally defined France's republican constitution in a way that survived Napoleon's own regime",
        ],
        correct: 1,
        explanation: "The Napoleonic Code replaced a chaotic patchwork of feudal and regional laws with a rational, universal legal system based on revolutionary principles. It remains the foundation of civil law across France, Belgium, Italy, and much of Latin America today.",
        tier: "key",
      },
      {
        text: "What recurring historical pattern does Napoleon's rise most clearly illustrate?",
        options: [
          "That military commanders always betray the democratic movements they initially support",
          "That revolutionary instability creates structural conditions for authoritarian consolidation — vacuums of legitimate authority tend to fill with force",
          "That economic recovery always requires the suspension of democratic institutions",
          "That popular revolutions inevitably restore hereditary monarchy within a generation",
        ],
        correct: 1,
        explanation: "The Revolution dismantled old power structures effectively but failed to build durable legitimate new ones. The resulting vacuum — not of government, but of legitimate authority — created the conditions Napoleon filled. This pattern recurs in revolutionary situations from Rome to the 20th century.",
        tier: "analysis",
      },
      {
        text: "Why was Napoleon's defeat at Waterloo so completely fatal to his authority — with no institutional reserves to draw on?",
        options: [
          "Because the Napoleonic Code required the resignation of all officials upon military defeat",
          "Because his legitimacy was charismatic — based on personal extraordinary qualities — and charismatic authority has no institutional reserves when the charisma fails",
          "Because the Congress of Vienna had legally prohibited Napoleon from holding any political office",
          "Because his own marshals had signed treaties agreeing to remove him after any major defeat",
        ],
        correct: 1,
        explanation: "Weber's analysis of charismatic authority explains Napoleon's fragility precisely: his power rested on his aura of invincibility and historical destiny, not on inherited tradition or constitutional rules. Once that aura shattered at Waterloo, there was nothing institutional left to support him — unlike a traditional monarch who could lose battles and retain legitimacy.",
        tier: "stretch",
      },
    ],

    orderingEvents: [
      { id: 1, text: "Directory government becomes corrupt and dependent on military support", correctIndex: 0 },
      { id: 2, text: "Napoleon wins celebrated campaigns in Italy and Egypt", correctIndex: 1 },
      { id: 3, text: "18 Brumaire coup planned — nearly fails in the chamber", correctIndex: 2 },
      { id: 4, text: "Directory dissolved — Consulate established", correctIndex: 3 },
      { id: 5, text: "Napoleon declared First Consul with dominant executive power", correctIndex: 4 },
    ],

    swipeScenario: {
      date: "November 1799",
      situation: "The Directory is failing. France faces continued war, economic strain, and political paralysis.",
      context: "A celebrated general offers to take control and restore order. France must choose.",
      leftChoice: "Back the coup",
      rightChoice: "Defend the republic",
      leftOutcome: {
        title: "Order restored — at a price",
        text: "Napoleon takes power. Administrative competence returns. The wars are managed. The Napoleonic Code preserves revolutionary legal gains. But press freedom is crushed, elections become theatre, and within five years Napoleon is Emperor.",
        historical: "This is what happened. Napoleon's regime delivered stability and legal progress while dismantling political freedom. Whether the trade was worth it has been debated ever since.",
        reactions: [{ label: "Stability returns", color: "green" }, { label: "Liberty curtailed", color: "red" }],
      },
      rightOutcome: {
        title: "Continued instability",
        text: "The coup fails. The Directory stumbles on. Factional conflicts continue. France remains politically fragile and economically strained without a clear path to stable government.",
        historical: "The Directory had already failed multiple times. Without structural reform, continued instability and eventual collapse of the republic — possibly to royalist restoration — was the most likely alternative to Napoleon.",
        reactions: [{ label: "Freedom preserved", color: "green" }, { label: "Chaos continues", color: "red" }],
      },
    },
  },
];
