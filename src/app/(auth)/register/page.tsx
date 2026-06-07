"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    isDriver: false,
    isRider: false,
    currency: 'BRL'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      console.log("Block 1 - Registration Complete with Dropdown Currency:", formData);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6 antialiased font-sans">
      
      {/* Prismic Style Impact Header */}
      <div className="w-full max-w-[480px] mb-10 text-center sm:text-left">
        <h1 className="text-[44px] leading-[1.1] font-bold tracking-tight text-zinc-950">
          Start your 7-day free trial.
        </h1>
      </div>

      {/* Registration Card with Border */}
      <div className="w-full max-w-[480px] bg-white border border-zinc-200 rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col space-y-8">
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950">
            Create your account
          </h2>
          <p className="text-base text-zinc-500 font-medium">
            Enter your initial details to set up your financial ledger.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* First and Last Name Side by Side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 ml-1">First Name</label>
              <input
                type="text"
                required
                placeholder="e.g., John"
                className="w-full h-12 bg-white border border-zinc-200 text-zinc-950 rounded-xl px-4 py-2 text-base transition-all focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 ml-1">Last Name</label>
              <input
                type="text"
                required
                placeholder="e.g., Smith"
                className="w-full h-12 bg-white border border-zinc-200 text-zinc-950 rounded-xl px-4 py-2 text-base transition-all focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-900 ml-1">Work Email</label>
            <input
              type="email"
              required
              placeholder="name@example.com"
              className="w-full h-12 bg-white border border-zinc-200 text-zinc-950 rounded-xl px-4 py-2 text-base transition-all focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {/* Operational Activity - Minimalist Checkboxes */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-900 ml-1">Operational Activity</label>
            <div className="flex flex-col sm:flex-row gap-4 p-4 bg-zinc-50 border border-zinc-100 rounded-xl">
              <label className="flex items-center gap-3 cursor-pointer select-none text-zinc-700 font-medium text-sm">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-zinc-950 rounded border-zinc-300 text-zinc-950 focus:ring-zinc-950"
                  checked={formData.isDriver}
                  onChange={(e) => setFormData({...formData, isDriver: e.target.checked})}
                />
                <span>Driver</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer select-none text-zinc-700 font-medium text-sm">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-zinc-950 rounded border-zinc-300 text-zinc-950 focus:ring-zinc-950"
                  checked={formData.isRider}
                  onChange={(e) => setFormData({...formData, isRider: e.target.checked})}
                />
                <span>Rider</span>
              </label>
            </div>
          </div>

          {/* Currency Selection - Input List / Dropdown Component */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-900 ml-1">Ledger Currency</label>
            <div className="relative">
              <select
                value={formData.currency}
                onChange={(e) => setFormData({...formData, currency: e.target.value})}
                className="w-full h-12 bg-white border border-zinc-200 text-zinc-950 rounded-xl px-4 py-2 text-base appearance-none transition-all focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 cursor-pointer"
              >
                <option value="BRL">Brazilian Real (BRL - R$)</option>
                <option value="USD">United States Dollar (USD - $)</option>
                <option value="EUR">Euro (EUR - €)</option>
              </select>
              {/* Custom Chevron Icon */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-zinc-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Password fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 ml-1">Password</label>
              <input
                type="password"
                required
                placeholder="Minimum 8 characters"
                className="w-full h-12 bg-white border border-zinc-200 text-zinc-950 rounded-xl px-4 py-2 text-base transition-all focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 ml-1">Confirm Password</label>
              <input
                type="password"
                required
                placeholder="Re-enter your password"
                className="w-full h-12 bg-white border border-zinc-200 text-zinc-950 rounded-xl px-4 py-2 text-base transition-all focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>
          </div>

          {/* Button Group */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-[2] h-[52px] bg-zinc-950 hover:bg-zinc-800 text-white transition-all rounded-xl font-bold text-base shadow-sm disabled:opacity-50"
            >
              {isLoading ? "Processing..." : "Register & Continue &rarr;"}
            </button>
            
            <Link 
              href="/login"
              className="flex-1 h-[52px] bg-white border-2 border-zinc-950 text-zinc-950 hover:bg-zinc-50 transition-all rounded-xl font-bold text-base flex items-center justify-center"
            >
              Sign in
            </Link>
          </div>
        </form>

        {/* Informational Footer */}
        <div className="pt-6 text-center border-t border-zinc-100">
          <p className="text-xs text-zinc-400 leading-relaxed">
            Gig platforms (Uber, 99, etc.) will be configured in the next onboarding step.
          </p>
        </div>

      </div>
    </div>
  );
}