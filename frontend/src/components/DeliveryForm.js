import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  createDelivery,
  fetchDeliveriesByPatientId,
  updateDelivery,
} from '../services/deliveryService';
import { fetchPatients } from '../services/patientService';
import { fetchPantryStaff } from '../services/pantryStaff';
import { useParams, useNavigate } from 'react-router-dom';

const DeliveryForm = () => {
  const { id } = useParams(); // Delivery ID for editing
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [patients, setPatients] = useState([]);
  const [pantryStaff, setPantryStaff] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const loadResources = async () => {
      try {
        const patientResponse = await fetchPatients();
        setPatients(patientResponse.data);

        const pantryStaffResponse = await fetchPantryStaff();
        setPantryStaff(pantryStaffResponse.data);

        if (id) {
          // Fetch the existing delivery for editing
          const deliveryResponse = await fetchDeliveriesByPatientId(id);
          if (deliveryResponse.data) {
            Object.keys(deliveryResponse.data).forEach((key) => 
              setValue(key, deliveryResponse.data[key])
            );
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading resources:', error);
        setLoading(false);
      }
    };

    loadResources();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      if (id) {
        await updateDelivery(id, data); // Update existing delivery
        setMessage('Delivery updated successfully');
      } else {
        await createDelivery(data); // Create new delivery
        setMessage('Delivery created successfully');
      }
      navigate('/deliveries'); // Redirect after success
    } catch (error) {
      console.error('Error saving delivery:', error);
      setMessage('Error saving delivery');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-success text-white">
          <h2 className="mb-0">{id ? 'Edit Delivery' : 'Add New Delivery'}</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              {/* Patient Selection */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Patient</label>
                <select
                  {...register('patientId', { required: 'Patient is required' })}
                  className={`form-select ${errors.patientId ? 'is-invalid' : ''}`}
                >
                  <option value="">Select Patient</option>
                  {patients.map((patient) => (
                    <option key={patient._id} value={patient._id}>
                      {patient.name}
                    </option>
                  ))}
                </select>
                {errors.patientId && <div className="invalid-feedback">{errors.patientId.message}</div>}
              </div>

              {/* Pantry Staff Selection */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Pantry Staff</label>
                <select
                  {...register('pantryStaffId', { required: 'Pantry Staff is required' })}
                  className={`form-select ${errors.pantryStaffId ? 'is-invalid' : ''}`}
                >
                  <option value="">Select Pantry Staff</option>
                  {pantryStaff.map((staff) => (
                    <option key={staff._id} value={staff._id}>
                      {staff.name}
                    </option>
                  ))}
                </select>
                {errors.pantryStaffId && <div className="invalid-feedback">{errors.pantryStaffId.message}</div>}
              </div>

              {/* Delivery Time */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Delivery Time</label>
                <input
                  type="datetime-local"
                  {...register('deliveryTime', { required: 'Delivery Time is required' })}
                  className={`form-control ${errors.deliveryTime ? 'is-invalid' : ''}`}
                />
                {errors.deliveryTime && <div className="invalid-feedback">{errors.deliveryTime.message}</div>}
              </div>

              {/* Status */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Status</label>
                <select
                  {...register('status', { required: 'Status is required' })}
                  className={`form-select ${errors.status ? 'is-invalid' : ''}`}
                >
                  <option value="">Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
              </div>

              {/* Delivery Notes */}
              <div className="col-12 mb-3">
                <label className="form-label">Delivery Notes</label>
                <textarea
                  {...register('deliveryNotes')}
                  className="form-control"
                  rows="3"
                  placeholder="Enter any additional notes"
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-success">
              {id ? 'Update' : 'Add'} Delivery
            </button>

            {/* Success or Error Message */}
            {message && <p className="mt-3">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeliveryForm;
