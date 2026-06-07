"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);
    
    // Simulação de Login
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6 antialiased font-sans">
      
      {/* Título Principal Fora do Card - Mantendo o peso visual da referência */}
      <div className="w-full max-w-[440px] mb-12 text-center sm:text-left">
          <h1 className="text-[44px] leading-[1.1] font-bold tracking-tight text-zinc-950">
            Acesse seu controle financeiro.
          </h1>
      </div>

      {/* Container Principal com BORDA (Card de Login) */}
      <div className="w-full max-w-[440px] bg-white border border-zinc-200 rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col space-y-10">
        
        {/* Cabeçalho do Card */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950">
            Entrar no Painel
          </h2>
          <p className="text-base text-zinc-500 font-medium leading-relaxed">
            Acesse seu livro de jornada. Registre ganhos e despesas em minutos.
          </p>
        </div>

        {/* Formulário de Login */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo de Email */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-900 ml-1">Endereço de E-mail</label>
            <input
              type="email"
              required
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nome@exemplo.com"
              className="w-full h-12 bg-white border border-zinc-200 text-zinc-950 rounded-xl px-4 py-2 text-base transition-all focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 disabled:opacity-50"
            />
          </div>

          {/* Campo de Senha */}
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-sm font-bold text-zinc-900">Senha</label>
              <Link 
                href="/forgot-password" 
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                Esqueceu sua senha?
              </Link>
            </div>
            <input
              type="password"
              required
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-12 bg-white border border-zinc-200 text-zinc-950 rounded-xl px-4 py-2 text-base transition-all focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 disabled:opacity-50"
            />
          </div>

          {/* Grupo de Botões (Baseado no Layout da Imagem) */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            {/* Botão Preto Sólido (Principal) */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 h-[52px] bg-zinc-950 hover:bg-zinc-800 text-white transition-all rounded-xl font-bold text-base shadow-sm disabled:opacity-50"
            >
              {isLoading ? "Entrando..." : "Entrar agora"}
            </button>
            
            {/* Botão Branco com Borda (Secundário) */}
            <Link 
              href="/pricing"
              className="flex-1 h-[52px] bg-white border-2 border-zinc-950 text-zinc-950 hover:bg-zinc-50 transition-all rounded-xl font-bold text-base flex items-center justify-center text-center"
            >
              Criar conta
            </Link>
          </div>
        </form>

        {/* Rodapé minimalista do Card */}
        <div className="pt-6 text-center border-t border-zinc-100 mt-6">
            <p className="text-sm text-zinc-400">
                Acesso dedicado para motoristas e motociclistas. 7 dias grátis para teste.
            </p>
        </div>

      </div>
    </div>
  );
}