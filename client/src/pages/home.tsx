import React from 'react';
import { Link, useLocation } from 'wouter';
import { CheckCircle, XCircle, Smartphone, Search, Archive, Download, ChevronRight, Package, Monitor, Zap, Gamepad2 } from "lucide-react";

export default function HomeScreen() {
  const [, setLocation] = useLocation();

  const navigate = (path: string) => {
    setLocation(path);
  };

  return (
    <div className="min-h-screen p-4 pb-20">
      {/* Header */}
      <div className="pt-8 pb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Hello Nathan 👋</h2>
            <p className="text-slate-400">Ready to test an app?</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center justify-center">
            <span className="text-white font-semibold">N</span>
          </div>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="glassmorphism rounded-2xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Compatible</p>
              <p className="text-lg font-semibold text-white">24</p>
            </div>
          </div>
        </div>

        <div className="glassmorphism rounded-2xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Needs Fix</p>
              <p className="text-lg font-semibold text-white">7</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Action Buttons */}
      <div className="space-y-4 mb-8">
        <div
              onClick={() => navigate('/scan-device')}
              className="w-full glassmorphism rounded-2xl p-6 flex items-center space-x-4 hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
            >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-lg font-semibold text-white">Scan Device</h3>
              <p className="text-slate-400">Check your phone's specifications</p>
            </div>
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

        <div
              onClick={() => navigate('/app-selector')}
              className="w-full glassmorphism rounded-2xl p-6 flex items-center space-x-4 hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 flex items-center justify-center">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-lg font-semibold text-white">Check App</h3>
              <p className="text-slate-400">Test compatibility for any app</p>
            </div>
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

        <div
              onClick={() => navigate('/my-apps')}
              className="w-full glassmorphism rounded-2xl p-6 flex items-center space-x-4 hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
            >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 flex items-center justify-center">
              <Archive className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-lg font-semibold text-white">My Apps</h3>
              <p className="text-slate-400">View previously tested apps</p>
            </div>
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
      </div>

      {/* Recent Activity */}
      <div className="glassmorphism rounded-2xl p-6 mb-6">
          <Link href="/download-apk">
            <div className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 cursor-pointer hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center">
                <Download className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">Download APK</h3>
                <p className="text-emerald-400 text-sm">Install CompatHub on Android</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </Link>
        </div>

        <div className="glassmorphism rounded-2xl p-6 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
              <p className="text-slate-400">Get started with CompatHub</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Link href="/app-selector">
              <div className="bg-slate-800/50 rounded-xl p-4 text-center cursor-pointer hover:bg-slate-700/50 transition-colors duration-300">
                <Package className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <span className="text-white text-sm font-medium">Select App</span>
              </div>
            </Link>
            <Link href="/virtual-container">
              <div className="bg-slate-800/50 rounded-xl p-4 text-center cursor-pointer hover:bg-slate-700/50 transition-colors duration-300">
                <Monitor className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                <span className="text-white text-sm font-medium">Virtual Run</span>
              </div>
            </Link>
          </div>
        </div>
      <div className="glassmorphism rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">MW</span>
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">Call of Duty Mobile</p>
              <p className="text-sm text-emerald-400">✅ Compatible</p>
            </div>
            <p className="text-xs text-slate-500">2h ago</p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">GI</span>
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">Genshin Impact</p>
              <p className="text-sm text-red-400">❌ Needs optimization</p>
            </div>
            <p className="text-xs text-slate-500">1d ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}