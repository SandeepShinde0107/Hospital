import React, { useState, useEffect } from 'react';
import { fetchDietCharts, deleteDietChart } from '../services/dietChartService';
import { Link } from 'react-router-dom';

const DietChartManager = () => {
  const [dietCharts, setDietCharts] = useState([]);

  useEffect(() => {
    const loadDietCharts = async () => {
      try {
        const { data } = await fetchDietCharts();
        setDietCharts(data);
      } catch (error) {
        console.error('Error fetching diet charts:', error);
      }
    };
    loadDietCharts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDietChart(id);
      setDietCharts(dietCharts.filter(chart => chart._id !== id));
    } catch (error) {
      console.error('Error deleting diet chart:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
          <h1 className="mb-0">Diet Chart Manager</h1>
          <Link to="/create-diet-chart" className="btn btn-light">
            Add New Diet Chart
          </Link>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-hover table-striped">
            <thead className="table-success">
              <tr>
                <th>Patient Name</th>
                <th>Diet Plan</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Instructions</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dietCharts.length > 0 ? (
                dietCharts.map(chart => (
                  <tr key={chart._id}>
                    <td>{chart.patientId?.name || 'Unknown'}</td>
                    <td>{chart.dietPlan}</td>
                    <td>{new Date(chart.startDate).toLocaleDateString()}</td>
                    <td>{new Date(chart.endDate).toLocaleDateString()}</td>
                    <td>{chart.instructions || 'N/A'}</td>
                    <td>
                      <div className="btn-group">
                        <Link
                          to={`/edit-diet-chart/${chart._id}`}
                          className="btn btn-primary btn-sm"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(chart._id)}
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
                  <td colSpan="6" className="text-center">
                    No diet charts available
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

export default DietChartManager;
