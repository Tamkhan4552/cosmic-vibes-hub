export interface ZodiacSign {
  name: string;
  symbol: string;
  dates: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  energy: string;
  dailyGuidance: string;
  color: string;
  energyVariations?: string[];
}

// Simple deterministic hash function to generate consistent daily values
const hashCode = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

export const getDailyEnergy = (zodiacName: string, date: Date = new Date()): string => {
  const dateString = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  const seed = hashCode(`${zodiacName}-${dateString}`);
  
  const sign = zodiacSigns.find(s => s.name === zodiacName);
  if (!sign || !sign.energyVariations) return sign?.energy || "";
  
  const index = seed % sign.energyVariations.length;
  return sign.energyVariations[index];
};

export const zodiacSigns: ZodiacSign[] = [
  {
    name: "Aries",
    symbol: "♈",
    dates: "Mar 21 - Apr 19",
    element: "Fire",
    energy: "Bold, pioneering energy that ignites your inner warrior. Feel the surge of courage and the drive to start new adventures.",
    dailyGuidance: "Channel your fire into creative pursuits. Take the lead on a project you've been postponing. Your confidence inspires others today.",
    color: "from-red-500 to-orange-500",
    energyVariations: [
      "Bold, pioneering energy that ignites your inner warrior. Feel the surge of courage and the drive to start new adventures.",
      "Fiery determination flows through your veins today. Channel this warrior spirit into conquering your greatest challenges.",
      "Your cosmic spark is particularly bright. This is the moment to initiate, to lead, to blaze your own trail.",
      "Trailblazer energy surrounds you. Your courage inspires others to follow your fearless example."
    ]
  },
  {
    name: "Taurus",
    symbol: "♉",
    dates: "Apr 20 - May 20",
    element: "Earth",
    energy: "Grounding, luxurious energy that connects you to earthly pleasures. Feel stability and the power of patient persistence.",
    dailyGuidance: "Indulge in sensory experiences—good food, soft textures, beautiful music. Your determination is unstoppable when you're comfortable.",
    color: "from-green-600 to-emerald-500",
    energyVariations: [
      "Grounding, luxurious energy that connects you to earthly pleasures. Feel stability and the power of patient persistence.",
      "Deeply rooted and unshakeable. Your connection to the material world brings comfort and security today.",
      "Sensory abundance surrounds you. Indulge wisely and build something lasting with your steady hands.",
      "The earth beneath you feels solid. Your natural resilience carries you through any obstacle."
    ]
  },
  {
    name: "Gemini",
    symbol: "♊",
    dates: "May 21 - Jun 20",
    element: "Air",
    energy: "Curious, communicative energy that sparks intellectual connections. Feel your mind dance between ideas and perspectives.",
    dailyGuidance: "Engage in stimulating conversations. Write, learn something new, or connect with a sibling or neighbor. Your words have power today.",
    color: "from-yellow-400 to-amber-500",
    energyVariations: [
      "Curious, communicative energy that sparks intellectual connections. Feel your mind dance between ideas and perspectives.",
      "Your wit and charm are magnetic today. Conversations flow effortlessly and connections deepen.",
      "Ideas cascade through your brilliant mind. This is the perfect day to share your knowledge and inspire others.",
      "Intellectual energy peaks. Your curiosity leads you to fascinating discoveries and meaningful exchanges."
    ]
  },
  {
    name: "Cancer",
    symbol: "♋",
    dates: "Jun 21 - Jul 22",
    element: "Water",
    energy: "Nurturing, intuitive energy that deepens emotional bonds. Feel the protective love that flows through your caring nature.",
    dailyGuidance: "Create a cozy sanctuary at home. Cook a nourishing meal, call a loved one. Your emotional wisdom guides others to healing.",
    color: "from-slate-400 to-blue-400",
    energyVariations: [
      "Nurturing, intuitive energy that deepens emotional bonds. Feel the protective love that flows through your caring nature.",
      "Your intuition is particularly strong today. Trust your gut feelings—they guide you true.",
      "Emotional wisdom flows abundantly. Your compassion becomes a healing balm for those around you.",
      "Home and heart call to you. Retreat into comfort and emerge revitalized and centered."
    ]
  },
  {
    name: "Leo",
    symbol: "♌",
    dates: "Jul 23 - Aug 22",
    element: "Fire",
    energy: "Radiant, creative energy that demands to be seen. Feel your inner royalty and the warmth you naturally share with others.",
    dailyGuidance: "Express yourself boldly—wear something striking, share your art, or take center stage. Your generosity of spirit attracts admirers.",
    color: "from-amber-400 to-yellow-500",
    energyVariations: [
      "Radiant, creative energy that demands to be seen. Feel your inner royalty and the warmth you naturally share with others.",
      "Your inner light shines brilliantly today. The world needs your unique expression and authentic power.",
      "Creative fire burns within you. Channel it into something magnificent that reflects your true spirit.",
      "Regal confidence surrounds you. Others are drawn to your magnetic presence and generous heart."
    ]
  },
  {
    name: "Virgo",
    symbol: "♍",
    dates: "Aug 23 - Sep 22",
    element: "Earth",
    energy: "Analytical, healing energy that finds perfection in details. Feel the satisfaction of creating order from chaos.",
    dailyGuidance: "Organize your space, refine a skill, or help someone with practical matters. Your attention to detail creates lasting improvements.",
    color: "from-emerald-600 to-teal-500",
    energyVariations: [
      "Analytical, healing energy that finds perfection in details. Feel the satisfaction of creating order from chaos.",
      "Your eye for detail is extraordinary today. Use it to improve, refine, and perfect your world.",
      "Service and practicality flow through you. Your humble wisdom solves problems others overlook.",
      "Harmony emerges from order. Your methodical approach transforms confusion into clarity and calm."
    ]
  },
  {
    name: "Libra",
    symbol: "♎",
    dates: "Sep 23 - Oct 22",
    element: "Air",
    energy: "Harmonizing, aesthetic energy that seeks beauty and balance. Feel the grace of diplomacy flowing through you.",
    dailyGuidance: "Beautify your surroundings, mediate a conflict, or appreciate art. Your sense of fairness creates peace in relationships.",
    color: "from-pink-400 to-rose-500",
    energyVariations: [
      "Harmonizing, aesthetic energy that seeks beauty and balance. Feel the grace of diplomacy flowing through you.",
      "Perfect equilibrium surrounds you. Your natural sense of justice brings harmony to all situations.",
      "Beauty and balance call to you today. Create peace through understanding and graceful compromise.",
      "Your diplomatic touch is unmatched. Conflicts dissolve when you enter the room with your gentle wisdom."
    ]
  },
  {
    name: "Scorpio",
    symbol: "♏",
    dates: "Oct 23 - Nov 21",
    element: "Water",
    energy: "Transformative, magnetic energy that sees beneath surfaces. Feel the power of rebirth and your unflinching emotional depth.",
    dailyGuidance: "Dive deep into research, journaling, or intimate conversation. Your intensity transforms situations that others avoid.",
    color: "from-purple-600 to-violet-700",
    energyVariations: [
      "Transformative, magnetic energy that sees beneath surfaces. Feel the power of rebirth and your unflinching emotional depth.",
      "Your perception pierces through illusions. Trust your ability to uncover hidden truths today.",
      "Powerful regenerative energy surrounds you. Shed what no longer serves and embrace your renewed self.",
      "Magnetic intensity draws others to you. Your courage to explore the depths inspires profound connection."
    ]
  },
  {
    name: "Sagittarius",
    symbol: "♐",
    dates: "Nov 22 - Dec 21",
    element: "Fire",
    energy: "Expansive, philosophical energy that seeks truth and adventure. Feel your spirit stretch toward distant horizons.",
    dailyGuidance: "Plan a journey, study philosophy, or share your wisdom. Your optimism opens doors that seem closed to others.",
    color: "from-indigo-500 to-purple-500",
    energyVariations: [
      "Expansive, philosophical energy that seeks truth and adventure. Feel your spirit stretch toward distant horizons.",
      "Wanderlust and wisdom guide your steps. Explore new frontiers, both physical and mental.",
      "Your vision extends far beyond the present. Inspire others with your optimistic perspective and bold dreams.",
      "Adventure calls to your adventurous soul. Trust that fortune favors the bold today."
    ]
  },
  {
    name: "Capricorn",
    symbol: "♑",
    dates: "Dec 22 - Jan 19",
    element: "Earth",
    energy: "Ambitious, disciplined energy that builds lasting legacies. Feel the mountain-climbing determination in your bones.",
    dailyGuidance: "Set long-term goals, work on your career, or mentor someone younger. Your steady efforts compound into remarkable achievements.",
    color: "from-stone-500 to-zinc-600",
    energyVariations: [
      "Ambitious, disciplined energy that builds lasting legacies. Feel the mountain-climbing determination in your bones.",
      "The peak awaits your climb. Your unwavering focus and steady effort lead to success.",
      "Legacy building is in your hands today. Plant seeds now that will grow for generations.",
      "Masterful discipline flows through you. Your structured approach transforms vision into reality."
    ]
  },
  {
    name: "Aquarius",
    symbol: "♒",
    dates: "Jan 20 - Feb 18",
    element: "Air",
    energy: "Revolutionary, humanitarian energy that envisions the future. Feel your unique perspective as a gift to collective progress.",
    dailyGuidance: "Innovate, join a cause, or celebrate your eccentricity. Your unconventional ideas spark positive change in communities.",
    color: "from-cyan-400 to-blue-500",
    energyVariations: [
      "Revolutionary, humanitarian energy that envisions the future. Feel your unique perspective as a gift to collective progress.",
      "Your innovative mind sees possibilities others miss. Trust your visionary insight today.",
      "Humanitarian purpose drives you forward. Your uniqueness is your greatest contribution to the world.",
      "Collective consciousness flows through you. Your progressive ideas align with humanity's evolution."
    ]
  },
  {
    name: "Pisces",
    symbol: "♓",
    dates: "Feb 19 - Mar 20",
    element: "Water",
    energy: "Mystical, compassionate energy that dissolves boundaries. Feel your connection to the universal ocean of consciousness.",
    dailyGuidance: "Create art, meditate, or help someone in need. Your spiritual sensitivity channels healing and inspiration from beyond.",
    color: "from-violet-400 to-purple-500",
    energyVariations: [
      "Mystical, compassionate energy that dissolves boundaries. Feel your connection to the universal ocean of consciousness.",
      "Your spiritual antenna is particularly attuned today. Receive the messages the universe is sending.",
      "Creative inspiration flows from infinite sources. Channel the divine energy through art and compassion.",
      "Boundaries dissolve as you merge with something greater. Your empathy heals all it touches."
    ]
  }
];
