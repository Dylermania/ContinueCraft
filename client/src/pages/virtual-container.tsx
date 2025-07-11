import { Link } from "wouter";
import { ArrowLeft, X, Play, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VirtualContainerScreen() {
  return (
    <div className="min-h-screen p-4 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between pt-8 pb-6">
        <Link href="/emulation-options">
          <a className="w-10 h-10 rounded-full glassmorphism flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-white" />
          </a>
        </Link>
        <h1 className="text-xl font-semibold text-white">Virtual Container</h1>
        <button className="w-10 h-10 rounded-full glassmorphism flex items-center justify-center">
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Container Status */}
      <div className="glassmorphism rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Container Status</h3>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-sm font-medium">Running</span>
          </div>
        </div>
        
        {/* Performance Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400">45%</div>
            <div className="text-sm text-slate-400">CPU</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-violet-400">1.8GB</div>
            <div className="text-sm text-slate-400">RAM</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-400">42 FPS</div>
            <div className="text-sm text-slate-400">Performance</div>
          </div>
        </div>
      </div>

      {/* Virtual Android Desktop */}
      <div className="glassmorphism rounded-2xl p-1 mb-6">
        <div className="bg-slate-900 rounded-xl p-4 min-h-96 relative overflow-hidden">
          {/* Simulated Android desktop with gradient background */}
          <div className="animated-gradient absolute inset-0 opacity-20 rounded-xl" />
          
          {/* Virtual navigation bar */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-slate-800/50 rounded-t-xl flex items-center justify-center">
            <div className="text-white text-sm font-medium">Virtual Android 10</div>
            <div className="absolute right-2 flex space-x-1">
              <div className="w-4 h-1 bg-emerald-400 rounded" />
              <div className="w-4 h-1 bg-emerald-400 rounded" />
              <div className="w-4 h-1 bg-emerald-400 rounded" />
            </div>
          </div>
          
          {/* App icons grid */}
          <div className="pt-12 grid grid-cols-4 gap-6 p-6">
            {/* Genshin Impact app icon */}
            <div className="flex flex-col items-center space-y-2 cursor-pointer transform hover:scale-110 transition-transform duration-200">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold">GI</span>
              </div>
              <span className="text-white text-xs text-center">Genshin Impact</span>
            </div>
            
            {/* Other system apps */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-slate-600 to-slate-700 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="text-white text-xs text-center">Settings</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                </svg>
              </div>
              <span className="text-white text-xs text-center">Files</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="text-white text-xs text-center">Browser</span>
            </div>
          </div>
          
          {/* Virtual Android navigation buttons */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-slate-800/80 rounded-b-xl flex items-center justify-center space-x-8">
            <button className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <button className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm" />
            </button>
            <button className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Container Controls */}
      <div className="grid grid-cols-2 gap-4">
        <Button className="glassmorphism rounded-2xl p-4 flex items-center justify-center space-x-3 hover:bg-white/5 transition-colors duration-300">
          <Play className="w-5 h-5 text-emerald-400" />
          <span className="text-white font-medium">Launch App</span>
        </Button>
        
        <Link href="/">
          <Button className="glassmorphism rounded-2xl p-4 flex items-center justify-center space-x-3 hover:bg-white/5 transition-colors duration-300">
            <LogOut className="w-5 h-5 text-red-400" />
            <span className="text-white font-medium">Exit VM</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
