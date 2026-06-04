"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DollarSign, 
  TrendingUp, 
  ShieldAlert, 
  Clock, 
  Car, 
  Fuel,
  Key,
  CreditCard,
  FileText,
  Layers,
  Utensils,
  ShieldCheck,
  Calculator,
  CheckCircle2,
  XCircle,
  HelpCircle
} from "lucide-react";

type PeriodType = 'day' | 'week' | 'month' | 'year';

const TARGET_PROFIT_GOAL = 600.00; 
const PLANNED_WORKING_DAYS = 5;

const dataset: Record<PeriodType, any> = {
  day: {
    metrics: { grossRevenue: 180.00, operationalCosts: 65.20, netProfit: 114.80, earningPerHour: 22.50 },
    logistics: { totalMileage: 90, productiveMileage: 70, deadMileage: 20, fuelEfficiency: 12.8 },
    detailedCosts: [
      { label: "Fuel", amount: 35.00, icon: Fuel, type: "Variable" },
      { label: "Food", amount: 20.00, icon: Utensils, type: "Variable" },
      { label: "Car Rental", amount: 0.00, icon: Key, type: "Fixed" },
      { label: "Financing", amount: 0.00, icon: CreditCard, type: "Fixed" },
      { label: "Insurance", amount: 6.20, icon: ShieldCheck, type: "Fixed" },
      { label: "IPVA / DPVAT", amount: 4.00, icon: FileText, type: "Fixed" },
    ],
    platformEarnings: [
      { platform: "Uber", amount: 120.00, share: "66.7%" },
      { platform: "99App", amount: 45.00, share: "25.0%" },
      { platform: "InDrive", amount: 15.00, share: "8.3%" },
    ]
  },
  week: {
    metrics: { grossRevenue: 1450.00, operationalCosts: 620.50, netProfit: 829.50, earningPerHour: 32.22 },
    logistics: { totalMileage: 420, productiveMileage: 320, deadMileage: 100, fuelEfficiency: 13.2 },
    detailedCosts: [
      { label: "Fuel", amount: 280.00, icon: Fuel, type: "Variable" },
      { label: "Food", amount: 120.00, icon: Utensils, type: "Variable" },
      { label: "Car Rental", amount: 150.00, icon: Key, type: "Fixed" },
      { label: "Financing", amount: 0.00, icon: CreditCard, type: "Fixed" },
      { label: "Insurance", amount: 43.40, icon: ShieldCheck, type: "Fixed" },
      { label: "IPVA / DPVAT", amount: 27.10, icon: FileText, type: "Fixed" },
    ],
    platformEarnings: [
      { platform: "Uber", amount: 950.00, share: "65.5%" },
      { platform: "99App", amount: 380.00, share: "26.2%" },
      { platform: "InDrive", amount: 120.00, share: "8.3%" },
    ]
  },
  month: {
    metrics: { grossRevenue: 6100.00, operationalCosts: 2450.00, netProfit: 3650.00, earningPerHour: 30.50 },
    logistics: { totalMileage: 1850, productiveMileage: 1400, deadMileage: 450, fuelEfficiency: 13.0 },
    detailedCosts: [
      { label: "Fuel", amount: 1150.00, icon: Fuel, type: "Variable" },
      { label: "Food", amount: 480.00, icon: Utensils, type: "Variable" },
      { label: "Car Rental", amount: 600.00, icon: Key, type: "Fixed" },
      { label: "Financing", amount: 0.00, icon: CreditCard, type: "Fixed" },
      { label: "Insurance", amount: 110.00, icon: ShieldCheck, type: "Fixed" },
      { label: "IPVA / DPVAT", amount: 110.00, icon: FileText, type: "Fixed" },
    ],
    platformEarnings: [
      { platform: "Uber", amount: 4100.00, share: "67.2%" },
      { platform: "99App", amount: 1500.00, share: "24.6%" },
      { platform: "InDrive", amount: 500.00, share: "8.2%" },
    ]
  },
  year: {
    metrics: { grossRevenue: 73200.00, operationalCosts: 29400.00, netProfit: 43800.00, earningPerHour: 31.10 },
    logistics: { totalMileage: 22200, productiveMileage: 16800, deadMileage: 5400, fuelEfficiency: 13.1 },
    detailedCosts: [
      { label: "Fuel", amount: 13800.00, icon: Fuel, type: "Variable" },
      { label: "Food", amount: 5760.00, icon: Utensils, type: "Variable" },
      { label: "Car Rental", amount: 7200.00, icon: Key, type: "Fixed" },
      { label: "Financing", amount: 0.00, icon: CreditCard, type: "Fixed" },
      { label: "Insurance", amount: 1320.00, icon: ShieldCheck, type: "Fixed" },
      { label: "IPVA / DPVAT", amount: 1320.00, icon: FileText, type: "Fixed" },
    ],
    platformEarnings: [
      { platform: "Uber", amount: 49200.00, share: "67.2%" },
      { platform: "99App", amount: 18000.00, share: "24.6%" },
      { platform: "InDrive", amount: 6000.00, share: "8.2%" },
    ]
  }
};

