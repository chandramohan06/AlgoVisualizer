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

export interface IProject {
  title: string;
  description: string;
  techStack?: string;
  githubLink?: string;
  liveDemo?: string;
  startDate?: string;
  endDate?: string;
  images?: string[];
}

export interface ICertification {
  title: string;
  organization?: string;
  date?: string;
  certificateLink?: string;
  credentialId?: string;
}

export interface ITraining {
  title: string;
  organization?: string;
  duration?: string;
  description?: string;
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
  portfolio: string;
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
  personalQuote: string;
  aboutMe: string;
  biography: string;
  mission: string;
  vision: string;
  aboutProject: string;
  whyIBuiltAlgoVisualizer: string;
  careerGoal: string;
  education: IEducation[];
  skills: ISkill[];
  projects: IProject[];
  certifications: ICertification[];
  trainings: ITraining[];
  projectMetrics: IProjectMetric[];
  timeline: ITimelineItem[];
  achievements: IAchievement[];
  codingProfiles: ICodingProfile[];
  algorithmsVisualized: string;
  practiceProblems: string;
  projectsCount: string;
  usersCount: string;
  experienceYears: string;
  githubStars: string;
  downloadsCount: string;
  apiPerformance: string;
  createdBy?: mongoose.Types.ObjectId | string;
  updatedBy?: mongoose.Types.ObjectId | string;
  isPublished: boolean;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

const DeveloperProfileSchema: Schema = new Schema(
  {
    fullName: { type: String, required: true, default: 'Chandra Mohan Kumar Singh' },
    shortName: { type: String, default: 'Chandramohan' },
    headline: { type: String, default: 'Computer Science Engineer & Full Stack Developer' },
    designation: { type: String, default: 'Full Stack Engineer & Founder' },
    currentRole: { type: String, default: 'Founder & Lead Architect' },
    location: { type: String, default: 'Phagwara, Punjab' },
    country: { type: String, default: 'India' },
    email: { type: String, default: 'chandramohan06@gmail.com' },
    phone: { type: String, default: '+91 9876543210' },
    whatsapp: { type: String, default: '' },
    portfolio: { type: String, default: 'https://github.com/chandramohan06' },
    website: { type: String, default: 'https://github.com/chandramohan06' },
    linkedinUrl: { type: String, default: 'https://linkedin.com/in/chandramohan06' },
    githubUrl: { type: String, default: 'https://github.com/chandramohan06' },
    twitterUrl: { type: String, default: '' },
    instagramUrl: { type: String, default: '' },
    youtubeUrl: { type: String, default: '' },
    mediumUrl: { type: String, default: '' },
    devtoUrl: { type: String, default: '' },
    hashnodeUrl: { type: String, default: '' },
    leetcodeUrl: { type: String, default: '' },
    gfgUrl: { type: String, default: '' },
    codingNinjasUrl: { type: String, default: '' },
    codechefUrl: { type: String, default: '' },
    codeforcesUrl: { type: String, default: '' },
    hackerrankUrl: { type: String, default: '' },
    avatarUrl: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
    availabilityStatus: { type: String, default: 'Available for Opportunities' },
    personalQuote: { type: String, default: 'Transforming complex software concepts into intuitive, real-time visual experiences.' },
    aboutMe: { type: String, default: 'Passionate Computer Science student and software developer with expertise in Java, Python, C++, and full-stack web applications.' },
    biography: { type: String, default: 'Computer Science student at Lovely Professional University focused on full-stack web architecture, database design, and algorithmic visualizers.' },
    mission: { type: String, default: 'To simplify algorithmic learning through interactive visualizations and real-time execution engines.' },
    vision: { type: String, default: 'To build intuitive, scalable developer tools that empower software engineers globally.' },
    aboutProject: { type: String, default: 'AlgoVisualizer is an interactive full-stack SaaS platform for step-by-step data structure and algorithm visualization with real-time state tracking.' },
    whyIBuiltAlgoVisualizer: { type: String, default: 'I engineered AlgoVisualizer to help students visualize complex data structures and algorithms step-by-step in real time.' },
    careerGoal: { type: String, default: 'To design, build, and scale high-impact software systems and developer platforms.' },
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
      { name: 'Java', category: 'Programming', level: 90, tag: 'Core & OOP', icon: 'Cpu' },
      { name: 'Python', category: 'Programming', level: 88, tag: 'Advanced', icon: 'Code' },
      { name: 'C++', category: 'Programming', level: 85, tag: 'STL & Data Structures', icon: 'Terminal' },
      { name: 'MySQL', category: 'Database', level: 85, tag: 'Relational DB', icon: 'Database' },
      { name: 'NoSQL', category: 'Database', level: 80, tag: 'MongoDB', icon: 'Database' },
      { name: 'Java Swing', category: 'Frontend', level: 80, tag: 'GUI Framework', icon: 'Palette' },
      { name: 'Bootstrap', category: 'Frontend', level: 85, tag: 'UI Framework', icon: 'Palette' },
      { name: 'JDBC', category: 'Backend', level: 80, tag: 'Java Connectivity', icon: 'Server' },
      { name: 'Git', category: 'DevOps', level: 88, tag: 'Version Control', icon: 'Box' },
      { name: 'GitHub', category: 'DevOps', level: 90, tag: 'Code Collaboration', icon: 'Globe' },
      { name: 'VS Code', category: 'Tools', level: 95, tag: 'IDE', icon: 'FileCode' },
      { name: 'Power BI', category: 'Data & Analytics', level: 75, tag: 'Data Visualization', icon: 'Activity' },
      { name: 'Problem Solving', category: 'Soft Skills', level: 90, tag: 'Core Competency', icon: 'Sparkles' },
      { name: 'Communication', category: 'Soft Skills', level: 85, tag: 'Professional', icon: 'MessageSquare' },
      { name: 'Teamwork', category: 'Soft Skills', level: 90, tag: 'Collaboration', icon: 'ShieldCheck' },
      { name: 'Adaptability', category: 'Soft Skills', level: 90, tag: 'Fast Learner', icon: 'Zap' },
    ],
    projects: [
      {
        title: 'AlgoVisualizer',
        description: 'Interactive full-stack web platform for step-by-step data structure and algorithm visualization with real-time state tracking.',
        techStack: 'React, TypeScript, Node.js, Express, MongoDB, Tailwind CSS',
        githubLink: 'https://github.com/chandramohan06/AlgoVisualizer',
        liveDemo: '',
        startDate: '2024',
        endDate: 'Present',
      },
      {
        title: 'Mobile Sales Analysis',
        description: 'Data analytics project analyzing mobile sales trends, customer purchasing behavior, and revenue patterns using SQL & Power BI.',
        techStack: 'Python, MySQL, Power BI',
        githubLink: '',
        liveDemo: '',
        startDate: '2023',
        endDate: '2023',
      },
      {
        title: 'Real-Time Process Monitoring System',
        description: 'System monitoring tool for tracking real-time CPU, memory utilization, and running background processes with graphical display.',
        techStack: 'Java, Java Swing, Operating Systems',
        githubLink: '',
        liveDemo: '',
        startDate: '2023',
        endDate: '2023',
      },
    ],
    certifications: [
      {
        title: 'Python for Data Science',
        organization: 'Certification Provider',
        date: '2023',
        certificateLink: '',
      },
      {
        title: 'Data Structure and Algorithm',
        organization: 'Certification Provider',
        date: '2023',
        certificateLink: '',
      },
      {
        title: 'Programming in C++',
        organization: 'Certification Provider',
        date: '2022',
        certificateLink: '',
      },
    ],
    trainings: [
      {
        title: 'Board Infinity DSA Training',
        organization: 'Board Infinity',
        duration: '2023',
        description: 'Comprehensive training in Data Structures, Algorithms, and Algorithmic Problem Solving.',
      },
    ],
    projectMetrics: [
      { label: 'Algorithms Visualized', value: '85+', sub: 'Interactive step-by-step', color: 'text-indigo-400' },
      { label: 'Practice Problems', value: '250', sub: 'Easy & Medium DSA questions', color: 'text-emerald-400' },
      { label: 'API Response Time', value: '< 50ms', sub: 'Non-blocking async backend', color: 'text-amber-400' },
      { label: 'Tech Stack', value: 'React + Node', sub: 'MongoDB Atlas + Docker', color: 'text-purple-400' },
    ],
    timeline: [
      { year: '2021', title: 'Enrolled at Lovely Professional University', subtitle: 'B.Tech in Computer Science Engineering', description: 'Started computer science engineering journey learning programming fundamentals in C++ and Java.', badge: 'Education', category: 'Academics' },
      { year: '2022', title: 'C++ & DSA Foundations', subtitle: 'Core Problem Solving', description: 'Mastered C++ programming and completed Programming in C++ certification.', badge: 'Certification', category: 'Skills' },
      { year: '2023', title: 'Data Science, Systems & DSA Training', subtitle: 'Board Infinity & Projects', description: 'Completed Board Infinity DSA Training, Python for Data Science certification, Mobile Sales Analysis, and Real-Time Process Monitoring System.', badge: 'Training', category: 'Projects & Training' },
      { year: '2024 - 2025', title: 'AlgoVisualizer SaaS Platform', subtitle: 'Full-Stack Architecture', description: 'Engineered AlgoVisualizer SaaS platform with 85+ interactive algorithm visualizers and practice problem sandbox.', badge: 'Product', category: 'Engineering' },
    ],
    achievements: [],
    codingProfiles: [
      { platform: 'GitHub', username: 'chandramohan06', profileUrl: 'https://github.com/chandramohan06', solvedCount: '', rating: '', description: 'Open source projects & AlgoVisualizer SaaS codebase' },
      { platform: 'LinkedIn', username: 'chandramohan06', profileUrl: 'https://linkedin.com/in/chandramohan06', solvedCount: '', rating: '', description: 'Professional engineering network' },
    ],
    algorithmsVisualized: { type: String, default: '85+' },
    practiceProblems: { type: String, default: '250' },
    projectsCount: { type: String, default: '3+' },
    usersCount: { type: String, default: '1,000+' },
    experienceYears: { type: String, default: '3+ Years' },
    githubStars: { type: String, default: '100+' },
    downloadsCount: { type: String, default: '500+' },
    apiPerformance: { type: String, default: '< 50ms' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    isPublished: { type: Boolean, default: true },
    version: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export const DeveloperProfile = mongoose.model<IDeveloperProfile>(
  'DeveloperProfile',
  DeveloperProfileSchema
);


