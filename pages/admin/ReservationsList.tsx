import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Trash2, Search, Filter } from 'lucide-react';

const ReservationsList: React.FC = () => {
  const { reservations, cancelReservation } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirm, setShowConfirm] = useState<string | null>(null);

  const filtered = reservations.filter(r => 
    r.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.id.includes(searchTerm)
  );

  return (
    <div>
      <h1 className="text-3xl font-serif text-brand-blue mb-8">Gestão de Reservas</h1>

      <div className="bg-white p-4 rounded-lg shadow mb-6 flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nome ou ID..." 
            className="pl-10 pr-4 py-2 border rounded-full w-full focus:outline-none focus:ring-1 focus:ring-brand-blue"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 text-gray-600 hover:text-brand-blue">
          <Filter size={18} /> Filtros
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hóspede</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quarto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in / Out</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.length === 0 ? (
              <tr><td colSpan={6} className="p-8 text-center text-gray-500">Nenhuma reserva encontrada.</td></tr>
            ) : (
              filtered.map(res => (
                <tr key={res.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{res.userName}</div>
                    <div className="text-xs text-gray-500">ID: {res.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Quarto {res.roomId}
                    {res.hasBreakfast && <span className="ml-2 text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded">Café</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{res.checkIn}</div>
                    <div>{res.checkOut}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-700">
                    R$ {res.totalPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${res.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {res.status === 'confirmed' ? 'Confirmado' : 'Cancelado'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                    {res.status === 'confirmed' && (
                      <button 
                        onClick={() => setShowConfirm(res.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Cancelar Reserva"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                    
                    {/* Inline Confirmation Modal */}
                    {showConfirm === res.id && (
                      <div className="absolute right-0 top-0 mt-8 w-64 bg-white shadow-xl rounded-lg p-4 border border-gray-200 z-10">
                        <p className="text-sm text-gray-700 mb-3">Tem certeza que deseja cancelar esta reserva?</p>
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => setShowConfirm(null)}
                            className="px-3 py-1 text-xs text-gray-600 border rounded hover:bg-gray-50"
                          >
                            Não
                          </button>
                          <button 
                            onClick={() => { cancelReservation(res.id); setShowConfirm(null); }}
                            className="px-3 py-1 text-xs text-white bg-red-600 rounded hover:bg-red-700"
                          >
                            Sim, cancelar
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReservationsList;