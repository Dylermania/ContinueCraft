export default function SplashScreen() {
  return (
    <div className="fixed inset-0 z-50 gradient-bg flex items-center justify-center">
      <div className="text-center space-y-6 animate-slide-up">
        {/* App Logo with animated pulse effect */}
        <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center justify-center animate-pulse-glow">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-2">CompatHub</h1>
        <p className="text-xl text-slate-300 mb-8">"Run what your phone says you can't."</p>
        
        {/* Loading Progress */}
        <div className="w-64 h-2 bg-slate-700 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full animate-pulse w-3/4" />
        </div>
        <p className="text-sm text-slate-400 mt-4">Loading compatibility engine...</p>
      </div>
      
      {/* Floating particles background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-indigo-400 rounded-full animate-float opacity-30" />
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-violet-400 rounded-full animate-float opacity-20" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-cyan-400 rounded-full animate-float opacity-40" style={{ animationDelay: '4s' }} />
      </div>
    </div>
  );
}
