import { Room, RoomStatus, RoomType } from './types';

export const INITIAL_ROOMS: Room[] = [
  {
    id: '101',
    name: 'Suíte Maré Mansa',
    type: RoomType.STANDARD,
    price: 350,
    capacity: 2,
    features: ['Wi-Fi', 'Ar Condicionado', 'Smart TV', 'Banheiro Privativo'],
    status: RoomStatus.AVAILABLE,
    image: 'https://picsum.photos/id/164/800/600',
    gallery: [
      { type: 'image', url: 'https://picsum.photos/id/164/800/600' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1616594039964-40891a913161?auto=format&fit=crop&q=80&w=800' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800' }
    ],
    description: 'Aconchego ideal para casais, com vista parcial para o jardim.'
  },
  {
    id: '102',
    name: 'Suíte Brisa do Mar',
    type: RoomType.STANDARD,
    price: 350,
    capacity: 2,
    features: ['Wi-Fi', 'Ar Condicionado', 'Smart TV', 'Banheiro Privativo'],
    status: RoomStatus.AVAILABLE,
    image: 'https://picsum.photos/id/1038/800/600',
    gallery: [
      { type: 'image', url: 'https://picsum.photos/id/1038/800/600' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1590490360182-f33d5e5a3574?auto=format&fit=crop&q=80&w=800' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800' }
    ],
    description: 'Nossa suíte standard mais arejada, perfeita para relaxar.'
  },
  {
    id: '103',
    name: 'Suíte Coral Vivo',
    type: RoomType.STANDARD,
    price: 380,
    capacity: 2,
    features: ['Wi-Fi', 'Ar Condicionado', 'Smart TV', 'Banheiro Privativo', 'Varanda'],
    status: RoomStatus.CLEANING,
    image: 'https://picsum.photos/id/219/800/600',
    gallery: [
      { type: 'image', url: 'https://picsum.photos/id/219/800/600' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1571508601891-ca5e7a713859?auto=format&fit=crop&q=80&w=800' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1512918760532-3ed64bc80409?auto=format&fit=crop&q=80&w=800' }
    ],
    description: 'Suíte charmosa com pequena varanda privativa.'
  },
  {
    id: '201',
    name: 'Suíte Família Villa',
    type: RoomType.FAMILY,
    price: 650,
    capacity: 4,
    features: ['Wi-Fi', 'Ar Condicionado', 'Smart TV', 'Cozinha Completa', 'Sala de Estar'],
    status: RoomStatus.AVAILABLE,
    image: 'https://picsum.photos/id/1029/800/600',
    gallery: [
      { type: 'video', url: 'https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4', thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800' },
      { type: 'image', url: 'https://picsum.photos/id/1029/800/600' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=800' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1484154218962-a1c002085d2f?auto=format&fit=crop&q=80&w=800' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1522771753035-a1112d097949?auto=format&fit=crop&q=80&w=800' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1505693314120-0d4436452d09?auto=format&fit=crop&q=80&w=800' }
    ],
    description: 'Espaço amplo para toda a família, com cozinha equipada e total liberdade.'
  }
];

export const BREAKFAST_PRICE = 45; // Per person, per day