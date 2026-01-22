export interface ZodiacSign {
  name: string;
  symbol: string;
  dates: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  energy: string;
  dailyGuidance: string;
  color: string;
}

export const zodiacSigns: ZodiacSign[] = [
  {
    name: "Aries",
    symbol: "♈",
    dates: "Mar 21 - Apr 19",
    element: "Fire",
    energy: "Bold, pioneering energy that ignites your inner warrior. Feel the surge of courage and the drive to start new adventures.",
    dailyGuidance: "Channel your fire into creative pursuits. Take the lead on a project you've been postponing. Your confidence inspires others today.",
    color: "from-red-500 to-orange-500"
  },
  {
    name: "Taurus",
    symbol: "♉",
    dates: "Apr 20 - May 20",
    element: "Earth",
    energy: "Grounding, luxurious energy that connects you to earthly pleasures. Feel stability and the power of patient persistence.",
    dailyGuidance: "Indulge in sensory experiences—good food, soft textures, beautiful music. Your determination is unstoppable when you're comfortable.",
    color: "from-green-600 to-emerald-500"
  },
  {
    name: "Gemini",
    symbol: "♊",
    dates: "May 21 - Jun 20",
    element: "Air",
    energy: "Curious, communicative energy that sparks intellectual connections. Feel your mind dance between ideas and perspectives.",
    dailyGuidance: "Engage in stimulating conversations. Write, learn something new, or connect with a sibling or neighbor. Your words have power today.",
    color: "from-yellow-400 to-amber-500"
  },
  {
    name: "Cancer",
    symbol: "♋",
    dates: "Jun 21 - Jul 22",
    element: "Water",
    energy: "Nurturing, intuitive energy that deepens emotional bonds. Feel the protective love that flows through your caring nature.",
    dailyGuidance: "Create a cozy sanctuary at home. Cook a nourishing meal, call a loved one. Your emotional wisdom guides others to healing.",
    color: "from-slate-400 to-blue-400"
  },
  {
    name: "Leo",
    symbol: "♌",
    dates: "Jul 23 - Aug 22",
    element: "Fire",
    energy: "Radiant, creative energy that demands to be seen. Feel your inner royalty and the warmth you naturally share with others.",
    dailyGuidance: "Express yourself boldly—wear something striking, share your art, or take center stage. Your generosity of spirit attracts admirers.",
    color: "from-amber-400 to-yellow-500"
  },
  {
    name: "Virgo",
    symbol: "♍",
    dates: "Aug 23 - Sep 22",
    element: "Earth",
    energy: "Analytical, healing energy that finds perfection in details. Feel the satisfaction of creating order from chaos.",
    dailyGuidance: "Organize your space, refine a skill, or help someone with practical matters. Your attention to detail creates lasting improvements.",
    color: "from-emerald-600 to-teal-500"
  },
  {
    name: "Libra",
    symbol: "♎",
    dates: "Sep 23 - Oct 22",
    element: "Air",
    energy: "Harmonizing, aesthetic energy that seeks beauty and balance. Feel the grace of diplomacy flowing through you.",
    dailyGuidance: "Beautify your surroundings, mediate a conflict, or appreciate art. Your sense of fairness creates peace in relationships.",
    color: "from-pink-400 to-rose-500"
  },
  {
    name: "Scorpio",
    symbol: "♏",
    dates: "Oct 23 - Nov 21",
    element: "Water",
    energy: "Transformative, magnetic energy that sees beneath surfaces. Feel the power of rebirth and your unflinching emotional depth.",
    dailyGuidance: "Dive deep into research, journaling, or intimate conversation. Your intensity transforms situations that others avoid.",
    color: "from-purple-600 to-violet-700"
  },
  {
    name: "Sagittarius",
    symbol: "♐",
    dates: "Nov 22 - Dec 21",
    element: "Fire",
    energy: "Expansive, philosophical energy that seeks truth and adventure. Feel your spirit stretch toward distant horizons.",
    dailyGuidance: "Plan a journey, study philosophy, or share your wisdom. Your optimism opens doors that seem closed to others.",
    color: "from-indigo-500 to-purple-500"
  },
  {
    name: "Capricorn",
    symbol: "♑",
    dates: "Dec 22 - Jan 19",
    element: "Earth",
    energy: "Ambitious, disciplined energy that builds lasting legacies. Feel the mountain-climbing determination in your bones.",
    dailyGuidance: "Set long-term goals, work on your career, or mentor someone younger. Your steady efforts compound into remarkable achievements.",
    color: "from-stone-500 to-zinc-600"
  },
  {
    name: "Aquarius",
    symbol: "♒",
    dates: "Jan 20 - Feb 18",
    element: "Air",
    energy: "Revolutionary, humanitarian energy that envisions the future. Feel your unique perspective as a gift to collective progress.",
    dailyGuidance: "Innovate, join a cause, or celebrate your eccentricity. Your unconventional ideas spark positive change in communities.",
    color: "from-cyan-400 to-blue-500"
  },
  {
    name: "Pisces",
    symbol: "♓",
    dates: "Feb 19 - Mar 20",
    element: "Water",
    energy: "Mystical, compassionate energy that dissolves boundaries. Feel your connection to the universal ocean of consciousness.",
    dailyGuidance: "Create art, meditate, or help someone in need. Your spiritual sensitivity channels healing and inspiration from beyond.",
    color: "from-violet-400 to-purple-500"
  }
];
