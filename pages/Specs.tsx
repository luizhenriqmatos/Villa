import React from 'react';

const Specs: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-serif text-brand-blue mb-6">Especificação Técnica do Projeto</h1>
        <p className="mb-6 text-gray-600">Este documento detalha o escopo técnico do sistema Pousada Villa dos Corais, conforme solicitado.</p>

        <section className="mb-8">
          <h2 className="text-xl font-bold border-b pb-2 mb-4 text-gray-800">1. Histórias de Usuário (User Stories)</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
            <li><strong>Como Cliente</strong>, quero ver fotos e descrições das suítes para escolher a melhor opção.</li>
            <li><strong>Como Cliente</strong>, quero verificar a disponibilidade em um calendário para planejar minha viagem.</li>
            <li><strong>Como Cliente</strong>, quero criar uma conta e logar para finalizar minha reserva com segurança.</li>
            <li><strong>Como Cliente</strong>, quero adicionar café da manhã à minha reserva para maior comodidade.</li>
            <li><strong>Como Cliente</strong>, quero receber um e-mail de confirmação imediato.</li>
            <li><strong>Como Administrador</strong>, quero um dashboard financeiro para ver meu faturamento semanal/mensal.</li>
            <li><strong>Como Administrador</strong>, quero alterar o status de um quarto (ex: Manutenção) para bloquear reservas.</li>
            <li><strong>Como Administrador</strong>, quero cancelar reservas mediante confirmação.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold border-b pb-2 mb-4 text-gray-800">2. Sitemap (Fluxo de Navegação)</h2>
          <div className="bg-gray-50 p-4 rounded font-mono text-sm">
            / (Home) <br/>
            ├── /rooms (Listagem de Quartos)<br/>
            │   └── [Modal: Detalhes/Reserva]<br/>
            ├── /login (Autenticação)<br/>
            └── /admin (Área Restrita)<br/>
                ├── /admin (Dashboard)<br/>
                ├── /admin/reservations (Lista de Reservas)<br/>
                └── /admin/rooms (Gestão de Status de Quartos)
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold border-b pb-2 mb-4 text-gray-800">3. Tech Stack Sugerido</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
            <li><strong>Frontend:</strong> React 18+ com TypeScript (SPA rápido e reativo).</li>
            <li><strong>Estilização:</strong> Tailwind CSS (Desenvolvimento rápido, responsivo e leve).</li>
            <li><strong>Ícones:</strong> Lucide React.</li>
            <li><strong>Gráficos:</strong> Recharts (Para o dashboard financeiro).</li>
            <li><strong>Datas:</strong> date-fns (Manipulação leve de datas).</li>
            <li><strong>Hospedagem:</strong> Vercel ou Netlify (Custo zero/baixo para escala inicial).</li>
            <li><strong>IA Integration:</strong> Google Gemini API (Para concierge virtual e atendimento automático).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold border-b pb-2 mb-4 text-gray-800">4. Estrutura de Dados (Simulada)</h2>
          <pre className="bg-gray-800 text-green-400 p-4 rounded text-xs overflow-x-auto">
{`// Tabela Users
{ id: string, email: string, isAdmin: boolean }

// Tabela Rooms
{ 
  id: string, 
  name: string, 
  status: 'Available' | 'Occupied' | 'Maintenance', 
  price: number,
  features: string[] 
}

// Tabela Reservations
{ 
  id: string, 
  userId: string, 
  roomId: string, 
  checkIn: Date, 
  checkOut: Date, 
  totalPrice: number,
  hasBreakfast: boolean,
  status: 'Confirmed' | 'Cancelled' 
}`}
          </pre>
        </section>
      </div>
    </div>
  );
};

export default Specs;