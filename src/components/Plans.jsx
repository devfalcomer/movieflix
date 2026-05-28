import React from 'react';
import { ArrowLeft, Check, Sparkles, Shield, Zap } from 'lucide-react';

export default function Plans({ currentPlan, onSelectPlan, onClose }) {
  const plansList = [
    {
      id: 'Bronze',
      name: 'Plano Bronze',
      price: 'R$ 19,90',
      icon: <Shield className="text-amber-600" size={28} />,
      features: ['Acesso a 1 tela', 'Qualidade SD (480p)', 'Com anúncios mínimos'],
      color: 'border-amber-600/30 hover:border-amber-500/60'
    },
    {
      id: 'Prata',
      name: 'Plano Prata',
      price: 'R$ 34,90',
      icon: <Zap className="text-slate-400" size={28} />,
      features: ['Acesso a 2 telas simultâneas', 'Qualidade Full HD (1080p)', 'Sem anúncios'],
      color: 'border-slate-400/30 hover:border-slate-300/60'
    },
    {
      id: 'Premium',
      name: 'Plano Premium',
      price: 'R$ 49,90',
      icon: <Sparkles className="text-cyan-400" size={28} />,
      features: ['Acesso a 4 telas simultâneas', 'Qualidade Ultra HD (4K + HDR)', 'Sem anúncios + Downloads'],
      color: 'border-cyan-500/30 hover:border-cyan-400/60'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto bg-[#0d091f]/60 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl animate-fadeIn">
      {/* Cabeçalho */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onClose}
          className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">Planos de Assinatura</h2>
          <p className="text-gray-400 text-xs mt-0.5">Escolha o plano ideal para a sua maratona</p>
        </div>
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plansList.map((plan) => {
          const isCurrent = currentPlan === plan.id || (!currentPlan && plan.id === 'Premium');
          
          return (
            <div 
              key={plan.id}
              className={`relative flex flex-col justify-between p-6 rounded-2xl bg-[#060213]/80 border-2 transition-all duration-300 ${plan.color} ${
                isCurrent ? 'border-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.15)] bg-[#0c0722]' : ''
              }`}
            >
              {isCurrent && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-slate-950 font-black text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full shadow-md">
                  Seu Plano
                </span>
              )}

              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 bg-white/5 rounded-xl border border-white/5">
                    {plan.icon}
                  </div>
                  <span className="text-2xl font-black text-white">{plan.price}<span className="text-xs text-gray-400 font-normal">/mês</span></span>
                </div>

                <h3 className="text-lg font-bold text-white mb-4">{plan.name}</h3>

                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                      <Check size={14} className="text-cyan-400 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                disabled={isCurrent}
                onClick={() => onSelectPlan(plan.id)}
                className={`w-full py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                  isCurrent 
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20'
                }`}
              >
                {isCurrent ? 'Plano Ativo' : 'Selecionar'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}