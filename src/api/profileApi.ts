import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const saveProfile = (data: any) => {
  return axios.post(`${API_URL}/profile`, data);
};

export const getProfile = () => {
  return axios.get(`${API_URL}/profile`);
};

export const updateProfile = (data: any) => {
  return axios.put(`${API_URL}/profile/1`, data);
};

export const deleteProfile = () => {
  return axios.delete(`${API_URL}/profile/1`);
};
