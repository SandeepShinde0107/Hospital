// src/components/HospitalFoodManager.js
import React, { useState, useEffect } from 'react';
import { fetchPatients, deletePatient } from '../services/patientService'; // Fetch patient API
import { Link } from 'react-router-dom';

const HospitalFoodManager = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const { data } = await fetchPatients();
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    loadPatients();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deletePatient(id);
      setPatients(patients.filter(patient => patient._id !== id));
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  return (
    <div className="dashboard">
      <h1>Hospital Food Manager Dashboard</h1>
      <table className="patient-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Room No.</th>
            <th>Bed No.</th>
            <th>Floor No.</th>
            <th>Diseases</th>
            <th>Allergies</th>
            <th>Contact Info</th>
            <th>Emergency Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient._id}>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.gender}</td>
              <td>{patient.roomNumber}</td>
              <td>{patient.bedNumber}</td>
              <td>{patient.floorNumber}</td>
              <td>{patient.diseases}</td>
              <td>{patient.allergies}</td>
              <td>{patient.contactInfo}</td>
              <td>{patient.emergencyContact}</td>
              <td>
                <Link to={`/edit-patient/${patient._id}`}>Edit</Link>
                <button onClick={() => handleDelete(patient._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/create-patient">Add Patient</Link>
    </div>
  );
};

export default HospitalFoodManager;
