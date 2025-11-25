import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Loader2, PlayCircle, PauseCircle } from 'lucide-react';
import { GalleryItem } from '../types';

interface GalleryModalProps {
  items: GalleryItem[];
  roomName: string;
  onClose: () => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ items, roomName, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState({ x: 50, y: 50, isActive: false });
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentItem = items[currentIndex];

  // Reset loading state and zoom when index changes
  useEffect(() => {
    setIsLoading(true);
    setZoom({ x: 50, y: 50, isActive: false });

    // Preload next media logic
    const nextIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    const nextItem = items[nextIndex];
    
    if (nextItem.type === 'image') {
      const img = new Image();
      img.src = nextItem.url;
    } else if (nextItem.type === 'video') {
      // Hint browser to preload video metadata/content
      const video = document.createElement('video');
      video.src = nextItem.url;
      video.preload = 'auto';
    }
  }, [currentIndex, items]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const selectSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    // Disable zoom for videos
    if (currentItem.type === 'video') return;
    
    // Only enable zoom logic on non-touch devices or larger screens effectively
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoom({ x, y, isActive: true });
  };

  const handleMouseLeave = () => {
    setZoom(prev => ({ ...prev, isActive: false }));
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md animate-fade-in p-0 md:p-4">
      <button 
        onClick={onClose}
        className="absolute top-2 right-2 md:top-4 md:right-4 text-white/70 hover:text-white transition z-50 p-2 md:p-2 bg-black/20 md:bg-transparent rounded-full"
        aria-label="Fechar galeria"
      >
        <X size={24} className="md:w-8 md:h-8" />
      </button>

      <div className="w-full h-full md:max-w-6xl flex flex-col items-center justify-center">
        
        <h2 className="text-white font-serif text-lg md:text-2xl mb-2 md:mb-6 tracking-wide text-center px-8">{roomName}</h2>

        {/* Media Container */}
        <div className="relative w-full h-[50vh] md:h-[75vh] flex items-center justify-center bg-transparent md:bg-black/50 md:rounded-lg overflow-hidden md:border border-white/10 group">
          
          {/* Loading Spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center text-white/30 z-0">
              <Loader2 size={48} className="animate-spin" />
            </div>
          )}

          <button 
            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
            className="absolute left-2 md:left-4 p-2 bg-black/30 hover:bg-black/60 text-white rounded-full transition backdrop-blur-sm z-20"
          >
            <ChevronLeft size={24} className="md:w-8 md:h-8" />
          </button>
          
          {currentItem.type === 'video' ? (
             <video
               key={currentItem.url}
               ref={videoRef}
               src={currentItem.url}
               className={`
                 max-h-full max-w-full object-contain shadow-2xl z-10
                 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
                 ${isLoading ? 'opacity-0 scale-95 blur-md' : 'opacity-100 scale-100 blur-0'}
               `}
               controls
               autoPlay={false}
               onLoadedData={() => setIsLoading(false)}
               playsInline
             />
          ) : (
            <img 
              key={currentItem.url}
              src={currentItem.url} 
              alt={`Foto ${currentIndex + 1} de ${roomName}`}
              onLoad={() => setIsLoading(false)}
              className={`
                max-h-full max-w-full object-contain shadow-2xl z-10
                transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] will-change-transform
                ${isLoading ? 'opacity-0 scale-95 blur-md' : 'opacity-100 scale-100 blur-0'}
                ${zoom.isActive ? 'scale-[2] cursor-zoom-out' : 'scale-100 cursor-zoom-in'}
              `}
              style={{
                transformOrigin: `${zoom.x}% ${zoom.y}%`,
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            />
          )}

          <button 
            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
            className="absolute right-2 md:right-4 p-2 bg-black/30 hover:bg-black/60 text-white rounded-full transition backdrop-blur-sm z-20"
          >
            <ChevronRight size={24} className="md:w-8 md:h-8" />
          </button>
        </div>

        {/* Thumbnails */}
        <div className="mt-4 md:mt-8 w-full max-w-4xl px-4">
          <div className="flex gap-2 md:gap-3 overflow-x-auto pb-4 justify-start md:justify-center scrollbar-hide">
            {items.map((item, idx) => (
              <button
                key={idx}
                onClick={() => selectSlide(idx)}
                className={`relative flex-shrink-0 w-14 h-14 md:w-20 md:h-20 rounded-md md:rounded-lg overflow-hidden border-2 transition-all bg-gray-900 group/thumb ${
                  currentIndex === idx ? 'border-brand-coral opacity-100 scale-105' : 'border-transparent opacity-50 hover:opacity-80'
                }`}
              >
                <img 
                  src={item.type === 'video' ? (item.thumbnail || item.url) : item.url} 
                  alt={`Thumbnail ${idx}`} 
                  loading="lazy"
                  className={`w-full h-full object-cover ${item.type === 'video' && !item.thumbnail ? 'opacity-50' : ''}`} 
                />
                
                {/* Video Indicator on Thumbnail */}
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/thumb:bg-black/40 transition">
                    <PlayCircle size={20} className="text-white drop-shadow-md" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
        
        <div className="text-white/50 text-xs flex items-center gap-2 mt-2">
          <span>{currentIndex + 1} / {items.length}</span>
          {currentItem.type === 'image' && <span className="hidden md:inline">• Passe o mouse para ampliar</span>}
          {currentItem.type === 'video' && <span className="hidden md:inline">• Vídeo (com áudio)</span>}
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;