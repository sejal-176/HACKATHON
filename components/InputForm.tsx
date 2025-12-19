
import React, { useState, useEffect } from 'react';
import { MapPin, Users, IndianRupee, School, Navigation, Search, Smartphone } from 'lucide-react';
import { RideDetails } from '../types';

interface InputFormProps {
  onSubmit: (details: RideDetails) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [details, setDetails] = useState<RideDetails>({
    collegeName: 'IIT Bombay',
    destination: 'Main Building',
    studentCount: 4,
    totalFare: 420,
    provider: 'Uber'
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setDetails(prev => ({
          ...prev,
          currentLat: position.coords.latitude,
          currentLng: position.coords.longitude
        }));
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(details);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(20,184,166,0.15)] border border-teal-50/50 p-10 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Pool Finder</h2>
          <p className="text-slate-400 text-xs font-bold mt-1 uppercase tracking-widest">Connect with Campus Riders</p>
        </div>
        <div className="p-3 bg-teal-50 rounded-2xl">
          <Navigation className="w-6 h-6 text-teal-600" />
        </div>
      </div>
      
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          {(['Uber', 'Ola'] as const).map((p) => (
            <button 
              key={p}
              type="button"
              onClick={() => setDetails({...details, provider: p})}
              className={`py-4 rounded-2xl flex items-center justify-center gap-3 border-2 transition-all duration-300 ${details.provider === p ? 'border-teal-600 bg-teal-50/50 text-teal-900 shadow-md scale-[1.02]' : 'border-slate-100 text-slate-400 grayscale opacity-60 hover:opacity-100'}`}
            >
              <Smartphone className="w-5 h-5" /> <span className="text-sm font-black uppercase tracking-widest">{p}</span>
            </button>
          ))}
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Target College</label>
          <div className="relative group">
            <School className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-500 transition-transform group-focus-within:scale-110" />
            <select
              className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:bg-white outline-none appearance-none font-bold text-slate-700 transition-all cursor-pointer"
              value={details.collegeName}
              onChange={(e) => setDetails({ ...details, collegeName: e.target.value })}
            >
              <option>IIT Bombay</option>
              <option>St. Xavier's College</option>
              <option>HR College</option>
              <option>Jai Hind College</option>
              <option>NMIMS</option>
              <option>VJTI</option>
              <option>Sophia College</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Exact Drop-off</label>
          <div className="relative group">
            <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-500 transition-transform group-focus-within:scale-110" />
            <input
              type="text"
              className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:bg-white outline-none font-bold text-slate-700 transition-all"
              placeholder="e.g., Gate 2 / Auditorium"
              value={details.destination}
              onChange={(e) => setDetails({ ...details, destination: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Riders</label>
            <div className="relative group">
              <Users className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-500" />
              <input
                type="number"
                min="2"
                max="8"
                className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:bg-white outline-none font-bold text-slate-700 transition-all"
                value={details.studentCount}
                onChange={(e) => setDetails({ ...details, studentCount: parseInt(e.target.value) || 2 })}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Fare (₹)</label>
            <div className="relative group">
              <IndianRupee className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-500" />
              <input
                type="number"
                className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:bg-white outline-none font-bold text-slate-700 transition-all"
                value={details.totalFare}
                onChange={(e) => setDetails({ ...details, totalFare: parseFloat(e.target.value) || 0 })}
                required
              />
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-5 bg-teal-600 hover:bg-teal-700 text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-[0_20px_40px_-10px_rgba(20,184,166,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(20,184,166,0.4)] active:scale-[0.97] ${isLoading ? 'opacity-70' : ''}`}
      >
        {isLoading ? (
          <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <Search className="w-5 h-5" />
            Check Availability
          </>
        )}
      </button>
    </form>
  );
};

export default InputForm;
