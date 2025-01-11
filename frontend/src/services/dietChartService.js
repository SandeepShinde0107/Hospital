import axios from 'axios';

const API = axios.create({ baseURL: 'https://hospital-m9e5.onrender.com/api/diet-charts' });


export const fetchDietCharts = () => API.get('/');
export const addDietChart = (dietChart) => API.post('/', dietChart);
export const fetchDietChartsByPatientID = (id) => API.get(`/patient/${id}`);
export const updateDietChart = (id, updatedData) => API.put(`/${id}`, updatedData);
export const deleteDietChart = (id) => API.delete(`/${id}`);
