import { Link, useLocation } from "wouter";
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

export default function CompatibilityResultsScreen() {
  const [location] = useLocation();
  const urlParams = new URLSearchParams(location.split('?')[1]);
  const appId = urlParams.get('appId');

  const { data: app } = useQuery({
    queryKey: [`/api/apps/${appId}`],
    enabled: !!appId,
  });

  const { data: compatibilityResult } = useQuery({
    queryKey: [`/api/compatibility/check`],
    enabled: !!appId && !!app,
  });

  if (!app) {
    return (
      <div className="min-h-screen p-4 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-2">Loading...</h2>
          <p className="text-slate-400">Analyzing compatibility</p>
        </div>
      </div>
    );
  }

  const isCompatible = Math.random() > 0.5; // Mock compatibility for demo
  const compatibilityScore = Math.floor(Math.random() * 40) + 30; // 30-70 range

  return (
    <div className="min-h-screen p-4 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between pt-8 pb-6">
        <Link href="/app-selector">
          <div className="w-10 h-10 rounded-full glassmorphism flex items-center justify-center cursor-pointer">
            <ArrowLeft className="w-5 h-5 text-white" />
          </div>
        </Link>
        <h1 className="text-xl font-semibold text-white">Compatibility Check</h1>
        <div className="w-10" />
      </div>

      {/* App Header */}
      <div className="glassmorphism rounded-2xl p-6 mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${getAppIconGradient(app.name)}`}>
            <span className="text-white font-bold text-lg">{app.icon}</span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white">{app.name}</h2>
            <p className="text-slate-400">{app.developer}</p>
          </div>
        </div>
        
        {/* Compatibility Status */}
        <div className={`${isCompatible ? 'bg-emerald-500/20 border-emerald-500/30' : 'bg-red-500/20 border-red-500/30'} border rounded-xl p-4 mb-4`}>
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-full ${isCompatible ? 'bg-emerald-500' : 'bg-red-500'} flex items-center justify-center`}>
              {isCompatible ? (
                <CheckCircle className="w-5 h-5 text-white" />
              ) : (
                <XCircle className="w-5 h-5 text-white" />
              )}
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${isCompatible ? 'text-emerald-400' : 'text-red-400'}`}>
                {isCompatible ? 'Compatible' : 'Not Compatible'}
              </h3>
              <p className={`text-sm ${isCompatible ? 'text-emerald-300' : 'text-red-300'}`}>
                {isCompatible ? 'Your device meets requirements' : "Your device doesn't meet minimum requirements"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Comparison */}
      <div className="glassmorphism rounded-2xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Requirements vs Your Device</h3>
        <div className="space-y-4">
          <ComparisonItem
            label="RAM"
            required={app.minRam || "4GB"}
            actual="2.5GB"
            status="insufficient"
          />
          <ComparisonItem
            label="OS Version"
            required={app.minAndroidVersion || "Android 7.0+"}
            actual="Android 10"
            status="compatible"
          />
          <ComparisonItem
            label="CPU"
            required={app.minCpu || "Snapdragon 660+"}
            actual="Snapdragon 450"
            status="below"
          />
          <ComparisonItem
            label="Storage"
            required={app.minStorage || "15GB"}
            actual="42GB free"
            status="compatible"
          />
        </div>
      </div>

      {/* Suggestions */}
      <div className="glassmorphism rounded-2xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Suggested Solutions</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-4 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl hover:bg-indigo-500/20 transition-colors duration-300 cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-white font-medium">Try {app.name} Lite</h4>
              <p className="text-slate-400 text-sm">Optimized version for lower-end devices</p>
            </div>
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

          <Link href="/emulation-options">
            <Button className="w-full flex items-center space-x-4 p-4 bg-violet-500/10 border border-violet-500/20 rounded-xl hover:bg-violet-500/20 transition-colors duration-300">
              <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div className="flex-1 text-left">
                <h4 className="text-white font-medium">Run in Virtual Environment</h4>
                <p className="text-slate-400 text-sm">Use CompatHub's emulation layer</p>
              </div>
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </Link>

          <div className="flex items-center space-x-4 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl hover:bg-cyan-500/20 transition-colors duration-300 cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-white font-medium">Performance Tweaks</h4>
              <p className="text-slate-400 text-sm">Optimize graphics settings and RAM usage</p>
            </div>
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function ComparisonItem({ label, required, actual, status }: {
  label: string;
  required: string;
  actual: string;
  status: 'compatible' | 'insufficient' | 'below';
}) {
  const getStatusIcon = () => {
    switch (status) {
      case 'compatible':
        return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      case 'insufficient':
        return <XCircle className="w-4 h-4 text-red-400" />;
      case 'below':
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'compatible':
        return <span className="text-emerald-400 text-sm">✅ Compatible</span>;
      case 'insufficient':
        return <span className="text-red-400 text-sm">❌ Insufficient</span>;
      case 'below':
        return <span className="text-yellow-400 text-sm">⚠️ Below minimum</span>;
    }
  };

  const getTextColor = () => {
    switch (status) {
      case 'compatible':
        return 'text-emerald-400';
      case 'insufficient':
        return 'text-red-400';
      case 'below':
        return 'text-yellow-400';
    }
  };

  return (
    <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-lg">
      <div>
        <p className="text-white font-medium">{label}</p>
        <p className="text-slate-400 text-sm">Required: {required}</p>
      </div>
      <div className="text-right">
        <p className={`font-mono ${getTextColor()}`}>{actual}</p>
        {getStatusText()}
      </div>
    </div>
  );
}

function getAppIconGradient(appName: string) {
  const gradients = {
    "Call of Duty Mobile": "bg-gradient-to-r from-orange-500 to-red-500",
    "Genshin Impact": "bg-gradient-to-r from-blue-500 to-purple-500",
    "PUBG Mobile": "bg-gradient-to-r from-yellow-500 to-orange-500",
    "Among Us": "bg-gradient-to-r from-red-500 to-pink-500",
  };
  return gradients[appName as keyof typeof gradients] || "bg-gradient-to-r from-slate-500 to-slate-600";
}
