import React, { useMemo, useState } from 'react';
import { Car, Power, MapPin, Users, ShieldOff, CheckCircle2, Navigation, Share2, X } from 'lucide-react';
import { AppUser, MatchRequest, Pool, PoolMember } from '../types';
import { requestMatch } from '../services/matchService';
import { savePool } from '../services/dbService';

interface Props {
  user: AppUser;
}

function rid() {
  return Math.random().toString(36).slice(2, 10);
}

const MOCK_REQUESTS: Array<Required<Pick<MatchRequest, 'collegeName' | 'destination' | 'provider' | 'femaleOnly'>> & { id: string }> = [
  { id: 'R-' + rid(), collegeName: 'IIT Bombay', destination: 'Main Building', provider: 'Uber', femaleOnly: false },
  { id: 'R-' + rid(), collegeName: "St. Xavier's College", destination: 'Library', provider: 'Ola', femaleOnly: true },
  { id: 'R-' + rid(), collegeName: 'HR College', destination: 'Main Gate', provider: 'Uber', femaleOnly: false },
];

const DriverDashboard: React.FC<Props> = ({ user }) => {
  const [online, setOnline] = useState<boolean>(false);
  const [requests, setRequests] = useState(MOCK_REQUESTS);
  const [activePool, setActivePool] = useState<Pool | null>(null);
  const [working, setWorking] = useState(false);

  const visibleRequests = useMemo(() => requests.slice(0, 5), [requests]);

  const accept = async (req: typeof MOCK_REQUESTS[number]) => {
    setWorking(true);
    try {
      const res = await requestMatch({
        collegeName: req.collegeName,
        destination: req.destination,
        provider: req.provider,
        femaleOnly: req.femaleOnly,
        partySize: 1,
      });
      setActivePool(res.pool);
      await savePool(res.pool);
    } finally {
      setWorking(false);
    }
  };

  const skip = (id: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const removeMember = (m: PoolMember) => {
    if (!activePool) return;
    const updated: Pool = { ...activePool, members: activePool.members.filter((x) => x.id !== m.id) };
    setActivePool(updated);
  };

  const endTrip = () => {
    setActivePool(null);
  };

  return (
    <div className="space-y-12">
      <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-50">
        <div className="flex items-center justify-between gap-6 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-teal-50 rounded-3xl">
              <Car className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Driver Console</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Signed in as {user.name || 'Driver'} · ID {user.id}</p>
            </div>
          </div>

          <button
            onClick={() => setOnline((v) => !v)}
            className={`inline-flex items-center gap-3 px-6 py-3 rounded-[1.25rem] font-black text-[11px] uppercase tracking-[0.2em] transition-all border ${online ? 'bg-teal-600 text-white border-transparent hover:bg-teal-700' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
          >
            <Power className="w-4 h-4" /> {online ? 'Online' : 'Offline'}
          </button>
        </div>
      </div>

      {!activePool ? (
        <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-teal-600" />
              <h3 className="text-xl font-black text-slate-800">Nearby Requests</h3>
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{visibleRequests.length} waiting</span>
          </div>

          <div className="space-y-4">
            {visibleRequests.map((r) => (
              <div key={r.id} className="p-5 bg-slate-50/50 rounded-[2.25rem] border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-2xl border border-slate-100">
                    <MapPin className="w-4 h-4 text-rose-500" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-700">{r.collegeName} → {r.destination}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{r.provider} {r.femaleOnly ? '· Female Only' : ''}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button onClick={() => skip(r.id)} className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-black text-[11px] uppercase tracking-wider">
                    Skip
                  </button>
                  <button disabled={!online || working} onClick={() => accept(r)} className="px-5 py-2 rounded-xl bg-teal-600 text-white hover:bg-teal-700 font-black text-[11px] uppercase tracking-wider disabled:opacity-60">
                    {working ? 'Working...' : 'Accept'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-50 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Navigation className="w-5 h-5 text-emerald-600" />
              <h3 className="text-xl font-black text-slate-800">Active Pool</h3>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={endTrip} className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-black text-[11px] uppercase tracking-wider">
                End Trip
              </button>
              {activePool.deepLink && (
                <a href={activePool.deepLink} target="_blank" rel="noreferrer" className="px-5 py-2 rounded-xl bg-teal-600 text-white hover:bg-teal-700 font-black text-[11px] uppercase tracking-wider inline-flex items-center gap-2">
                  Open Booking <Share2 className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activePool.members.map((m) => (
              <div key={m.id} className="p-5 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center font-black text-teal-600">
                    {m.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-black text-slate-700">{m.name}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{m.gender || 'na'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => removeMember(m)} className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-black text-[10px] uppercase tracking-widest inline-flex items-center gap-1">
                    <ShieldOff className="w-3 h-3" /> No-show
                  </button>
                  <button className="px-3 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 font-black text-[10px] uppercase tracking-widest inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Picked
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverDashboard;
