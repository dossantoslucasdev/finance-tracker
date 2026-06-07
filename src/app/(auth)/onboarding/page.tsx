"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function OnboardingPage() {
  const userProfile = {
    currency: 'BRL',
    isDriver: true,
    isRider: true
  };

  const isImperial = userProfile.currency === 'USD';
  const fuelUnit = isImperial ? 'MPG' : 'Km/L';

  const [vehicleData, setVehicleData] = useState({
    make: '',
    model: '',
    officialEfficiency: '',
    realEfficiency: '',
  });

  // Estados para as plataformas tradicionais
  const [selectedCarPlatforms, setSelectedCarPlatforms] = useState<string[]>([]);
  const [selectedBikePlatforms, setSelectedBikePlatforms] = useState<string[]>([]);
  
  // Estados para controle do "Other"
  const [hasOtherCar, setHasOtherCar] = useState(false);
  const [customCarPlatform, setCustomCarPlatform] = useState('');
  
  const [hasOtherBike, setHasOtherBike] = useState(false);
  const [customBikePlatform, setCustomBikePlatform] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const carPlatformsList = ['Uber', '99', 'InDrive', 'Wappa'];
  const bikePlatformsList = ['iFood', 'Rappi', 'Uber Flash', '99 Moto', 'Lalamove'];

  const handleCarPlatformChange = (platform: string) => {
    setSelectedCarPlatforms(prev =>
      prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]
    );
  };

  const handleBikePlatformChange = (platform: string) => {
    setSelectedBikePlatforms(prev =>
      prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Consolida os arrays tradicionais com os inputs customizados, se existirem
    const finalCarPlatforms = [...selectedCarPlatforms];
    if (hasOtherCar && customCarPlatform.trim()) {
      finalCarPlatforms.push(customCarPlatform.trim());
    }

    const finalBikePlatforms = [...selectedBikePlatforms];
    if (hasOtherBike && customBikePlatform.trim()) {
      finalBikePlatforms.push(customBikePlatform.trim());
    }

    const payload = {
      ...vehicleData,
      carPlatforms: finalCarPlatforms,
      bikePlatforms: finalBikePlatforms
    };

    setTimeout(() => {
      console.log("Block 2 - Onboarding Saved with Custom Platforms:", payload);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6 antialiased font-sans">
      
      <div className="w-full max-w-[540px] mb-10 text-center sm:text-left">
        <h1 className="text-[44px] leading-[1.1] font-bold tracking-tight text-zinc-950">
          Setup your operation.
        </h1>
      </div>

      <div className="w-full max-w-[540px] bg-white border border-zinc-200 rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col space-y-8">
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950">
            Vehicle & Platforms
          </h2>
          <p className="text-base text-zinc-500 font-medium">
            Configure your metrics to allow precise financial audit processing.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* SEÇÃO 1: VEÍCULO */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 pb-2">
              Primary Vehicle Details
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 ml-1">Make / Brand</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Toyota, Honda"
                  className="w-full h-12 bg-white border border-zinc-200 text-zinc-950 rounded-xl px-4 py-2 text-base transition-all focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
                  value={vehicleData.make}
                  onChange={(e) => setVehicleData({...vehicleData, make: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 ml-1">Model</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Corolla, Civic"
                  className="w-full h-12 bg-white border border-zinc-200 text-zinc-950 rounded-xl px-4 py-2 text-base transition-all focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
                  value={vehicleData.model}
                  onChange={(e) => setVehicleData({...vehicleData, model: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 ml-1">Official Efficiency ({fuelUnit})</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="Inmetro rating"
                    className="w-full h-12 bg-white border border-zinc-200 text-zinc-950 rounded-xl pl-4 pr-16 text-base transition-all focus:outline-none focus:border-emerald-500"
                    value={vehicleData.officialEfficiency}
                    onChange={(e) => setVehicleData({...vehicleData, officialEfficiency: e.target.value})}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-xs font-bold text-zinc-400">
                    {fuelUnit}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 ml-1">Real Street Efficiency ({fuelUnit})</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="Actual average"
                    className="w-full h-12 bg-white border border-zinc-200 text-zinc-950 rounded-xl pl-4 pr-16 text-base transition-all focus:outline-none focus:border-emerald-500"
                    value={vehicleData.realEfficiency}
                    onChange={(e) => setVehicleData({...vehicleData, realEfficiency: e.target.value})}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-xs font-bold text-zinc-400">
                    {fuelUnit}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SEÇÃO 2: PLATAFORMAS */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 pb-2">
              Active Gig Platforms
            </h3>

            {/* Car Apps */}
            {userProfile.isDriver && (
              <div className="space-y-3">
                <label className="text-sm font-bold text-zinc-900 block">Car Applications</label>
                <div className="grid grid-cols-2 gap-3">
                  {carPlatformsList.map((platform) => (
                    <label 
                      key={platform} 
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer select-none transition-all ${selectedCarPlatforms.includes(platform) ? 'border-zinc-950 bg-zinc-50' : 'border-zinc-100 hover:border-zinc-200'}`}
                    >
                      <input
                        type="checkbox"
                        className="w-5 h-5 accent-zinc-950 rounded border-zinc-300 text-zinc-950 focus:ring-zinc-950"
                        checked={selectedCarPlatforms.includes(platform)}
                        onChange={() => handleCarPlatformChange(platform)}
                      />
                      <span className="text-sm font-semibold text-zinc-800">{platform}</span>
                    </label>
                  ))}
                  
                  {/* Option Other for Car */}
                  <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer select-none transition-all ${hasOtherCar ? 'border-zinc-950 bg-zinc-50' : 'border-zinc-100 hover:border-zinc-200'}`}>
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-zinc-950 rounded border-zinc-300 text-zinc-950 focus:ring-zinc-950"
                      checked={hasOtherCar}
                      onChange={(e) => setHasOtherCar(e.target.checked)}
                    />
                    <span className="text-sm font-semibold text-zinc-800">Other</span>
                  </label>
                </div>

                {/* Conditional Custom Input for Car */}
                {hasOtherCar && (
                  <div className="space-y-1.5 pt-1 animate-fadeIn">
                    <input
                      type="text"
                      required
                      placeholder="Enter platform name"
                      className="w-full h-11 bg-white border border-zinc-900 text-zinc-950 rounded-xl px-4 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-950"
                      value={customCarPlatform}
                      onChange={(e) => setCustomCarPlatform(e.target.value)}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Motorcycle Apps */}
            {userProfile.isRider && (
              <div className="space-y-3 pt-2">
                <label className="text-sm font-bold text-zinc-900 block">Motorcycle Applications</label>
                <div className="grid grid-cols-2 gap-3">
                  {bikePlatformsList.map((platform) => (
                    <label 
                      key={platform} 
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer select-none transition-all ${selectedBikePlatforms.includes(platform) ? 'border-zinc-950 bg-zinc-50' : 'border-zinc-100 hover:border-zinc-200'}`}
                    >
                      <input
                        type="checkbox"
                        className="w-5 h-5 accent-zinc-950 rounded border-zinc-300 text-zinc-950 focus:ring-zinc-950"
                        checked={selectedBikePlatforms.includes(platform)}
                        onChange={() => handleBikePlatformChange(platform)}
                      />
                      <span className="text-sm font-semibold text-zinc-800">{platform}</span>
                    </label>
                  ))}

                  {/* Option Other for Bike */}
                  <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer select-none transition-all ${hasOtherBike ? 'border-zinc-950 bg-zinc-50' : 'border-zinc-100 hover:border-zinc-200'}`}>
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-zinc-950 rounded border-zinc-300 text-zinc-950 focus:ring-zinc-950"
                      checked={hasOtherBike}
                      onChange={(e) => setHasOtherBike(e.target.checked)}
                    />
                    <span className="text-sm font-semibold text-zinc-800">Other</span>
                  </label>
                </div>

                {/* Conditional Custom Input for Bike */}
                {hasOtherBike && (
                  <div className="space-y-1.5 pt-1">
                    <input
                      type="text"
                      required
                      placeholder="Enter app name (e.g., Local Delivery)"
                      className="w-full h-11 bg-white border border-zinc-900 text-zinc-950 rounded-xl px-4 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-950"
                      value={customBikePlatform}
                      onChange={(e) => setCustomBikePlatform(e.target.value)}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-[2] h-[52px] bg-zinc-950 hover:bg-zinc-800 text-white transition-all rounded-xl font-bold text-base shadow-sm disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Complete Setup & Launch Dashboard"}
            </button>
            
            <Link 
              href="/register"
              className="flex-1 h-[52px] bg-white border-2 border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:border-zinc-400 transition-all rounded-xl font-bold text-base flex items-center justify-center"
            >
              Back
            </Link>
          </div>
        </form>

      </div>
    </div>
  );
}