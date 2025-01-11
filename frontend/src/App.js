import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HospitalFoodManagerDashboard from './components/HospitalFoodManagerDashboard';
import AddPatientForm from './components/AddPatientForm';
import DietChartManager from './components/DietChartManager';
import PantryStaffManager from './components/PantryStaffManager';
import DietChartForm from './components/dietChartForm';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PantryStaffForm from './components/PantryStaffForm';
import DeliveryForm from './components/DeliveryForm';
import DeliveryTable from './components/DeliveryTable';

// Authentication checker
const isAuthenticated = () => !!localStorage.getItem('token');

// Private Route Wrapper
const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      {/* Navbar Component */}
      <Navbar />
      <div className="container my-4">
        <Routes>
          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={<PrivateRoute element={<HospitalFoodManagerDashboard />} />}
          />
          <Route
            path="/create-patient"
            element={<PrivateRoute element={<AddPatientForm />} />}
          />
          <Route
            path="/edit-patient/:id"
            element={<PrivateRoute element={<AddPatientForm />} />}
          />
          <Route
            path="/diet-charts"
            element={<PrivateRoute element={<DietChartManager />} />}
          />
          <Route
            path="/create-diet-chart"
            element={<PrivateRoute element={<DietChartForm />} />}
          />
          <Route
            path="/edit-diet-chart/:id"
            element={<PrivateRoute element={<DietChartForm />} />}
          />
          <Route
            path="/pantry-staff"
            element={<PrivateRoute element={<PantryStaffManager />} />}
          />
          <Route
            path="/create-pantry-staff"
            element={<PrivateRoute element={<PantryStaffForm />} />}
          />
          <Route
            path="/edit-pantry-staff/:id"
            element={<PrivateRoute element={<PantryStaffForm />} />}
          />
          <Route
            path="/deliveries"
            element={<PrivateRoute element={<DeliveryTable />} />}
          />
          <Route
            path="/deliveries/create"
            element={<PrivateRoute element={<DeliveryForm />} />}
          />
          <Route
            path="/deliveries/:id"
            element={<PrivateRoute element={<DeliveryForm />} />}
          />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      {/* Footer Component */}
      <Footer />
    </Router>
  );
};

export default App;
