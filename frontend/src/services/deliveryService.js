import axios from 'axios';

const API = axios.create({ baseURL: 'https://hospital-m9e5.onrender.com/api/deliveries' });

// Fetch all deliveries
export const fetchDeliveries = () => API.get('/');

// Create a new delivery
export const createDelivery = (deliveryData) => API.post('/', deliveryData);

// Fetch deliveries by patient ID
export const fetchDeliveriesByPatientId = (patientId) => API.get(`/patient/${patientId}`);

// Update a delivery by its ID
export const updateDelivery = (id, updatedDeliveryData) => API.put(`/${id}`, updatedDeliveryData);

// Delete a delivery by its ID
export const deleteDelivery = (id) => API.delete(`/${id}`);
