import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { addDietChart, updateDietChart, fetchDietChartsByPatientID } from '../services/dietChartService';
import { fetchPatients } from '../services/patientService';
import { useParams, useNavigate } from 'react-router-dom';

const DietChartForm = () => {
  const { id } = useParams(); // Diet chart ID for editing
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

    const loadDietChart = async () => {
      if (id) {
        try {
          const { data } = await fetchDietChartsByPatientID(id);
          console.log('Fetched Diet Chart:', data); // Log the response
          if (data) {
            Object.keys(data).forEach((key) => setValue(key, data[key])); // Pre-fill form fields
          }
        } catch (error) {
          console.error('Error fetching diet chart:', error);
        }
      }
      setLoading(false); // Mark loading as complete
    };

    loadPatients();
    loadDietChart();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      if (id) {
        await updateDietChart(id, data); // Update existing diet chart
        setMessage('Diet chart updated successfully');
      } else {
        await addDietChart(data); // Create new diet chart
        setMessage('Diet chart created successfully');
      }
      navigate('/diet-charts'); // Redirect after success
    } catch (error) {
      console.error('Error saving diet chart:', error);
      setMessage('Error saving diet chart');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-success text-white">
          <h2 className="mb-0">{id ? 'Edit Diet Chart' : 'Add New Diet Chart'}</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              {/* Patient */}
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

              {/* Diet Plan */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Diet Plan</label>
                <textarea
                  {...register('dietPlan', { required: 'Diet plan is required' })}
                  className={`form-control ${errors.dietPlan ? 'is-invalid' : ''}`}
                  placeholder="Enter the diet plan"
                />
                {errors.dietPlan && <div className="invalid-feedback">{errors.dietPlan.message}</div>}
              </div>

              {/* Start Date */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  {...register('startDate', { required: 'Start date is required' })}
                  className={`form-control ${errors.startDate ? 'is-invalid' : ''}`}
                />
                {errors.startDate && <div className="invalid-feedback">{errors.startDate.message}</div>}
              </div>

              {/* End Date */}
              <div className="col-md-6 mb-3">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  {...register('endDate', { required: 'End date is required' })}
                  className={`form-control ${errors.endDate ? 'is-invalid' : ''}`}
                />
                {errors.endDate && <div className="invalid-feedback">{errors.endDate.message}</div>}
              </div>

              {/* Instructions */}
              <div className="col-12 mb-3">
                <label className="form-label">Instructions</label>
                <textarea
                  {...register('instructions')}
                  className="form-control"
                  placeholder="Additional instructions (optional)"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-success">
              {id ? 'Update' : 'Add'} Diet Chart
            </button>

            {/* Success or Error Message */}
            {message && <p className="mt-3">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default DietChartForm;
