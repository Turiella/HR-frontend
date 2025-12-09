import { apiClient } from './auth';

// Updated API calls to use apiClient with proper baseURL
export interface RankingRequest {
  jobDescription?: string;
  requiredSkills?: string[];
  preferredSkills?: string[];
  minExperience?: number;
}

export const getRanking = async (payload: RankingRequest) => {
  const res = await apiClient.post('/ranking', payload);
  return res.data;
};

export const getCvCount = async () => {
  const res = await apiClient.get('/cvs/meta/count');
  return res.data as { count: number };
};
