import api from './api';
import { API_ENDPOINTS } from '@constants/api';

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

export interface IDeveloperProfileData {
  _id?: string;
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
}

export const developerProfileService = {
  getProfile: async (): Promise<IDeveloperProfileData> => {
    const { data } = await api.get<{ data: IDeveloperProfileData }>(API_ENDPOINTS.DEVELOPER_PROFILE);
    return data.data;
  },

  updateProfile: async (payload: Partial<IDeveloperProfileData>): Promise<IDeveloperProfileData> => {
    const { data } = await api.put<{ data: IDeveloperProfileData }>(API_ENDPOINTS.DEVELOPER_PROFILE, payload);
    return data.data;
  },

  uploadPhoto: async (avatarUrl: string): Promise<IDeveloperProfileData> => {
    const { data } = await api.post<{ data: IDeveloperProfileData }>(API_ENDPOINTS.DEVELOPER_PROFILE_PHOTO, { avatarUrl });
    return data.data;
  },

  uploadResume: async (resumeUrl: string): Promise<IDeveloperProfileData> => {
    const { data } = await api.post<{ data: IDeveloperProfileData }>(API_ENDPOINTS.DEVELOPER_PROFILE_RESUME, { resumeUrl });
    return data.data;
  },

  deletePhoto: async (): Promise<IDeveloperProfileData> => {
    const { data } = await api.delete<{ data: IDeveloperProfileData }>(API_ENDPOINTS.DEVELOPER_PROFILE_PHOTO);
    return data.data;
  },

  deleteResume: async (): Promise<IDeveloperProfileData> => {
    const { data } = await api.delete<{ data: IDeveloperProfileData }>(API_ENDPOINTS.DEVELOPER_PROFILE_RESUME);
    return data.data;
  },
};

export default developerProfileService;
