import React, { useState, useEffect } from 'react';
import { fetchDeliveries, deleteDelivery } from '../services/deliveryService';
import { Link } from 'react-router-dom';

const DeliveryTable = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadDeliveries = async () => {
      try {
        const response = await fetchDeliveries();
        setDeliveries(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching deliveries:', error);
        setLoading(false);
      }
    };

    loadDeliveries();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this delivery?')) {
      try {
        await deleteDelivery(id);
        setDeliveries((prev) => prev.filter((delivery) => delivery._id !== id));
        setMessage('Delivery deleted successfully');
      } catch (error) {
        console.error('Error deleting delivery:', error);
        setMessage('Error deleting delivery');
      }
    }
  };

  if (loading) return <p>Loading deliveries...</p>;

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h2>Deliveries</h2>
        </div>
        <div className="card-body">
          {message && <p className="alert alert-info">{message}</p>}
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Patient</th>
                <th>Pantry Staff</th>
                <th>Delivery Time</th>
                <th>Status</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.length > 0 ? (
                deliveries.map((delivery, index) => (
                  <tr key={delivery._id}>
                    <td>{index + 1}</td>
                    <td>{delivery.patientName || 'Unknown'}</td>
                    <td>{delivery.pantryStaffName || 'Unknown'}</td>
                    <td>{new Date(delivery.deliveryTime).toLocaleString()}</td>
                    <td>{delivery.status}</td>
                    <td>{delivery.deliveryNotes || 'None'}</td>
                    <td>
                      <Link
                        to={`/deliveries/edit/${delivery._id}`}
                        className="btn btn-warning btn-sm me-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(delivery._id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No deliveries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <Link to="/deliveries/create" className="btn btn-success mt-3">
            Add Delivery
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTable;
