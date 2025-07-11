
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Smartphone, Wifi, Battery, HardDrive, Cpu, Info, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeviceDetection } from "@/hooks/use-device-detection";

export default function ScanDeviceScreen() {
  const [isScanning, setIsScanning] = useState(true);
  const [scanProgress, setScanProgress] = useState(0);
  const deviceInfo = useDeviceDetection();

  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          setIsScanning(false);
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const getDeviceSpecs = () => ({
    model: deviceInfo.deviceType || "Unknown Device",
    os: deviceInfo.os || "Unknown OS",
    ram: "4GB", // Mock data
    storage: "64GB", // Mock data
    processor: "Snapdragon 855", // Mock data
    battery: "3000mAh", // Mock data
  });

  const specs = getDeviceSpecs();

  return (
    <div className="min-h-screen p-4 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between pt-8 pb-6">
        <Link href="/">
          <div className="w-10 h-10 rounded-full glassmorphism flex items-center justify-center cursor-pointer">
            <ArrowLeft className="w-5 h-5 text-white" />
          </div>
        </Link>
        <h1 className="text-xl font-semibold text-white">Device Scanner</h1>
        <div className="w-10" />
      </div>

      {isScanning ? (
        /* Scanning Animation */
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="relative mb-8">
            <div className="w-32 h-32 border-4 border-slate-700 rounded-full"></div>
            <div className="absolute top-0 left-0 w-32 h-32 border-4 border-emerald-400 rounded-full border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Smartphone className="w-12 h-12 text-emerald-400" />
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold text-white mb-2">Scanning Device</h2>
          <p className="text-slate-400 mb-6">Analyzing your device specifications...</p>
          
          <div className="w-full max-w-sm">
            <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
              <div 
                className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${scanProgress}%` }}
              ></div>
            </div>
            <p className="text-center text-slate-400 text-sm">{scanProgress}% Complete</p>
          </div>
        </div>
      ) : (
        /* Scan Results */
        <div className="space-y-6">
          <div className="glassmorphism rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Scan Complete</h2>
                <p className="text-emerald-400">Device analyzed successfully</p>
              </div>
            </div>
          </div>

          {/* Device Specifications */}
          <div className="glassmorphism rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Info className="w-5 h-5 mr-2" />
              Device Specifications
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Smartphone className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-300">Model</span>
                </div>
                <span className="text-white font-medium">{specs.model}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Cpu className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-300">Operating System</span>
                </div>
                <span className="text-white font-medium">{specs.os}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <HardDrive className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-300">RAM</span>
                </div>
                <span className="text-white font-medium">{specs.ram}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <HardDrive className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-300">Storage</span>
                </div>
                <span className="text-white font-medium">{specs.storage}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Cpu className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-300">Processor</span>
                </div>
                <span className="text-white font-medium">{specs.processor}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Battery className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-300">Battery</span>
                </div>
                <span className="text-white font-medium">{specs.battery}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link href="/app-selector">
              <Button className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-violet-600 transition-all duration-300">
                Check App Compatibility
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              className="w-full border-slate-600 text-slate-300 py-3 rounded-xl font-medium hover:bg-slate-800 transition-all duration-300"
              onClick={() => {
                setIsScanning(true);
                setScanProgress(0);
              }}
            >
              Scan Again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
