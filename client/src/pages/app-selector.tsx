import { Link } from "wouter";
import { ArrowLeft, Search, Upload } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AppSelectorScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: popularApps = [], isLoading } = useQuery({
    queryKey: ["/api/apps/popular"],
  });

  const { data: searchResults = [] } = useQuery({
    queryKey: ["/api/apps/search", searchQuery],
    enabled: searchQuery.length > 0,
  });

  const appsToShow = searchQuery ? searchResults : popularApps;

  return (
    <div className="min-h-screen p-4 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between pt-8 pb-6">
        <Link href="/scan-device">
          <a className="w-10 h-10 rounded-full glassmorphism flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-white" />
          </a>
        </Link>
        <h1 className="text-xl font-semibold text-white">Select App</h1>
        <div className="w-10" />
      </div>

      {/* Search Bar */}
      <div className="glassmorphism rounded-2xl p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input 
            type="text" 
            placeholder="Search for apps (e.g., COD Mobile)" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-600 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Upload APK Section */}
      <div className="glassmorphism rounded-2xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Upload APK File</h3>
        <div className="border-2 border-dashed border-slate-600 rounded-xl p-8 text-center hover:border-indigo-500 transition-colors duration-300 cursor-pointer">
          <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-white font-medium mb-2">Drop your APK file here</p>
          <p className="text-slate-400 text-sm">or click to browse</p>
          <input type="file" accept=".apk" className="hidden" />
        </div>
      </div>

      {/* Apps List */}
      <div className="glassmorphism rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          {searchQuery ? "Search Results" : "Popular Apps"}
        </h3>

        {isLoading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 p-4 bg-slate-800/30 rounded-xl animate-pulse">
                <div className="w-12 h-12 rounded-xl bg-slate-700" />
                <div className="flex-1">
                  <div className="h-4 bg-slate-700 rounded mb-2" />
                  <div className="h-3 bg-slate-700 rounded w-1/2" />
                </div>
                <div className="w-16 h-8 bg-slate-700 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {appsToShow.map((app: any) => (
              <div key={app.id} className="flex items-center space-x-4 p-4 bg-slate-800/30 rounded-xl hover:bg-slate-800/50 transition-colors duration-300">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getAppIconGradient(app.name)}`}>
                  <span className="text-white font-bold">{app.icon}</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium">{app.name}</h4>
                  <p className="text-slate-400 text-sm">{app.category} • {app.size}</p>
                </div>
                <Link href={`/compatibility-results?appId=${app.id}`}>
                  <div className="bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-600 transition-colors duration-300 cursor-pointer inline-block">
                    Check
                  </div>
                </Link>
              </div>
            ))}

            {appsToShow.length === 0 && searchQuery && (
              <div className="text-center py-8">
                <p className="text-slate-400">No apps found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        )}
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