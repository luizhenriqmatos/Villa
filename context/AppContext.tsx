import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Room, Reservation, User, RoomStatus } from '../types';
import { INITIAL_ROOMS } from '../constants';

interface AppContextType {
  user: User | null;
  rooms: Room[];
  reservations: Reservation[];
  login: (email: string, isAdmin: boolean) => void;
  logout: () => void;
  addReservation: (reservation: Reservation) => void;
  cancelReservation: (id: string) => void;
  updateRoomStatus: (roomId: string, status: RoomStatus) => void;
  isLoginModalOpen: boolean;
  setLoginModalOpen: (isOpen: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [rooms, setRooms] = useState<Room[]>(INITIAL_ROOMS);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  // Load from local storage on mount (simulating DB persistence)
  useEffect(() => {
    const storedRes = localStorage.getItem('reservations');
    if (storedRes) setReservations(JSON.parse(storedRes));
    
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  const login = (email: string, isAdmin: boolean) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: isAdmin ? "Administrador" : email.split('@')[0],
      email,
      isAdmin
    };
    setUser(newUser);
    setLoginModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  const addReservation = (reservation: Reservation) => {
    setReservations(prev => [...prev, reservation]);
  };

  const cancelReservation = (id: string) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status: 'cancelled' } : r));
  };

  const updateRoomStatus = (roomId: string, status: RoomStatus) => {
    setRooms(prev => prev.map(room => room.id === roomId ? { ...room, status } : room));
  };

  return (
    <AppContext.Provider value={{
      user,
      rooms,
      reservations,
      login,
      logout,
      addReservation,
      cancelReservation,
      updateRoomStatus,
      isLoginModalOpen,
      setLoginModalOpen
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};