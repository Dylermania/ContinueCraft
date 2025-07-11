import { Link } from "wouter";
import { ArrowLeft, Download, Smartphone, Monitor, Chrome, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DownloadGuideScreen() {
  const handleInstallPWA = () => {
    // Show browser's install prompt if available
    if ('serviceWorker' in navigator) {
      // The actual install will be handled by the browser's PWA install prompt
      window.dispatchEvent(new Event('beforeinstallprompt'));
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/settings">
          <a className="w-10 h-10 rounded-full glassmorphism flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-white dark:text-white" />
          </a>
        </Link>
        <h1 className="text-xl font-semibold text-foreground">Install CompatHub</h1>
        <div className="w-10 h-10" />
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* What is this section */}
        <div className="glassmorphism rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Download className="w-6 h-6 text-blue-400" />
            <h2 className="text-lg font-semibold text-foreground">What is CompatHub?</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            CompatHub is a Progressive Web App (PWA) that works like a native mobile app. 
            You can install it on your device for faster access and offline capabilities.
          </p>
          <div className="flex items-center space-x-2">
            <Wifi className="w-4 h-4 text-green-400" />
            <span className="text-sm text-muted-foreground">Works offline once installed</span>
          </div>
        </div>

        {/* Installation Steps for Mobile */}
        <div className="glassmorphism rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Smartphone className="w-6 h-6 text-purple-400" />
            <h2 className="text-lg font-semibold text-foreground">Install as Mobile App</h2>
          </div>
          
          <div className="bg-blue-500/10 border border-blue-400/20 rounded-xl p-4 mb-4">
            <p className="text-blue-400 font-medium mb-2">🧪 Testing Mode</p>
            <p className="text-sm text-blue-300">
              This is a Progressive Web App (PWA) that works like a native mobile app. Perfect for testing compatibility features offline!
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-medium text-foreground">Android (Chrome/Edge):</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground ml-4">
                <li>Tap the menu button (⋮) in your browser</li>
                <li>Select "Add to Home screen" or "Install app"</li>
                <li>Confirm the installation</li>
                <li>CompatHub will appear on your home screen like any other app</li>
              </ol>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-foreground">iPhone (Safari):</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground ml-4">
                <li>Tap the Share button (□↗) at the bottom</li>
                <li>Scroll down and tap "Add to Home Screen"</li>
                <li>Name the app and tap "Add"</li>
                <li>CompatHub will appear on your home screen</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Installation Steps for Desktop */}
        <div className="glassmorphism rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Monitor className="w-6 h-6 text-cyan-400" />
            <h2 className="text-lg font-semibold text-foreground">Install on Desktop</h2>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-medium text-foreground">Chrome/Edge/Brave:</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground ml-4">
                <li>Look for the install icon (⊕) in the address bar</li>
                <li>Click the install icon or go to Settings → Install CompatHub</li>
                <li>Click "Install" in the popup</li>
                <li>CompatHub will open as a standalone app</li>
              </ol>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-foreground">Firefox:</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground ml-4">
                <li>Click the menu button (☰)</li>
                <li>Select "Install this site as an app"</li>
                <li>Choose installation options and click "Install"</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="glassmorphism rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Benefits of Installing</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-muted-foreground">Faster app loading</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-sm text-muted-foreground">Works offline</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-sm text-muted-foreground">Push notifications</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span className="text-sm text-muted-foreground">Native app experience</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <span className="text-sm text-muted-foreground">Home screen icon</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <span className="text-sm text-muted-foreground">Automatic updates</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center pt-4">
          <Button
            onClick={handleInstallPWA}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3"
          >
            <Download className="w-5 h-5 mr-2" />
            Try to Install Now
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            If the button doesn't work, follow the manual steps above
          </p>
        </div>
      </div>
    </div>
  );
}