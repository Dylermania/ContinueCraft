import { Link } from "wouter";
import { ArrowLeft, AlertTriangle, Monitor, Settings, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmulationOptionsScreen() {
  return (
    <div className="min-h-screen p-4 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between pt-8 pb-6">
        <Link href="/compatibility-results">
          <a className="w-10 h-10 rounded-full glassmorphism flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-white" />
          </a>
        </Link>
        <h1 className="text-xl font-semibold text-white">Emulation Options</h1>
        <div className="w-10" />
      </div>

      {/* Warning Notice */}
      <div className="glassmorphism rounded-2xl p-6 mb-6 border border-yellow-500/30">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center mt-1">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
          </div>
          <div>
            <h3 className="text-yellow-400 font-semibold mb-1">Performance Notice</h3>
            <p className="text-slate-300 text-sm">Some apps may still experience reduced performance or compatibility issues even with emulation. Results may vary.</p>
          </div>
        </div>
      </div>

      {/* Emulation Options */}
      <div className="space-y-4">
        {/* Virtual Machine Option */}
        <Link href="/virtual-container">
          <Button className="w-full glassmorphism rounded-2xl p-6 text-left hover:bg-white/5 transition-all duration-300 transform hover:scale-[1.02]">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center justify-center">
                <Monitor className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">Virtual Container</h3>
                <p className="text-slate-400">Run app in isolated Android environment</p>
              </div>
              <div className="text-emerald-400 text-sm font-medium">Recommended</div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-400">Performance:</span>
                <span className="text-yellow-400 ml-2">75%</span>
              </div>
              <div>
                <span className="text-slate-400">Compatibility:</span>
                <span className="text-emerald-400 ml-2">High</span>
              </div>
            </div>
          </Button>
        </Link>

        {/* APK Patching Option */}
        <div className="glassmorphism rounded-2xl p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">Patch APK</h3>
              <p className="text-slate-400">Modify app manifest for compatibility</p>
            </div>
            <div className="text-yellow-400 text-sm font-medium">Advanced</div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <span className="text-slate-400">Performance:</span>
              <span className="text-emerald-400 ml-2">95%</span>
            </div>
            <div>
              <span className="text-slate-400">Success Rate:</span>
              <span className="text-yellow-400 ml-2">60%</span>
            </div>
          </div>
          
          {/* Auto-generated patch preview */}
          <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-sm mb-4">
            <div className="text-slate-400 mb-2">Suggested Manifest Changes:</div>
            <div className="text-cyan-400">- android:minSdkVersion="21" → "19"</div>
            <div className="text-yellow-400">- android:targetSdkVersion="30" → "29"</div>
            <div className="text-emerald-400">+ android:largeHeap="true"</div>
          </div>
          
          <Button className="w-full bg-cyan-500 text-white py-3 rounded-xl font-semibold hover:bg-cyan-600 transition-colors duration-300">
            Apply Patch
          </Button>
        </div>

        {/* Cloud Gaming Option */}
        <div className="glassmorphism rounded-2xl p-6 opacity-60">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 flex items-center justify-center">
              <Cloud className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">Cloud Gaming</h3>
              <p className="text-slate-400">Stream app from powerful cloud servers</p>
            </div>
            <div className="text-slate-500 text-sm font-medium">Coming Soon</div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-400">Performance:</span>
              <span className="text-emerald-400 ml-2">100%</span>
            </div>
            <div>
              <span className="text-slate-400">Latency:</span>
              <span className="text-yellow-400 ml-2">~50ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
