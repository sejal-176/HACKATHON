import React, { useState } from 'react';
import { Car, User2 } from 'lucide-react';
import { AppUser, UserRole } from '../types';

interface Props {
  onLogin: (user: AppUser) => void;
}

function rid() {
  return Math.random().toString(36).slice(2, 10);
}

const AuthGate: React.FC<Props> = ({ onLogin }) => {
  const [role, setRole] = useState<UserRole>('passenger');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ id: `U-${rid()}`, role, name: name || undefined, email: email || undefined, gender });
  };

  return (
    <form onSubmit={submit} className="bg-white rounded-[3rem] p-10 shadow-3xl border border-slate-50 space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Welcome</h2>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Continue as</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setRole('passenger')}
          className={`py-5 rounded-2xl border-2 flex items-center justify-center gap-3 transition-all ${role === 'passenger' ? 'border-teal-600 bg-teal-50/50 text-teal-900 shadow-md scale-[1.02]' : 'border-slate-100 text-slate-400 grayscale opacity-70 hover:opacity-100'}`}
        >
          <User2 className="w-5 h-5" />
          <span className="text-sm font-black uppercase tracking-widest">Passenger</span>
        </button>
        <button
          type="button"
          onClick={() => setRole('driver')}
          className={`py-5 rounded-2xl border-2 flex items-center justify-center gap-3 transition-all ${role === 'driver' ? 'border-teal-600 bg-teal-50/50 text-teal-900 shadow-md scale-[1.02]' : 'border-slate-100 text-slate-400 grayscale opacity-70 hover:opacity-100'}`}
        >
          <Car className="w-5 h-5" />
          <span className="text-sm font-black uppercase tracking-widest">Driver</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:bg-white outline-none font-bold text-slate-700"
        />
        <input
          type="email"
          placeholder="Email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:bg-white outline-none font-bold text-slate-700"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setGender('male')}
          className={`py-4 rounded-2xl border-2 flex items-center justify-center gap-3 transition-all ${gender === 'male' ? 'border-teal-600 bg-teal-50/50 text-teal-900 shadow-md scale-[1.02]' : 'border-slate-100 text-slate-400 grayscale opacity-70 hover:opacity-100'}`}
        >
          <User2 className="w-5 h-5" />
          <span className="text-sm font-black uppercase tracking-widest">Male</span>
        </button>
        <button
          type="button"
          onClick={() => setGender('female')}
          className={`py-4 rounded-2xl border-2 flex items-center justify-center gap-3 transition-all ${gender === 'female' ? 'border-teal-600 bg-teal-50/50 text-teal-900 shadow-md scale-[1.02]' : 'border-slate-100 text-slate-400 grayscale opacity-70 hover:opacity-100'}`}
        >
          <User2 className="w-5 h-5" />
          <span className="text-sm font-black uppercase tracking-widest">Female</span>
        </button>
      </div>

      <button
        type="submit"
        className="w-full py-5 bg-teal-600 hover:bg-teal-700 text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-[0_20px_40px_-10px_rgba(20,184,166,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(20,184,166,0.4)]"
      >
        Continue
      </button>
    </form>
  );
};

export default AuthGate;
