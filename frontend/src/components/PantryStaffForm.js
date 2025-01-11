import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { addPantryStaff, updatePantryStaff, fetchPantryStaffById } from '../services/pantryStaff';
import { fetchPatients } from '../services/patientService';
import { useParams, useNavigate } from 'react-router-dom';

const PantryStaffForm = () => {
  const { id } = useParams(); // Pantry staff ID for editing
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [patients, setPatients] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const { data } = await fetchPatients();
        setPatients(data); // Populate the patient dropdown
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    const loadPantryStaff = async () => {
      if (id) {
        try {
          const { data } = await fetchPantryStaffById(id);
          console.log('Fetched Pantry Staff:', data); // Log the response
          if (data) {
            Object.keys(data).forEach((key) => setValue(key, data[key])); // Pre-fill form fields
          }
        } catch (error) {
          console.error('Error fetching pantry staff:', error);
        }
      }
      setLoading(false); // Mark loading as complete
    };

    loadPatients();
    loadPantryStaff();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      if (id) {
        await updatePantryStaff(id, data); // Update existing pantry staff
        setMessage('Pantry staff updated successfully');
      } else {
        await addPantryStaff(data); // Create new pantry staff
        setMessage('Pantry staff created successfully');
      }
      navigate('/pantry-staff'); // Redirect after success
    } catch (error) {
      console.error('Error saving pantry staff:', error);
      setMessage('Error saving pantry staff');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">{id ? 'Edit Pantry Staff' : 'Add New Pantry Staff'}</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              {/* Name */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  placeholder="Enter name"
                />
                {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
              </div>

              {/* Role */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Role</label>
                <input
                  type="text"
                  {...register('role', { required: 'Role is required' })}
                  className={`form-control ${errors.role ? 'is-invalid' : ''}`}
                  placeholder="Enter role"
                />
                {errors.role && <div className="invalid-feedback">{errors.role.message}</div>}
              </div>

              {/* Contact Info */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Contact Info</label>
                <input
                  type="text"
                  {...register('contactInfo', { required: 'Contact info is required' })}
                  className={`form-control ${errors.contactInfo ? 'is-invalid' : ''}`}
                  placeholder="Enter contact info"
                />
                {errors.contactInfo && <div className="invalid-feedback">{errors.contactInfo.message}</div>}
              </div>

              {/* Assigned Patients */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Assigned Patients</label>
                <select
                  {...register('assignedPatients')}
                  multiple
                  className="form-select"
                >
                  {patients.map((patient) => (
                    <option key={patient._id} value={patient._id}>
                      {patient.name}
                    </option>
                  ))}
                </select>
                <small className="form-text text-muted">Hold Ctrl (Cmd on Mac) to select multiple patients.</small>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary">
              {id ? 'Update' : 'Add'} Pantry Staff
            </button>

            {/* Success or Error Message */}
            {message && <p className="mt-3">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PantryStaffForm;
