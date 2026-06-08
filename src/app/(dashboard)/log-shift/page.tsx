"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function LogShiftPage() {
  const userConfig = {
    currency: 'BRL',
    activePlatforms: ['Uber', '99']
  };

  const isImperial = userConfig.currency === 'USD';
  const distanceUnit = isImperial ? 'mi' : 'km';
  const currencySymbol = isImperial ? '$' : 'R$';

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    startKm: '',
    endKm: '',
    fuelExpense: '',
    otherExpenses: '',
    intensity: 'moderate', // 'smooth' | 'moderate' | 'heavy'
    safety: 'safe',        // 'safe' | 'alert'
    notes: ''
  });

  const [platformEarnings, setPlatformEarnings] = useState<Record<string, string>>(
    userConfig.activePlatforms.reduce((acc, platform) => ({ ...acc, [platform]: '' }), {})
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleEarningChange = (platform: string, value: string) => {
    setPlatformEarnings(prev => ({ ...prev, [platform]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const totalEarnings = Object.values(platformEarnings).reduce((sum, val) => sum + (Number(val) || 0), 0);
    const distanceTraveled = (Number(formData.endKm) || 0) - (Number(formData.startKm) || 0);
    const totalExpenses = (Number(formData.fuelExpense) || 0) + (Number(formData.otherExpenses) || 0);

    const payload = {
      date: formData.date,
      distance: distanceTraveled,
      distanceUnit,
      earningsByPlatform: platformEarnings,
      totalEarnings,
      totalExpenses,
      intensity: formData.intensity,
      safety: formData.safety,
      notes: formData.notes
    };

    setTimeout(() => {
      console.log("Shift Data Saved with Strava-like metrics:", payload);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6 antialiased font-sans">
      
      <div className="w-full max-w-xl mb-8 text-center sm:text-left">
        <h1 className="text-[44px] leading-[1.1] font-bold tracking-tight text-zinc-950">
          Audit your day.
        </h1>
      </div>

      <div className="w-full max-w-xl bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm flex flex-col space-y-6">
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950">
            Log Today's Shift
          </h2>
          <p className="text-base text-zinc-500 font-medium">
            Record your mileage, earnings, and day perception metrics.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Shift Date */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-900 ml-1">Shift Date</label>
            <input
              type="date"
              required
              className="w-full h-12 bg-white border border-zinc-200 text-zinc-950 rounded-xl px-4 text-base focus:outline-none focus:border-zinc-950 transition-all"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          {/* Mileage Tracking */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 pb-2">
              Mileage Tracking ({distanceUnit})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 ml-1">Start Odometer</label>
                <input
                  type="number"
                  required
                  placeholder="0"
                  className="w-full h-12 bg-white border border-zinc-200 text-zinc-950 rounded-xl px-4 text-base focus:outline-none focus:border-zinc-950"
                  value={formData.startKm}
                  onChange={(e) => setFormData({ ...formData, startKm: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 ml-1">End Odometer</label>
                <input
                  type="number"
                  required
                  placeholder="0"
                  className="w-full h-12 bg-white border border-zinc-200 text-zinc-950 rounded-xl px-4 text-base focus:outline-none focus:border-zinc-950"
                  value={formData.endKm}
                  onChange={(e) => setFormData({ ...formData, endKm: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* NOVO BLOCO: PERCEPÇÃO DO TURNO (ESTILO STRAVA) */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 pb-2">
              Shift Perception (Strava Style)
            </h3>
            
            {/* Intensidade de Tráfego */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 ml-1">Traffic & Intensity</label>
              <div className="grid grid-cols-3 gap-2 bg-zinc-50 p-1 rounded-xl border border-zinc-200">
                {(['smooth', 'moderate', 'heavy'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    className={`h-10 rounded-lg text-sm font-bold capitalize transition-all ${formData.intensity === mode ? 'bg-zinc-950 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-900'}`}
                    onClick={() => setFormData({ ...formData, intensity: mode })}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Percepção de Segurança */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 ml-1">Safety Environment</label>
              <div className="grid grid-cols-2 gap-2 bg-zinc-50 p-1 rounded-xl border border-zinc-200">
                {(['safe', 'alert'] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    className={`h-10 rounded-lg text-sm font-bold capitalize transition-all ${formData.safety === status ? 'bg-zinc-950 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-900'}`}
                    onClick={() => setFormData({ ...formData, safety: status })}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Gross Earnings */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 pb-2">
              Gross Earnings ({currencySymbol})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {userConfig.activePlatforms.map((platform) => (
                <div key={platform} className="space-y-2">
                  <label className="text-sm font-bold text-zinc-900 ml-1">{platform}</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-base font-bold text-zinc-400">
                      {currencySymbol}
                    </div>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="w-full h-12 bg-white border border-zinc-200 text-zinc-950 rounded-xl pl-12 pr-4 text-base focus:outline-none focus:border-zinc-950"
                      value={platformEarnings[platform] || ''}
                      onChange={(e) => handleEarningChange(platform, e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Expenses */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 pb-2">
              Daily Expenses ({currencySymbol})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 ml-1">Fuel Cost</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-base font-bold text-zinc-400">
                    {currencySymbol}
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="w-full h-12 bg-white border border-zinc-200 text-zinc-950 rounded-xl pl-12 pr-4 text-base focus:outline-none focus:border-zinc-950"
                    value={formData.fuelExpense}
                    onChange={(e) => setFormData({ ...formData, fuelExpense: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 ml-1">Other Costs</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-base font-bold text-zinc-400">
                    {currencySymbol}
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="w-full h-12 bg-white border border-zinc-200 text-zinc-950 rounded-xl pl-12 pr-4 text-base focus:outline-none focus:border-zinc-950"
                    value={formData.otherExpenses}
                    onChange={(e) => setFormData({ ...formData, otherExpenses: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-900 ml-1">Notes</label>
            <textarea
              rows={2}
              placeholder="Optional observations..."
              className="w-full bg-white border border-zinc-200 text-zinc-950 rounded-xl p-4 text-base focus:outline-none focus:border-zinc-950 resize-none transition-all"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-[2] h-[52px] bg-zinc-950 hover:bg-zinc-800 text-white transition-all rounded-xl font-bold text-base shadow-sm disabled:opacity-50"
            >
              {isLoading ? "Processing..." : "Save Shift Data & Update Margins"}
            </button>
            
            <Link 
              href="/dashboard"
              className="flex-1 h-[52px] bg-white border-2 border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:border-zinc-400 transition-all rounded-xl font-bold text-base flex items-center justify-center"
            >
              Cancel
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}