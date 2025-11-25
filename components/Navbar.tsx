import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { LogOut, User as UserIcon, ShieldCheck } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout, setLoginModalOpen } = useApp();
  const navigate = useNavigate();

  return (
    <nav className="bg-brand-blue text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-serif font-bold tracking-wider hover:text-brand-light transition">
          Villa dos Corais
        </Link>
        
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="hover:text-brand-light transition">Início</Link>
          <Link to="/rooms" className="hover:text-brand-light transition">Acomodações</Link>
          <Link to="/specs" className="hover:text-brand-light transition">Especificação</Link>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm opacity-90 flex items-center gap-2">
                {user.isAdmin ? <ShieldCheck size={16} className="text-brand-light" /> : <UserIcon size={16} />}
                Olá, {user.name}
              </span>
              {user.isAdmin && (
                <Link to="/admin" className="bg-brand-light text-brand-blue px-3 py-1 rounded-full text-sm font-bold hover:bg-white transition">
                  Dashboard
                </Link>
              )}
              <button 
                onClick={() => { logout(); navigate('/'); }} 
                className="hover:text-red-300 transition"
                title="Sair"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setLoginModalOpen(true)}
              className="bg-brand-coral hover:bg-orange-600 text-white px-5 py-2 rounded shadow transition font-bold"
            >
              Entrar / Reservar
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;