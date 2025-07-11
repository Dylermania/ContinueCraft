import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@/contexts/theme-provider";

import SplashScreen from "@/pages/splash";
import HomeScreen from "@/pages/home";
import ScanDeviceScreen from "@/pages/scan-device";
import AppSelectorScreen from "@/pages/app-selector";
import CompatibilityResultsScreen from "@/pages/compatibility-results";
import EmulationOptionsScreen from "@/pages/emulation-options";
import VirtualContainerScreen from "@/pages/virtual-container";
import MyAppsScreen from "@/pages/my-apps";
import SettingsScreen from "@/pages/settings";
import DownloadGuideScreen from "@/pages/download-guide";
import BottomNav from "@/components/bottom-nav";
import InstallPrompt from "@/components/install-prompt";
import NotFound from "@/pages/not-found";
import DownloadAPK from "@/pages/download-apk";

function Router() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="min-h-screen gradient-bg">
      <Switch>
        <Route path="/" component={HomeScreen} />
        <Route path="/scan-device" component={ScanDeviceScreen} />
        <Route path="/app-selector" component={AppSelectorScreen} />
        <Route path="/compatibility-results" component={CompatibilityResultsScreen} />
        <Route path="/emulation-options" component={EmulationOptionsScreen} />
        <Route path="/virtual-container" component={VirtualContainerScreen} />
        <Route path="/my-apps" component={MyAppsScreen} />
        <Route path="/settings" component={SettingsScreen} />
        <Route path="/download-guide" component={DownloadGuideScreen} />
        <Route path="/download-apk" component={DownloadAPK} />
        <Route component={NotFound} />
      </Switch>
      <BottomNav />
      <InstallPrompt />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;