// src/services/patientService.js
import axios from 'axios';

const API = axios.create({ baseURL: 'https://hospital-m9e5.onrender.com/api/patients' });

export const fetchPatients = () => API.get('/');
export const fetchPatientById = (id) => API.get(`/${id}`);
export const addPatient = (patient) => API.post('/', patient);
export const updatePatient = (id, updatedData) => API.put(`/${id}`, updatedData);
export const deletePatient = (id) => API.delete(`/${id}`);
