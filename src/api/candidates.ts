import axios from 'axios';

const API = '/api'; 

export const getCandidateProfile = async (id: string, token: string, params?: Record<string, string | number | boolean>) => {
  const res = await axios.get(`${API}/candidates/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    params
  });
  return res.data;
};
