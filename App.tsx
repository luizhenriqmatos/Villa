import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import LoginModal from './components/LoginModal';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ReservationsList from './pages/admin/ReservationsList';
import RoomManagement from './pages/admin/RoomManagement';
import Specs from './pages/Specs';
import GeminiConcierge from './components/GeminiConcierge';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/specs" element={<Specs />} />
            
            {/* Admin Routes Nested */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="reservations" element={<ReservationsList />} />
              <Route path="rooms" element={<RoomManagement />} />
            </Route>
          </Routes>
          <Footer />
          <LoginModal />
          <GeminiConcierge />
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;