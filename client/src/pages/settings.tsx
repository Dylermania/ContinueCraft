import { Link } from "wouter";
import { ArrowLeft, Moon, Sun, Globe, Shield, Trash2, Info, Download } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/contexts/theme-provider";

export default function SettingsScreen() {
  const { theme, setTheme } = useTheme();
  const [dataPermissions, setDataPermissions] = useState(true);
  const [developerMode, setDeveloperMode] = useState(false);
  const [language, setLanguage] = useState("en");

  const handleThemeToggle = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  const handleClearCache = () => {
    localStorage.clear();
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          caches.delete(name);
        });
      });
    }
  };

  return (
    <div className="min-h-screen p-4 pb-20 bg-background dark:bg-background">
      {/* Header */}
      <div className="flex items-center justify-between pt-8 pb-6">
        <Link href="/my-apps">
          <a className="w-10 h-10 rounded-full glassmorphism flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </a>
        </Link>
        <h1 className="text-xl font-semibold text-foreground">Settings</h1>
        <div className="w-10" />
      </div>

      {/* Install App Section */}
      <div className="glassmorphism rounded-2xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Install App</h3>
        <div className="space-y-4">
          <Link href="/download-guide">
            <a className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-400/20 hover:border-blue-400/40 transition-colors">
              <div className="flex items-center space-x-3">
                <Download className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-foreground font-medium">Install CompatHub</p>
                  <p className="text-muted-foreground text-sm">Add to home screen like a native app</p>
                </div>
              </div>
              <ArrowLeft className="w-4 h-4 text-muted-foreground rotate-180" />
            </a>
          </Link>
        </div>
      </div>

      {/* Appearance Settings */}
      <div className="glassmorphism rounded-2xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Appearance</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {theme === "dark" ? (
                <Moon className="w-5 h-5 text-indigo-400" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
              <div>
                <p className="text-foreground font-medium">Dark Mode</p>
                <p className="text-muted-foreground text-sm">Use dark theme interface</p>
              </div>
            </div>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={handleThemeToggle}
            />
          </div>
        </div>
      </div>

      {/* Language Settings */}
      <div className="glassmorphism rounded-2xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Language & Region</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Globe className="w-5 h-5 text-emerald-400" />
            <div>
              <p className="text-foreground font-medium">Language</p>
              <p className="text-muted-foreground text-sm">Choose your preferred language</p>
            </div>
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="zh">中文</option>
            <option value="ja">日本語</option>
          </select>
        </div>
      </div>

      {/* Privacy & Data */}
      <div className="glassmorphism rounded-2xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Privacy & Data</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-cyan-400" />
              <div>
                <p className="text-foreground font-medium">Data Collection</p>
                <p className="text-muted-foreground text-sm">Allow analytics and crash reports</p>
              </div>
            </div>
            <Switch
              checked={dataPermissions}
              onCheckedChange={setDataPermissions}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Info className="w-5 h-5 text-violet-400" />
              <div>
                <p className="text-foreground font-medium">Developer Mode</p>
                <p className="text-muted-foreground text-sm">Show advanced diagnostics</p>
              </div>
            </div>
            <Switch
              checked={developerMode}
              onCheckedChange={setDeveloperMode}
            />
          </div>
        </div>
      </div>

      {/* Storage & Cache */}
      <div className="glassmorphism rounded-2xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Storage & Cache</h3>
        <div className="space-y-4">
          <div className="p-4 bg-slate-800/30 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-foreground font-medium">App Cache</span>
              <span className="text-muted-foreground text-sm">~2.4 MB</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-foreground font-medium">Device Data</span>
              <span className="text-muted-foreground text-sm">~156 KB</span>
            </div>
            <Button
              onClick={handleClearCache}
              className="w-full bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-colors duration-300"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All Data
            </Button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="glassmorphism rounded-2xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">About CompatHub</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Version</span>
            <span className="text-foreground font-mono">1.0.0</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Build</span>
            <span className="text-foreground font-mono">2024.01.11</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Platform</span>
            <span className="text-foreground">Progressive Web App</span>
          </div>
        </div>
      </div>

      {/* Developer Info (only shown if developer mode is on) */}
      {developerMode && (
        <div className="glassmorphism rounded-2xl p-6 mb-6 border border-violet-500/30">
          <h3 className="text-lg font-semibold text-violet-400 mb-4">Developer Information</h3>
          <div className="space-y-2 text-sm font-mono">
            <div className="flex justify-between">
              <span className="text-muted-foreground">User Agent:</span>
              <span className="text-foreground text-xs">{navigator.userAgent.slice(0, 30)}...</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Platform:</span>
              <span className="text-foreground">{navigator.platform}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Language:</span>
              <span className="text-foreground">{navigator.language}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Online:</span>
              <span className="text-foreground">{navigator.onLine ? 'Yes' : 'No'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Screen:</span>
              <span className="text-foreground">{window.screen.width}x{window.screen.height}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}