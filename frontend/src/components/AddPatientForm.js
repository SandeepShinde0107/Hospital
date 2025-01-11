import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { addPatient, updatePatient, fetchPatientById } from '../services/patientService'; // API calls for adding/updating patient
import { useParams, useNavigate } from 'react-router-dom';

const AddPatientForm = () => {
  const { id } = useParams(); // Get the patient ID from the URL if editing
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [message, setMessage] = useState('');

  // Fetch patient data if editing an existing patient
  useEffect(() => {
    if (id) {
      const fetchPatient = async () => {
        try {
          const { data } = await fetchPatientById(id); // Fetch the patient data for editing
          console.log("Fetched patient data:", data); // Debugging log to verify the data
          // Populate the form with the fetched data using setValue
          Object.keys(data).forEach(key => setValue(key, data[key])); // Automatically fill the form fields
        } catch (error) {
          console.error('Error fetching patient:', error);
        }
      };
      fetchPatient();
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      if (id) {
        await updatePatient(id, data);
        setMessage('Patient updated successfully');
      } else {
        await addPatient(data);
        setMessage('Patient added successfully');
      }
      navigate('/'); // Redirect after success
    } catch (error) {
      setMessage('Error saving patient');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">{id ? 'Edit Patient' : 'Add New Patient'}</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              {/* Name */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Name</label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  placeholder="Name"
                />
                {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
              </div>

              {/* Age */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Age</label>
                <input
                  {...register('age', { required: 'Age is required' })}
                  type="number"
                  className={`form-control ${errors.age ? 'is-invalid' : ''}`}
                  placeholder="Age"
                />
                {errors.age && <div className="invalid-feedback">{errors.age.message}</div>}
              </div>

              {/* Diseases */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Diseases</label>
                <input
                  {...register('diseases', { required: 'Diseases info is required' })}
                  className={`form-control ${errors.diseases ? 'is-invalid' : ''}`}
                  placeholder="Diseases"
                />
                {errors.diseases && <div className="invalid-feedback">{errors.diseases.message}</div>}
              </div>

              {/* Allergies */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Allergies</label>
                <input
                  {...register('allergies')}
                  className="form-control"
                  placeholder="Allergies"
                />
              </div>

              {/* Room Number */}
              <div className="col-md-4 mb-3">
                <label className="form-label">Room Number</label>
                <input
                  {...register('roomNumber', { required: 'Room Number is required' })}
                  type="number"
                  className={`form-control ${errors.roomNumber ? 'is-invalid' : ''}`}
                  placeholder="Room Number"
                />
                {errors.roomNumber && <div className="invalid-feedback">{errors.roomNumber.message}</div>}
              </div>

              {/* Bed Number */}
              <div className="col-md-4 mb-3">
                <label className="form-label">Bed Number</label>
                <input
                  {...register('bedNumber')}
                  type="number"
                  className="form-control"
                  placeholder="Bed Number"
                />
              </div>

              {/* Floor Number */}
              <div className="col-md-4 mb-3">
                <label className="form-label">Floor Number</label>
                <input
                  {...register('floorNumber')}
                  type="number"
                  className="form-control"
                  placeholder="Floor Number"
                />
              </div>

              {/* Gender */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Gender</label>
                <select
                  {...register('gender', { required: 'Gender is required' })}
                  className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <div className="invalid-feedback">{errors.gender.message}</div>}
              </div>

              {/* Contact Information */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Contact Information</label>
                <input
                  {...register('contactInfo', { required: 'Contact information is required' })}
                  className={`form-control ${errors.contactInfo ? 'is-invalid' : ''}`}
                  placeholder="Contact Information"
                />
                {errors.contactInfo && <div className="invalid-feedback">{errors.contactInfo.message}</div>}
              </div>

              {/* Emergency Contact */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Emergency Contact</label>
                <input
                  {...register('emergencyContact', { required: 'Emergency contact is required' })}
                  className={`form-control ${errors.emergencyContact ? 'is-invalid' : ''}`}
                  placeholder="Emergency Contact"
                />
                {errors.emergencyContact && <div className="invalid-feedback">{errors.emergencyContact.message}</div>}
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary">
              {id ? 'Update' : 'Add'} Patient
            </button>
          </form>

          {/* Success or Error Message */}
          {message && <p className="mt-3">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default AddPatientForm;
