import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X } from 'lucide-react';

const LoginModal: React.FC = () => {
  const { isLoginModalOpen, setLoginModalOpen, login } = useApp();
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(email) {
        login(email, isAdmin);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative animate-fade-in">
        <button 
          onClick={() => setLoginModalOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-serif text-brand-blue mb-6">Bem-vindo</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">E-mail</label>
            <input 
              type="email" 
              required
              className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-brand-blue outline-none"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="admin-check"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="rounded text-brand-blue focus:ring-brand-blue"
            />
            <label htmlFor="admin-check" className="text-sm text-gray-600">Entrar como Administrador (Demo)</label>
          </div>

          <button 
            type="submit" 
            className="w-full bg-brand-blue hover:bg-teal-800 text-white font-bold py-2 rounded transition"
          >
            Entrar
          </button>
        </form>
        
        <div className="mt-4 text-xs text-gray-500 text-center">
          * Para testar o painel administrativo, marque a caixa acima.
        </div>
      </div>
    </div>
  );
};

export default LoginModal;