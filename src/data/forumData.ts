export interface ForumPost {
  id: string;
  author: string;
  avatar: string;
  zodiacSign: string;
  title: string;
  content: string;
  likes: number;
  replies: number;
  timeAgo: string;
  tags: string[];
}

export const forumPosts: ForumPost[] = [
  {
    id: "1",
    author: "MoonChild_92",
    avatar: "🌙",
    zodiacSign: "Cancer",
    title: "The Lunar Essence oil changed my meditation practice",
    content: "I've been using the Cancer-aligned Lunar Essence for a month now. The way it grounds my emotions during full moon meditations is incredible. Anyone else feel more connected to their intuition?",
    likes: 47,
    replies: 12,
    timeAgo: "2 hours ago",
    tags: ["Lunar Essence", "Meditation", "Cancer"]
  },
  {
    id: "2",
    author: "FireStarter_Leo",
    avatar: "🔥",
    zodiacSign: "Leo",
    title: "Solar Radiance blend for confidence - WOW",
    content: "Started my day with the Leo Solar Radiance blend before a big presentation. I felt like I was channeling pure sun energy! My colleagues noticed the difference in my presence.",
    likes: 89,
    replies: 23,
    timeAgo: "5 hours ago",
    tags: ["Solar Radiance", "Confidence", "Leo"]
  },
  {
    id: "3",
    author: "EarthBound_Virgo",
    avatar: "🌿",
    zodiacSign: "Virgo",
    title: "Grounding ritual with Earth Element collection",
    content: "For my fellow earth signs - the combination of the Virgo Harvest blend with morning journaling has been transformative. The attention to detail in the scent notes is perfection.",
    likes: 56,
    replies: 18,
    timeAgo: "8 hours ago",
    tags: ["Earth Element", "Ritual", "Virgo"]
  },
  {
    id: "4",
    author: "AquarianDreamer",
    avatar: "💫",
    zodiacSign: "Aquarius",
    title: "Innovation flows with Celestial Breeze",
    content: "The Aquarius Celestial Breeze has become my creative companion. Every time I'm working on new ideas, this blend opens mental pathways I didn't know existed. Highly recommend for fellow air signs!",
    likes: 34,
    replies: 9,
    timeAgo: "1 day ago",
    tags: ["Celestial Breeze", "Creativity", "Aquarius"]
  },
  {
    id: "5",
    author: "ScorpioMystic",
    avatar: "🦂",
    zodiacSign: "Scorpio",
    title: "Deep transformation with Phoenix Rising",
    content: "The Phoenix Rising blend for Scorpio season was exactly what I needed during my shadow work. The depth of the fragrance mirrors the depth of transformation. Anyone else doing inner work with this?",
    likes: 72,
    replies: 31,
    timeAgo: "1 day ago",
    tags: ["Phoenix Rising", "Transformation", "Scorpio"]
  }
];
