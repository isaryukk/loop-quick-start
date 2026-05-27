/* ─────────────────────────────────────────────
   src/data/chapter.ts
   PASTE INTO: src/data/chapter.ts
───────────────────────────────────────────── */

export type LearnContent = {
  core: string[];
  key: string[];
  analysis: string[];
  stretch: string[];
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

export const chapters: Chapter[] = [

  /* ══════════ CHAPTER 1 ══════════ */
  {
    id: 1,
    title: "Causes of the Revolution",
    date: "1788–1789",
    keyFigure: "Louis XVI",
    isUnlocked: true,
    isCompleted: false,
    xpReward: 120,
    description: "A perfect storm of debt, inequality, and hunger pushes France to breaking point.",

    learn: {
      core: [
        "By 1788, France was on the verge of complete financial collapse. Decades of costly wars — most critically, France's direct military and financial support for the American Revolution — had left the national treasury empty and deeply indebted to foreign creditors. Interest repayments alone consumed roughly 60% of all government revenue every year, meaning France was spending more than it earned simply to service debt it had already accumulated. The monarchy had no legal mechanism to raise new taxes without convening a political assembly it had not summoned in 175 years, and every avenue of conventional financial rescue had been exhausted.",

        "The social structure of France made economic recovery almost impossible under the existing rules. French society was rigidly divided into three estates: the First Estate (the clergy), the Second Estate (the nobility), and the Third Estate, which included everyone else — merchants, lawyers, artisans, and the vast rural peasantry. Together, the Third Estate represented roughly 98% of France's population, yet it bore virtually the entire tax burden of the kingdom. The clergy and nobility were largely exempt from direct taxation through centuries-old legal privileges, meaning the groups with the greatest accumulated wealth contributed almost nothing to the state that protected their position.",

        "Two consecutive harvest failures in 1787 and 1788 transformed France's financial crisis into a full-scale humanitarian emergency. Grain shortages caused bread prices to spike dramatically at the exact moment when millions of ordinary French people had the least money to spend. In cities like Paris, a typical labourer might spend 80 to 90 percent of their daily wages on bread alone, leaving almost nothing for rent, clothing, or fuel. When bread prices doubled and then tripled, starvation became a genuine and immediate threat for large sections of the population. Riots broke out across the country, grain convoys were attacked on roads, and local officials who tried to enforce food distribution rules were driven from their posts by desperate, angry crowds.",
      ],
      key: [
        "King Louis XVI's response to the mounting crisis was characterised by chronic indecision and a fundamental inability to override the entrenched interests of his own court. He appointed a series of talented reforming finance ministers — including Turgot in 1774, Necker in 1776, and Calonne in 1783 — each of whom independently diagnosed the same core problem: the tax exemptions of the nobility and clergy were structurally unsustainable. Each reform proposal was blocked, diluted, or abandoned when the privileged orders mobilised political resistance. Louis XVI consistently chose accommodation over confrontation, and by 1789 the window for peaceful, top-down reform had effectively closed.",

        "The ideas of the Enlightenment had been filtering through French society for decades before the Revolution began, and by 1789 they had reached far beyond the aristocratic salons where they originated. Philosophers like Voltaire, Rousseau, and Montesquieu had argued, in widely circulated writings, that political authority derived from the consent of the governed rather than from divine appointment, that all human beings possessed natural and equal rights regardless of birth, and that governments which failed to serve the common good lost their legitimacy. These ideas gave ordinary French people an intellectual framework for understanding their suffering not as unavoidable fate but as the product of a specific, unjust political system that could — and should — be changed.",

        "The financial crisis forced Louis XVI's hand in early 1789. Having exhausted every other option, he summoned the Estates-General — a consultative political assembly representing all three estates — to meet at Versailles in May 1789. This assembly had not convened since 1614, and there were no clear or agreed rules about how it should operate. The Third Estate's deputies arrived at Versailles with specific expectations: genuine reform, fair representation, and a voice proportional to the people they represented. Instead, they found a system that still gave the privileged minority two votes to their one, and a monarch who appeared unable or unwilling to override the obstructions of those who benefited most from the status quo.",
      ],
      analysis: [
        "What distinguishes France's 1789 crisis from an ordinary financial difficulty is the simultaneous convergence of multiple reinforcing pressures — debt, structural inequality, food crisis, institutional paralysis, and the ideological delegitimisation of the regime — at precisely the same historical moment. Any one of these factors in isolation might have produced reform. All of them together produced revolution. The monarchy's repeated failure to enact even moderate reforms had not merely failed to solve the problems; it had destroyed the credibility of the institutional channels through which reform might have occurred, leaving no peaceful route to change.",

        "The position of the emerging middle class — the bourgeoisie — was particularly important in transforming economic frustration into political action. Lawyers, doctors, merchants, and local administrators had prospered economically under the existing system, but were systematically excluded from political power and social prestige that remained reserved for the nobility. These were precisely the people who had most thoroughly absorbed Enlightenment ideas about merit, equality, and rational governance. They had the education to articulate grievances, the social networks to organise collective action, and the specific material frustration of being successful enough to matter but unrecognised enough to resent it. The Revolution was led, in its critical early phases, by this frustrated and educated middle class.",
      ],
      stretch: [
        "France's fiscal crisis had a deeply paradoxical relationship with its geopolitical ambitions. The very intervention that delivered France a major strategic victory over its great rival Britain — support for American independence — was the act that pushed the French monarchy toward insolvency. The cost of that support, approximately 1.3 billion livres, produced no direct economic return and left France's finances permanently compromised. Equally significant was the ideological dimension: by funding and fighting for American republican independence, France had actively exported Enlightenment political ideas into a global circulation that would return, transformed into demands for French republican independence, within a decade.",

        "Political economists studying revolutionary transitions have noted that France in 1789 displays what is sometimes called a 'scissors crisis': the point at which rising popular expectations — generated by partial reform, ideological change, and improving literacy — intersect with deteriorating material conditions to produce explosive instability. Tocqueville's famous observation, that revolutions typically occur not when oppression is at its absolute maximum but when conditions have begun to improve before stalling, applies precisely to France. A generation of cautious Enlightenment optimism and incremental reform had raised expectations about what the political system could and should deliver. When it failed to deliver, the gap between expectation and reality was revolutionary rather than merely frustrating.",
      ],
    },

    questions: [
      {
        text: "What consumed roughly 60% of French government revenue by 1788?",
        options: [
          "Military spending on the French army and navy",
          "Interest payments on accumulated war debt",
          "The royal family's personal expenditure at Versailles",
          "Payments to the Catholic Church under the Concordat",
        ],
        correct: 1,
        explanation: "France's war debt — primarily from supporting the American Revolution — had grown so large that simply paying interest on it devoured the majority of tax revenue each year, leaving almost nothing for government services or reform programmes.",
        tier: "core",
      },
      {
        text: "Why did bread price increases cause such a severe crisis in 1788–89?",
        options: [
          "Bread was France's main export, so shortages were artificially manufactured",
          "The government taxed bread specifically to raise emergency funds",
          "Bread formed the overwhelming majority of the working-class diet, so price rises directly threatened survival",
          "Bakers organised a coordinated strike to force higher wages",
        ],
        correct: 2,
        explanation: "For ordinary French people, bread was not one food among many — it was the foundation of daily survival. A Parisian labourer might spend 80–90% of daily wages on bread alone. When prices doubled and tripled due to harvest failures, starvation became an immediate reality for millions.",
        tier: "core",
      },
      {
        text: "Why were Louis XVI's reform attempts consistently unsuccessful?",
        options: [
          "He had no interest in governing and left all decisions to advisers",
          "Foreign powers actively blocked French internal reforms through diplomacy",
          "The privileged clergy and nobility used their political power to block any reform that would have taxed them",
          "The National Assembly voted down every reform proposal before 1789",
        ],
        correct: 2,
        explanation: "Louis XVI appointed capable finance ministers who all independently identified the same problem: tax exemptions for the nobility and clergy were unsustainable. Each time, the privileged orders resisted, and Louis XVI lacked the political will to force the issue against them.",
        tier: "core",
      },
      {
        text: "What role did Enlightenment philosophy play in transforming economic grievance into political action?",
        options: [
          "It provided French people with a vocabulary of rights and legitimacy, allowing them to frame inequality as injustice rather than natural order",
          "It convinced the clergy to abandon their tax privileges voluntarily",
          "It gave Louis XVI the justification he needed to call the Estates-General",
          "It was largely confined to aristocratic salons and had little effect on ordinary people",
        ],
        correct: 0,
        explanation: "Enlightenment ideas — that authority derives from consent, that natural equality is universal, that unjust governments lose legitimacy — had spread far beyond elite circles by 1789. They gave ordinary people an intellectual framework to understand their suffering as the product of a specific, changeable injustice rather than inevitable fate.",
        tier: "key",
      },
      {
        text: "What is Tocqueville's paradox about when revolutions tend to occur?",
        options: [
          "Revolutions happen when oppression is most severe and conditions are worst",
          "Revolutions occur when conditions begin to improve, raising expectations that then collide with continued frustration",
          "Revolutions are caused primarily by foreign interference in domestic affairs",
          "Revolutions happen when the military refuses to follow civilian government orders",
        ],
        correct: 1,
        explanation: "Tocqueville observed that the French Revolution happened not when conditions were at their absolute worst, but after a period of cautious reform and rising expectations. When those expectations outpaced what the system could deliver, the resulting gap was revolutionary rather than merely frustrating.",
        tier: "stretch",
      },
    ],

    orderingEvents: [
      { id: 1, text: "France accumulates massive debt funding the American Revolution", correctIndex: 0 },
      { id: 2, text: "Consecutive harvest failures devastate grain supply", correctIndex: 1 },
      { id: 3, text: "Bread prices double and triple — riots spread", correctIndex: 2 },
      { id: 4, text: "Reform ministers blocked by nobility — crisis deepens", correctIndex: 3 },
      { id: 5, text: "Louis XVI summons the Estates-General as last resort", correctIndex: 4 },
    ],

    swipeScenario: {
      date: "1789",
      situation: "Paris is starving. Bread riots are spreading and royal authority is visibly crumbling.",
      context: "You advise King Louis XVI on how to respond before this becomes a political revolution.",
      leftChoice: "Raise Taxes",
      rightChoice: "Subsidise Grain",
      leftOutcome: {
        title: "Taxation triggers revolt",
        text: "Raising taxes on a population already spending 90% of wages on bread turns economic desperation into open rebellion. The measure collapses within weeks as crowds refuse to comply and officials are driven from their posts.",
        historical: "Every additional tax burden on the Third Estate historically increased demands to abolish the entire system, not merely reform it. More taxation without structural change would have accelerated the revolutionary timeline.",
        reactions: [{ label: "Anger erupts", color: "red" }, { label: "Debt unchanged", color: "gray" }],
      },
      rightOutcome: {
        title: "Temporary relief only",
        text: "Subsidised grain brings prices down briefly. Unrest slows temporarily. But the treasury, already bankrupt, cannot sustain the programme — and the structural debt that caused the crisis grows larger with every day it continues.",
        historical: "Grain subsidies were tried by several ministers in preceding years. They bought temporary calm but addressed none of the structural causes — the crisis was postponed each time, not resolved.",
        reactions: [{ label: "Short calm", color: "green" }, { label: "Debt worsens", color: "red" }],
      },
    },
  },

  /* ══════════ CHAPTER 2 ══════════ */
  {
    id: 2,
    title: "Storming the Bastille",
    date: "July 1789",
    keyFigure: "Parisian Crowd",
    isUnlocked: false,
    isCompleted: false,
    xpReward: 140,
    description: "Armed Parisians storm a royal fortress and change the course of history in a single afternoon.",

    learn: {
      core: [
        "On the morning of 14 July 1789, Paris was gripped by fear and rumour. Louis XVI had dismissed the popular finance minister Jacques Necker — widely seen as the people's last ally in the royal government — and troops were visibly massing around Paris and Versailles. Many Parisians interpreted the troop movements as preparation for a military crackdown on the National Assembly, which had been meeting defiantly for weeks. In response, crowds began forming across the city, arming themselves with whatever they could find. Earlier that morning, thousands had broken into the Hôtel des Invalides and seized approximately 28,000 muskets from its military stores — but without gunpowder, the weapons were useless.",

        "The Bastille fortress in the east of Paris held the gunpowder the crowd needed. Although it contained only seven prisoners at the time — four forgers, two lunatics, and one minor nobleman — its symbolic importance was immense. The Bastille represented the most feared instrument of royal absolutism: the lettre de cachet, a royal order that could imprison any person indefinitely, without charge, without trial, and without any legal recourse. To ordinary French people, the Bastille was the physical embodiment of arbitrary royal power — the place where the king's will superseded justice, law, and human rights. Destroying it meant destroying that principle.",

        "The attack unfolded over several hours of tense negotiation and then violent confrontation. The governor, the Marquis de Launay, initially agreed to receive a delegation but refused to lower the drawbridge or surrender the gunpowder. As tensions rose, soldiers in the crowd fired on the fortress, the outer courtyard was breached, and after hours of fighting the inner gates were finally forced open. De Launay was seized by the crowd, marched through the streets of Paris, and killed. The fortress was then systematically dismantled over the following days, with stones sold as revolutionary souvenirs. When the news reached Versailles, the courtiers were stunned — not because France had lost a military asset, but because the state's monopoly on force had been openly broken by its own citizens, and nothing had stopped them.",
      ],
      key: [
        "The fall of the Bastille triggered an immediate national cascade that transformed a Parisian incident into a nationwide revolution. Within days of 14 July, uprisings broke out in cities and towns across France — Lyon, Bordeaux, Strasbourg, Rennes, and dozens of smaller centres. Local royal governors fled or were dismissed by newly formed citizens' committees. Municipalities established their own militias, later formalised as the National Guard under the command of the liberal nobleman Lafayette. Royal authority, which had appeared immovable weeks earlier, collapsed across much of France within a single week — not because of any coordinated plan, but because a single dramatic victory had demonstrated that popular action could succeed against the state.",

        "Louis XVI's response to the Bastille's fall revealed the fundamental weakness of his position. Rather than mobilising the army to reassert control, he travelled to Paris on 17 July, donned the revolutionary tricolour cockade of red, white, and blue, and effectively acknowledged the legitimacy of events he had no power to reverse. This gesture — a king publicly accepting the symbols of a revolution against himself — sent an unmistakable message to both France and the watching world. The monarchy was no longer the unchallenged centre of French political life. A new power had emerged, and it had demonstrated its authority in the most concrete possible way.",

        "The National Assembly, which had been meeting under uncertain conditions and constant threat of royal dissolution, was emboldened enormously by the Bastille's fall. With the immediate threat of military crackdown lifted, the deputies accelerated their constitutional work. Within weeks, in a session on the night of 4 August 1789, the nobility and clergy voluntarily surrendered their feudal privileges in an extraordinary evening of competitive renunciation. Feudal dues, tax exemptions, and hereditary rights — the foundations of the old social order — were abolished in a single sitting. The social revolution was moving faster than anyone had anticipated.",
      ],
      analysis: [
        "The Bastille's fall illustrates a critical mechanism in revolutionary politics that political scientists call the 'threshold effect.' Before 14 July, most Parisians were unwilling to take violent action against the state — not because they were satisfied, but because they believed resistance would be crushed. The successful storming of a royal fortress changed that calculation instantly. It proved that organised collective action could overcome state power, and it sent that proof simultaneously to thousands of people watching from across Paris and, within days, across France. Each person who witnessed or heard of the success recalculated their own threshold for action downward.",

        "Historians have long debated whether the storming of the Bastille was a genuinely spontaneous popular uprising or a more organised event. Recent scholarship suggests it was neither purely one nor the other. The crowd that gathered on 14 July was shaped partly by political networks — radical journalists including Camille Desmoulins had been inflaming opinion in the Palais-Royal gardens the previous day, and members of newly formed political clubs helped direct the crowd's energy toward the Bastille specifically. The event was organic in the sense that no single person planned or controlled it, but it was not purely spontaneous either. The Revolution had already developed an informal organisational infrastructure capable of channelling popular anger toward specific targets.",
      ],
      stretch: [
        "The legal architecture that the Bastille physically embodied — the lettre de cachet system — became the direct target of the Declaration of the Rights of Man, adopted just weeks after the fortress fell. Article 7 of the Declaration explicitly prohibited arbitrary arrest and detention without legal grounds, and Article 9 guaranteed the presumption of innocence. The physical destruction of the Bastille and the legal abolition of the power it represented were two parallel revolutionary acts — one performed by a crowd with weapons, the other by an assembly with words — both striking at the same principle: that the king's will does not stand above the rights of individuals.",

        "Tocqueville, writing about the Revolution decades later, noted something counterintuitive about the timing of the Bastille's fall: France had been undergoing a period of gradual reform in the years immediately before 1789, which had raised expectations faster than the system could satisfy them. This 'revolution of rising expectations' means that the conditions for revolutionary action are often created not by maximum oppression but by partial improvement that makes the remaining injustices more visible and more intolerable. The Bastille fell not at the darkest moment of French history but at a moment when enough people had enough hope and enough information to believe that something better was possible — and enough desperation to fight for it.",
      ],
    },

    questions: [
      {
        text: "Why did Parisians specifically target the Bastille on 14 July 1789?",
        options: [
          "To free the hundreds of political prisoners they believed were held there",
          "To seize the gunpowder stored inside and destroy the symbol of royal tyranny",
          "To capture the royal treasury stored in its vaults",
          "To provide a defensive stronghold for the National Assembly",
        ],
        correct: 1,
        explanation: "The Bastille held gunpowder the crowd needed for muskets already seized from the Invalides. But it was also the hated symbol of arbitrary royal imprisonment — the lettre de cachet system. Both tactical and symbolic motivations drove the attack. Only 7 prisoners were actually inside.",
        tier: "core",
      },
      {
        text: "What did the Bastille specifically symbolise to ordinary French people?",
        options: [
          "Military power and France's ability to defend itself against invasion",
          "The arbitrary power of the king to imprison anyone, without charge or trial, forever",
          "Economic inequality and the vast wealth of the French aristocracy",
          "The political influence of the Catholic Church over the monarchy",
        ],
        correct: 1,
        explanation: "The lettre de cachet allowed the king to order the imprisonment of any person indefinitely, without legal charge, without trial, and without any possibility of appeal. The Bastille was where those people went. It embodied the principle that royal will superseded individual rights — which is precisely why destroying it mattered so much.",
        tier: "core",
      },
      {
        text: "What was the significance of Louis XVI donning the tricolour cockade on 17 July?",
        options: [
          "It was a fashion statement with no political significance",
          "It signalled his acceptance of the Revolution's legitimacy and his own inability to reverse events",
          "It formally transferred power from the monarchy to the National Assembly",
          "It was a strategic deception designed to buy time for a royalist counterattack",
        ],
        correct: 1,
        explanation: "A king publicly wearing the symbols of a revolution against his own authority was an extraordinary political concession. It communicated to France and to Europe that the monarchy was no longer the unchallenged centre of French political life. The gesture was an acknowledgment of defeat dressed as accommodation.",
        tier: "key",
      },
      {
        text: "What does the 'threshold effect' explain about why the Bastille's fall triggered nationwide uprising?",
        options: [
          "That fortresses are always strategically important to controlling major cities",
          "That once a successful act of resistance occurs, it lowers the perceived cost of further action for millions of people simultaneously",
          "That revolutions always begin in capital cities before spreading to the provinces",
          "That crowds act rationally only when they have a specific military objective",
        ],
        correct: 1,
        explanation: "Before 14 July, most people feared resistance would be crushed. The Bastille's fall proved it could succeed. Thousands of people across France simultaneously recalculated their own threshold for action — and uprisings cascaded through dozens of cities within days.",
        tier: "analysis",
      },
      {
        text: "How did the Declaration of the Rights of Man directly respond to what the Bastille represented?",
        options: [
          "It ordered the physical demolition of all remaining royal fortresses in France",
          "Article 7 explicitly prohibited arbitrary arrest, legally abolishing the power the Bastille had embodied",
          "It transferred ownership of all royal prisons to elected municipal governments",
          "It established a new court system to retry all prisoners held without charge",
        ],
        correct: 1,
        explanation: "The Bastille's physical destruction and the Declaration's legal prohibition of arbitrary imprisonment were two sides of the same act — one performed by a crowd with weapons, the other by an assembly with words, both striking at the same principle of arbitrary royal power over individuals.",
        tier: "stretch",
      },
    ],

    orderingEvents: [
      { id: 1, text: "Louis XVI dismisses Necker — crowds interpret it as attack on reform", correctIndex: 0 },
      { id: 2, text: "Crowd seizes 28,000 muskets from the Invalides", correctIndex: 1 },
      { id: 3, text: "Bastille stormed — governor de Launay killed", correctIndex: 2 },
      { id: 4, text: "Louis XVI travels to Paris and wears the tricolour", correctIndex: 3 },
      { id: 5, text: "Nobility voluntarily abolishes feudal privileges on 4 August", correctIndex: 4 },
    ],

    swipeScenario: {
      date: "14 July 1789",
      situation: "Thousands of armed Parisians surround the Bastille. Negotiations have broken down.",
      context: "You are Governor de Launay. You must decide how to respond in the next few minutes.",
      leftChoice: "Defend the fortress",
      rightChoice: "Surrender peacefully",
      leftOutcome: {
        title: "Violent escalation",
        text: "Armed resistance leads to hours of fighting. Dozens die on both sides. The fortress eventually falls anyway, the governor is killed by the crowd, and the bloodshed inflames revolutionary sentiment across France.",
        historical: "This is exactly what happened. De Launay's resistance did not prevent the Bastille's fall — it only increased the casualties and intensified public anger. Historians have debated whether immediate surrender might have saved lives without changing the political outcome.",
        reactions: [{ label: "Many killed", color: "red" }, { label: "Revolution inflamed", color: "red" }],
      },
      rightOutcome: {
        title: "Controlled handover",
        text: "The fortress is handed over without major bloodshed. The symbolic result is identical — the Bastille has fallen — but the governor survives and casualties are minimal.",
        historical: "Some historians argue early negotiated surrender was de Launay's best option. The Revolution's momentum was already unstoppable by 14 July — the only variable within his power was how much blood was shed in the process.",
        reactions: [{ label: "Lives saved", color: "green" }, { label: "Revolution continues", color: "gray" }],
      },
    },
  },

  /* ══════════ CHAPTER 3 ══════════ */
  {
    id: 3,
    title: "Women's March on Versailles",
    date: "October 1789",
    keyFigure: "Parisian Women",
    isUnlocked: false,
    isCompleted: false,
    xpReward: 160,
    description: "Thousands of Parisian women march twelve miles to drag the royal family back to Paris — a turning point that permanently changed the Revolution's geography.",

    learn: {
      core: [
        "On the morning of 5 October 1789, the markets of Paris were again in crisis. Despite the political upheaval of the summer, bread remained scarce and expensive, and rumours spread through the market stalls of the central Halles that the royal troops at Versailles had recently trampled the revolutionary tricolour cockade at a banquet — a gesture of contempt for the Revolution that outraged ordinary Parisians. Groups of women working in the markets began calling for action, and within hours a crowd of several thousand women — fishwives, seamstresses, laundresses, and market traders — had gathered and decided to march to Versailles to demand bread from the king directly. They armed themselves with pikes, muskets, cannons dragged from the Hôtel de Ville, and whatever else they could find.",

        "The march itself covered approximately twelve miles through autumn rain, arriving at Versailles in the early afternoon. The women demanded to see Louis XVI personally, and a delegation was eventually received. The king made vague promises about releasing grain reserves and ensuring food supplies to Paris, but the crowd outside the palace was not satisfied with promises. That night, a larger group broke into the palace grounds, killed two royal guards, and reached the apartments of Queen Marie Antoinette — who escaped through a hidden passage in her bedchamber with moments to spare. The violence of the night made it clear to everyone — the king, his court, and the National Assembly — that the royal family could no longer remain safely at Versailles.",

        "The following morning, 6 October, Louis XVI appeared on the balcony of the Palace of Versailles and agreed to move the royal family to Paris. The crowd's response was theatrical and immediate: they demanded that Marie Antoinette appear beside him, and when she did — facing a crowd that had hours earlier tried to kill her — she made a deep bow that momentarily silenced the gathering. The royal family then left Versailles permanently, travelling to the Tuileries Palace in Paris in a procession that took six hours and was accompanied by thousands of women who had marched the previous day. The crowd chanted that they were bringing the baker, the baker's wife, and the baker's little boy to Paris — meaning the king, queen, and Dauphin — who would now be able to feed them.",
      ],
      key: [
        "The relocation of the royal family from Versailles to Paris was a decisive shift in the political geography of the Revolution. Versailles, seventeen miles from the capital, had allowed the court to exist in partial isolation from Parisian opinion, protected by distance and by the trappings of royal ceremony. Paris was a different environment entirely — dense, politically active, and increasingly radicalised. Placed in the Tuileries, the royal family was now visible and accessible to Parisian crowds in a way they had never been before, and effectively under a form of popular supervision that would only intensify over the following years.",

        "The Women's March is historically significant not only for what it achieved but for who achieved it. Eighteenth-century European political theory largely excluded women from formal political participation — they could not vote, hold office, or sign political petitions in their own names. Yet the women of the Halles exercised a form of direct political power that no male-dominated institution of the Revolution had yet matched: they moved the king. This was a form of popular sovereignty in its most unmediated expression, achieved not through constitutional procedure but through collective physical action. The march challenged, implicitly, the idea that women had no role in revolutionary politics.",

        "The National Assembly, which had remained at Versailles alongside the court since May, also moved to Paris in the wake of the October Days. This brought the legislature into direct contact — and direct tension — with Parisian political culture. The radical political clubs, the influential revolutionary press, the volatile opinions of the sans-culottes in the city's neighbourhoods: all of these would now shape the Assembly's deliberations far more directly than had been possible at Versailles. The relocation of both king and parliament to Paris effectively handed the capital city a dominant position in the Revolution's politics that it would not relinquish.",
      ],
      analysis: [
        "The Women's March illustrates an important truth about revolutionary politics: that formal political institutions rarely drive revolutions forward alone. The National Assembly in October 1789 was proceeding cautiously, drafting a constitution, negotiating with the king, and trying to manage an orderly transition to constitutional monarchy. It was not the Assembly that relocated the royal family — it was thousands of women with pikes. Throughout the French Revolution, decisive moments were frequently produced by popular pressure from below acting on — and often ahead of — formal political institutions above.",

        "Marie Antoinette's role in the crisis of October 1789 reveals how successfully the revolutionary press had constructed her as the embodiment of royal excess and moral failure. Known in pamphlets as 'Madame Deficit,' she was blamed, largely unfairly, for the financial ruin of France through extravagance at Versailles. Her foreign birth — she was an Austrian princess — made her a target for accusations of disloyalty. The crowd's specific demand that she appear on the balcony, and her survival of that moment through what contemporaries described as a gesture of extraordinary composure, suggests that the October Days were not merely about bread but about the public humiliation and subordination of a symbol of the old regime.",
      ],
      stretch: [
        "The Women's March raises profound questions about gender and revolutionary politics that were debated intensely in the following years. Olympe de Gouges, a playwright and activist, published the Declaration of the Rights of Woman and the Female Citizen in 1791, arguing explicitly that the Revolution's principles of liberty and equality applied to women as well as men. She was guillotined in 1793. The Jacobin government specifically banned women's political clubs in that same year, arguing that women's role was domestic rather than civic. The Revolution that proclaimed universal rights simultaneously drew new and sharp lines around who those rights actually belonged to.",

        "The geography of power matters in revolutions in ways that are easy to underestimate. The distance between Versailles and Paris had allowed the royal court to cultivate a political culture defined by ceremony, hierarchy, and managed information — a culture designed to make royal authority seem natural, inevitable, and beyond challenge. By physically dragging the royal family into the city, the Women's March destroyed that carefully managed environment. The king in the Tuileries was visible, accessible, and surrounded by a population that could judge and respond to him directly. The contrast between the king-as-divine-ceremony at Versailles and the king-as-prisoner-in-Paris was itself a form of political delegitimisation that required no pamphlet or speech to communicate.",
      ],
    },

    questions: [
      {
        text: "What immediate grievance sparked the Women's March on 5 October 1789?",
        options: [
          "The National Assembly's failure to pass a new constitution",
          "Continued bread shortages and rumours that royal troops had insulted the Revolution",
          "The queen's refusal to receive a delegation of market women",
          "The king's decision to dismiss the National Assembly",
        ],
        correct: 1,
        explanation: "Bread remained scarce and expensive despite months of revolution. When rumours spread that royal troops at Versailles had trampled the tricolour cockade, market women combined food fury with political outrage — marching twelve miles armed with pikes and cannons to confront the king directly.",
        tier: "core",
      },
      {
        text: "What was the decisive political outcome of the October Days?",
        options: [
          "Louis XVI signed the Declaration of the Rights of Man",
          "The royal family permanently left Versailles and moved to Paris under effective popular supervision",
          "The National Assembly voted to abolish the monarchy",
          "Marie Antoinette was arrested and imprisoned in the Bastille",
        ],
        correct: 1,
        explanation: "The royal family's forced relocation to the Tuileries Palace in Paris fundamentally changed the Revolution's dynamic. The king was now in the heart of a radicalised city, visible and accessible to Parisian crowds, rather than protected by the seventeen miles separating Versailles from the capital.",
        tier: "core",
      },
      {
        text: "Why was the Women's March politically significant beyond its immediate outcomes?",
        options: [
          "Because it was the first time women had ever participated in a political event in French history",
          "Because women — formally excluded from political institutions — exercised direct political power by physically moving the king, challenging assumptions about who could act politically",
          "Because it forced the National Assembly to grant women the right to vote",
          "Because it demonstrated that the royal army was unwilling to defend the king",
        ],
        correct: 1,
        explanation: "Women had no formal political role in 18th-century France — they couldn't vote, hold office, or sign petitions. Yet the women of the Halles achieved something no formal institution had: they physically compelled the king to change his location and implicitly his relationship with his people. This was direct popular sovereignty in its most unmediated form.",
        tier: "key",
      },
      {
        text: "What does the relocation of the National Assembly to Paris reveal about the Revolution's political dynamics?",
        options: [
          "That the Assembly had always preferred Paris to Versailles as a meeting place",
          "That formal political institutions in revolutionary situations are often moved forward by popular pressure rather than leading it",
          "That the sans-culottes had achieved democratic control over the legislative process",
          "That Paris was strategically safer from foreign invasion than Versailles",
        ],
        correct: 1,
        explanation: "It was not the National Assembly that relocated the royal family — it was thousands of market women with pikes. The Assembly followed. Throughout the Revolution, decisive shifts were frequently produced by popular pressure acting ahead of, or in spite of, formal institutional deliberation.",
        tier: "analysis",
      },
      {
        text: "What did Olympe de Gouges argue in her Declaration of the Rights of Woman (1791), and what happened to her?",
        options: [
          "She argued for women's economic equality and was exiled to the colonies",
          "She argued that revolutionary principles of liberty and equality applied equally to women — and was guillotined in 1793",
          "She argued for women's right to vote and was appointed to the National Convention",
          "She argued that women should lead the Revolution and was made a deputy of the Assembly",
        ],
        correct: 1,
        explanation: "De Gouges systematically applied the Revolution's own stated principles to women, exposing the contradiction between universal rights and their exclusively male application. The Jacobin response was to guillotine her and specifically ban women's political clubs — the Revolution's answer to its own internal contradiction.",
        tier: "stretch",
      },
    ],

    orderingEvents: [
      { id: 1, text: "Bread shortages and tricolour insult rumours inflame Paris markets", correctIndex: 0 },
      { id: 2, text: "Thousands of women march twelve miles to Versailles in the rain", correctIndex: 1 },
      { id: 3, text: "Night violence — guards killed, Marie Antoinette narrowly escapes", correctIndex: 2 },
      { id: 4, text: "Louis XVI appears on balcony and agrees to move to Paris", correctIndex: 3 },
      { id: 5, text: "Royal family and National Assembly both relocate to Paris", correctIndex: 4 },
    ],

    swipeScenario: {
      date: "5 October 1789",
      situation: "Thousands of armed women have arrived at Versailles demanding bread and the king's presence in Paris.",
      context: "Louis XVI must decide how to respond to the crowd before nightfall.",
      leftChoice: "Refuse and stay",
      rightChoice: "Agree to move to Paris",
      leftOutcome: {
        title: "Violence escalates overnight",
        text: "Refusal emboldens the crowd. That night the palace is breached, guards are killed, and Marie Antoinette barely escapes. By morning, refusing is no longer an option — but the goodwill of immediate agreement has been destroyed.",
        historical: "This is exactly what happened when Louis hesitated. The night violence of 5–6 October transformed an uncomfortable confrontation into a genuine assault on the royal family. Agreement after violence was far more humiliating than immediate agreement would have been.",
        reactions: [{ label: "Violence overnight", color: "red" }, { label: "Forced relocation", color: "red" }],
      },
      rightOutcome: {
        title: "Graceful concession",
        text: "Immediate agreement to move defuses the worst of the crowd's anger. The relocation still happens, but the king retains some political dignity and avoids the night of violence.",
        historical: "Many royal advisers urged immediate agreement. The political outcome — the king in Paris under popular supervision — was the same either way. The only question was whether it happened with or without bloodshed.",
        reactions: [{ label: "Violence avoided", color: "green" }, { label: "Authority still lost", color: "gray" }],
      },
    },
  },

  /* ══════════ CHAPTER 4 ══════════ */
  {
    id: 4,
    title: "Flight to Varennes",
    date: "June 1791",
    keyFigure: "Louis XVI",
    isUnlocked: false,
    isCompleted: false,
    xpReward: 180,
    description: "The king's secret flight from Paris shatters the myth of a loyal constitutional monarch and makes the Revolution irreversible.",

    learn: {
      core: [
        "In the early hours of 21 June 1791, King Louis XVI, Queen Marie Antoinette, their two children, the king's sister Madame Elisabeth, and the children's governess slipped out of the Tuileries Palace in disguise and boarded a large travelling carriage waiting in a side street. The escape had been months in planning, organised primarily by the Swedish nobleman Axel von Fersen, who was widely believed to be the queen's close friend and possibly her lover. The plan was to reach the loyalist fortress town of Montmédy near the Austrian border, where Louis hoped to rally foreign military support and negotiate from a position of strength with the National Assembly — or, if necessary, return to France at the head of an army.",

        "The escape almost succeeded. The party travelled through the night and most of the following day, reaching the small town of Sainte-Menehould by early evening on 21 June. There, a local postmaster named Jean-Baptiste Drouet recognised the king's face from his portrait on the new French paper currency. Drouet rode ahead to the next town, Varennes, and organised a roadblock. When the royal carriage arrived at Varennes late that night, local officials and national guardsmen were waiting. After several hours of tense confrontation — during which Louis initially maintained his disguise and tried to bluff his way through — the family was recognised and detained. Their capture was complete.",

        "The return journey to Paris took three days and was one of the most humiliating experiences of Louis XVI's life. The carriage moved through crowds of tens of thousands of spectators, many of whom watched in silence — a form of contempt more devastating than jeering. National Assembly deputies rode alongside the carriage to prevent any rescue attempt. When the carriage finally entered Paris, the streets were lined with people who had been ordered to remain silent and to keep their hats on — a reversal of the usual protocol by which the crowd would cheer and doff their hats for royalty. The silence was a calculated insult. The king who had tried to flee his own people arrived back as their prisoner.",
      ],
      key: [
        "The Flight to Varennes destroyed any remaining possibility of a stable constitutional monarchy in France, and it did so not through any single political decision but through the simple fact of what Louis XVI had done. A constitutional monarch who runs away from his constitutional role, who secretly plans to return at the head of a foreign army, and who lies to the National Assembly about his intention to support the new system, has demonstrated by his actions that he does not accept the legitimacy of the constitutional settlement he has publicly endorsed. The Assembly could not ignore this evidence of bad faith, even if it tried to. The radical factions that had been arguing Louis could not be trusted were suddenly and completely vindicated.",

        "The political consequences were immediate and severe. Demands for a republic — which had been a fringe position in French politics just weeks earlier — moved rapidly into mainstream debate. The radical journalist and politician Jean-Paul Marat had been arguing for months that the king was untrustworthy; after Varennes, moderate republicans and even some constitutional monarchists were forced to seriously consider whether a monarchy was compatible with the Revolution's survival. The Champ de Mars massacre on 17 July 1791, in which National Guard troops under Lafayette fired on a crowd gathering to sign a republican petition, killing dozens, showed how explosive the political atmosphere had become.",

        "The National Assembly, committed to constitutional monarchy as the basis of the new political order, faced an impossible dilemma. To prosecute the king would be to admit the constitutional system had failed and to open the question of what should replace it. To acquit him entirely would be to legitimise his flight and make a mockery of constitutional government. The Assembly chose a middle path: it accepted the fiction that Louis XVI had been 'abducted' rather than having fled voluntarily, and temporarily suspended him from his royal functions while the constitutional process continued. This transparent evasion satisfied almost no one — it revealed the Assembly's own political vulnerability — and the constitutional monarchy it produced lasted less than a year.",
      ],
      analysis: [
        "The Flight to Varennes is a case study in how a single irreversible act can transform a political situation beyond recovery. Before June 1791, constitutional monarchy had genuine public support in France — it offered a middle path between absolute monarchy and the uncharted territory of a republic, and it had produced the Declaration of the Rights of Man, the abolition of feudalism, and a functional legislative assembly. After June 1791, constitutional monarchy was fatally compromised — not because the system had changed, but because the king's actions had made visible what radical critics had always argued: that Louis XVI's acceptance of constitutional constraints was purely tactical and would be abandoned the moment he had the power to do so.",

        "The broader European context made the flight even more politically damaging. Austria, Prussia, and other European monarchies had been watching the French Revolution with alarm, and Louis XVI's plan was to reach their borders and seek military intervention. The Declaration of Pillnitz, issued by Austria and Prussia in August 1791, warned that they might intervene to restore order in France — a statement that was partly diplomatic posturing but that French revolutionaries interpreted as a genuine military threat. The suspicion that the king was collaborating with foreign enemies of the Revolution became, after Varennes, not merely plausible but virtually certain. The distinction between 'king of France' and 'enemy of France' had collapsed.",
      ],
      stretch: [
        "Louis XVI's escape plan suffered from a fundamental strategic contradiction that several of his advisers identified at the time. The plan assumed he could reach Montmédy, gather Austrian-supported forces, and then negotiate with the National Assembly from a position of military strength. But for this to work, the king needed the Assembly to still exist and to still have political legitimacy when he returned — otherwise there was nothing to negotiate with. Yet the mere act of fleeing to a foreign border with the intention of returning at the head of an army would destroy the Assembly's willingness to negotiate by confirming that Louis viewed military coercion, not constitutional compromise, as his preferred tool. The plan was strategically incoherent at its core.",

        "The recognition of Louis XVI by Jean-Baptiste Drouet — a postmaster who identified the king from his portrait on a banknote — has become one of the Revolution's most iconic moments of accidental history. Had the king not been depicted on the currency, or had the party taken a different route, or had they departed two hours earlier, the history of the Revolution might have been substantially different. Historians who study contingency in history often point to Varennes as an example of how major historical outcomes can hinge on remarkably small decisions and coincidences. The revolutionary government's decision to put the king's face on paper money — a straightforwardly practical financial choice — inadvertently created the means of his downfall.",
      ],
    },

    questions: [
      {
        text: "What was Louis XVI's plan when he fled Paris in June 1791?",
        options: [
          "To escape to England and live in permanent exile",
          "To reach a loyalist fortress near the Austrian border and negotiate from strength or return with foreign military support",
          "To travel to Versailles and re-establish the court there",
          "To join a royalist uprising already underway in southern France",
        ],
        correct: 1,
        explanation: "Louis aimed to reach Montmédy, near the Austrian border, where he could rally loyalist troops and possibly Austrian military support, then negotiate a revised constitutional settlement from a position of power — or, if negotiations failed, return to France at the head of an army.",
        tier: "core",
      },
      {
        text: "How was Louis XVI recognised and captured at Varennes?",
        options: [
          "A spy within the Tuileries had alerted the Assembly of the escape plan",
          "A local postmaster recognised the king's face from his portrait on paper currency and organised a roadblock",
          "Marie Antoinette's Austrian accent gave them away at a checkpoint",
          "The king's travelling carriage was too large and distinctive to pass unnoticed",
        ],
        correct: 1,
        explanation: "Jean-Baptiste Drouet, postmaster of Sainte-Menehould, recognised Louis XVI from his portrait on the new French assignat currency. He rode ahead to Varennes and organised local national guardsmen to block the road — a moment of accidental history that changed everything.",
        tier: "core",
      },
      {
        text: "Why did the Flight to Varennes destroy the credibility of constitutional monarchy in France?",
        options: [
          "Because Louis XVI publicly denounced the constitution on his return journey",
          "Because it proved, through the king's own actions, that his acceptance of constitutional constraints was tactical rather than genuine",
          "Because the National Assembly used the flight as a legal pretext to abolish the monarchy",
          "Because foreign powers immediately declared war on France in response",
        ],
        correct: 1,
        explanation: "A constitutional monarch who secretly plans to return with foreign troops has demonstrated he does not accept constitutional government. Louis's flight vindicated every radical who had argued he couldn't be trusted — and it did so with evidence provided by the king himself, making denial impossible.",
        tier: "key",
      },
      {
        text: "What fundamental strategic contradiction made Louis XVI's escape plan self-defeating?",
        options: [
          "Austria refused to provide military support without payment France could not afford",
          "Fleeing to gather military support would destroy the Assembly's willingness to negotiate — the very thing the plan required to succeed",
          "The Swiss guards protecting the Tuileries had already informed the Assembly of the plan",
          "The route to Montmédy was guarded by National Guard troops who were loyal to the Assembly",
        ],
        correct: 1,
        explanation: "The plan needed the National Assembly to survive and remain legitimate for negotiations to occur on return. But the act of fleeing to the border with foreign military support confirmed the king's bad faith and destroyed the Assembly's political ability to negotiate with him. The plan undermined its own preconditions.",
        tier: "stretch",
      },
    ],

    orderingEvents: [
      { id: 1, text: "Royal family secretly departs the Tuileries in disguise", correctIndex: 0 },
      { id: 2, text: "Postmaster Drouet recognises Louis XVI from banknote portrait", correctIndex: 1 },
      { id: 3, text: "Roadblock organised at Varennes — royal carriage stopped", correctIndex: 2 },
      { id: 4, text: "Humiliating three-day return journey to Paris in silence", correctIndex: 3 },
      { id: 5, text: "Assembly accepts 'abduction' fiction — constitutional monarchy collapses within months", correctIndex: 4 },
    ],

    swipeScenario: {
      date: "June 1791",
      situation: "Louis XVI has been caught attempting to flee France. The Assembly must decide how to respond.",
      context: "Revolutionary France faces a choice that will determine whether constitutional monarchy survives.",
      leftChoice: "Put him on trial",
      rightChoice: "Accept the 'abduction' fiction",
      leftOutcome: {
        title: "Republic accelerated",
        text: "Prosecuting the king for treason opens the question of what replaces him. Republican factions gain immediate political momentum. The constitutional monarchy project is abandoned before it has been properly tested.",
        historical: "This path would have produced a republic in 1791 rather than 1792, potentially skipping some of the intermediate constitutional chaos — though it would have accelerated the confrontation with European monarchies that eventually came anyway.",
        reactions: [{ label: "Republic sooner", color: "green" }, { label: "War risk rises", color: "red" }],
      },
      rightOutcome: {
        title: "Credibility destroyed",
        text: "Accepting the fiction that Louis was 'abducted' preserves constitutional monarchy on paper. But everyone knows the truth, and the Assembly's willingness to pretend makes it look weak and dishonest.",
        historical: "This is what happened. The Assembly's transparent evasion satisfied almost no one. The constitutional monarchy produced by this compromise lasted less than a year before collapsing into the republic anyway.",
        reactions: [{ label: "Monarchy preserved", color: "green" }, { label: "Trust shattered", color: "red" }],
      },
    },
  },

  /* ══════════ CHAPTER 5 ══════════ */
  {
    id: 5,
    title: "Reign of Terror",
    date: "1793–1794",
    keyFigure: "Robespierre",
    isUnlocked: false,
    isCompleted: false,
    xpReward: 200,
    description: "The Revolution turns inward — mass execution, political paranoia, and ideological purity consume thousands, including revolutionary leaders themselves.",

    learn: {
      core: [
        "By the spring of 1793, the French Republic was fighting for its survival on multiple fronts simultaneously. Austria, Prussia, Britain, Spain, the Netherlands, and Sardinia had all joined a military coalition against France, and French armies were suffering serious defeats. Inside the country, a massive royalist and Catholic counter-revolutionary uprising in the Vendée region of western France had mobilised tens of thousands of fighters and required the deployment of large republican armies to suppress. In this atmosphere of genuine existential crisis, the National Convention created the Committee of Public Safety in April 1793 as an emergency executive body with sweeping powers to coordinate the war effort and maintain internal order. Under the effective leadership of Maximilien Robespierre — a lawyer who had become the most powerful politician in France — the Committee transformed from a wartime management body into the primary instrument of systematic political terror.",

        "The scale of the Terror was staggering and its scope was far wider than is sometimes remembered. Between September 1793 and July 1794, approximately 17,000 people were officially executed — the great majority by guillotine in public, before crowds. An additional 25,000 to 40,000 people died in prison or through summary executions without any formal trial. The victims were not drawn exclusively from the obvious targets — royalists, aristocrats, or clergy. They included former revolutionary leaders who had advocated too moderately, Girondin politicians who had been revolutionary heroes in 1789, and ordinary citizens whose private conversations, commercial practices, or religious observances had attracted denunciation. The Law of Suspects, passed in September 1793, defined 'enemy of the republic' so broadly that virtually any behaviour could be criminalised under it.",

        "Robespierre did not present the Terror as regrettable necessity — he justified it as a moral imperative. In his most famous speech to the Convention, delivered in February 1794, he articulated the doctrine of 'virtue and terror': the argument that virtue without terror is powerless, and that terror without virtue is merely criminal, but that together they were inseparable instruments of republican governance in a time of crisis. This framework was not cynical — Robespierre genuinely believed in the justice of what he was doing. He saw himself as the guardian of the republic's soul, purging corruption, cowardice, and counter-revolutionary thought from the body politic. This self-conception made him both more dangerous and more unstoppable, because he was immune to the normal political negotiations that might have provided brakes on the escalation.",
      ],
      key: [
        "The Revolutionary Tribunal, which processed the Terror's victims, was designed to move fast and to convict. Normal legal protections were stripped away: the accused had no right to call witnesses in their defence, trials were often completed in a single day, and the only available verdicts were acquittal or death. The network of local surveillance committees established across France further enabled the system — they encouraged and coordinated denunciations of neighbours, colleagues, and family members, creating a structure in which private life became politically dangerous. By 1794, the Tribunal was processing hundreds of cases per month, and the guillotine in Paris was working continuously.",

        "The Terror's most revealing and self-destructive feature was its gradual escalation in the range of its targets. What began as action against genuine counter-revolutionaries expanded to encompass moderate republicans, then radical revolutionaries who were deemed to have gone either too far or not far enough. Georges Danton — one of the most important figures of the early Revolution, the man who had rallied France to resist foreign invasion in 1792 with the cry 'De l'audace, encore de l'audace, toujours de l'audace!' — was arrested in April 1794 and guillotined on Robespierre's order. Danton had been a revolutionary hero. His execution announced that no record of service to the Revolution provided protection from it.",

        "The Committee of Public Safety also pursued a policy of de-Christianisation during the Terror, attempting to replace the Catholic Church with a new civic religion called the Cult of the Supreme Being. Churches were closed or converted to secular use, priests were pressured to renounce their vows, and a new revolutionary calendar replaced the Christian calendar with a ten-day week and months named after natural phenomena. These measures reflected the Revolution's ideological ambitions to transform not just politics and economics but culture, identity, and consciousness itself. They also created enormous resistance, particularly in rural areas where Catholic practice was deeply embedded in daily life.",
      ],
      analysis: [
        "The Reign of Terror exposes one of the most disturbing paradoxes in revolutionary politics: the point at which the pursuit of liberty produces its own form of totalitarian control. The men who ran the Terror — Robespierre, Saint-Just, Couthon — genuinely believed in the republican ideals of the Declaration of the Rights of Man. They had fought for those ideals for years. Yet the system they created was antithetical to every principle in that Declaration: it arrested without charge, tried without adequate defence, convicted on suspicion, and executed without appeal. The explanation is not hypocrisy but something more disturbing — the belief that abstract ideals are so important they justify any concrete violation of them in their defence.",

        "The internal logic of the Terror made its eventual self-destruction almost mathematically predictable. A system that defines loyalty to the republic as the supreme political value and treats any perceived disloyalty as punishable by death creates an environment in which every person's safety depends on appearing sufficiently enthusiastic about denouncing others. The category of 'enemy' expands continuously as paranoia increases, as factions compete to prove their loyalty by attacking rivals, and as the criteria for suspicion become ever more elastic. Eventually, the logic reaches the people who are running the system itself — which is precisely what happened when Robespierre was arrested by Convention members who feared they would be his next targets.",
      ],
      stretch: [
        "Hannah Arendt, writing in the 20th century having witnessed both Nazi totalitarianism and Stalinist terror, identified the Reign of Terror as the earliest complete expression of a specific pathology she called 'ideological politics.' Her argument was that when an abstract principle — virtue, racial purity, class consciousness — is elevated to the status of an absolute political value, the logic of eliminating deviations from that principle has no natural stopping point. There is always a purer version of virtue, a more thorough purging of impurity, another deviation to eliminate. The ideology becomes self-consuming precisely because it is internally consistent: it follows its own logic wherever that logic leads, regardless of the human cost.",

        "Historians continue to debate the primary causes of the Terror, and the debate matters because it affects how we understand revolutionary politics more generally. The 'circumstantial' or 'contingency' school argues that the Terror was primarily a pragmatic response to genuine military emergency — France really was being invaded from multiple directions simultaneously, and the Republic really was at risk of collapse. On this reading, the Terror was harsh but not irrational given the stakes. The 'ideological' school, associated primarily with François Furet, argues that the Terror was the inevitable consequence of Jacobin political theory, which contained the seeds of totalitarianism from the beginning. Most contemporary historians accept elements of both positions while rejecting either as a complete explanation.",
      ],
    },

    questions: [
      {
        text: "What external crisis created the conditions for the Reign of Terror in 1793?",
        options: [
          "A severe famine that threatened to starve Paris within months",
          "France fighting a military coalition of six European powers simultaneously while suppressing internal royalist uprisings",
          "The assassination of Robespierre's chief allies in the National Convention",
          "A financial collapse caused by the assignat currency becoming worthless",
        ],
        correct: 1,
        explanation: "France in 1793 faced invasion from Austria, Prussia, Britain, Spain, the Netherlands, and Sardinia — simultaneously with a massive internal counter-revolutionary uprising in the Vendée. This genuine existential crisis was the context within which emergency powers were granted to the Committee of Public Safety.",
        tier: "core",
      },
      {
        text: "How did Robespierre justify the Terror in his 'virtue and terror' doctrine?",
        options: [
          "He presented it as a temporary emergency measure that would end when the war was won",
          "He argued that terror and virtue were inseparable instruments of republican governance — that protecting the republic's ideals required eliminating all threats to them",
          "He claimed the Terror had majority support as expressed through national plebiscites",
          "He argued it was commanded by the natural law of revolution as defined by Rousseau",
        ],
        correct: 1,
        explanation: "Robespierre's doctrine was internally coherent and genuinely believed. He saw himself as the republic's moral guardian — purging corruption and counter-revolutionary thought. This sincere ideological conviction made him more dangerous, not less, because it made the Terror a moral crusade rather than merely a political tactic.",
        tier: "core",
      },
      {
        text: "What did the execution of Georges Danton signal about the Terror's escalation?",
        options: [
          "That Danton had been secretly working for the royalists throughout the Revolution",
          "That no record of revolutionary service provided protection from the Terror — it had begun consuming its own architects",
          "That Robespierre had consolidated enough power to purge all potential rivals without consequence",
          "That the Committee of Public Safety had decided to end the Revolution and restore a constitutional monarchy",
        ],
        correct: 1,
        explanation: "Danton was one of the Revolution's most celebrated heroes — the man who had rallied France to resist invasion. His execution by Robespierre's order demonstrated that revolutionary credentials provided no protection from the system's own logic. The Terror had begun turning on the people who built it.",
        tier: "key",
      },
      {
        text: "Why did the internal logic of the Terror make its self-destruction predictable?",
        options: [
          "Because the Committee of Public Safety had always planned to hand power back to the Convention after the war",
          "Because a system that expands the definition of 'enemy' continuously eventually reaches the people running the system itself",
          "Because foreign powers successfully bribed enough Convention members to vote against Robespierre",
          "Because the French public organised a mass petition demanding an end to the executions",
        ],
        correct: 1,
        explanation: "The Terror's logic required continuous expansion — factions competed to prove loyalty by denouncing rivals, criteria for suspicion became ever more elastic, and the category of 'enemy' grew relentlessly. Eventually that logic reached Robespierre himself, arrested by Convention members who feared they would be his next victims.",
        tier: "analysis",
      },
      {
        text: "What did Hannah Arendt identify as the specific pathology the Terror shared with 20th-century totalitarianism?",
        options: [
          "That revolutionary governments always eventually restore monarchies to maintain order",
          "That elevating an abstract principle to absolute political value creates a self-consuming logic of eliminating 'deviations' with no natural stopping point",
          "That economic inequality inevitably produces political violence regardless of the ideology involved",
          "That charismatic leaders inevitably abuse emergency powers granted to them in crisis conditions",
        ],
        correct: 1,
        explanation: "Arendt's insight was structural rather than about specific content: any political system that treats ideological purity as its supreme value creates an internal logic of unlimited violence — because there is always a purer version, always another deviation to eliminate. The ideology — Jacobin virtue, Nazi racial purity, Stalinist class purity — differs; the mechanism is identical.",
        tier: "stretch",
      },
    ],

    orderingEvents: [
      { id: 1, text: "Six-nation coalition invades France — Vendée uprising begins", correctIndex: 0 },
      { id: 2, text: "Committee of Public Safety formed — Robespierre takes effective control", correctIndex: 1 },
      { id: 3, text: "Law of Suspects passed — mass arrests and Revolutionary Tribunal accelerate", correctIndex: 2 },
      { id: 4, text: "Danton arrested and guillotined — Terror consumes revolutionary heroes", correctIndex: 3 },
      { id: 5, text: "Robespierre arrested in Thermidor — Terror ends", correctIndex: 4 },
    ],

    swipeScenario: {
      date: "1793",
      situation: "France is being invaded on six fronts. Internal counter-revolutionary uprisings are spreading. The republic appears genuinely at risk of collapse.",
      context: "The Committee of Public Safety must decide how to maintain revolutionary order against genuine enemies.",
      leftChoice: "Mass executions",
      rightChoice: "Legal trials for all",
      leftOutcome: {
        title: "Order through terror",
        text: "Rapid executions suppress opposition quickly. Military recruitment stabilises. The foreign invasion is pushed back. But the category of 'enemy' expands month by month until Committee members themselves are no longer safe.",
        historical: "The Terror did help stabilise France's military situation — French armies eventually reversed the coalition's advances. But it killed thousands of innocents and produced a self-consuming political crisis that ended with Robespierre's own execution.",
        reactions: [{ label: "Military stabilised", color: "green" }, { label: "Terror escalates", color: "red" }],
      },
      rightOutcome: {
        title: "Slower justice",
        text: "Proper legal proceedings take weeks and months. Some genuine counter-revolutionaries escape or organise during the delay. The government appears dangerously weak during an active military emergency.",
        historical: "In a genuine crisis of national survival, legal process was seen as fatally slow. But it would have prevented thousands of unjust deaths and avoided the self-destructive spiral that ended with France's most committed republicans killing each other.",
        reactions: [{ label: "Rights preserved", color: "green" }, { label: "Seen as weakness", color: "gray" }],
      },
    },
  },

  /* ══════════ CHAPTER 6 ══════════ */
  {
    id: 6,
    title: "Fall of Robespierre",
    date: "27 July 1794",
    keyFigure: "National Convention",
    isUnlocked: false,
    isCompleted: false,
    xpReward: 220,
    description: "The architect of the Terror is arrested and executed by the same system he built — ending the most violent phase of the Revolution in a single afternoon.",

    learn: {
      core: [
        "By the summer of 1794, Robespierre had reached the pinnacle of his power — and was simultaneously becoming an object of fear to almost everyone around him. The military situation had dramatically improved: French armies had pushed back the coalition forces, the Vendée uprising was largely suppressed, and the existential threat that had originally justified the Terror's emergency powers had largely passed. Yet the executions continued to accelerate. In the month of June 1794 alone — a period known as the 'Great Terror' — the Revolutionary Tribunal sent approximately 1,400 people to the guillotine in Paris. Convention members watching this escalation began to quietly calculate their own odds of surviving. Among those arrested and executed in June were former colleagues of Robespierre who had done nothing obviously different from what he himself had been doing for months.",

        "On 26 July 1794, Robespierre delivered what would be his final speech to the National Convention. The speech was vague, threatening, and deeply unsettling to many who heard it. He referred to unnamed traitors within the Convention and within the Committee of Public Safety, hinting at a new purge without specifying its targets. This ambiguity was catastrophic for him politically. Every deputy who heard the speech and was unsure whether they were among the unnamed traitors immediately had a powerful personal incentive to strike first. That night, a conspiracy formed with unusual speed — unusual because the conspirators were terrified rather than strategically calculating. Deputies from across the political spectrum, including both moderates who had survived the Terror by staying silent and radicals who feared Robespierre was preparing to denounce them, agreed to act together the following day.",

        "On 9 Thermidor Year II (27 July 1794), when Robespierre rose to speak at the Convention, he was drowned out by shouts from multiple directions: 'Down with the tyrant!' Members of the Convention voted to arrest him, along with his close allies Saint-Just and Couthon. The arrest happened with astonishing speed — the most powerful man in France, who had controlled the apparatus of state terror for over a year, was taken by Convention members with no violence beyond the shouting. He was guillotined the following day, without trial, using exactly the process he had applied to hundreds of others. The irony was not lost on contemporaries: the man who had abolished the normal legal protections that might have saved others' lives had none of those protections available to save his own.",
      ],
      key: [
        "The Thermidorian Reaction — the period following Robespierre's fall — marked a decisive political turn away from radical Jacobinism. The surviving members of the Committee of Public Safety were gradually removed from power, the Revolutionary Tribunal was reformed and eventually abolished, and the Jacobin clubs were shut down. Political prisoners were released from jails across France, and thousands of people who had been living in hiding returned to public life. The immediate atmosphere was one of enormous relief — contemporaries described the sense of liberation that followed Thermidor — though France remained politically unstable and economically exhausted.",

        "Robespierre's fall was also the beginning of a political and cultural backlash against the Terror itself. The 'Thermidorian' politicians who replaced the Jacobins were not ideological innocents — many of them had voted for the Terror's measures and had personally benefited from its operation. Their turn against it was driven primarily by self-preservation rather than principle. Nevertheless, the backlash produced genuine changes: greater press freedom, reduced political violence, and the gradual rehabilitation of the Terror's victims and their families. The Muscadin — fashionable young men who styled themselves as opponents of Jacobin austerity — became a visible symbol of the cultural counter-reaction, ostentatiously wearing elegant clothes and attacking remaining Jacobins in the streets.",

        "The Directory, which replaced the Committee of Public Safety as France's governing body after a period of transition, was a five-person executive established by the Constitution of the Year III (1795). It attempted to navigate between the twin dangers the Thermidorians feared most: a royalist restoration on the right and a Jacobin resurgence on the left. The Directory was politically weak, economically ineffective, and increasingly dependent on military victories to maintain its legitimacy. It survived four years of coup attempts, economic instability, and continuing wars before being replaced — through a coup — by Napoleon Bonaparte in 1799. The period from Thermidor to Napoleon's seizure of power represents the Revolution's long, exhausted, and ultimately futile search for stable republican governance.",
      ],
      analysis: [
        "Robespierre's fall illustrates a fundamental instability built into systems of pure political terror: they cannot distinguish between eliminating genuine enemies and creating new ones. Every execution by the Committee of Public Safety reduced by one the number of people who might threaten Robespierre — and simultaneously increased by multiple the number of people who feared they might be next. As the pool of safe targets shrank and the range of suspicious behaviour expanded, the Terror was generating more enemies than it eliminated. By July 1794, Robespierre faced a Convention in which almost every remaining member had reason to fear him — a situation that made a conspiracy against him simultaneously in everyone's interest and politically natural.",

        "The speed of Robespierre's arrest and execution — handled within two days by the same system that had executed thousands — reveals something important about the nature of the power he had built. His authority had been based on terror rather than on institutional structure, popular support, or constitutional legitimacy. Terror-based authority has no reserves to draw on when it ceases to function: there is no loyal institutional base, no popular affection, no constitutional principle to appeal to. Once the Convention decided to move against him, Robespierre had nothing — his power evaporated in an afternoon. This contrasts sharply with Napoleon's later authority, which was based on military loyalty, popular plebiscite, and institutional codification — giving it multiple layers of reinforcement that purely terror-based power entirely lacked.",
      ],
      stretch: [
        "The historiography of Thermidor is revealing about how political narratives are constructed after violent events. The Thermidorians who overthrew Robespierre had largely been complicit in the Terror — they had voted for its measures, sat on its committees, and personally signed execution orders. After Thermidor, they constructed a narrative that placed all responsibility for the Terror on Robespierre alone, presenting his overthrow as a liberation rather than a factional coup by terrified co-conspirators. This narrative of the 'Monster Robespierre' served their political interests perfectly — it allowed former Terrorists to present themselves as liberators without acknowledging their own culpability. The historical debate about how much of the Terror was Robespierre's personal responsibility and how much was structural and collective has never been fully resolved.",

        "Georges Canguilhem and later Michel Foucault both drew on the French Revolution's experience of political terror to develop broader theories about the relationship between power, knowledge, and surveillance. The system of denunciation committees established during the Terror — in which neighbours were encouraged to inform on neighbours, and private life became politically dangerous — prefigures what Foucault called the 'disciplinary society': a form of social control exercised not primarily through direct violence but through the internalisation of the awareness of being watched. The Terror, on this reading, was not simply about killing people but about producing a population that policed itself through fear of denunciation — an insight that has proved remarkably durable in understanding modern forms of political control.",
      ],
    },

    questions: [
      {
        text: "Why did Robespierre's final speech on 26 July 1794 accelerate his own downfall?",
        options: [
          "He admitted to planning a military coup to make himself dictator of France",
          "By vaguely threatening unnamed traitors without specifying who, he gave every Convention member reason to fear they were the target and to strike first",
          "He announced his intention to extend the Terror to the military, alienating the army",
          "He publicly called for the execution of the entire Directory before it had been formed",
        ],
        correct: 1,
        explanation: "The speech's deliberate vagueness was politically fatal. Every deputy who heard it and was uncertain whether they were among the 'unnamed traitors' immediately had a personal incentive to conspire against him rather than wait to find out. Terror against unnamed targets creates a conspiracy of self-preservation among everyone within range.",
        tier: "core",
      },
      {
        text: "What was historically ironic about how Robespierre was executed?",
        options: [
          "He was executed at the same location as Louis XVI, using the same guillotine blade",
          "He was guillotined without trial using the exact process he had applied to hundreds of others — the legal protections he had stripped from victims were unavailable to him",
          "He was executed by the same executioner who had guillotined the king he had condemned",
          "He died on the exact anniversary of the Bastille's storming, five years later",
        ],
        correct: 1,
        explanation: "Robespierre had been instrumental in abolishing the legal protections — right to call witnesses, proper trial procedures, adequate defence — that might have saved others' lives. When arrested himself, those same protections were unavailable to him. He was processed through the system he had built.",
        tier: "core",
      },
      {
        text: "Why did Robespierre's power evaporate so completely and quickly once the Convention moved against him?",
        options: [
          "The army had secretly transferred loyalty to the Directory before Thermidor",
          "His power was based entirely on terror rather than institutional structure, popular support, or constitutional legitimacy — it had no reserves when it ceased to function",
          "He had alienated all potential allies by refusing to share power with anyone",
          "Foreign powers had bribed enough Convention members to ensure the vote against him",
        ],
        correct: 1,
        explanation: "Terror-based authority has nothing to fall back on when it stops functioning. Unlike Napoleon, who later built authority on military loyalty, plebiscite approval, and institutional codification, Robespierre's power was purely coercive — which meant it could collapse in an afternoon once the coercion failed.",
        tier: "analysis",
      },
      {
        text: "How did Thermidorian politicians construct a self-serving narrative about the Terror after Robespierre's fall?",
        options: [
          "They claimed the entire Terror had been planned by foreign spies and royalist agents",
          "They placed all responsibility on Robespierre personally, presenting his overthrow as liberation while concealing their own complicity in the Terror's operation",
          "They argued the Terror had been a necessary emergency measure that had successfully saved the Republic",
          "They published detailed accounts of their opposition to the Terror while it was happening",
        ],
        correct: 1,
        explanation: "Most Thermidorians had voted for Terror measures and signed execution orders. The 'Monster Robespierre' narrative served them perfectly — it concentrated all guilt in one villain and allowed former Terrorists to become liberators without accounting for their own roles. This kind of post-fact narrative construction is a recurring feature of political transitions from violent regimes.",
        tier: "stretch",
      },
    ],

    orderingEvents: [
      { id: 1, text: "Military victories reduce the genuine threat that justified the Terror", correctIndex: 0 },
      { id: 2, text: "Great Terror — executions accelerate even as the crisis passes", correctIndex: 1 },
      { id: 3, text: "Robespierre's vague final speech terrifies Convention members", correctIndex: 2 },
      { id: 4, text: "9 Thermidor — Convention votes to arrest Robespierre", correctIndex: 3 },
      { id: 5, text: "Robespierre guillotined — Thermidorian Reaction begins", correctIndex: 4 },
    ],

    swipeScenario: {
      date: "9 Thermidor 1794",
      situation: "You are a Convention deputy who heard Robespierre's threatening speech yesterday. You don't know if you are among his unnamed targets.",
      context: "You must decide whether to join the conspiracy against him or wait and see.",
      leftChoice: "Join the conspiracy",
      rightChoice: "Wait and see",
      leftOutcome: {
        title: "You survive",
        text: "The conspiracy succeeds. Robespierre is arrested and executed. You are now on the winning side of the most important political event of 1794. The Terror ends. You survive.",
        historical: "This is the choice most deputies made. The conspiracy succeeded precisely because so many people joined it from self-preservation — Robespierre's vague threat had accidentally unified everyone who feared him into a coalition large enough to destroy him.",
        reactions: [{ label: "Terror ends", color: "green" }, { label: "You survive", color: "green" }],
      },
      rightOutcome: {
        title: "Unknown outcome",
        text: "You wait. If Robespierre was not going to target you, nothing bad happens — but the Terror continues for others. If he was, you may be arrested before the conspiracy can save you.",
        historical: "Those who waited and were not targeted survived the Terror's continuation. Those who waited and were targeted did not. Given Robespierre's escalating paranoia, waiting was the higher-risk option — which is exactly why almost no one chose it.",
        reactions: [{ label: "Uncertain safety", color: "gray" }, { label: "Terror continues", color: "red" }],
      },
    },
  },

  /* ══════════ CHAPTER 7 ══════════ */
  {
    id: 7,
    title: "Napoleon Takes Power",
    date: "November 1799",
    keyFigure: "Napoleon Bonaparte",
    isUnlocked: false,
    isCompleted: false,
    xpReward: 250,
    description: "A decade of revolution ends not with liberty's triumph but with a military genius trading republican freedom for order — and remaking Europe in the process.",

    learn: {
      core: [
        "By November 1799, the French Republic was five years into its post-Terror phase and had still not found stable governance. The Directory — a five-person executive body that had governed France since 1795 — had survived four years through a combination of electoral manipulation, selective coups against both royalist and Jacobin threats, and the political cover provided by continued military success abroad. But it was widely despised. It was seen as corrupt, self-serving, and incapable of resolving France's underlying economic and political problems. The assignat currency had collapsed into worthlessness. Bread prices were again volatile. Political exhaustion after a decade of revolution was profound and near-universal. Into this vacuum came Napoleon Bonaparte, thirty years old, the most famous military commander in Europe, returning from a campaign in Egypt that had been militarily disastrous but that he had managed to present publicly as a triumph.",

        "The coup of 18 Brumaire (9 November 1799) was surprisingly messy and nearly failed. The plan was straightforward: Napoleon would appear before the Council of Five Hundred, France's lower legislative chamber, and present a manufactured political crisis — a fictional Jacobin conspiracy — to justify the transfer of power to a new executive of three consuls, with himself as First Consul. The Council of Ancients (the upper chamber) had already agreed in advance. But when Napoleon entered the Council of Five Hundred at the Orangerie of Saint-Cloud, the deputies, who had not been forewarned, surrounded him shouting 'Outlaw!' and 'Down with the dictator!' He was physically jostled, apparently fainted or was overcome, and had to be helped from the chamber by his guards. The coup appeared to be collapsing.",

        "Napoleon's brother Lucien, who happened to be presiding over the Council of Five Hundred that day, saved the situation. He delayed the session under various pretexts, then stepped outside and told the soldiers waiting there that the deputies were attacking the general — that daggers had been drawn against a defender of the republic. This was fabricated, but it was effective. The soldiers entered the chamber and cleared it. The remaining legislators — those who had not already fled — were later rounded up and presented with documents dissolving the Directory and establishing the Consulate. Most signed. What historians remember as a decisive seizure of power was, on the day, an improvised near-disaster rescued by a brother's quick thinking.",
      ],
      key: [
        "The Consulate established by the coup placed France under three consuls, but from the first day Napoleon's authority was paramount. A new constitution — drafted by the liberal theorist Sieyès and then largely rewritten by Napoleon to concentrate power in his own hands — was approved by plebiscite in late 1799. The plebiscite returned an implausibly large majority in Napoleon's favour, aided by significant administrative pressure, but it was not entirely fraudulent. France in 1799 genuinely wanted what Napoleon offered: competent leadership, administrative order, military glory, and an end to the cycle of constitutional experiments and political violence that had consumed the previous decade. He was offering something the Republic had repeatedly failed to provide.",

        "Napoleon's domestic programme during the Consulate years was extraordinarily ambitious and largely successful. He negotiated the Concordat of 1801 with Pope Pius VII, reconciling the Revolution's break with the Catholic Church and ending a decade of religious strife in France. He established the Banque de France to stabilise the currency and manage government finances. He created the grandes écoles — elite educational institutions designed to train a meritocratic administrative class. Most enduringly, he promulgated the Napoleonic Code in 1804 — a comprehensive civil legal code that systematised the Revolution's legal principles (equality before the law, property rights, freedom of contract, abolition of feudal obligations) into a rational, universal framework that remains the foundation of civil law across France and many other countries to this day.",

        "Napoleon's relationship with political freedom was straightforwardly authoritarian. Press censorship was introduced early in the Consulate period — by 1800, only thirteen Paris newspapers were permitted to publish, all subject to government review. Elections were retained but were structured so that Napoleon controlled the outcomes. An extensive police apparatus under Joseph Fouché monitored political opinion and suppressed dissent. When Napoleon made himself Emperor in 1804, creating a new imperial court with its own nobility, the distance from the Revolution's founding principles was obvious to anyone who chose to see it. Many who had supported him initially were disillusioned. Some, like the composer Beethoven — who had dedicated his Eroica Symphony to Napoleon as a hero of liberty — famously crossed out the dedication when Napoleon declared himself Emperor.",
      ],
      analysis: [
        "Napoleon's rise follows a pattern that recurs throughout history: periods of intense revolutionary instability creating structural conditions for authoritarian consolidation. The French Revolution had been extraordinarily effective at demolishing old structures — monarchy, feudalism, church privilege, aristocratic hierarchy — but consistently less effective at building durable new ones. Each constitutional experiment from 1789 to 1799 produced a framework that seemed rational in design and collapsed in practice: the constitutional monarchy of 1791, the First Republic's Convention system, the Directory. The result was what political scientists call an 'authority vacuum' — not the absence of government, but the absence of government that commanded stable, legitimate authority. Into such vacuums, force tends to flow, and Napoleon was that force.",

        "The question of whether Napoleon represented the Revolution's completion or its betrayal has been debated by historians for two centuries without reaching consensus. The 'completion' case points to the Napoleonic Code, the preservation of revolutionary land settlements (peasants kept the land they had acquired), the abolition of feudalism across conquered territories, and the export of revolutionary legal principles to most of Europe through French conquests. The 'betrayal' case points to the imperial title, the new nobility, the Concordat's rehabilitation of the church, the censorship, the manipulated elections, and the endless wars that drained France of men and wealth. Both arguments are describing the same man and the same regime — which suggests the question may be slightly mis-posed. Napoleon was something new: an authoritarian state built from revolutionary materials.",
      ],
      stretch: [
        "Max Weber's typology of legitimate authority provides the most illuminating framework for understanding both Napoleon's rise and his ultimate vulnerability. Weber distinguished three types of legitimate authority: traditional (based on custom and heredity — what kings claimed), rational-legal (based on rules and constitutions — what the Revolution tried to build), and charismatic (based on the perceived extraordinary personal qualities of an individual leader). Napoleon's authority was almost entirely charismatic: it derived from his military genius, his historical aura, his personal magnetism, and his apparent embodiment of France's national destiny. This type of authority is the most powerful of the three when it functions — it can override both tradition and law — but it has no institutional reserves. When the charisma fails — when the military genius is beaten at Waterloo — there is nothing left. No institutional loyalty, no constitutional principle, no hereditary claim. The authority evaporates completely, which is why Napoleon's career ended so decisively and so finally.",

        "The long-run historical significance of Napoleon's conquests was paradoxical in a way that he did not intend and might not have appreciated. By conquering most of continental Europe and imposing French administrative, legal, and social systems on conquered territories, Napoleon spread the Revolution's substantive achievements far more effectively than the revolutionary government itself had managed through propaganda or example. The abolition of feudal obligations, the introduction of legal equality, the separation of church from state administration, the establishment of merit-based civil services — all of these arrived in countries from Spain to Poland through French military occupation. The man who ended the French Republic may have done more to advance the Revolution's actual legacy across Europe than any of the republicans who preceded him.",
      ],
    },

    questions: [
      {
        text: "Why was the Directory politically vulnerable to Napoleon's coup in 1799?",
        options: [
          "It had lost popular support by executing thousands of Jacobins after Thermidor",
          "It was corrupt, seen as ineffective, and had become structurally dependent on military commanders to suppress threats from both left and right",
          "Napoleon had bribed all five Directory members to resign voluntarily",
          "The Directory had already decided internally to transfer power to a military government",
        ],
        correct: 1,
        explanation: "The Directory survived not through legitimacy but through military dependence. Each political crisis required calling on generals to suppress it, gradually shifting real power toward the army. Napoleon's coup was the logical endpoint of a process already well underway — the Directory had created its own vulnerability.",
        tier: "core",
      },
      {
        text: "What actually saved the 18 Brumaire coup when it appeared to be failing?",
        options: [
          "Napoleon's personal speech to the troops outside, which inspired their loyalty",
          "Lucien Bonaparte telling soldiers outside that deputies were attacking Napoleon with daggers — a fabrication that caused the chamber to be cleared",
          "The Council of Ancients voting to formally dissolve the Directory before Napoleon entered",
          "A pre-arranged signal from Sieyès that caused the Directory members to resign simultaneously",
        ],
        correct: 1,
        explanation: "When Napoleon was jostled out of the chamber and the coup appeared to collapse, it was his brother Lucien — presiding over the Council that day — who fabricated the story of deputies attacking the general. This gave the soldiers outside a pretext to clear the chamber and rescue the coup.",
        tier: "key",
      },
      {
        text: "Why is the Napoleonic Code considered Napoleon's most enduring achievement?",
        options: [
          "Because it restored the legal privileges of the nobility that the Revolution had abolished",
          "Because it systematised revolutionary legal principles — equality before law, property rights, abolished feudalism — into a rational framework that still governs civil law in many countries",
          "Because it created France's first constitutional guarantee of freedom of the press",
          "Because it legally defined and protected the republican constitution against imperial revision",
        ],
        correct: 1,
        explanation: "The Napoleonic Code replaced France's chaotic patchwork of feudal, regional, and religious laws with a rational universal system based on revolutionary principles. It spread with French conquests across Europe and remains the foundation of civil law in France, Belgium, Italy, Spain, and much of Latin America.",
        tier: "key",
      },
      {
        text: "What recurring historical pattern does Napoleon's rise most clearly demonstrate?",
        options: [
          "That military commanders always betray the revolutionary movements they initially serve",
          "That revolutionary instability creates structural authority vacuums that authoritarian consolidation tends to fill",
          "That economic recovery always requires suspension of democratic institutions",
          "That popular revolutions inevitably restore hereditary monarchy within a generation",
        ],
        correct: 1,
        explanation: "The Revolution demolished old structures effectively but failed to build durable legitimate new ones. Each constitutional experiment collapsed. The resulting authority vacuum — not absence of government but absence of legitimate authority — created conditions Napoleon filled. This pattern recurs from Rome to 20th-century revolutions.",
        tier: "analysis",
      },
      {
        text: "Why was Napoleon's charismatic authority particularly vulnerable compared to traditional or rational-legal authority?",
        options: [
          "Because charismatic authority depends on continuous military success and has no institutional reserves when the charisma fails",
          "Because the French constitution specifically prohibited charismatic leaders from holding executive power",
          "Because Napoleon had never formally been elected and therefore lacked any democratic mandate",
          "Because the Catholic Church refused to endorse Napoleon's authority despite the Concordat",
        ],
        correct: 0,
        explanation: "Weber's analysis explains why Waterloo ended Napoleon's career so completely and finally. Charismatic authority rests on the leader's perceived extraordinary qualities — when those are disproven by defeat, there is nothing institutional left to support the authority. No loyal institution, no constitutional principle, no hereditary claim. It evaporates.",
        tier: "stretch",
      },
    ],

    orderingEvents: [
      { id: 1, text: "Directory becomes corrupt and dependent on military support to survive", correctIndex: 0 },
      { id: 2, text: "Napoleon returns from Egypt — presents failure as triumph", correctIndex: 1 },
      { id: 3, text: "18 Brumaire coup nearly fails — Lucien saves it with fabricated story", correctIndex: 2 },
      { id: 4, text: "Directory dissolved — Consulate established", correctIndex: 3 },
      { id: 5, text: "Napoleon as First Consul — Napoleonic Code follows within five years", correctIndex: 4 },
    ],

    swipeScenario: {
      date: "November 1799",
      situation: "The Directory is failing. France is exhausted after a decade of revolution. A celebrated general offers to take control and restore stability.",
      context: "France must choose between backing the coup and defending the struggling republic.",
      leftChoice: "Back the coup",
      rightChoice: "Defend the republic",
      leftOutcome: {
        title: "Order restored — at a price",
        text: "Napoleon takes power. Administrative competence returns. The Napoleonic Code preserves revolutionary legal gains. Wars are managed effectively. But press freedom is crushed, elections become theatre, and within five years Napoleon is Emperor.",
        historical: "This is what happened. Napoleon's regime delivered stability and legal achievement while systematically dismantling political freedom. The trade was welcomed by a population exhausted by revolution — at least initially.",
        reactions: [{ label: "Stability returns", color: "green" }, { label: "Liberty curtailed", color: "red" }],
      },
      rightOutcome: {
        title: "Continued instability",
        text: "The Directory stumbles on. Factional conflicts between royalists and Jacobins continue. Economic instability persists. France remains politically fragile with no clear path to stable government.",
        historical: "The Directory had already failed multiple times. Without structural reform, continued instability and eventual collapse to royalist restoration was the most historically likely alternative to Napoleon.",
        reactions: [{ label: "Freedom preserved", color: "green" }, { label: "Chaos continues", color: "red" }],
      },
    },
  },
];
