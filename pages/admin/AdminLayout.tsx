import React from 'react';
import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { LayoutDashboard, Calendar, BedDouble, FileText } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const { user } = useApp();

  if (!user || !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col hidden md:flex">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-brand-blue">Painel Admin</h2>
          <p className="text-xs text-gray-500">Villa dos Corais</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <NavLink to="/admin" end className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded transition ${isActive ? 'bg-brand-blue text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
            <LayoutDashboard size={20} /> Dashboard
          </NavLink>
          <NavLink to="/admin/reservations" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded transition ${isActive ? 'bg-brand-blue text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
            <Calendar size={20} /> Reservas
          </NavLink>
          <NavLink to="/admin/rooms" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded transition ${isActive ? 'bg-brand-blue text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
            <BedDouble size={20} /> Quartos
          </NavLink>
        </nav>
      </aside>

      {/* Mobile Header for Admin (Simplified) */}
      <div className="flex-1 flex flex-col">
        <main className="p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;