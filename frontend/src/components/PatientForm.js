import React, { useState, useEffect } from "react";

const PatientForm = ({ editingPatient, setEditingPatient, refreshPatients, isAuthenticated }) => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingPatient) {
      setName(editingPatient.name);
      setContact(editingPatient.contact);
    } else {
      setName("");
      setContact("");
    }
  }, [editingPatient]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setError("You must be logged in to perform this action.");
      return;
    }

    // Basic validation
    if (!name.trim() || !contact.trim()) {
      setError("Both name and contact are required.");
      return;
    }

    try {
      if (editingPatient) {
        await updatePatient(editingPatient._id, { name, contact });
        setEditingPatient(null);
      } else {
        await createPatient({ name, contact });
      }
      refreshPatients();
      setName("");
      setContact("");
      setError("");
    } catch (error) {
      console.error("Error saving patient:", error);
      setError("An error occurred while saving the patient. Please try again.");
    }
  };

  if (!isAuthenticated) {
    return <div className="alert alert-warning">Please log in to manage patients.</div>;
  }

  return (
    <div className="card shadow p-4">
      <h2 className="text-center">{editingPatient ? "Edit Patient" : "Add Patient"}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter patient's name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact">Contact:</label>
          <input
            id="contact"
            type="text"
            className="form-control"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Enter contact information"
          />
        </div>
        <div className="mt-3 d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            {editingPatient ? "Update" : "Add"}
          </button>
          {editingPatient && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setEditingPatient(null)}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PatientForm;
