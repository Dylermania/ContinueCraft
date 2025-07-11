import { Link } from "wouter";
import { ArrowLeft, Settings, Bookmark, FileText } from "lucide-react";

export default function MyAppsScreen() {
  return (
    <div className="min-h-screen p-4 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between pt-8 pb-6">
        <Link href="/">
          <a className="w-10 h-10 rounded-full glassmorphism flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-white" />
          </a>
        </Link>
        <h1 className="text-xl font-semibold text-white">My Apps</h1>
        <Link href="/settings">
          <a className="w-10 h-10 rounded-full glassmorphism flex items-center justify-center">
            <Settings className="w-5 h-5 text-white" />
          </a>
        </Link>
      </div>

      {/* Profile Section */}
      <div className="glassmorphism rounded-2xl p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center justify-center">
            <span className="text-white font-bold text-xl">N</span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white">Nathan</h2>
            <p className="text-slate-400">nathan@example.com</p>
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-sm text-slate-400">Device Score:</span>
              <span className="text-lg font-semibold text-indigo-400">72</span>
            </div>
          </div>
        </div>
      </div>

      {/* Device Info */}
      <div className="glassmorphism rounded-2xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">My Device</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-400">Model:</span>
            <p className="text-white font-mono">Samsung Galaxy A50</p>
          </div>
          <div>
            <span className="text-slate-400">Android:</span>
            <p className="text-white font-mono">10 (API 29)</p>
          </div>
          <div>
            <span className="text-slate-400">RAM:</span>
            <p className="text-white font-mono">2.5 GB</p>
          </div>
          <div>
            <span className="text-slate-400">CPU:</span>
            <p className="text-white font-mono">Snapdragon 450</p>
          </div>
        </div>
      </div>

      {/* App History */}
      <div className="glassmorphism rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Recent Checks</h3>
          <span className="text-sm text-slate-400">31 apps tested</span>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-slate-800/30 rounded-xl">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
              <span className="text-white font-bold">COD</span>
            </div>
            <div className="flex-1">
              <h4 className="text-white font-medium">Call of Duty Mobile</h4>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-emerald-400 text-sm">✅ Compatible</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400 text-xs">2 hours ago</span>
              </div>
            </div>
            <button className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-slate-800/30 rounded-xl">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <span className="text-white font-bold">GI</span>
            </div>
            <div className="flex-1">
              <h4 className="text-white font-medium">Genshin Impact</h4>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-red-400 text-sm">❌ Needs optimization</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400 text-xs">1 day ago</span>
              </div>
            </div>
            <button className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-slate-800/30 rounded-xl">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
              <span className="text-white font-bold">PG</span>
            </div>
            <div className="flex-1">
              <h4 className="text-white font-medium">PUBG Mobile</h4>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-emerald-400 text-sm">✅ Compatible</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400 text-xs">3 days ago</span>
              </div>
            </div>
            <button className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Saved Fixes */}
      <div className="glassmorphism rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Saved Fixes</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-slate-800/30 rounded-lg">
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
              <Bookmark className="w-4 h-4 text-violet-400" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">Low-spec Genshin Settings</p>
              <p className="text-slate-400 text-sm">Graphics optimization guide</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-slate-800/30 rounded-lg">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <FileText className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">RAM Optimization Script</p>
              <p className="text-slate-400 text-sm">Background process killer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
