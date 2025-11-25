import React from 'react';
import { Instagram, Facebook, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-auto">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-serif text-white mb-4">Pousada Villa dos Corais</h3>
          <p className="text-sm">Seu refúgio na Linha Verde. Natureza, conforto e segurança em um só lugar.</p>
        </div>
        <div>
          <h4 className="text-lg font-bold text-white mb-4">Contato</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Phone size={16}/> (71) 99999-9999</li>
            <li className="flex items-center gap-2"><Mail size={16}/> reservas@villadoscorais.com.br</li>
            <li>Subaúma, Bahia - Brasil</li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold text-white mb-4">Redes Sociais</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-brand-coral transition"><Instagram /></a>
            <a href="#" className="hover:text-brand-coral transition"><Facebook /></a>
          </div>
        </div>
      </div>
      <div className="text-center mt-10 text-xs border-t border-gray-700 pt-4">
        © 2024 Pousada Villa dos Corais. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;