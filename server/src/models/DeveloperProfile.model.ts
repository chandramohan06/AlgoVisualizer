import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill {
  name: string;
  category: string;
  level: number;
  icon?: string;
  tag?: string;
}

export interface IEducation {
  institute: string;
  degree: string;
  branch: string;
  university?: string;
  startYear?: string;
  endYear?: string;
  cgpa?: string;
  currentSemester?: string;
}

export interface IProjectMetric {
  label: string;
  value: string;
  sub?: string;
  icon?: string;
  color?: string;
}

export interface ITimelineItem {
  year: string;
  title: string;
  subtitle?: string;
  description: string;
  badge?: string;
  category?: string;
}

export interface IAchievement {
  title: string;
  description: string;
  organization?: string;
  date?: string;
  certificateLink?: string;
  credentialId?: string;
  image?: string;
}

export interface ICodingProfile {
  platform: string;
  username: string;
  profileUrl: string;
  solvedCount?: string;
  rating?: string;
  rank?: string;
  description?: string;
  logo?: string;
}

export interface IDeveloperProfile extends Document {
  fullName: string;
  shortName: string;
  headline: string;
  designation: string;
  currentRole: string;
  location: string;
  country: string;
  email: string;
  phone: string;
  whatsapp: string;
  website: string;
  linkedinUrl: string;
  githubUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  mediumUrl: string;
  devtoUrl: string;
  hashnodeUrl: string;
  leetcodeUrl: string;
  gfgUrl: string;
  codingNinjasUrl: string;
  codechefUrl: string;
  codeforcesUrl: string;
  hackerrankUrl: string;
  avatarUrl: string;
  resumeUrl: string;
  availabilityStatus: string;
  aboutMe: string;
  biography: string;
  mission: string;
  vision: string;
  whyIBuiltAlgoVisualizer: string;
  careerGoal: string;
  personalQuote: string;
  education: IEducation[];
  skills: ISkill[];
  projectMetrics: IProjectMetric[];
  timeline: ITimelineItem[];
  achievements: IAchievement[];
  codingProfiles: ICodingProfile[];
  createdAt: Date;
  updatedAt: Date;
}

