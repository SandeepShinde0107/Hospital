import React, { useState, useEffect } from 'react';
import { fetchPantryStaff, deletePantryStaff } from '../services/pantryStaff';
import { Link } from 'react-router-dom';

const PantryStaffManager = () => {
  const [pantryStaff, setPantryStaff] = useState([]);

  useEffect(() => {
    const loadPantryStaff = async () => {
      try {
        const { data } = await fetchPantryStaff();
        setPantryStaff(data);
      } catch (error) {
        console.error('Error fetching pantry staff:', error);
      }
    };
    loadPantryStaff();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deletePantryStaff(id);
      setPantryStaff(pantryStaff.filter(staff => staff._id !== id));
    } catch (error) {
      console.error('Error deleting pantry staff:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
          <h1 className="mb-0">Pantry Staff Manager</h1>
          <Link to="/create-pantry-staff" className="btn btn-light">
            Add New Pantry Staff
          </Link>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-hover table-striped">
            <thead className="table-success">
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Contact Info</th>
                <th>Assigned Patients</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pantryStaff.length > 0 ? (
                pantryStaff.map(staff => (
                  <tr key={staff._id}>
                    <td>{staff.name}</td>
                    <td>{staff.role}</td>
                    <td>{staff.contactInfo}</td>
                    <td>
                      {staff.assignedPatients && staff.assignedPatients.length > 0
                        ? staff.assignedPatients.map(patient => patient.name).join(', ')
                        : 'None'}
                    </td>
                    <td>
                      <div className="btn-group">
                        <Link
                          to={`/edit-pantry-staff/${staff._id}`}
                          className="btn btn-primary btn-sm"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(staff._id)}
                          className="btn btn-danger btn-sm"
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
                    No pantry staff available
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

export default PantryStaffManager;
