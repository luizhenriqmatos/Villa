import React from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, Users, DollarSign, CalendarCheck } from 'lucide-react';
import { format, subDays } from 'date-fns';

const Dashboard: React.FC = () => {
  const { reservations } = useApp();

  const totalRevenue = reservations.filter(r => r.status === 'confirmed').reduce((acc, curr) => acc + curr.totalPrice, 0);
  const totalBookings = reservations.filter(r => r.status === 'confirmed').length;
  
  const chartData = Array.from({length: 7}, (_, i) => {
    const date = subDays(new Date(), 6 - i);
    const dateStr = format(date, 'dd/MM');
    const dailyRev = reservations
        .filter(r => r.status === 'confirmed' && r.createdAt.startsWith(date.toISOString().split('T')[0]))
        .reduce((acc, curr) => acc + curr.totalPrice, 0);
        
    return {
      name: dateStr,
      vendas: dailyRev + Math.floor(Math.random() * 800) 
    };
  });

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-serif text-brand-blue mb-2">Painel de Controle</h1>
      <p className="text-gray-500 mb-8">Visão geral do desempenho da pousada.</p>

      {/* Stats Cards - Minimalist Design */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          { title: 'Receita Total', value: `R$ ${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-brand-green', bg: 'bg-green-50' },
          { title: 'Reservas Ativas', value: totalBookings, icon: CalendarCheck, color: 'text-brand-blue', bg: 'bg-blue-50' },
          { title: 'Ocupação Média', value: '75%', icon: TrendingUp, color: 'text-brand-coral', bg: 'bg-orange-50' },
          { title: 'Hóspedes Hoje', value: '12', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between hover:shadow-md transition">
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{stat.title}</p>
              <p className="text-3xl font-serif font-bold text-gray-800">{stat.value}</p>
            </div>
            <div className={`${stat.bg} ${stat.color} p-3 rounded-lg`}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-700 mb-6 font-serif">Fluxo de Receita (7 dias)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2A9D8F" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#2A9D8F" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} tickFormatter={(value) => `R$${value}`} />
                <Tooltip 
                  contentStyle={{backgroundColor: '#264653', color: '#fff', borderRadius: '8px', border: 'none'}} 
                  formatter={(value: number) => [`R$ ${value}`, 'Receita']}
                />
                <Area type="monotone" dataKey="vendas" stroke="#2A9D8F" strokeWidth={3} fillOpacity={1} fill="url(#colorVendas)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
             <div className="relative w-48 h-48 mb-6">
                <svg className="w-full h-full transform -rotate-90">
                    <circle cx="96" cy="96" r="88" stroke="#E5E7EB" strokeWidth="12" fill="none" />
                    <circle cx="96" cy="96" r="88" stroke="#E76F51" strokeWidth="12" fill="none" strokeDasharray="552" strokeDashoffset="138" strokeLinecap="round" />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="text-4xl font-bold text-brand-blue font-serif">75%</span>
                </div>
             </div>
             <h3 className="text-lg font-bold text-gray-700 font-serif mb-2">Meta Mensal</h3>
             <p className="text-sm text-gray-500">Estamos próximos de bater a meta de ocupação para este mês.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;