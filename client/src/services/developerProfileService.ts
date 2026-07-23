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
  projects?: IProject[];
  certifications?: ICertification[];
  trainings?: ITraining[];
  projectMetrics: IProjectMetric[];
  timeline: ITimelineItem[];
  achievements: IAchievement[];
  codingProfiles: ICodingProfile[];
  algorithmsVisualized?: string;
  practiceProblems?: string;
  projectsCount?: string;
  usersCount?: string;
  experienceYears?: string;
  githubStars?: string;
  downloadsCount?: string;
  apiPerformance?: string;
  createdBy?: string;
  updatedBy?: string;
  isPublished?: boolean;
  version?: number;
  createdAt?: string;
  updatedAt?: string;
}

export const developerProfileService = {
  getProfile: async (): Promise<IDeveloperProfileData> => {
    const { data } = await api.get<{ data: IDeveloperProfileData }>(API_ENDPOINTS.DEVELOPER_PROFILE);
    return data.data;
  },

  getPublicProfile: async (): Promise<IDeveloperProfileData> => {
    const { data } = await api.get<{ data: IDeveloperProfileData }>(`${API_ENDPOINTS.DEVELOPER_PROFILE}/public`);
    return data.data;
  },

  updateProfile: async (payload: Partial<IDeveloperProfileData>): Promise<IDeveloperProfileData> => {
    const { data } = await api.put<{ data: IDeveloperProfileData }>(API_ENDPOINTS.DEVELOPER_PROFILE, payload);
    return data.data;
  },

  uploadPhoto: async (avatarUrlOrFile: string | File): Promise<IDeveloperProfileData> => {
    if (typeof avatarUrlOrFile === 'string') {
      const { data } = await api.post<{ data: IDeveloperProfileData }>(API_ENDPOINTS.DEVELOPER_PROFILE_PHOTO, { avatarUrl: avatarUrlOrFile });
      return data.data;
    }
    const formData = new FormData();
    formData.append('file', avatarUrlOrFile);
    const { data } = await api.post<{ data: IDeveloperProfileData }>(API_ENDPOINTS.DEVELOPER_PROFILE_PHOTO, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data;
  },

  uploadResume: async (resumeUrlOrFile: string | File): Promise<IDeveloperProfileData> => {
    if (typeof resumeUrlOrFile === 'string') {
      const { data } = await api.post<{ data: IDeveloperProfileData }>(API_ENDPOINTS.DEVELOPER_PROFILE_RESUME, { resumeUrl: resumeUrlOrFile });
      return data.data;
    }
    const formData = new FormData();
    formData.append('file', resumeUrlOrFile);
    const { data } = await api.post<{ data: IDeveloperProfileData }>(API_ENDPOINTS.DEVELOPER_PROFILE_RESUME, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
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

