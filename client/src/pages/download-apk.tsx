
import { Download, Smartphone, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DownloadAPK() {
  return (
    <div className="min-h-screen p-4 pb-20">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center">
            <Smartphone className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Download CompatHub APK</h1>
          <p className="text-slate-400">Install CompatHub directly on your Android device</p>
        </div>

        <div className="glassmorphism rounded-2xl p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span className="text-white font-medium">APK Ready for Download</span>
          </div>
          
          <div className="space-y-3 text-sm text-slate-400 mb-6">
            <div className="flex justify-between">
              <span>Version:</span>
              <span className="text-white">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span>Size:</span>
              <span className="text-white">~8MB</span>
            </div>
            <div className="flex justify-between">
              <span>Min Android:</span>
              <span className="text-white">5.0 (API 21)</span>
            </div>
          </div>

          <a href="/CompatHub.apk" download="CompatHub.apk">
            <Button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity duration-300">
              <Download className="w-5 h-5 mr-2" />
              Download APK
            </Button>
          </a>
        </div>

        <div className="glassmorphism rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Installation Instructions</h3>
          <div className="space-y-3 text-sm text-slate-400">
            <div className="flex space-x-3">
              <span className="bg-emerald-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">1</span>
              <span>Enable "Unknown Sources" in Android Settings → Security</span>
            </div>
            <div className="flex space-x-3">
              <span className="bg-emerald-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">2</span>
              <span>Download the APK file above</span>
            </div>
            <div className="flex space-x-3">
              <span className="bg-emerald-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">3</span>
              <span>Tap the downloaded file and select "Install"</span>
            </div>
            <div className="flex space-x-3">
              <span className="bg-emerald-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">4</span>
              <span>Open CompatHub from your app drawer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