// Sub-componente reusable de Tooltip nativo CSS
function InfoTooltip({ text }: { text: string }) {
  return (
    <div className="relative inline-block group/tooltip ml-1.5 cursor-help align-middle">
      <HelpCircle className="h-3.5 w-3.5 text-zinc-500 hover:text-zinc-300 transition-colors" />
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-zinc-900 border border-zinc-800 text-zinc-300 text-[11px] p-2 rounded shadow-xl opacity-0 pointer-events-none group-hover/tooltip:opacity-100 transition-opacity z-50 font-normal normal-case leading-relaxed">
        {text}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-900" />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [period, setPeriod] = useState<PeriodType>('week');
  const currentData = dataset[period];

  const totalKm = currentData.logistics.totalMileage || 1;
  const grossEarnings = currentData.metrics.grossRevenue;
  
  const costPerKm = currentData.metrics.operationalCosts / totalKm;
  const revenuePerKm = grossEarnings / totalKm;
  
  const variableCosts = currentData.detailedCosts
    .filter((c: any) => c.type === "Variable")
    .reduce((sum: number, c: any) => sum + c.amount, 0);
  
  const fixedCosts = currentData.detailedCosts
    .filter((c: any) => c.type === "Fixed")
    .reduce((sum: number, c: any) => sum + c.amount, 0);

  const variableCostPerKm = variableCosts / totalKm;
  const marginPerKm = revenuePerKm - variableCostPerKm;

  const kmToCoverExpenses = marginPerKm > 0 ? fixedCosts / marginPerKm : 0;
  const kmToReachTarget = marginPerKm > 0 ? (fixedCosts + TARGET_PROFIT_GOAL) / marginPerKm : 0;

  const requiredRevenuePerKm = (fixedCosts + TARGET_PROFIT_GOAL + variableCosts) / totalKm;
  const isStrategyCorrect = revenuePerKm >= requiredRevenuePerKm;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 p-4 sm:p-8 space-y-8 font-sans antialiased">
      
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Performance Analytics</h1>
          <p className="text-sm text-zinc-400">Real-time financial control and operational metrics.</p>
        </div>

        <div className="flex bg-zinc-900 p-1 rounded-lg border border-zinc-800">
          {(['day', 'week', 'month', 'year'] as PeriodType[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-colors ${
                period === p 
                  ? 'bg-zinc-800 text-zinc-50 font-semibold' 
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Main Financial KPIs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">
              Gross Revenue
              <InfoTooltip text="Faturamento bruto somando todas as plataformas parceiras antes de qualquer desconto operacional." />
            </CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">${grossEarnings.toFixed(2)}</div>
            <p className="text-xs text-zinc-500 mt-1">Total app earnings</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">
              Operational Costs
              <InfoTooltip text="Soma total das despesas logísticas variáveis (combustível, refeições) e rateio proporcional dos custos fixos do veículo." />
            </CardTitle>
            <ShieldAlert className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">${currentData.metrics.operationalCosts.toFixed(2)}</div>
            <p className="text-xs text-zinc-500 mt-1">Fixed + variable costs</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">
              Net Profit
              <InfoTooltip text="Lucro líquido real. É o valor de caixa que sobra para você após deduzir absolutamente todos os custos operacionais." />
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">${currentData.metrics.netProfit.toFixed(2)}</div>
            <p className="text-xs text-zinc-500 mt-1">Take-home liquid revenue</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">
              Hourly Earning
              <InfoTooltip text="Média bruta faturada por hora calculada estritamente com base no tempo em que você permaneceu online nos apps." />
            </CardTitle>
            <Clock className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">${currentData.metrics.earningPerHour.toFixed(2)}/h</div>
            <p className="text-xs text-zinc-500 mt-1">Based on online time</p>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Row: Detailed Costs vs Platform Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Detailed Costs Card */}
        <Card className="bg-zinc-900 border-zinc-800 flex flex-col justify-between">
          <CardHeader className="flex flex-row items-center justify-between border-b border-zinc-800/50 pb-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2 text-white">
              <ShieldAlert className="h-5 w-5 text-orange-500" />
              Detailed Cost Breakdown
            </CardTitle>
            <span className="text-xs text-zinc-500">Itemized expenses</span>
          </CardHeader>
          <CardContent className="divide-y divide-zinc-800/60 pt-4 flex-1">
            {currentData.detailedCosts.map((cost: any, idx: number) => {
              const IconComponent = cost.icon;
              return (
                <div key={idx} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-zinc-950 rounded-lg border border-zinc-800">
                      <IconComponent className="h-4 w-4 text-zinc-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-200">{cost.label}</p>
                      <p className="text-xs text-zinc-500">{cost.type}</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-zinc-300">${cost.amount.toFixed(2)}</p>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Platform Breakdown Card */}
        <Card className="bg-zinc-900 border-zinc-800 flex flex-col justify-between">
          <CardHeader className="flex flex-row items-center justify-between border-b border-zinc-800/50 pb-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2 text-white">
              <Layers className="h-5 w-5 text-emerald-500" />
              Platform Distribution
            </CardTitle>
            <span className="text-xs text-zinc-500">Gross revenue share</span>
          </CardHeader>
          <CardContent className="divide-y divide-zinc-800/60 pt-4 flex-1">
            {currentData.platformEarnings.map((item: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div className="space-y-1 flex-1 pr-4">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-zinc-200">{item.platform}</span>
                    <span className="font-semibold text-emerald-500">${item.amount.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-zinc-950 h-1.5 rounded-full overflow-hidden border border-zinc-800">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: item.share }} />
                  </div>
                </div>
                <span className="text-xs font-mono text-zinc-500 bg-zinc-950 px-2 py-1 rounded border border-zinc-800">
                  {item.share}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>

      {/* Logistics & Efficiency */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2 text-white">
            <Car className="h-5 w-5 text-zinc-400" />
            Logistics & Mileage Efficiency
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-zinc-400">Total Mileage Driven</span>
                <span className="font-semibold text-zinc-200">{totalKm} km</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-zinc-400">
                <span>
                  Productive Mileage (With Passenger)
                  <InfoTooltip text="Quilometragem rodada restritamente com passageiro a bordo ou em deslocamento direto para coleta." />
                </span>
                <span className="text-emerald-400 font-medium">
                  {currentData.logistics.productiveMileage} km ({Math.round((currentData.logistics.productiveMileage / totalKm) * 100)}%)
                </span>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(currentData.logistics.productiveMileage / totalKm) * 100}%` }} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-zinc-400">
                <span>
                  Dead Mileage (Cruising Empty)
                  <InfoTooltip text="Famoso 'km morto'. Distância percorrida com o veículo vazio procurando chamadas ou retornando para zonas de alta demanda." />
                </span>
                <span className="text-orange-400 font-medium">
                  {currentData.logistics.deadMileage} km ({Math.round((currentData.logistics.deadMileage / totalKm) * 100)}%)
                </span>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full rounded-full" style={{ width: `${(currentData.logistics.deadMileage / totalKm) * 100}%` }} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 h-fit my-auto">
            <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-800 text-center">
              <p className="text-xs text-zinc-500">Fuel Efficiency</p>
              <p className="text-lg font-bold text-zinc-200 mt-1">{currentData.logistics.fuelEfficiency} km/L</p>
            </div>
            <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-800 text-center">
              <p className="text-xs text-zinc-500">
                Cost per Kilometer
                <InfoTooltip text="Quanto custa cada quilômetro que o seu carro se desloca, independente de ter passageiro ou não." />
              </p>
              <p className="text-lg font-bold text-zinc-200 mt-1">${costPerKm.toFixed(2)}/km</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* GIGU & DSW Intelligence Card */}
      <Card className="bg-zinc-900 border-zinc-800 border-l-4 border-l-blue-500">
        <CardHeader className="flex flex-row items-center justify-between border-b border-zinc-800/50 pb-4">
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-blue-500" />
            <CardTitle className="text-lg font-semibold text-white"> Operational Intelligence</CardTitle>
          </div>
          <span className="text-xs font-mono text-blue-400 bg-blue-950/40 px-2 py-1 rounded border border-blue-900/50">Target Engine v1.2</span>
        </CardHeader>
        <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          
          <div className="bg-zinc-950/40 p-4 rounded-xl border border-zinc-800/60 flex flex-col justify-between">
            <div>
              <p className="text-xs font-medium text-zinc-500">
                Effective Pay Rate
                <InfoTooltip text="Sua média real recebida por quilômetro rodado total. Crucial para auditar a qualidade das corridas aceitas." />
              </p>
              <p className="text-2xl font-bold text-zinc-100 mt-1">${revenuePerKm.toFixed(2)}<span className="text-xs text-zinc-500">/km</span></p>
              <div className="mt-2 flex items-center gap-1">
                {isStrategyCorrect ? (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    <span className="text-[10px] text-emerald-400 font-medium">Good Acceptance</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-3.5 w-3.5 text-rose-500" />
                    <span className="text-[10px] text-rose-400 font-medium">Accepting Cheap Rides</span>
                  </>
                )}
              </div>
            </div>
            <p className="text-[11px] text-zinc-500 mt-2">Calculated from total distance ({totalKm} km) and gross earnings (${grossEarnings.toFixed(0)}).</p>
          </div>

          <div className="bg-zinc-950/40 p-4 rounded-xl border border-zinc-800/60">
            <p className="text-xs font-medium text-zinc-500">
              Real Cost per KM
              <InfoTooltip text="Custo real rodado. Se o seu Effective Pay Rate for menor que este valor, você está pagando para trabalhar." />
            </p>
            <p className="text-2xl font-bold text-orange-400 mt-1">${costPerKm.toFixed(2)}<span className="text-xs text-zinc-500">/km</span></p>
            <p className="text-[11px] text-zinc-500 mt-2">Includes both fuel burn and structural vehicle depreciation.</p>
          </div>

          <div className="bg-zinc-950/40 p-4 rounded-xl border border-zinc-800/60">
            <p className="text-xs font-medium text-zinc-500">
              Min Pay Rate Required
              <InfoTooltip text="O valor médio por quilômetro mínimo que você precisa aceitar no painel do app para bater a meta de lucro estipulada." />
            </p>
            <p className="text-2xl font-bold text-yellow-500 mt-1">${requiredRevenuePerKm.toFixed(2)}<span className="text-xs text-zinc-500">/km</span></p>
            <p className="text-[11px] text-zinc-500 mt-2">Target average needed to clear costs and reach your net goal.</p>
          </div>

          <div className="bg-zinc-950/40 p-4 rounded-xl border border-zinc-800/60">
            <p className="text-xs font-medium text-zinc-500">
              Break-Even Mileage
              <InfoTooltip text="Mínimo absoluto de quilômetros a rodar no período para zerar as contas fixas e variáveis. A partir daqui entra o lucro." />
            </p>
            <p className="text-2xl font-bold text-zinc-200 mt-1">{Math.ceil(kmToCoverExpenses)} <span className="text-xs text-zinc-500">km</span></p>
            <p className="text-[11px] text-zinc-500 mt-2">Minimum mileage required purely to clear structural operation debts.</p>
          </div>

          <div className="bg-zinc-950 p-4 rounded-xl border border-blue-900/40 bg-gradient-to-br from-zinc-950 to-blue-950/20">
            <p className="text-xs font-medium text-blue-400">
              Target Success Mileage
              <InfoTooltip text="Distância total exata necessária para atingir sua meta líquida de ganhos com base na sua eficiência atual." />
            </p>
            <p className="text-2xl font-bold text-blue-400 mt-1">{Math.ceil(kmToReachTarget)} <span className="text-xs text-zinc-500">km</span></p>
            <p className="text-[11px] text-blue-400/70 mt-2">Distance to net profit goal of ${TARGET_PROFIT_GOAL.toFixed(0)}: <span className="font-semibold">~{Math.ceil(kmToReachTarget / PLANNED_WORKING_DAYS)} km/day</span>.</p>
          </div>

        </CardContent>
      </Card>

    </div>
  );
}