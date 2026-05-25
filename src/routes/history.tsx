import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { CheckCircle, Lock, ArrowLeftRight, Home, BookOpen, User, MessageSquare, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/history")({
  component: HistoryPage,
  head: () => ({ meta: [{ title: "CivicLoop — French Revolution" }] }),
});

// ── DATA ────────────────────────────────────────────────────────────────────

const chapters = [
  {
    id: 1,
    title: "Causes of the Revolution",
    keyFigure: "King Louis XVI",
    date: "1788–1789",
    description: "By 1789 France was bankrupt from funding the American Revolution, bread prices had tripled after two failed harvests, and the gap between aristocracy and peasants had never been wider. Louis XVI had no solution — and no credibility left to find one.",
    isUnlocked: true,
    isCompleted: true,
    questions: [
      { text: "What was the primary cause of France's bankruptcy before the Revolution?", options: ["Expensive wars including the American Revolution", "A devastating plague", "A foreign invasion", "A royal spending scandal"], correct: 0, explanation: "France spent enormous sums funding the American Revolution against Britain, leaving the treasury empty." },
      { text: "By 1789, bread prices in France had risen by approximately how much?", options: ["10%", "50%", "80%–100%", "Over 200%"], correct: 2, explanation: "After two failed harvests, bread prices roughly doubled — catastrophic for working people who spent 80% of income on food." },
      { text: "What were the three Estates in French society?", options: ["Monarchy, Nobles, Peasants", "Clergy, Nobility, Everyone else", "King, Lords, Serfs", "Church, Army, Citizens"], correct: 1, explanation: "The First Estate was the clergy, Second the nobility, Third Estate everyone else — about 97% of the population." },
      { text: "What was the Estates-General?", options: ["A military assembly", "A political assembly not called since 1614", "The French parliament", "A royal advisory council"], correct: 1, explanation: "The Estates-General was a consultative assembly Louis XVI convened in May 1789 — the first time since 1614." },
      { text: "What did the Third Estate do when Louis XVI tried to dismiss them?", options: ["They went home", "They stormed the Bastille", "They declared themselves a National Assembly", "They wrote a petition to the king"], correct: 2, explanation: "The Third Estate broke away and declared themselves a National Assembly on June 17, 1789 — a revolutionary act." },
      { text: "Who was France's finance minister whose dismissal sparked riots?", options: ["Robespierre", "Necker", "Lafayette", "Mirabeau"], correct: 1, explanation: "Jacques Necker was popular because he published royal finances and favoured reform. His dismissal on July 11 triggered mass outrage." },
      { text: "What was the Tennis Court Oath?", options: ["A royal decree banning sports", "A vow by the Third Estate not to disband until a constitution was written", "A military oath of loyalty", "A trade agreement"], correct: 1, explanation: "On June 20, 1789, finding their meeting hall locked, the Third Estate gathered at a tennis court and swore not to disband until France had a constitution." },
      { text: "What percentage of France's population was the Third Estate?", options: ["Around 50%", "Around 70%", "Around 97%", "Around 80%"], correct: 2, explanation: "The Third Estate comprised roughly 97% of France's population but had the least political power and paid the most taxes." },
      { text: "Which Enlightenment idea most influenced the French Revolution?", options: ["Divine right of kings", "Natural rights and social contract", "Mercantilism", "Religious authority"], correct: 1, explanation: "Thinkers like Rousseau and Locke argued that governments derive power from the people — ideas that directly challenged monarchy." },
      { text: "What event triggered the actual start of the Revolution in Paris?", options: ["Louis XVI raising taxes", "The dismissal of Necker and rising bread prices", "A foreign invasion", "The death of Marie Antoinette"], correct: 1, explanation: "Necker's dismissal combined with desperate bread shortages caused Parisians to arm themselves — leading directly to the storming of the Bastille." },
    ],
    orderingEvents: [
      { id: 1, text: "France goes bankrupt funding the American Revolution", correctPosition: 0 },
      { id: 2, text: "Two failed harvests triple bread prices", correctPosition: 1 },
      { id: 3, text: "Louis XVI calls the Estates-General", correctPosition: 2 },
      { id: 4, text: "Third Estate declares itself National Assembly", correctPosition: 3 },
    ],
    swipeScenario: {
      date: "FRANCE · 1789",
      situation: "Bread prices are exploding across Paris.",
      context: "It is 1789. Harvests have failed. Bread prices have tripled. Thousands are starving. Riots spread through the city. As advisor to King Louis XVI — you must act.",
      leftChoice: "Raise Taxes",
      rightChoice: "Subsidise Grain",
      leftOutcome: { title: "You chose: Raise Taxes", text: "The tax increase sparked fury. Riots intensified across every arrondissement. Within weeks the Bastille was stormed. The Revolution had begun — there was no turning back.", reactions: [{ label: "Peasants: FURIOUS", color: "red" }, { label: "Merchants: FURIOUS", color: "red" }, { label: "Aristocracy: RELIEVED", color: "green" }], historical: "This mirrors what Louis XVI actually did — delay and taxation — which accelerated the Revolution." },
      rightOutcome: { title: "You chose: Subsidise Grain", text: "Bread prices fell slightly and riots eased briefly. But the royal treasury — already bankrupt from American war debts — collapsed within months. The Revolution was delayed but not stopped.", reactions: [{ label: "Peasants: RELIEVED", color: "green" }, { label: "Merchants: NEUTRAL", color: "white" }, { label: "Aristocracy: ANGRY", color: "red" }], historical: "Some historians argue early grain subsidies could have bought Louis XVI time — but France was already too financially broken." },
    },
  },
  {
    id: 2,
    title: "Storming the Bastille",
    keyFigure: "The Parisian Mob",
    date: "July 1789",
    description: "On 14 July 1789 thousands of Parisians stormed the Bastille prison. They freed its prisoners, seized its weapons, and paraded the governor's severed head through the streets. This single act became the defining symbol of the Revolution — and is still France's national holiday today.",
    isUnlocked: true,
    isCompleted: false,
    questions: [
      { text: "On what date was the Bastille stormed?", options: ["June 21, 1789", "July 4, 1789", "July 14, 1789", "August 1, 1789"], correct: 2, explanation: "July 14, 1789 — now Bastille Day — France's national holiday." },
      { text: "How many prisoners were actually found in the Bastille when it fell?", options: ["Over 100", "Around 50", "Just 7", "None"], correct: 2, explanation: "Only 7 prisoners were found — making the symbolic victory far greater than the practical one." },
      { text: "What did the crowd primarily want from the Bastille?", options: ["To free political prisoners", "Weapons and gunpowder stored inside", "To arrest the governor", "To destroy the building"], correct: 1, explanation: "The crowd mainly wanted the 250 barrels of gunpowder stored in the fortress to arm themselves." },
      { text: "What happened to the Bastille's governor, de Launay?", options: ["He escaped to England", "He was tried and executed", "He was killed by the mob and his head paraded on a pike", "He surrendered peacefully and was imprisoned"], correct: 2, explanation: "De Launay was killed by the mob despite attempting to negotiate. His head was displayed on a pike through Paris." },
      { text: "What did the Bastille represent to ordinary French people?", options: ["Royal generosity", "Military protection", "Royal tyranny and arbitrary imprisonment", "Religious authority"], correct: 2, explanation: "The Bastille held political prisoners without trial — a symbol of everything wrong with royal power." },
      { text: "What did Louis XVI write in his diary on July 14, 1789?", options: ["'Revolution has begun'", "'Nothing'", "'The people have risen'", "'Send troops immediately'"], correct: 1, explanation: "Louis XVI wrote 'Rien' (nothing) in his diary on July 14 — he had been hunting and didn't understand the significance of what had happened." },
      { text: "What revolutionary symbol emerged from the storming of the Bastille?", options: ["The guillotine", "The tricolore flag (red white blue)", "The Phrygian cap", "The fleur-de-lis"], correct: 1, explanation: "The red and blue of Paris were combined with the white of the king's flag to create the tricolore — still France's flag today." },
      { text: "How long did the storming of the Bastille take?", options: ["Several weeks", "A few days", "About 4 hours", "One night"], correct: 2, explanation: "The actual assault lasted around 4 hours, from midday to late afternoon on July 14." },
      { text: "What was significant about the National Guard's role in the Bastille's fall?", options: ["They defended the Bastille", "They refused orders to fire on the crowd", "They were absent", "They arrested the mob"], correct: 1, explanation: "When ordered to disperse the crowd, units of the National Guard defected and joined the attackers instead — a critical turning point." },
      { text: "The Bastille was demolished after it fell. What happened to its stones?", options: ["They were dumped in the Seine", "They were sold as souvenirs across France and Europe", "They were used to build a new palace", "They were buried"], correct: 1, explanation: "Entrepreneur Palloy broke up the Bastille and sold its stones as revolutionary souvenirs — an early example of political merchandise." },
    ],
    orderingEvents: [
      { id: 1, text: "Necker dismissed — Parisians arm themselves", correctPosition: 0 },
      { id: 2, text: "Crowd gathers outside the Bastille", correctPosition: 1 },
      { id: 3, text: "Bastille falls after 4 hours", correctPosition: 2 },
      { id: 4, text: "Louis XVI recognises the tricolore", correctPosition: 3 },
    ],
    swipeScenario: {
      date: "BASTILLE · 14 JULY 1789",
      situation: "Armed crowds surround the Bastille.",
      context: "It is midday on July 14. You are Governor de Launay. Ten thousand armed Parisians surround the fortress demanding the weapons stored inside. Your garrison of 82 soldiers is outnumbered. The crowd grows angrier by the hour.",
      leftChoice: "Open Fire",
      rightChoice: "Negotiate",
      leftOutcome: { title: "You ordered your troops to fire.", text: "Initial volleys scatter the crowd — but they return with cannons. The fortress falls in hours. Your troops surrender. The mob finds you attempting to hide. Your head is paraded on a pike through Paris.", reactions: [{ label: "Crowd: ENRAGED", color: "red" }, { label: "Paris: UNITED", color: "red" }, { label: "Louis XVI: HORRIFIED", color: "red" }], historical: "Opening fire only strengthened revolutionary resolve. The Bastille fell regardless." },
      rightOutcome: { title: "You attempted to negotiate.", text: "Historical outcome: De Launay did try to negotiate — even offering to surrender if his soldiers could leave safely. The mob, impatient and angry, broke through the drawbridge. De Launay was killed regardless. Surrender changed nothing.", reactions: [{ label: "Crowd: IMPATIENT", color: "red" }, { label: "Garrison: RELIEVED", color: "green" }, { label: "Revolution: INEVITABLE", color: "white" }], historical: "No decision could have stopped the Bastille falling that day. The Revolution had its own momentum now." },
    },
  },
  {
    id: 3,
    title: "Women's March on Versailles",
    keyFigure: "The Market Women of Paris",
    date: "October 1789",
    description: "Thousands of Parisian women, furious about bread prices and reports of royalist celebrations at Versailles, marched 12 miles in the rain armed with pikes and kitchen knives. They forced Louis XVI to return to Paris — ending royal independence forever.",
    isUnlocked: false,
    isCompleted: false,
    questions: [
      { text: "How far did the women march to reach Versailles?", options: ["3 miles", "7 miles", "12 miles", "20 miles"], correct: 2, explanation: "The women marched roughly 12 miles from central Paris to Versailles in cold October rain." },
      { text: "What triggered the Women's March?", options: ["Marie Antoinette's spending", "Bread shortages and reports of royalist celebrations insulting the tricolore", "Louis XVI refusing to sign legislation", "The arrest of a revolutionary leader"], correct: 1, explanation: "Reports that officers at Versailles had trampled the tricolore during celebrations, combined with desperate bread shortages, ignited the march." },
      { text: "What did the women demand when they arrived at Versailles?", options: ["Louis XVI's execution", "Bread for Paris and for Louis XVI to return to the city", "Marie Antoinette to be arrested", "A new constitution immediately"], correct: 1, explanation: "The women demanded bread for their starving families and that Louis XVI relocate to Paris where the people could watch him." },
      { text: "What happened when some women broke into the palace?", options: ["They were shot by guards", "They were arrested and tried", "They reached Marie Antoinette's room — she barely escaped", "They found the palace empty"], correct: 2, explanation: "A group broke through to the royal apartments. Marie Antoinette fled through a secret passage moments before the mob reached her bedroom." },
      { text: "How did the march end?", options: ["Women were arrested", "Louis XVI agreed to return to Paris and released grain stores", "The women were dispersed by troops", "Louis XVI fled to Austria"], correct: 1, explanation: "Louis XVI met with a delegation of women, agreed to release grain stores and — crucially — agreed to move the royal family to Paris." },
      { text: "Who accompanied the women on the march?", options: ["Only women", "Women, men, and National Guard units", "Mostly men dressed as women", "Armed soldiers only"], correct: 1, explanation: "The march began with women but was quickly joined by men and eventually by Lafayette's National Guard." },
      { text: "What did the crowd chant as they escorted Louis XVI back to Paris?", options: ["'Liberté!'", "'We have the baker, the baker's wife, and the baker's boy'", "'Down with the king!'", "'Bread or blood!'"], correct: 1, explanation: "The crowd mockingly called Louis XVI 'the baker' and his family 'the baker's wife and boy' — referring to their responsibility to feed the people." },
      { text: "What was the political significance of the march?", options: ["It ended the Revolution", "It removed royal independence — Louis never returned to Versailles", "It led directly to Robespierre's rise", "It had little long-term impact"], correct: 1, explanation: "Moving to Paris placed the royal family under constant public scrutiny. Louis XVI never returned to Versailles. Royal independence was over." },
      { text: "What role did women play in the Revolution more broadly?", options: ["Only this one march", "Women were entirely excluded", "Women ran market networks, organised protests, and formed political clubs", "Women fought in the army only"], correct: 2, explanation: "Women were central to the Revolution — running food networks, organising protests, writing pamphlets, and forming political clubs like the Society of Revolutionary Republican Women." },
      { text: "The Women's March is considered significant in history because:", options: ["It was the first time a monarch was killed", "It showed ordinary working women shaping major political events", "It ended the monarchy immediately", "It led to women getting the vote"], correct: 1, explanation: "The march showed that ordinary, working-class women could force a king to act — an unprecedented moment in European history." },
    ],
    orderingEvents: [
      { id: 1, text: "Reports of royalist celebrations insulting the tricolore reach Paris", correctPosition: 0 },
      { id: 2, text: "Thousands of women gather at city hall demanding bread", correctPosition: 1 },
      { id: 3, text: "Women march 12 miles in rain to Versailles", correctPosition: 2 },
      { id: 4, text: "Louis XVI agrees to return to Paris with his family", correctPosition: 3 },
    ],
    swipeScenario: {
      date: "VERSAILLES · OCTOBER 1789",
      situation: "Thousands of armed women have arrived at your palace.",
      context: "October 5, 1789. Thousands of furious women — and now men — surround Versailles. They are armed with pikes. They demand bread and your return to Paris. As Louis XVI's chief advisor, you must decide immediately.",
      leftChoice: "Send Troops",
      rightChoice: "Meet Them",
      leftOutcome: { title: "You deployed the royal guard.", text: "Confrontation erupts at the palace gates. Shots fired. Women and guards killed. News spreads across France in hours. Louis XVI is branded a murderer of starving women. The monarchy loses its last shred of legitimacy overnight.", reactions: [{ label: "Paris: OUTRAGED", color: "red" }, { label: "Provinces: MOBILISING", color: "red" }, { label: "Monarchy: DESTROYED", color: "red" }], historical: "Firing on the crowd would have accelerated the monarchy's collapse beyond recovery." },
      rightOutcome: { title: "You allowed them to approach.", text: "Historical outcome: Louis XVI met with a delegation of women and agreed to release grain stores. He then agreed — under enormous pressure — to relocate the royal family to Paris. A tactical retreat that bought time but ended royal independence forever.", reactions: [{ label: "Women: PARTIALLY SATISFIED", color: "green" }, { label: "Paris: WATCHING", color: "white" }, { label: "Monarchy: WEAKENED", color: "red" }], historical: "Louis XVI's decision to meet the women was the correct tactical choice — but no decision could stop the Revolution now." },
    },
  },
  {
    id: 4,
    title: "Flight to Varennes",
    keyFigure: "Marie Antoinette",
    date: "June 1791",
    description: "Louis XVI and Marie Antoinette disguised themselves as servants and fled Paris in a large coach, heading for Austrian allies. They were recognised at a small town called Varennes and brought back to Paris in complete silence — the crowd too disgusted even to shout.",
    isUnlocked: false,
    isCompleted: false,
    questions: [
      { text: "Why did Louis XVI attempt to flee France?", options: ["To join Napoleon's army", "To seek Austrian military support and reverse the Revolution", "To attend his sister's wedding", "To escape debt collectors"], correct: 1, explanation: "Louis hoped to reach Austrian forces, rally counter-revolutionary support, and return to crush the Revolution." },
      { text: "How was Louis XVI recognised at Varennes?", options: ["By his royal crest on the coach", "His face matched his image on the new French banknotes", "A soldier recognised Marie Antoinette", "His passport was forged badly"], correct: 1, explanation: "Local postmaster Drouet recognised Louis XVI from his portrait on assignat banknotes — an irony of the new revolutionary currency." },
      { text: "What disguise did the royal family use?", options: ["Military uniforms", "They posed as a Russian baroness and her servants", "They dressed as peasants", "They wore masks"], correct: 1, explanation: "The family posed as the household of a fictional Russian baroness, Madame de Korff. Louis posed as her butler." },
      { text: "What was the public reaction as Louis XVI was brought back to Paris?", options: ["Cheering crowds", "Riots and violence", "Silence — crowds watched without a word", "Flowers thrown in celebration"], correct: 2, explanation: "In a powerful act of contempt, Parisians watched the returning royal coach in total silence. No cheers. No anger. Just silence." },
      { text: "What did the Flight to Varennes prove to ordinary French people?", options: ["Louis XVI was loyal to France", "Louis XVI was planning to reverse the Revolution and had betrayed them", "Marie Antoinette was controlling Louis", "France needed a stronger monarchy"], correct: 1, explanation: "The flight proved that Louis XVI, while publicly accepting the Revolution, was secretly plotting against it with foreign powers." },
      { text: "What happened to Louis XVI after his return from Varennes?", options: ["He was immediately executed", "He was suspended from power temporarily then restored with reduced powers", "He was exiled", "Nothing changed"], correct: 1, explanation: "Louis was temporarily suspended from power. The Assembly restored him but with drastically reduced authority under the new constitutional monarchy." },
      { text: "How far did the royal family get before being stopped?", options: ["They made it to Austria", "They made it to the border but were stopped crossing", "They were stopped at Varennes, about 30 miles from the border", "They were caught leaving Paris"], correct: 2, explanation: "Varennes was approximately 30 miles from the Austrian border. They were agonisingly close to escape." },
      { text: "Who organised the escape plan?", options: ["Marie Antoinette and her Swedish friend Count Fersen", "Louis XVI alone", "The Pope", "British intelligence"], correct: 0, explanation: "Marie Antoinette and her close friend, Swedish Count Axel von Fersen, planned the escape in detail. Fersen even drove the coach initially." },
      { text: "What was the long-term consequence of the failed flight?", options: ["Greater trust in Louis XVI", "The immediate abolition of the monarchy", "It radicalised public opinion and made a republic increasingly inevitable", "It led to war with Austria immediately"], correct: 2, explanation: "The flight destroyed any remaining hope of constitutional monarchy. Republicans grew in number. The republic was declared just over a year later." },
      { text: "Austria and Prussia declared war on France partly because of Varennes. What was this war called?", options: ["The Seven Years War", "The War of the First Coalition", "The Napoleonic Wars", "The Revolutionary War"], correct: 1, explanation: "The War of the First Coalition (1792) began when Austria and Prussia invaded France, partly motivated by protecting Louis XVI and suppressing the Revolution." },
    ],
    orderingEvents: [
      { id: 1, text: "Royal family flees Paris at midnight in disguise", correctPosition: 0 },
      { id: 2, text: "Louis XVI recognised from banknote portrait at Sainte-Menehould", correctPosition: 1 },
      { id: 3, text: "Coach stopped by guards at Varennes", correctPosition: 2 },
      { id: 4, text: "Royal family returned to Paris in total silence", correctPosition: 3 },
    ],
    swipeScenario: {
      date: "VARENNES · JUNE 1791",
      situation: "Your coach has been stopped. You have been recognised.",
      context: "You are Louis XVI. It is midnight. Your disguise has failed. A postmaster has identified you from your portrait on French banknotes. The National Guard is assembling. You have minutes to decide.",
      leftChoice: "Reveal Yourself",
      rightChoice: "Deny Everything",
      leftOutcome: { title: "You revealed your identity.", text: "You demanded, as king, that the guards stand aside. Some wavered. Then the local mayor arrived. Royal authority means nothing here. You are placed under citizen's arrest and returned to Paris — your last claim to power gone.", reactions: [{ label: "Guards: DEFIANT", color: "red" }, { label: "Paris: CONTEMPTUOUS", color: "red" }, { label: "Austria: ABANDONED YOU", color: "red" }], historical: "Even revealing himself as king could not save Louis XVI. The people's authority had surpassed royal authority completely." },
      rightOutcome: { title: "You denied everything.", text: "Your denial was unconvincing. Three separate people had now confirmed your identity. The game was over before it began. You are arrested and returned to Paris in silence. The flight that was meant to save the monarchy destroyed it.", reactions: [{ label: "Guards: UNCONVINCED", color: "red" }, { label: "Crowd: SILENT CONTEMPT", color: "red" }, { label: "Revolution: RADICALISED", color: "red" }], historical: "Historical: Louis XVI briefly maintained his disguise but was conclusively identified. There was no escape." },
    },
  },
  {
    id: 5,
    title: "Reign of Terror",
    keyFigure: "Robespierre",
    date: "1793–1794",
    description: "Under Maximilien Robespierre and the Committee of Public Safety, the Revolution devoured itself. Around 17,000 people were officially guillotined as enemies of the Republic — including the king, queen, and eventually Robespierre's own closest allies. No one was safe.",
    isUnlocked: false,
    isCompleted: false,
    questions: [
      { text: "Who led the Reign of Terror?", options: ["Napoleon Bonaparte", "Louis XVI", "Maximilien Robespierre", "Marie Antoinette"], correct: 2, explanation: "Robespierre, as dominant member of the Committee of Public Safety, directed the Terror with ideological zeal." },
      { text: "What body organised and directed the Terror?", options: ["The National Assembly", "The Committee of Public Safety", "The Directory", "The Jacobin Club"], correct: 1, explanation: "The Committee of Public Safety was a 12-member emergency war government that wielded dictatorial power during the Terror." },
      { text: "Approximately how many people were executed during the Terror?", options: ["Around 300", "Around 2,000", "Around 17,000", "Around 100,000"], correct: 2, explanation: "Around 17,000 were officially executed. When those who died in prison or without trial are counted, the total rises to about 40,000." },
      { text: "When was Louis XVI guillotined?", options: ["July 1789", "October 1791", "January 1793", "July 1794"], correct: 2, explanation: "Louis XVI was guillotined on January 21, 1793, on the Place de la Révolution (now Place de la Concorde) in Paris." },
      { text: "What was Robespierre's justification for the Terror?", options: ["Personal revenge", "Emergency military measures in a time of war and counter-revolution", "Religious law", "Economic policy"], correct: 1, explanation: "Robespierre argued the Terror was necessary to protect the Revolution from internal and external enemies during wartime." },
      { text: "When was Marie Antoinette executed?", options: ["January 1793", "June 1793", "October 1793", "July 1794"], correct: 2, explanation: "Marie Antoinette was guillotined on October 16, 1793, nine months after her husband." },
      { text: "What happened to the journalist Georges Danton, once a revolutionary hero?", options: ["He escaped to England", "He was guillotined on Robespierre's orders", "He led a counter-revolution", "He survived and wrote his memoirs"], correct: 1, explanation: "Danton, who called for the Terror to end, was arrested on Robespierre's orders and guillotined in April 1794." },
      { text: "What term describes the period of execution that peaked in June–July 1794?", options: ["The Great Purge", "The Great Terror", "The Red Summer", "The Final Judgement"], correct: 1, explanation: "The 'Great Terror' of June–July 1794 saw executions reach 50 per day. This extreme acceleration turned Robespierre's own allies against him." },
      { text: "What was the Revolutionary Tribunal?", options: ["A public opinion poll", "A special court that tried enemies of the Revolution with minimal defence", "A newspaper", "A military court-martial"], correct: 1, explanation: "The Revolutionary Tribunal tried accused counter-revolutionaries with no right of appeal and often no real evidence. Accusation frequently meant death." },
      { text: "Robespierre's downfall came partly because:", options: ["He lost a public election", "His allies feared they were next on his execution list", "Napoleon overthrew him", "He died of natural causes"], correct: 1, explanation: "As executions accelerated, senior politicians feared Robespierre would turn on them next. They pre-emptively moved to arrest him — and succeeded." },
    ],
    orderingEvents: [
      { id: 1, text: "Louis XVI guillotined on Place de la Révolution", correctPosition: 0 },
      { id: 2, text: "Committee of Public Safety takes control", correctPosition: 1 },
      { id: 3, text: "Danton executed on Robespierre's orders", correctPosition: 2 },
      { id: 4, text: "Great Terror peaks at 50 executions per day", correctPosition: 3 },
    ],
    swipeScenario: {
      date: "PARIS · 1794",
      situation: "Robespierre places an execution order on your desk.",
      context: "1794. You are a member of the Committee of Public Safety. Robespierre slides an order to you — your neighbour, a man you know to be innocent, is accused of counter-revolutionary thought. Sign, or refuse.",
      leftChoice: "Sign the Order",
      rightChoice: "Refuse to Sign",
      leftOutcome: { title: "You signed the order.", text: "Your neighbour is guillotined within days. You survive — for now. But Robespierre's lists grow longer. Six weeks later, your own name appears. The Revolution has devoured another of its own.", reactions: [{ label: "Robespierre: SATISFIED", color: "green" }, { label: "Your conscience: BROKEN", color: "red" }, { label: "Your safety: TEMPORARY", color: "red" }], historical: "Many Committee members signed orders for innocent people. Most eventually faced the same fate." },
      rightOutcome: { title: "You refused to sign.", text: "Robespierre marks you as a sympathiser with enemies. You are arrested within days. But your refusal becomes known. Whispers spread through the Convention. Others begin to question. You helped plant the seed of Robespierre's downfall.", reactions: [{ label: "Robespierre: SUSPICIOUS", color: "red" }, { label: "Fellow Deputies: WATCHING", color: "white" }, { label: "The Revolution: TURNING", color: "white" }], historical: "Individual acts of refusal did contribute to the growing coalition that would eventually overthrow Robespierre." },
    },
  },
  {
    id: 6,
    title: "Fall of Robespierre",
    keyFigure: "The National Convention",
    date: "July 1794",
    description: "On 9 Thermidor (July 27, 1794), Robespierre's own colleagues in the National Convention rose against him. He was arrested, and guillotined the next day. The Reign of Terror ended overnight — the Revolution had finally stopped consuming itself.",
    isUnlocked: false,
    isCompleted: false,
    questions: [
      { text: "What is the Thermidorian Reaction?", options: ["A weather event", "The political backlash that overthrew Robespierre", "Napoleon's first coup", "A new tax system"], correct: 1, explanation: "The Thermidorian Reaction (named after the revolutionary month of Thermidor) refers to the political shift that ended the Terror and overthrew Robespierre." },
      { text: "When was Robespierre arrested?", options: ["June 21, 1794", "July 27, 1794", "August 14, 1794", "October 5, 1794"], correct: 1, explanation: "9 Thermidor Year II in the revolutionary calendar — July 27, 1794 in the Gregorian calendar." },
      { text: "How did Robespierre react when arrested in the Convention?", options: ["He escaped", "He gave a long speech", "He appeared paralysed and barely spoke", "He attacked the guards"], correct: 2, explanation: "Robespierre appeared shocked and paralysed. Some accounts say he tried to speak but was shouted down. He was taken to the Luxembourg prison." },
      { text: "Was Robespierre tried before being executed?", options: ["Yes, a full trial", "Yes, but only briefly", "No — he was guillotined without trial, like many of his own victims", "Yes, it took several weeks"], correct: 2, explanation: "Robespierre was guillotined on July 28, 1794 — without a proper trial. The same system he used against others was turned on him." },
      { text: "What happened immediately after Robespierre's execution?", options: ["A new Terror began", "Napoleon took over", "Political prisoners were released and executions stopped", "France surrendered to Austria"], correct: 2, explanation: "Executions stopped almost immediately. Political prisoners were released. The Revolutionary Tribunal was reformed and soon abolished." },
      { text: "What did the Thermidorian Reaction reveal about the Revolution?", options: ["That it was too lenient", "That revolutionary movements can destroy themselves", "That monarchy was preferable", "That France needed military leadership"], correct: 1, explanation: "The Terror showed how revolutions can radicalise beyond their original goals and turn on their own leaders — a pattern seen in later revolutions too." },
      { text: "What government replaced the Committee of Public Safety after Thermidor?", options: ["The Empire", "A constitutional monarchy", "The Directory", "The National Assembly"], correct: 2, explanation: "The Directory — a five-man executive council — governed France from November 1795 until Napoleon's coup in 1799." },
      { text: "How many days did Robespierre survive after being arrested?", options: ["One day", "Three days", "One week", "Two weeks"], correct: 0, explanation: "Robespierre was arrested on July 27 and guillotined on July 28, 1794 — just one day later." },
      { text: "What was ironic about Robespierre's death?", options: ["Nothing", "He was killed by the very system he had used to kill thousands of others", "He escaped briefly", "He died of natural causes first"], correct: 1, explanation: "Robespierre was guillotined without trial — exactly the fate he had imposed on thousands. His final moments mirrored those of his victims." },
      { text: "The calendar month 'Thermidor' is remembered today primarily because:", options: ["A famous battle was fought", "It gave its name to a classic French sauce", "It is when Napoleon was born", "It marks France's independence"], correct: 1, explanation: "Thermidor gave its name to 'Lobster Thermidor' — a dish reportedly created to celebrate the overthrow of Robespierre." },
    ],
    orderingEvents: [
      { id: 1, text: "Executions reach 50 per day — allies grow fearful", correctPosition: 0 },
      { id: 2, text: "Deputies plot against Robespierre in secret", correctPosition: 1 },
      { id: 3, text: "Robespierre arrested in the National Convention", correctPosition: 2 },
      { id: 4, text: "Robespierre guillotined — the Terror ends", correctPosition: 3 },
    ],
    swipeScenario: {
      date: "PARIS · JULY 1794",
      situation: "Your colleagues whisper: tomorrow we arrest Robespierre.",
      context: "July 1794. A fellow deputy pulls you aside in the corridor. 'Tomorrow in the Convention we move to arrest Robespierre. We have the numbers — but we need you. Are you with us?'",
      leftChoice: "Stay Silent",
      rightChoice: "Join the Plot",
      leftOutcome: { title: "You stayed silent.", text: "The plot succeeds without you. Robespierre is arrested and guillotined. You survive but are seen as a coward who let others take the risk. History barely records your name.", reactions: [{ label: "Conspirators: DISAPPOINTED", color: "red" }, { label: "You: SAFE", color: "green" }, { label: "History: FORGOTTEN", color: "white" }], historical: "Many deputies chose to stay neutral. They survived but played no role in ending the Terror." },
      rightOutcome: { title: "You joined the conspiracy.", text: "Historical outcome: On 9 Thermidor, deputies rose against Robespierre in the Convention. He was shouted down, arrested, and guillotined the next day. The Terror ended overnight. You helped end it.", reactions: [{ label: "France: RELIEVED", color: "green" }, { label: "Prisoners: FREED", color: "green" }, { label: "History: RECORDED", color: "green" }], historical: "The Thermidorian conspirators are remembered as the people who ended the bloodiest phase of the Revolution." },
    },
  },
  {
    id: 7,
    title: "Napoleon Takes Power",
    keyFigure: "Napoleon Bonaparte",
    date: "November 1799",
    description: "A brilliant young general named Napoleon Bonaparte, hero of the Italian and Egyptian campaigns, exploited the chaos of post-Terror France to stage a coup in November 1799. He appointed himself First Consul — and later Emperor. The Revolution was over. The Napoleonic era had begun.",
    isUnlocked: false,
    isCompleted: false,
    questions: [
      { text: "What was the name of Napoleon's coup?", options: ["The Thermidorian Reaction", "18 Brumaire", "The July Revolution", "The Consular Coup"], correct: 1, explanation: "18 Brumaire (November 9, 1799 in the Gregorian calendar) — named after the revolutionary calendar date of Napoleon's seizure of power." },
      { text: "What position did Napoleon give himself after the coup?", options: ["Emperor", "King", "First Consul", "President"], correct: 2, explanation: "Napoleon initially became First Consul — the dominant figure of a three-consul executive. He later made himself Consul for Life, then Emperor." },
      { text: "What government did Napoleon's coup overthrow?", options: ["The Committee of Public Safety", "The Directory", "The National Assembly", "The Jacobin Republic"], correct: 1, explanation: "The Directory — France's governing five-man executive since 1795 — was widely seen as corrupt and ineffective. Napoleon's coup faced little resistance." },
      { text: "When did Napoleon crown himself Emperor of France?", options: ["1799", "1801", "1804", "1807"], correct: 2, explanation: "Napoleon crowned himself Emperor on December 2, 1804 in Notre-Dame Cathedral — famously taking the crown from the Pope's hands and placing it on his own head." },
      { text: "What significant legal reform did Napoleon introduce?", options: ["Trial by jury", "The Napoleonic Code — a unified legal system for France", "Universal suffrage", "Abolition of the death penalty"], correct: 1, explanation: "The Napoleonic Code (1804) created a unified legal system based on equality before the law, property rights, and religious tolerance — still influencing French law today." },
      { text: "At what age did Napoleon become First Consul?", options: ["25", "30", "35", "40"], correct: 1, explanation: "Napoleon was just 30 years old when he seized power in November 1799." },
      { text: "Napoleon's Egyptian campaign (1798–1799) failed militarily but succeeded in:", options: ["Capturing Egypt permanently", "Defeating the British Navy", "Sparking enormous public interest and cementing Napoleon's fame in France", "Opening trade routes to India"], correct: 2, explanation: "Though militarily unsuccessful (the British destroyed his fleet at the Battle of the Nile), Napoleon's Egyptian campaign made him a celebrity in France and fuelled his political ambitions." },
      { text: "What happened to most members of the Directory when Napoleon staged his coup?", options: ["They were executed", "They were exiled", "They offered little resistance and accepted the situation", "They fled to England"], correct: 2, explanation: "Most Directory members offered minimal resistance. Napoleon had built alliances across the political establishment. The coup succeeded with barely a fight." },
      { text: "Napoleon was born on which island?", options: ["Sicily", "Sardinia", "Corsica", "Elba"], correct: 2, explanation: "Napoleon was born in Ajaccio, Corsica, on August 15, 1769 — just one year after France purchased the island from Genoa." },
      { text: "What does Napoleon's rise to power tell us about the French Revolution?", options: ["It proved democracy works", "It showed revolutions often end with a strongman filling the vacuum of authority", "It proved monarchy was necessary", "It had no broader lessons"], correct: 1, explanation: "Napoleon's rise is a classic example of how revolutionary instability can create the conditions for authoritarian leadership — a pattern repeated in later revolutions worldwide." },
    ],
    orderingEvents: [
      { id: 1, text: "Directory government becomes corrupt and unpopular", correctPosition: 0 },
      { id: 2, text: "Napoleon returns from Egypt as a war hero", correctPosition: 1 },
      { id: 3, text: "Coup of 18 Brumaire — Directory overthrown", correctPosition: 2 },
      { id: 4, text: "Napoleon declares himself First Consul", correctPosition: 3 },
    ],
    swipeScenario: {
      date: "PARIS · NOVEMBER 1799",
      situation: "General Napoleon Bonaparte wants your support.",
      context: "November 9, 1799. Napoleon Bonaparte approaches you — a senior deputy. 'Tonight I move against the Directory. I need France united behind me. Stand with me, or stand aside.' The Directory is corrupt. Napoleon is popular. You must decide.",
      leftChoice: "Warn the Directory",
      rightChoice: "Support Napoleon",
      leftOutcome: { title: "You warned the Directory.", text: "Napoleon's agents learn of your betrayal within the hour. The coup succeeds anyway — the Directory was too weak to resist. Napoleon consolidates power. You are removed from public life, quietly and permanently.", reactions: [{ label: "Napoleon: VICTORIOUS", color: "red" }, { label: "Directory: GONE", color: "red" }, { label: "You: ERASED", color: "red" }], historical: "No individual warning could have stopped Napoleon. The political conditions were too favourable for him." },
      rightOutcome: { title: "You supported Napoleon.", text: "Historical outcome: Most of the political class either actively supported or stepped aside for Napoleon. The coup of 18 Brumaire succeeded with minimal resistance. Napoleon became First Consul. A new France — and a new era in European history — had begun.", reactions: [{ label: "France: STABILISED", color: "green" }, { label: "Revolution: ENDED", color: "white" }, { label: "Napoleon: EMPEROR", color: "white" }], historical: "Napoleon brought stability after a decade of chaos — though at the cost of the Revolution's democratic ideals." },
    },
  },
];

