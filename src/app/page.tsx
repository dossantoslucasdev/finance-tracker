
//import React from 'react';
import Link from 'next/link';
export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col justify-center items-center p-4 font-sans antialiased">
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(24,24,27,0.8),rgba(9,9,11,1))]" />

      <div className="relative z-10 max-w-2xl text-center space-y-6 px-4">
        {/* Badge Indicator */}
        <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-400 border border-zinc-800">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Production Ready Analytics
        </span>

        {/* Main Headline (Your Official Slogan) */}
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-b from-zinc-50 to-zinc-400 bg-clip-text text-transparent">
          Smart expense control for ride-hailing drivers
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg text-zinc-400 max-w-lg mx-auto leading-relaxed">
          Take absolute control of your net profit. Track operational costs, fuel efficiency, and revenue across all major platforms in real-time.
        </p>

       {/* Updated Call to Action (CTA) Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link 
            href="/login" 
            className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-zinc-950 bg-zinc-50 hover:bg-zinc-200 rounded-lg transition-colors text-center shadow-md"
          >
            Sign In
          </Link>
          
          <Link 
            href="/plans" 
            className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-zinc-400 hover:text-zinc-200 bg-zinc-900/50 hover:bg-zinc-900 rounded-lg border border-zinc-800 transition-colors text-center"
          >
            View Plans
          </Link>
        </div>
      </div>
    </div>
  );
}
