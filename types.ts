export enum RoomStatus {
  AVAILABLE = 'Disponível',
  OCCUPIED = 'Ocupado',
  MAINTENANCE = 'Manutenção',
  CLEANING = 'Limpeza'
}

export enum RoomType {
  STANDARD = 'Padrão',
  FAMILY = 'Família'
}

export interface GalleryItem {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string; // Optional thumbnail for videos
}

export interface Room {
  id: string;
  name: string;
  type: RoomType;
  price: number;
  capacity: number;
  features: string[];
  status: RoomStatus;
  image: string;
  gallery: GalleryItem[]; // Updated to support images and videos
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface Reservation {
  id: string;
  roomId: string;
  userId: string;
  userName: string; // Denormalized for simpler display
  checkIn: string; // ISO Date string
  checkOut: string; // ISO Date string
  guests: number;
  hasBreakfast: boolean;
  totalPrice: number;
  createdAt: string;
  status: 'confirmed' | 'cancelled';
}

export interface FinancialReport {
  period: string;
  revenue: number;
  occupancyRate: number;
}