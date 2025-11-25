import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Room, RoomStatus, RoomType } from '../types';
import { CheckCircle, ArrowRight, Utensils, Star, Camera } from 'lucide-react';
import BookingModal from '../components/BookingModal';
import GalleryModal from '../components/GalleryModal';

const Rooms: React.FC = () => {
  const { rooms, user, setLoginModalOpen } = useApp();
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [galleryRoom, setGalleryRoom] = useState<Room | null>(null);

  const handleBookClick = (room: Room) => {
    if (!user) {
      setLoginModalOpen(true);
      return;
    }
    setSelectedRoom(room);
  };

  const handleOpenGallery = (e: React.MouseEvent, room: Room) => {
    e.stopPropagation();
    setGalleryRoom(room);
  };

  return (
    <div className="py-20 bg-brand-sand min-h-screen">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif text-brand-blue mb-4">Nossas Acomodações</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Escolha o cenário perfeito para o seu descanso. Todas as suítes dispõem de ar condicionado, TV e banheiro privativo.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10">
          {rooms.map(room => {
            const isFamily = room.type === RoomType.FAMILY;
            return (
              <div 
                key={room.id} 
                className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 relative group flex flex-col md:flex-row cursor-pointer ${isFamily ? 'ring-2 ring-brand-coral md:col-span-2' : 'hover:ring-1 hover:ring-brand-blue/20'}`}
                onClick={() => handleBookClick(room)} // Make whole card clickable for booking
              >
                {/* Visual Badge for Family Room */}
                {isFamily && (
                  <div className="absolute top-0 right-0 bg-brand-coral text-white text-xs font-bold px-4 py-2 z-20 rounded-bl-xl uppercase tracking-wider flex items-center gap-2">
                    <Star size={14} fill="white" /> Exclusivo
                  </div>
                )}

                <div className={`relative ${isFamily ? 'md:w-1/2 h-64 md:h-auto' : 'md:w-2/5 h-64 md:h-full'}`}>
                  <img 
                    src={room.image} 
                    alt={room.name} 
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-105" 
                  />
                  {room.status !== RoomStatus.AVAILABLE && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
                      <span className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest shadow-lg">
                        {room.status}
                      </span>
                    </div>
                  )}
                  {/* Overlay Button for photos on mobile or quick access */}
                  <button
                    onClick={(e) => handleOpenGallery(e, room)}
                    className="absolute bottom-3 left-3 bg-white/90 hover:bg-white text-brand-blue text-xs font-bold px-3 py-1.5 rounded-full shadow flex items-center gap-1.5 z-20 transition"
                  >
                    <Camera size={14} /> Ver Fotos
                  </button>
                </div>
                
                <div className={`p-8 flex flex-col justify-between ${isFamily ? 'md:w-1/2' : 'md:w-3/5'}`}>
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className={`text-xs font-bold uppercase tracking-widest mb-1 block ${isFamily ? 'text-brand-coral' : 'text-brand-green'}`}>
                          {room.type}
                        </span>
                        <h3 className="text-2xl font-serif font-bold text-brand-blue">{room.name}</h3>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed font-light">{room.description}</p>
                    
                    {isFamily && (
                      <div className="bg-brand-sand/50 p-3 rounded-lg mb-4 flex items-center gap-3 border border-brand-sand">
                        <div className="bg-white p-2 rounded-full text-brand-coral shadow-sm">
                          <Utensils size={16} />
                        </div>
                        <span className="text-sm font-bold text-brand-blue">Cozinha Privativa Completa</span>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-6">
                      {room.features.slice(0, 4).map((f, i) => (
                        <span key={i} className="text-xs bg-gray-50 text-gray-500 border border-gray-100 px-3 py-1 rounded-full flex items-center gap-1">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-end justify-between border-t border-gray-100 pt-6">
                    <div>
                      <span className="text-xs text-gray-400 uppercase tracking-wider block mb-1">A partir de</span>
                      <span className="text-3xl font-serif font-bold text-brand-blue">R$ {room.price}</span>
                      <span className="text-xs text-gray-400"> / noite</span>
                    </div>
                    
                    <div className="flex flex-col gap-2 items-end">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBookClick(room);
                          }}
                          disabled={room.status !== RoomStatus.AVAILABLE}
                          className={`px-6 py-3 rounded-full font-bold text-sm transition flex items-center gap-2 ${
                            room.status === RoomStatus.AVAILABLE 
                            ? 'bg-brand-blue text-white hover:bg-brand-green shadow-lg hover:shadow-xl' 
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {room.status === RoomStatus.AVAILABLE ? 'Reservar Agora' : 'Indisponível'} 
                          {room.status === RoomStatus.AVAILABLE && <ArrowRight size={16} />}
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedRoom && (
        <BookingModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
      )}

      {galleryRoom && (
        <GalleryModal 
          items={galleryRoom.gallery} 
          roomName={galleryRoom.name} 
          onClose={() => setGalleryRoom(null)} 
        />
      )}
    </div>
  );
};

export default Rooms;