// ── ORDERING QUIZ COMPONENT ──────────────────────────────────────────────────

type OrderEvent = { id: number; text: string; correctPosition: number };

function OrderingQuiz({ events, onComplete }: { events: OrderEvent[]; onComplete: () => void }) {
  const [available, setAvailable] = useState<OrderEvent[]>(() =>
    [...events].sort(() => Math.random() - 0.5)
  );
  const [sequence, setSequence] = useState<(OrderEvent | null)[]>([null, null, null, null]);
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const addToSequence = (event: OrderEvent) => {
    const nextSlot = sequence.findIndex((s) => s === null);
    if (nextSlot === -1) return;
    const newSeq = [...sequence];
    newSeq[nextSlot] = event;
    setSequence(newSeq);
    setAvailable((prev) => prev.filter((e) => e.id !== event.id));
  };

  const removeFromSequence = (index: number) => {
    const event = sequence[index];
    if (!event) return;
    const newSeq = [...sequence];
    newSeq[index] = null;
    setSequence(newSeq);
    setAvailable((prev) => [...prev, event]);
  };

  const checkOrder = () => {
    const correct = sequence.every((e, i) => e !== null && e.correctPosition === i);
    setIsCorrect(correct);
    setChecked(true);
  };

  const reset = () => {
    setAvailable([...events].sort(() => Math.random() - 0.5));
    setSequence([null, null, null, null]);
    setChecked(false);
    setIsCorrect(false);
  };

  const allFilled = sequence.every((s) => s !== null);

  return (
    <div>
      <h3 className="text-lg font-black text-white mb-2">Put events in the correct order</h3>
      <p className="text-sm font-semibold text-white/60 mb-4">Tap an event to place it in sequence</p>

      {/* Available events */}
      {available.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {available.map((event) => (
            <button
              key={event.id}
              onClick={() => addToSequence(event)}
              className="rounded-xl border border-white/20 bg-white/8 px-3 py-2 text-sm font-semibold text-white text-left hover:bg-white/12 transition-colors"
            >
              {event.text}
            </button>
          ))}
        </div>
      )}

      {/* Sequence slots */}
      <div className="flex flex-col gap-2 mb-5">
        {sequence.map((slot, i) => {
          let slotStyle = "flex items-center gap-3 rounded-xl border p-3 transition-all ";
          if (checked && slot) {
            slotStyle += slot.correctPosition === i
              ? "border-green-500 bg-green-500/20"
              : "border-red-500 bg-red-500/20";
          } else {
            slotStyle += slot ? "border-white/30 bg-white/10" : "border-white/10 bg-white/5";
          }
          return (
            <div key={i} className={slotStyle}>
              <span
                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-sm font-black"
                style={{ background: "oklch(0.72 0.18 350 / 0.2)", color: "oklch(0.78 0.18 350)" }}
              >
                {i + 1}
              </span>
              {slot ? (
                <div className="flex flex-1 items-center justify-between">
                  <span className="text-sm font-semibold text-white">{slot.text}</span>
                  {!checked && (
                    <button onClick={() => removeFromSequence(i)} className="text-white/40 text-xs ml-2 hover:text-white">✕</button>
                  )}
                </div>
              ) : (
                <span className="text-sm font-semibold text-white/30">Tap an event above</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Correct answer display */}
      {checked && !isCorrect && (
        <div className="mb-4 rounded-xl border border-white/15 bg-white/8 p-4">
          <p className="text-sm font-bold text-white mb-2">Correct order:</p>
          {[...events]
            .sort((a, b) => a.correctPosition - b.correctPosition)
            .map((e, i) => (
              <p key={e.id} className="text-sm font-semibold text-green-300">
                {i + 1}. {e.text}
              </p>
            ))}
        </div>
      )}

      {checked ? (
        <div>
          <div className={`rounded-xl border p-4 mb-3 text-center ${isCorrect ? "border-green-500 bg-green-500/20" : "border-red-500 bg-red-500/20"}`}>
            <p className={`text-base font-black ${isCorrect ? "text-green-300" : "text-red-300"}`}>
              {isCorrect ? "✓ Perfect order! +15 XP" : "✗ Not quite — check the correct order above"}
            </p>
          </div>
          <button onClick={reset} className="w-full flex items-center justify-center gap-2 rounded-full border border-white/20 py-3 text-sm font-bold text-white/70 hover:bg-white/8 transition-colors">
            <RotateCcw className="h-4 w-4" /> Try Again
          </button>
        </div>
      ) : (
        allFilled && (
          <button
            onClick={checkOrder}
            className="w-full rounded-full py-3.5 text-base font-bold text-white transition-opacity hover:opacity-90"
            style={{ background: "oklch(0.72 0.18 350)" }}
          >
            Check My Order
          </button>
        )
      )}
    </div>
  );
}

// ── SWIPE DECISION COMPONENT ─────────────────────────────────────────────────

function SwipeCard({ scenario }: { scenario: typeof chapters[0]["swipeScenario"] }) {
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [outcome, setOutcome] = useState<"left" | "right" | null>(null);
  const [stage, setStage] = useState<"card" | "outcome" | "history">("card");
  const startX = { current: 0 };
  const THRESHOLD = 80;

  const rotation = Math.min(Math.max(dragX / 14, -22), 22);
  const leftTint = dragX < 0 ? Math.min(Math.abs(dragX) / 80, 0.7) : 0;
  const rightTint = dragX > 0 ? Math.min(dragX / 80, 0.7) : 0;

  const handleStart = (x: number) => { setIsDragging(true); startX.current = x; };
  const handleMove = (x: number) => { if (isDragging) setDragX(x - startX.current); };
  const handleEnd = () => {
    setIsDragging(false);
    if (dragX < -THRESHOLD) { setOutcome("left"); setDragX(0); setStage("outcome"); }
    else if (dragX > THRESHOLD) { setOutcome("right"); setDragX(0); setStage("outcome"); }
    else setDragX(0);
  };

  if (stage === "history") {
    return (
      <div className="rounded-2xl border border-white/15 bg-white/8 p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-3">What Actually Happened</p>
        <p className="text-base font-semibold leading-relaxed text-white/80">
          {outcome === "left" ? scenario.leftOutcome.historical : scenario.rightOutcome.historical}
        </p>
        <button onClick={() => { setStage("card"); setDragX(0); }} className="mt-4 w-full rounded-full border border-white/20 py-2.5 text-sm font-bold text-white/70 hover:bg-white/8">
          Try the other choice ↺
        </button>
      </div>
    );
  }

  if (stage === "outcome") {
    const o = outcome === "left" ? scenario.leftOutcome : scenario.rightOutcome;
    return (
      <div className="rounded-2xl border border-white/15 bg-white/8 p-5">
        <div className={`rounded-xl border p-3 mb-4 ${outcome === "left" ? "border-red-500/30 bg-red-500/10" : "border-[oklch(0.72_0.18_350)/0.3] bg-[oklch(0.72_0.18_350)/0.1]"}`}>
          <p className="text-sm font-bold" style={outcome === "left" ? { color: "rgb(252 165 165)" } : { color: "oklch(0.78 0.18 350)" }}>{o.title}</p>
        </div>
        <p className="text-base font-semibold leading-relaxed text-white mb-4">{o.text}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {o.reactions.map((r, i) => (
            <span key={i} className={`rounded-full px-3 py-1 text-xs font-bold border ${r.color === "red" ? "bg-red-500/20 text-red-300 border-red-500/25" : r.color === "green" ? "bg-green-500/20 text-green-300 border-green-500/25" : "bg-white/10 text-white/60 border-white/15"}`}>
              {r.label}
            </span>
          ))}
        </div>
        <button onClick={() => setStage("history")} className="w-full rounded-full py-3 text-sm font-bold text-white transition-opacity hover:opacity-90" style={{ background: "oklch(0.72 0.18 350)" }}>
          See what history says →
        </button>
      </div>
    );
  }

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-3">{scenario.date}</p>
      <div className="flex justify-between mb-2 px-1">
        <div className={`flex items-center gap-1 transition-opacity ${dragX < -20 ? "opacity-100" : "opacity-35"}`}>
          <span className="text-red-400 font-bold">←</span>
          <span className="text-xs font-bold text-red-400">{scenario.leftChoice}</span>
        </div>
        <div className={`flex items-center gap-1 transition-opacity ${dragX > 20 ? "opacity-100" : "opacity-35"}`} style={{ color: "oklch(0.78 0.18 350)" }}>
          <span className="text-xs font-bold">{scenario.rightChoice}</span>
          <span className="font-bold">→</span>
        </div>
      </div>
      <div
        className="rounded-2xl border border-white/20 p-5 cursor-grab active:cursor-grabbing select-none"
        style={{
          background: "rgba(255,255,255,0.06)",
          transform: `rotate(${rotation}deg) translateX(${dragX * 0.2}px)`,
          transition: isDragging ? "none" : "transform 0.3s ease",
          boxShadow: dragX < 0 ? `inset 5px 0 24px rgba(239,68,68,${leftTint})` : dragX > 0 ? `inset -5px 0 24px oklch(0.72 0.18 350 / ${rightTint})` : "none",
        }}
        onMouseDown={(e) => { e.preventDefault(); handleStart(e.clientX); }}
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={handleEnd}
      >
        <h3 className="text-lg font-black text-white mb-2">{scenario.situation}</h3>
        <p className="text-sm font-semibold leading-relaxed text-white/70 mb-4">{scenario.context}</p>
        <hr className="border-white/10 mb-4" />
        <div className="flex justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-red-400">←</span>
            <span className="text-xs font-bold text-red-400">{scenario.leftChoice}</span>
          </div>
          <div className="flex items-center gap-1.5" style={{ color: "oklch(0.78 0.18 350)" }}>
            <span className="text-xs font-bold">{scenario.rightChoice}</span>
            <span>→</span>
          </div>
        </div>
      </div>
      <p className="text-center text-xs font-semibold text-white/40 mt-2">Drag the card left or right to decide</p>
    </div>
  );
}

// ── MAIN PAGE ────────────────────────────────────────────────────────────────

type TabType = "learn" | "quiz" | "order" | "decide";

function HistoryPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("learn");
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number | null>>({});
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState<typeof chapters[0]["questions"]>([]);

  const selectedChapter = chapters.find((c) => c.id === selectedId);

  const handleSelect = (chapter: typeof chapters[0]) => {
    if (!chapter.isUnlocked) return;
    if (selectedId === chapter.id) { setSelectedId(null); return; }
    setSelectedId(chapter.id);
    setActiveTab("learn");
    setQuizIndex(0);
    setQuizAnswers({});
    setQuizQuestions([...chapter.questions].sort(() => Math.random() - 0.5).slice(0, 10));
  };

  const currentQ = quizQuestions[quizIndex];
  const answered = currentQ ? quizAnswers[quizIndex] !== undefined : false;

  return (
    <main className="relative flex min-h-screen flex-col bg-background pb-24 text-foreground">
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, oklch(0.72 0.18 60) 0%, transparent 70%)" }} />

      {/* Header */}
      <div className="relative px-6 pt-14 pb-4">
        <p className="mb-1 text-sm font-bold uppercase tracking-widest text-white/50">History Mode</p>
        <h1 className="text-3xl font-black text-white">The French Revolution</h1>
        <p className="mt-1 text-sm font-semibold text-white/50">7 chapters · 1788–1799 · Swipe timeline to explore</p>
      </div>

      {/* Horizontal timeline */}
      <div className="overflow-x-auto px-6 pb-2">
        <div className="flex" style={{ width: "max-content" }}>
          {chapters.map((chapter, index) => (
            <div key={chapter.id} className="relative flex flex-col items-center" style={{ width: "170px" }}>
              {index > 0 && <div className="absolute top-[19px] right-[50%] left-0 h-px" style={{ background: "rgba(255,255,255,0.1)" }} />}
              {index < chapters.length - 1 && <div className="absolute top-[19px] left-[50%] right-0 h-px" style={{ background: "rgba(255,255,255,0.1)" }} />}
              <div
                className={`relative z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 transition-all ${
                  chapter.isCompleted ? "border-[oklch(0.72_0.18_350)] bg-[oklch(0.72_0.18_350)/0.2]"
                    : chapter.isUnlocked ? "border-white/40 bg-white/10"
                    : "border-white/15 bg-white/5"
                } ${selectedId === chapter.id ? "ring-2 ring-[oklch(0.72_0.18_350)/0.5]" : ""}`}
                onClick={() => handleSelect(chapter)}
              >
                {chapter.isCompleted ? (
                  <CheckCircle className="h-5 w-5" style={{ color: "oklch(0.78 0.18 350)" }} />
                ) : chapter.isUnlocked ? (
                  <span className="text-sm font-black text-white">{index + 1}</span>
                ) : (
                  <Lock className="h-3.5 w-3.5 text-white/30" />
                )}
              </div>
              <div
                className={`mt-3 w-36 rounded-xl border p-2.5 cursor-pointer transition-all ${
                  selectedId === chapter.id
                    ? "border-[oklch(0.72_0.18_350)/0.5] bg-[oklch(0.72_0.18_350)/0.12]"
                    : chapter.isUnlocked ? "border-white/15 bg-white/5" : "border-white/8 bg-white/3 opacity-40"
                }`}
                onClick={() => handleSelect(chapter)}
              >
                <p className="text-xs font-bold leading-tight text-white">{chapter.title}</p>
                <p className="text-[10px] font-semibold text-white/50 mt-0.5">{chapter.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chapter detail */}
      <div className="relative px-6 mt-4">
        {!selectedChapter ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
            <p className="text-base font-bold text-white/50">Tap a chapter to begin</p>
            <p className="text-sm font-semibold text-white/30 mt-1">Swipe the timeline to see all chapters →</p>
          </div>
        ) : (
          <div>
            {/* Chapter tabs */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
              {(["learn", "quiz", "order", "decide"] as TabType[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setQuizIndex(0); setQuizAnswers({}); }}
                  className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-bold transition-all ${activeTab === tab ? "text-white" : "bg-white/8 text-white/50 hover:bg-white/12"}`}
                  style={activeTab === tab ? { background: "oklch(0.72 0.18 350)" } : {}}
                >
                  {tab === "learn" ? "📖 Learn" : tab === "quiz" ? "❓ Quiz" : tab === "order" ? "🔢 Order" : "⚡ Decide"}
                </button>
              ))}
            </div>

            {/* Learn tab */}
            {activeTab === "learn" && (
              <div className="rounded-2xl border border-white/15 bg-white/8 p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-1">{selectedChapter.date}</p>
                <h2 className="text-2xl font-black text-white mb-1">{selectedChapter.title}</h2>
                <p className="text-sm font-bold text-white/60 mb-4">Key Figure: {selectedChapter.keyFigure}</p>
                <p className="text-base font-semibold leading-relaxed text-white/80">{selectedChapter.description}</p>
              </div>
            )}

            {/* Quiz tab — 10 questions one at a time */}
            {activeTab === "quiz" && (
              <div className="rounded-2xl border border-white/15 bg-white/8 p-5">
                {quizIndex >= quizQuestions.length ? (
                  <div className="text-center">
                    <div className="text-5xl mb-3">🏆</div>
                    <h3 className="text-2xl font-black text-white mb-2">
                      {Object.values(quizAnswers).filter((a, i) => a === quizQuestions[i]?.correct).length} / {quizQuestions.length}
                    </h3>
                    <p className="text-base font-semibold text-white/70 mb-4">Chapter quiz complete!</p>
                    <button onClick={() => { setQuizIndex(0); setQuizAnswers({}); setQuizQuestions([...selectedChapter.questions].sort(() => Math.random() - 0.5).slice(0, 10)); }} className="w-full rounded-full py-3.5 text-base font-bold text-white" style={{ background: "oklch(0.72 0.18 350)" }}>
                      Try Again
                    </button>
                  </div>
                ) : currentQ ? (
                  <>
                    <div className="mb-3">
                      <div className="flex justify-between text-sm font-bold text-white/60 mb-1.5">
                        <span>Question {quizIndex + 1} of {quizQuestions.length}</span>
                        <span>Score: {Object.values(quizAnswers).filter((a, i) => a === quizQuestions[i]?.correct).length}</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-white/10">
                        <div className="h-1.5 rounded-full" style={{ width: `${(quizIndex / quizQuestions.length) * 100}%`, background: "oklch(0.72 0.18 350)" }} />
                      </div>
                    </div>
                    <h3 className="text-lg font-black text-white mb-4">{currentQ.text}</h3>
                    <div className="flex flex-col gap-2.5">
                      {currentQ.options.map((opt, idx) => {
                        const selected = quizAnswers[quizIndex];
                        let cls = "w-full rounded-2xl border px-4 py-3.5 text-left text-sm font-bold transition-all ";
                        if (selected === undefined) cls += "border-white/20 bg-white/8 text-white hover:bg-white/12";
                        else if (idx === currentQ.correct) cls += "border-green-500 bg-green-500/20 text-green-300";
                        else if (idx === selected) cls += "border-red-500 bg-red-500/20 text-red-300";
                        else cls += "border-white/10 bg-white/5 text-white/40";
                        return (
                          <button key={idx} className={cls} onClick={() => { if (quizAnswers[quizIndex] === undefined) setQuizAnswers(prev => ({ ...prev, [quizIndex]: idx })); }}>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {answered && (
                      <>
                        <p className="mt-3 text-sm font-semibold text-white/70">{currentQ.explanation}</p>
                        <button onClick={() => setQuizIndex(i => i + 1)} className="mt-3 w-full rounded-full py-3.5 text-base font-bold text-white" style={{ background: "oklch(0.72 0.18 350)" }}>
                          {quizIndex + 1 >= quizQuestions.length ? "See Results" : "Next Question →"}
                        </button>
                      </>
                    )}
                  </>
                ) : null}
              </div>
            )}

            {/* Order tab */}
            {activeTab === "order" && (
              <div className="rounded-2xl border border-white/15 bg-white/8 p-5">
                <OrderingQuiz events={selectedChapter.orderingEvents} onComplete={() => {}} />
              </div>
            )}

            {/* Decide tab */}
            {activeTab === "decide" && (
              <div className="rounded-2xl border border-white/15 bg-white/8 p-5">
                <SwipeCard scenario={selectedChapter.swipeScenario} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t border-white/10 bg-background pb-6 pt-3">
        <Link to="/home" className="flex flex-col items-center gap-1"><Home className="h-5 w-5 text-white/50" /><span className="text-xs font-medium text-white/50">Home</span></Link>
        <Link to="/history" className="flex flex-col items-center gap-1"><BookOpen className="h-5 w-5" style={{ color: "oklch(0.78 0.18 350)" }} /><span className="text-xs font-bold" style={{ color: "oklch(0.78 0.18 350)" }}>History</span></Link>
        <Link to="/debate" className="flex flex-col items-center gap-1"><MessageSquare className="h-5 w-5 text-white/50" /><span className="text-xs font-medium text-white/50">Debate</span></Link>
        <Link to="/profile" className="flex flex-col items-center gap-1"><User className="h-5 w-5 text-white/50" /><span className="text-xs font-medium text-white/50">Profile</span></Link>
      </nav>
    </main>
  );
}
