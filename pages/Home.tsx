import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wifi, Tv, Coffee, Shield, Sunset, Droplets } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Immersive Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?q=80&w=2070&auto=format&fit=crop" 
            alt="Villa dos Corais - Vista Mar" 
            className="w-full h-full object-cover transition-transform duration-[20s] hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-brand-sand/90"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in-up">
          <span className="text-white text-lg md:text-xl font-light tracking-[0.2em] uppercase mb-4 block text-shadow">Bem-vindo a Subaúma</span>
          <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-6 drop-shadow-xl leading-tight">
            Villa dos <br/><span className="italic text-brand-light">Corais</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 font-light tracking-wide max-w-2xl mx-auto font-serif">
            Onde a natureza encontra o conforto rústico. <br/>A 100m da areia, 100% de paz.
          </p>
          <Link 
            to="/rooms" 
            className="group bg-brand-coral/90 hover:bg-brand-coral text-white font-bold py-4 px-10 rounded-full transition-all shadow-xl hover:shadow-2xl text-lg inline-flex items-center gap-3 backdrop-blur-sm"
          >
            Reservar Minha Estadia 
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Intro Section - Rustic Chic Vibe */}
      <section className="py-24 bg-brand-sand">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-serif text-brand-blue mb-6">Um Refúgio na Linha Verde</h2>
            <div className="w-24 h-1 bg-brand-coral mx-auto rounded-full"></div>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed font-light mb-12">
            Imagine acordar com o som das ondas e o canto dos pássaros. Nossa pousada foi desenhada para integrar 
            a beleza natural da Bahia com o conforto que você merece. Com apenas <strong className="text-brand-coral">4 suítes exclusivas</strong>, 
            garantimos privacidade, silêncio e um atendimento personalizado.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center p-4 bg-white/50 rounded-xl hover:bg-white transition shadow-sm">
              <Droplets className="text-brand-green mb-3" size={32} />
              <span className="font-serif font-bold text-brand-blue">Cachoeiras</span>
              <span className="text-xs text-gray-500 uppercase tracking-widest mt-1">Região Rica</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/50 rounded-xl hover:bg-white transition shadow-sm">
              <Sunset className="text-brand-coral mb-3" size={32} />
              <span className="font-serif font-bold text-brand-blue">Pé na Areia</span>
              <span className="text-xs text-gray-500 uppercase tracking-widest mt-1">100m da Praia</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/50 rounded-xl hover:bg-white transition shadow-sm">
              <Shield className="text-brand-blue mb-3" size={32} />
              <span className="font-serif font-bold text-brand-blue">Segurança</span>
              <span className="text-xs text-gray-500 uppercase tracking-widest mt-1">Monitoramento 24h</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/50 rounded-xl hover:bg-white transition shadow-sm">
              <Wifi className="text-brand-blue mb-3" size={32} />
              <span className="font-serif font-bold text-brand-blue">Conexão</span>
              <span className="text-xs text-gray-500 uppercase tracking-widest mt-1">Wi-Fi Grátis</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Room Teaser */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 relative">
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 z-10 rounded shadow-lg">
                <span className="text-brand-blue font-serif font-bold tracking-widest uppercase text-xs">Acomodação Premium</span>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop" 
                alt="Suíte Família" 
                className="rounded-lg shadow-2xl object-cover h-[500px] w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-brand-light p-6 rounded-lg shadow-xl hidden md:block">
                <p className="font-serif text-3xl font-bold text-brand-blue">Suíte Família</p>
                <p className="text-sm text-brand-blue/80">Cozinha privativa & Espaço amplo</p>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-10">
              <h3 className="text-4xl font-serif text-brand-blue mb-6">Conforto para todos</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Nossa Suíte Família é ideal para quem busca autonomia. Com cozinha completa e amplo espaço, 
                você sente-se em casa enquanto aproveita o paraíso. Temos também suítes perfeitas para casais 
                em busca de romance.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-brand-coral rounded-full"></div>
                  Decoração Rústico-Chic
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-brand-coral rounded-full"></div>
                  Roupa de cama de algodão egípcio
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-brand-coral rounded-full"></div>
                  Varandas privativas (em unidades selecionadas)
                </li>
              </ul>
              <Link to="/rooms" className="text-brand-coral font-bold uppercase tracking-widest text-sm hover:underline">
                Ver todas as suítes
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;