const DeveloperProfileSchema: Schema = new Schema(
  {
    fullName: { type: String, required: true, default: 'Chandramohan Kumar Singh' },
    shortName: { type: String, default: 'Chandramohan' },
    headline: { type: String, default: 'Full Stack Developer & Computer Science Engineer' },
    designation: { type: String, default: 'Full Stack Software Engineer & Lead Architect' },
    currentRole: { type: String, default: 'Founder & Lead Architect' },
    location: { type: String, default: 'Phagwara, Punjab' },
    country: { type: String, default: 'India' },
    email: { type: String, default: 'chandramohan06@gmail.com' },
    phone: { type: String, default: '+91 9876543210' },
    whatsapp: { type: String, default: '+91 9876543210' },
    website: { type: String, default: 'https://github.com/chandramohan06' },
    linkedinUrl: { type: String, default: 'https://linkedin.com/in/chandramohan06' },
    githubUrl: { type: String, default: 'https://github.com/chandramohan06' },
    twitterUrl: { type: String, default: '' },
    instagramUrl: { type: String, default: '' },
    youtubeUrl: { type: String, default: '' },
    mediumUrl: { type: String, default: '' },
    devtoUrl: { type: String, default: '' },
    hashnodeUrl: { type: String, default: '' },
    leetcodeUrl: { type: String, default: 'https://leetcode.com' },
    gfgUrl: { type: String, default: 'https://geeksforgeeks.org' },
    codingNinjasUrl: { type: String, default: 'https://codingninjas.com' },
    codechefUrl: { type: String, default: '' },
    codeforcesUrl: { type: String, default: '' },
    hackerrankUrl: { type: String, default: '' },
    avatarUrl: { type: String, default: '' },
    resumeUrl: { type: String, default: 'https://github.com/chandramohan06' },
    availabilityStatus: { type: String, default: 'Available for Opportunities' },
    aboutMe: { type: String, default: 'Passionate software engineer focused on building high-scalability web applications, interactive learning systems, and efficient algorithm visualizers.' },
    biography: { type: String, default: 'During my computer science studies at Lovely Professional University, I noticed that traditional text-heavy diagrams failed to capture how complex data structures operate under the hood.' },
    mission: { type: String, default: 'Democratize DSA education by providing every engineering student with interactive visual learning tools.' },
    vision: { type: String, default: 'To build production-grade developer tools that empower software engineers to succeed in top tech interviews.' },
    whyIBuiltAlgoVisualizer: { type: String, default: 'I engineered AlgoVisualizer from scratch to bridge code execution with real-time visual intuition. It combines 85+ interactive algorithm visualizers and 250 curated LeetCode-style practice problems.' },
    careerGoal: { type: String, default: 'To design, build, and scale world-class developer platforms used by millions of engineers globally.' },
    personalQuote: { type: String, default: 'Building software that transforms complex abstractions into intuitive visual experiences.' },
    education: [
      {
        institute: 'Lovely Professional University',
        degree: 'B.Tech',
        branch: 'Computer Science Engineering',
        university: 'Lovely Professional University',
        startYear: '2021',
        endYear: '2025',
        cgpa: '8.5',
        currentSemester: 'Final Year',
      },
    ],
    skills: [
      { name: 'React 18 / Next.js', category: 'Frontend', level: 95, tag: 'Expert' },
      { name: 'TypeScript', category: 'Frontend', level: 92, tag: 'Advanced' },
      { name: 'Tailwind CSS', category: 'Frontend', level: 95, tag: 'Expert' },
      { name: 'Framer Motion', category: 'Frontend', level: 90, tag: 'Advanced' },
      { name: 'Node.js & Express', category: 'Backend', level: 92, tag: 'Advanced' },
      { name: 'MongoDB Atlas', category: 'Database', level: 88, tag: 'Advanced' },
      { name: 'JWT & OAuth Auth', category: 'Backend', level: 95, tag: 'Expert' },
      { name: 'Docker', category: 'DevOps', level: 85, tag: 'Proficient' },
      { name: 'Java (OOP & DSA)', category: 'Programming', level: 92, tag: 'Expert' },
      { name: 'C++ (STL)', category: 'Programming', level: 88, tag: 'Advanced' },
      { name: 'Python', category: 'Programming', level: 90, tag: 'Advanced' },
      { name: 'JavaScript (ES6+)', category: 'Programming', level: 95, tag: 'Expert' },
    ],
    projectMetrics: [
      { label: 'Algorithms Visualized', value: '85+', sub: 'Interactive step-by-step', color: 'text-indigo-400' },
      { label: 'Practice Problems', value: '250', sub: 'Easy & Medium DSA questions', color: 'text-emerald-400' },
      { label: 'API Response Time', value: '< 500ms', sub: 'Non-blocking async backend', color: 'text-amber-400' },
      { label: 'Tech Stack', value: 'React + Node', sub: 'MongoDB Atlas + Docker', color: 'text-purple-400' },
    ],
    timeline: [
      { year: '2021', title: 'Began Programming Journey', subtitle: 'Lovely Professional University', description: 'Started learning C++ and Java fundamentals. Mastered core Data Structures.', badge: 'Foundation' },
      { year: '2022', title: 'Competitive Programming & DSA', subtitle: 'LeetCode & GeeksforGeeks', description: 'Solved over 400+ algorithmic problems across Arrays, DP, Graphs, and Trees.', badge: 'Milestone' },
      { year: '2023', title: 'Full Stack Web Architecture', subtitle: 'React, Node.js, MongoDB', description: 'Deep dived into modern full-stack web engineering and REST API architecture.', badge: 'Specialization' },
      { year: '2024', title: 'AlgoVisualizer Conception', subtitle: 'Independent SaaS Project', description: 'Conceptualized and built interactive visual execution engine for sorting and searching.', badge: 'Product' },
      { year: '2025 - 2026', title: 'Enterprise Platform Scaling', subtitle: 'AlgoVisualizer SaaS Production', description: 'Scaled platform with 250 practice problems, MongoDB progress engine, and dark glassmorphic design system.', badge: 'Production' },
    ],
    achievements: [
      { title: 'Top 1% Campus Rank', description: 'Achieved top 1% algorithmic problem solver rank at LPU campus leaderboard.', organization: 'GeeksforGeeks', date: '2023' },
      { title: '400+ LeetCode Solved', description: 'Solved 400+ medium and easy algorithms with high efficiency scores.', organization: 'LeetCode', date: '2024' },
    ],
    codingProfiles: [
      { platform: 'GitHub', username: 'chandramohan06', profileUrl: 'https://github.com/chandramohan06', solvedCount: '1,200+ Commits', description: 'Open source contributor & SaaS architect' },
      { platform: 'LeetCode', username: 'chandramohan06', profileUrl: 'https://leetcode.com', solvedCount: '400+ Solved', description: 'Arrays, Tree, DP Specialist' },
      { platform: 'GeeksforGeeks', username: 'chandramohan06', profileUrl: 'https://geeksforgeeks.org', solvedCount: 'Top 1% Rank', description: 'LPU Engineering Leaderboard' },
      { platform: 'Coding Ninjas', username: 'chandramohan06', profileUrl: 'https://codingninjas.com', solvedCount: 'Master Tier', description: 'Full Stack & Data Structures' },
    ],
  },
  { timestamps: true }
);

export const DeveloperProfile = mongoose.model<IDeveloperProfile>(
  'DeveloperProfile',
  DeveloperProfileSchema
);
