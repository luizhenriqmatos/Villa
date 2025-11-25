import React, { useState } from 'react';
import { Room, Reservation } from '../types';
import { useApp } from '../context/AppContext';
import { X, Calendar as CalendarIcon, Phone, CheckCircle, Coffee, AlertCircle, ArrowRight, MessageCircle } from 'lucide-react';
import { format, differenceInDays, addDays } from 'date-fns';
import { BREAKFAST_PRICE } from '../constants';

interface BookingModalProps {
  room: Room;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ room, onClose }) => {
  const { user, addReservation } = useApp();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [breakfast, setBreakfast] = useState(false);
  const [step, setStep] = useState(1); // 1: Info/Food Policy, 2: Form, 3: Confirm

  const today = new Date().toISOString().split('T')[0];

  const calculateTotal = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = differenceInDays(end, start);
    if (nights <= 0) return 0;

    let total = nights * room.price;
    if (breakfast) {
      total += (BREAKFAST_PRICE * guests * nights);
    }
    return total;
  };

  const handleConfirm = () => {
    if (!user) return;
    
    const newReservation: Reservation = {
      id: Math.random().toString(36).substr(2, 9),
      roomId: room.id,
      userId: user.id,
      userName: user.name,
      checkIn,
      checkOut,
      guests,
      hasBreakfast: breakfast,
      totalPrice: calculateTotal(),
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };

    addReservation(newReservation);
    setStep(3); // Show success
  };

  return (
    <div className="fixed inset-0 bg-brand-blue/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in relative flex flex-col max-h-[90vh]">
        
        {/* Header Visual */}
        <div className="h-24 bg-brand-sand relative overflow-hidden flex-shrink-0">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <button onClick={onClose} className="absolute top-4 right-4 bg-white/50 hover:bg-white text-brand-blue rounded-full p-2 transition z-20">
                <X size={20} />
            </button>
            <div className="absolute bottom-4 left-6 z-10">
                <p className="text-xs uppercase tracking-widest text-brand-coral font-bold">Reserva</p>
                <h2 className="text-2xl font-serif font-bold text-brand-blue">{room.name}</h2>
            </div>
        </div>

        <div className="p-0 overflow-y-auto">
        {step === 1 && (
          <div className="p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-brand-sand rounded-full flex items-center justify-center mb-6 text-brand-coral animate-pulse">
                <AlertCircle size={32} />
            </div>
            
            <h3 className="text-xl font-serif text-brand-blue font-bold mb-4">Sobre Alimentação na Pousada</h3>
            
            <div className="bg-gray-50 border border-gray-100 p-6 rounded-xl mb-6 w-full text-left shadow-sm">
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    Para garantir a tranquilidade e exclusividade de nossos hóspedes, nosso serviço de cozinha foca exclusivamente no café da manhã.
                </p>
                <div className="flex items-start gap-3 text-sm text-brand-blue font-medium bg-blue-50 p-3 rounded-lg">
                    <MessageCircle size={18} className="mt-0.5 flex-shrink-0" />
                    <p>
                        Não servimos almoço ou jantar no local. <br/>
                        <span className="text-gray-500 font-normal">Dúvidas? Entre em contato via WhatsApp para indicações de restaurantes parceiros.</span>
                    </p>
                </div>
            </div>

            <button 
                onClick={() => setStep(2)}
                className="w-full bg-brand-blue text-white py-3 rounded-lg font-bold hover:bg-brand-green transition flex items-center justify-center gap-2"
            >
                Entendi, continuar reserva <ArrowRight size={18} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="p-8">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Chegada</label>
                <input 
                  type="date" 
                  min={today}
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-brand-coral outline-none text-brand-blue font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Saída</label>
                <input 
                  type="date" 
                  min={checkIn ? addDays(new Date(checkIn), 1).toISOString().split('T')[0] : today}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-brand-coral outline-none text-brand-blue font-medium"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Hóspedes</label>
              <select 
                value={guests} 
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-brand-coral outline-none"
              >
                {Array.from({length: room.capacity}, (_, i) => i + 1).map(n => (
                  <option key={n} value={n}>{n} Pessoa{n > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>

            <div className="mb-8 cursor-pointer group" onClick={() => setBreakfast(!breakfast)}>
                <div className={`border-2 p-4 rounded-xl flex items-center justify-between transition ${breakfast ? 'border-brand-coral bg-orange-50' : 'border-gray-100 hover:border-gray-200'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-full ${breakfast ? 'bg-brand-coral text-white' : 'bg-gray-100 text-gray-400'}`}>
                            <Coffee size={24} />
                        </div>
                        <div>
                            <span className={`block font-bold ${breakfast ? 'text-brand-coral' : 'text-gray-600'}`}>Incluir Café da Manhã</span>
                            <span className="text-xs text-gray-500">+ R$ {BREAKFAST_PRICE},00 / pessoa / dia</span>
                        </div>
                    </div>
                    <div className={`w-6 h-6 rounded border flex items-center justify-center ${breakfast ? 'bg-brand-coral border-brand-coral' : 'border-gray-300'}`}>
                        {breakfast && <CheckCircle size={14} className="text-white" />}
                    </div>
                </div>
            </div>

            <div className="bg-brand-blue p-6 rounded-xl text-white flex justify-between items-center shadow-lg">
              <div>
                <span className="block text-xs opacity-70 uppercase tracking-wider mb-1">Total Estimado</span>
                <span className="text-3xl font-serif font-bold">R$ {calculateTotal()}</span>
              </div>
              <button 
                onClick={handleConfirm}
                disabled={!checkIn || !checkOut || calculateTotal() === 0}
                className="bg-brand-light text-brand-blue px-6 py-3 rounded-lg font-bold hover:bg-white transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                Confirmar
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="p-12 text-center flex flex-col items-center justify-center h-full">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
              <CheckCircle size={40} />
            </div>
            <h2 className="text-3xl font-serif text-brand-blue mb-2">Reserva Confirmada!</h2>
            <p className="text-gray-600 mb-8 max-w-xs mx-auto">
              Sua estadia no paraíso está garantida. Enviamos os detalhes para <strong>{user?.email}</strong>.
            </p>
            <button 
              onClick={onClose}
              className="bg-gray-100 text-gray-600 px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition"
            >
              Fechar Janela
            </button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;