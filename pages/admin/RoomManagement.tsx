import React from 'react';
import { useApp } from '../../context/AppContext';
import { RoomStatus } from '../../types';
import { BedDouble, Check, AlertTriangle, XCircle } from 'lucide-react';

const RoomManagement: React.FC = () => {
  const { rooms, updateRoomStatus } = useApp();

  const getStatusColor = (status: RoomStatus) => {
    switch (status) {
      case RoomStatus.AVAILABLE: return 'bg-green-500';
      case RoomStatus.OCCUPIED: return 'bg-red-500';
      case RoomStatus.MAINTENANCE: return 'bg-yellow-500';
      case RoomStatus.CLEANING: return 'bg-orange-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-serif text-brand-blue mb-2">Gestão de Acomodações</h1>
      <p className="text-gray-500 mb-8">Status em tempo real das suítes (Sistema Semáforo).</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {rooms.map(room => (
          <div key={room.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-6 relative overflow-hidden group">
            
            {/* Traffic Light Visual Indicator */}
            <div className={`absolute left-0 top-0 bottom-0 w-3 ${getStatusColor(room.status)}`}></div>

            <div className="relative w-32 h-32 flex-shrink-0">
                <img src={room.image} alt={room.name} className="w-full h-full object-cover rounded-lg shadow-sm" />
                <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full border-4 border-white ${getStatusColor(room.status)} shadow-sm`}></div>
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                 <h3 className="font-bold text-xl font-serif text-brand-blue">{room.name}</h3>
                 <span className="text-xs font-mono text-gray-400">#{room.id}</span>
              </div>
              <p className="text-sm text-gray-500 mb-5">{room.type} • Cap: {room.capacity}</p>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Alterar Status</label>
                <div className="flex gap-2">
                    <button 
                        onClick={() => updateRoomStatus(room.id, RoomStatus.AVAILABLE)}
                        className={`flex-1 py-2 rounded text-xs font-bold transition flex justify-center ${room.status === RoomStatus.AVAILABLE ? 'bg-green-100 text-green-700 ring-2 ring-green-500' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                        title="Disponível"
                    >
                        <Check size={16} />
                    </button>
                    <button 
                        onClick={() => updateRoomStatus(room.id, RoomStatus.OCCUPIED)}
                        className={`flex-1 py-2 rounded text-xs font-bold transition flex justify-center ${room.status === RoomStatus.OCCUPIED ? 'bg-red-100 text-red-700 ring-2 ring-red-500' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                        title="Ocupado"
                    >
                        <XCircle size={16} />
                    </button>
                    <button 
                        onClick={() => updateRoomStatus(room.id, RoomStatus.MAINTENANCE)}
                        className={`flex-1 py-2 rounded text-xs font-bold transition flex justify-center ${room.status === RoomStatus.MAINTENANCE ? 'bg-yellow-100 text-yellow-700 ring-2 ring-yellow-500' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                        title="Manutenção"
                    >
                        <AlertTriangle size={16} />
                    </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomManagement;