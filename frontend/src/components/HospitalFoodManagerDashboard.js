import React, { useState, useEffect } from 'react';
import { fetchPatients, deletePatient } from '../services/patientService';
import { fetchDietCharts, deleteDietChart } from '../services/dietChartService';
import { fetchPantryStaff, deletePantryStaff } from '../services/pantryStaff';
import { fetchDeliveries, deleteDelivery } from '../services/deliveryService';
import { Link } from 'react-router-dom';

const HospitalFoodManagerDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [dietCharts, setDietCharts] = useState([]);
  const [pantryStaff, setPantryStaff] = useState([]);
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [patientData, dietChartData, pantryStaffData, deliveryData] = await Promise.all([
          fetchPatients(),
          fetchDietCharts(),
          fetchPantryStaff(),
          fetchDeliveries(),
        ]);
        setPatients(patientData.data);
        setDietCharts(dietChartData.data);
        setPantryStaff(pantryStaffData.data);
        setDeliveries(deliveryData.data);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  const handleDeletePatient = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await deletePatient(id);
        setPatients((prev) => prev.filter((patient) => patient._id !== id));
      } catch (error) {
        console.error('Error deleting patient:', error);
      }
    }
  };

  const handleDeleteDietChart = async (id) => {
    if (window.confirm('Are you sure you want to delete this diet chart?')) {
      try {
        await deleteDietChart(id);
        setDietCharts((prev) => prev.filter((chart) => chart._id !== id));
      } catch (error) {
        console.error('Error deleting diet chart:', error);
      }
    }
  };

  const handleDeletePantryStaff = async (id) => {
    if (window.confirm('Are you sure you want to delete this pantry staff member?')) {
      try {
        await deletePantryStaff(id);
        setPantryStaff((prev) => prev.filter((staff) => staff._id !== id));
      } catch (error) {
        console.error('Error deleting pantry staff:', error);
      }
    }
  };

  const handleDeleteDelivery = async (id) => {
    if (window.confirm('Are you sure you want to delete this delivery?')) {
      try {
        await deleteDelivery(id);
        setDeliveries((prev) => prev.filter((delivery) => delivery._id !== id));
      } catch (error) {
        console.error('Error deleting delivery:', error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Hospital Food Manager Dashboard</h1>

      {/* Patients Section */}
      <div className="card mb-5 shadow">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h2 className="mb-0">Patients</h2>
          <Link to="/create-patient" className="btn btn-light">
            Add New Patient
          </Link>
        </div>
        <div className="card-body table-responsive">
          <table className="table table-bordered table-hover table-striped">
            <thead className="table-primary">
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Room No.</th>
                <th>Contact Info</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.length > 0 ? (
                patients.map((patient) => (
                  <tr key={patient._id}>
                    <td>{patient.name}</td>
                    <td>{patient.age}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.roomNumber}</td>
                    <td>{patient.contactInfo}</td>
                    <td>
                      <div className="btn-group">
                        <Link to={`/edit-patient/${patient._id}`} className="btn btn-sm btn-primary">
                          Edit
                        </Link>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeletePatient(patient._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No patients found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Diet Charts Section */}
      <div className="card mb-5 shadow">
        <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
          <h2 className="mb-0">Diet Charts</h2>
          <Link to="/create-diet-chart" className="btn btn-light">
            Add New Diet Chart
          </Link>
        </div>
        <div className="card-body table-responsive">
          <table className="table table-bordered table-hover table-striped">
            <thead className="table-success">
              <tr>
                <th>Patient Name</th>
                <th>Diet Plan</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dietCharts.length > 0 ? (
                dietCharts.map((chart) => (
                  <tr key={chart._id}>
                    <td>{patients.find((p) => p._id === chart.patientId)?.name || 'Unknown'}</td>
                    <td>{chart.dietPlan}</td>
                    <td>{new Date(chart.startDate).toLocaleDateString()}</td>
                    <td>{new Date(chart.endDate).toLocaleDateString()}</td>
                    <td>
                      <div className="btn-group">
                        <Link to={`/edit-diet-chart/${chart._id}`} className="btn btn-sm btn-primary">
                          Edit
                        </Link>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteDietChart(chart._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No diet charts found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pantry Staff Section */}
      <div className="card mb-5 shadow">
        <div className="card-header bg-warning text-white d-flex justify-content-between align-items-center">
          <h2 className="mb-0">Pantry Staff</h2>
          <Link to="/create-pantry-staff" className="btn btn-light">
            Add New Pantry Staff
          </Link>
        </div>
        <div className="card-body table-responsive">
          <table className="table table-bordered table-hover table-striped">
            <thead className="table-warning">
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Contact Info</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pantryStaff.length > 0 ? (
                pantryStaff.map((staff) => (
                  <tr key={staff._id}>
                    <td>{staff.name}</td>
                    <td>{staff.role}</td>
                    <td>{staff.contactInfo}</td>
                    <td>
                      <div className="btn-group">
                        <Link
                          to={`/edit-pantry-staff/${staff._id}`}
                          className="btn btn-sm btn-primary"
                        >
                          Edit
                        </Link>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeletePantryStaff(staff._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No pantry staff found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deliveries Section */}
      <div className="card shadow">
        <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
          <h2 className="mb-0">Deliveries</h2>
          <Link to="/deliveries/create" className="btn btn-light">
            Add New Delivery
          </Link>
        </div>
        <div className="card-body table-responsive">
          <table className="table table-bordered table-hover table-striped">
            <thead className="table-info">
              <tr>
                <th>Patient Name</th>
                <th>Pantry Staff</th>
                <th>Delivery Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.length > 0 ? (
                deliveries.map((delivery) => (
                  <tr key={delivery._id}>
                    <td>{patients.find((p) => p._id === delivery.patientId)?.name || 'Unknown'}</td>
                    <td>
                      {pantryStaff.find((s) => s._id === delivery.pantryStaffId)?.name || 'Unknown'}
                    </td>
                    <td>{new Date(delivery.deliveryTime).toLocaleString()}</td>
                    <td>{delivery.status}</td>
                    <td>
                      <div className="btn-group">
                        <Link to={`/deliveries/${delivery._id}`} className="btn btn-sm btn-primary">
                          Edit
                        </Link>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteDelivery(delivery._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No deliveries found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HospitalFoodManagerDashboard;
