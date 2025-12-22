
import React, { useState } from 'react';
import { School, Info, Sparkles, MapPin, Navigation, Globe, Shield, TrendingUp } from 'lucide-react';
import InputForm from './components/InputForm';
import MatchResults from './components/MatchResults';
import ActivityFeed from './components/ActivityFeed';
import { requestMatch } from './services/matchService';
import { MatchRequest, Pool, AppUser } from './types';
import AuthGate from './components/AuthGate';
import DriverDashboard from './components/DriverDashboard';
import ConfirmScreen from './components/ConfirmScreen';
import { savePool } from './services/dbService';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pool, setPool] = useState<Pool | null>(null);
  const [user, setUser] = useState<AppUser | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleMatch = async (details: MatchRequest) => {
    setIsLoading(true);
    try {
      const enriched: MatchRequest = {
        ...details,
        ownerId: user?.id,
        ownerName: user?.name || 'You',
        ownerGender: user?.gender,
      };
      const res = await requestMatch(enriched);
      setPool(res.pool);
      setShowConfirm(true);
    } catch (error) {
      console.error("Match failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmBooking = async () => {
    if (!pool) return;
    try {
      await savePool(pool);
    } catch (e) {
      console.error('Failed to persist pool', e);
    }
    if (pool.deepLink) {
      window.open(pool.deepLink, '_blank');
    }
    setShowConfirm(false);
  };

  const cancelBooking = () => {
    setShowConfirm(false);
  };

  return (
    <div className="min-h-screen bg-[#fcfdfe] flex flex-col items-center selection:bg-teal-100 selection:text-teal-900 pb-32 overflow-x-hidden">
      {/* Premium Background Layer */}
      <div className="absolute top-0 w-full h-[650px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-900"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '60px 60px' }}></div>
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#fcfdfe] to-transparent"></div>
        
        {/* Animated Orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-teal-400/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-emerald-400/10 rounded-full blur-[100px] animate-pulse delay-700"></div>
      </div>
      
      <div className="relative w-full max-w-7xl space-y-16 mt-20 px-6">
        {/* Header */}
        <header className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-4 px-6 py-2.5 bg-white/10 backdrop-blur-3xl rounded-full text-white text-xs font-black uppercase tracking-[0.3em] border border-white/20 shadow-2xl">
            <Globe className="w-4 h-4 text-emerald-400" />
            Empowering Mumbai Campuses
          </div>
          <div className="space-y-4">
            <h1 className="text-[5.5rem] font-black text-white tracking-[-0.05em] leading-[0.9] drop-shadow-2xl">
              Student<span className="text-teal-400">Pool.</span>
            </h1>
            <p className="text-teal-50/80 text-2xl font-medium tracking-tight opacity-95 leading-relaxed max-w-2xl mx-auto px-4">
              Your intelligent network for shared campus travel. High utility, zero effort.
            </p>
          </div>
        </header>

        {/* Core Layout */}
        {!user ? (
          <div className="max-w-3xl mx-auto">
            <AuthGate onLogin={setUser} />
          </div>
        ) : user.role === 'passenger' ? (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-16 items-start">
          <div className="xl:col-span-4 lg:px-4 space-y-10">
            <div className="sticky top-12 space-y-10">
              <InputForm onSubmit={handleMatch} isLoading={isLoading} currentUser={user} />
              
              {!pool && (
                <div className="bg-white rounded-[3rem] p-10 shadow-3xl border border-slate-50 relative overflow-hidden group">
                  <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-all duration-700">
                    <Shield className="w-64 h-64" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 text-teal-600 font-black text-xl mb-6">
                      <TrendingUp className="w-7 h-7" />
                      Social Impact
                    </div>
                    <p className="text-slate-500 text-md leading-relaxed mb-8 font-medium">
                      Join thousands of students who have collectively saved over <span className="text-teal-600 font-black">₹2.4 Lakhs</span> this semester.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-5 bg-teal-50/50 rounded-[2rem] text-center">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Eco Win</p>
                        <p className="text-xl font-black text-teal-600">1,240kg CO2</p>
                      </div>
                      <div className="p-5 bg-amber-50/50 rounded-[2rem] text-center">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Riders Online</p>
                        <p className="text-xl font-black text-amber-600">42 Campus</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="xl:col-span-8 min-h-[800px]">
            {pool ? (
              <>
                <MatchResults pool={pool} disableBooking />
                {showConfirm && (
                  <ConfirmScreen pool={pool} onConfirm={confirmBooking} onCancel={cancelBooking} />
                )}
              </>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                {/* Dashboard Placeholder */}
                <div className="h-full min-h-[600px] flex flex-col items-center justify-center bg-white rounded-[4rem] border border-slate-50 shadow-2xl p-12 text-center relative group overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.03),transparent)]"></div>
                  <div className="w-32 h-32 bg-slate-50 rounded-[3rem] flex items-center justify-center mb-10 group-hover:scale-110 transition-all duration-700 group-hover:bg-teal-50 shadow-inner">
                    <Sparkles className="w-14 h-14 text-slate-200 group-hover:text-teal-400 group-hover:rotate-12 transition-all" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-700 mb-4 tracking-tight">Intelligence Dashboard</h3>
                  <p className="text-slate-400 max-w-xs text-lg font-medium leading-relaxed opacity-80">
                    Enter your destination to find a live pool near you and split fares seamlessly.
                  </p>
                </div>

                {/* Live Activity Feed */}
                <div className="h-full min-h-[600px]">
                  <ActivityFeed />
                </div>
              </div>
            )}
          </div>
        </div>
        ) : (
          <DriverDashboard user={user} />
        )}

        {/* Footer */}
        <footer className="pt-32 pb-16 text-center">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200/50 to-transparent mb-16"></div>
          <div className="space-y-6">
            <p className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-300">Sustainable Mobility Protocol 1.0</p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-slate-400">
              <span className="text-xs font-black hover:text-teal-600 transition-colors cursor-default">Campus Hub Mumbai</span>
              <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
              <span className="text-xs font-black hover:text-teal-600 transition-colors cursor-default">Smart Geo Matching</span>
              <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
              <span className="text-xs font-black hover:text-teal-600 transition-colors cursor-default">Secure Peer Verification</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
