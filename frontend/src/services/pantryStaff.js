import axios from 'axios';

const API = axios.create({ baseURL: 'https://hospital-m9e5.onrender.com/api/pantry-staff' });

// Fetch all pantry staff
export const fetchPantryStaff = () => API.get('/');

// Add a new pantry staff
export const addPantryStaff = (pantryStaff) => API.post('/', pantryStaff);

// Fetch pantry staff by ID
export const fetchPantryStaffById = (id) => API.get(`/${id}`);

// Update an existing pantry staff
export const updatePantryStaff = (id, updatedData) => API.put(`/${id}`, updatedData);

// Delete pantry staff by ID
export const deletePantryStaff = (id) => API.delete(`/${id}`);
