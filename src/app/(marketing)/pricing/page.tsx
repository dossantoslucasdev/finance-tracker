"use client";

import React from 'react';
import Link from 'next/link';
import { HelpCircle } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      
      {/* Header Section */}
      <div className="text-center max-w-xl mx-auto space-y-4 mb-12">
        <div className="inline-flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          <span className="text-[11px] font-medium text-zinc-400 tracking-wider uppercase">7-Day Free Trial</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100">
          Professional Shift Bookkeeping
        </h1>
        <p className="text-sm text-zinc-400 leading-relaxed">
          Track your real operational expenses, revenue, and net margins right after your shift. Dedicated financial control built specifically for drivers and riders.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        
        {/* CARD 1: MONTHLY PLAN */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-8 relative shadow-xl">
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-zinc-100 tracking-tight">Monthly Plan</h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Flexible financial management billed month-to-month.
                </p>
              </div>
              <span className="bg-zinc-800 text-zinc-400 text-[10px] font-semibold px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0">
                Flexible
              </span>
            </div>
            
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-xs text-zinc-400 font-medium">R$</span>
                <span className="text-4xl font-extrabold tracking-tight text-zinc-50">29.90</span>
                <span className="text-sm text-zinc-500 font-normal">/mo</span>
              </div>
              <p className="text-[11px] text-zinc-500 mt-1">Billed month-to-month</p>
            </div>

            <div className="bg-zinc-950 rounded-xl p-3 border border-zinc-800/60 flex items-start gap-2.5">
              <HelpCircle className="h-4 w-4 text-zinc-500 shrink-0 mt-0.5" />
              <p className="text-[11px] text-zinc-400 leading-normal">
                <span className="text-zinc-200 font-semibold">No Risk:</span> Full platform access for 7 days. Cancel anytime before the trial ends to prevent any charges.
              </p>
            </div>

            <ul className="space-y-3 pt-6 border-t border-zinc-800/60 text-xs text-zinc-300">
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                <span>7-day free trial included</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 shrink-0" />
                <span>Post-shift revenue & mileage logging</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 shrink-0" />
                <span>Variable expense tracking (Fuel, Food)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 shrink-0" />
                <span>Real net income calculation</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 shrink-0" />
                <span>Basic monthly history overview</span>
              </li>
            </ul>
          </div>

          <div className="pt-2">
            <Link 
              href="/register?plan=pro&cycle=monthly" 
              className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-colors rounded-xl font-medium text-sm text-center block tracking-wide"
            >
              Start Monthly Trial
            </Link>
          </div>
        </div>

        {/* CARD 2: ANNUAL PLAN (DIFFERENTIATED) */}
        <div className="bg-zinc-900 border border-blue-500/80 ring-1 ring-blue-500/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-8 relative shadow-2xl">
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-zinc-100 tracking-tight">Annual Plan</h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Long-term financial control with advanced reporting modules.
                </p>
              </div>
              <span className="bg-blue-950 border border-blue-900 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0">
                Save 20%
              </span>
            </div>
            
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-xs text-zinc-400 font-medium">R$</span>
                <span className="text-4xl font-extrabold tracking-tight text-zinc-50">23.90</span>
                <span className="text-sm text-zinc-500 font-normal">/mo</span>
              </div>
              <p className="text-[11px] text-emerald-400 font-medium mt-1 bg-emerald-950/30 border border-emerald-900/30 inline-block px-2 py-0.5 rounded">
                Billed annually: R$ 286,80 / yr
              </p>
            </div>

            <div className="bg-zinc-950 rounded-xl p-3 border border-zinc-800/60 flex items-start gap-2.5">
              <HelpCircle className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-zinc-400 leading-normal">
                <span className="text-zinc-200 font-semibold">Full Lock-In:</span> Includes the same 7-day test window. Charges only trigger on day 8 with full year access unlocked.
              </p>
            </div>

            {/* Lista totalmente modificada para evitar repetição do plano mensal */}
            <ul className="space-y-3 pt-6 border-t border-zinc-800/60 text-xs text-zinc-300">
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                <span>All core post-shift logging modules</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                <span className="text-zinc-100 font-medium">Advanced vehicle depreciation tracking (Km/Year)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                <span>Fixed costs dilution calculation (Insurance, Vehicle Rental, IPVA)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                <span>Data export engine (.CSV / PDF) for personal income tax filing</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                <span>Unlimited historical timeline storage (No 30-day expiration data)</span>
              </li>
            </ul>
          </div>

          <div className="pt-2">
            <Link 
              href="/register?plan=pro&cycle=annual" 
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-zinc-50 transition-colors rounded-xl font-semibold text-sm text-center block shadow-lg shadow-blue-600/10 tracking-wide"
            >
              Start 7-Day Free Trial
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}