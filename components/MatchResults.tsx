import React from 'react';
import { Users, MapPin, Share2, Smartphone } from 'lucide-react';
import { Pool } from '../types';

interface Props {
  pool: Pool;
  disableBooking?: boolean;
}

const MatchResults: React.FC<Props> = ({ pool, disableBooking }) => {
  const owner = pool.ownerId ? pool.members.find(m => m.id === pool.ownerId) : undefined;
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-12 duration-1000 pb-10">
      <div className="relative group">
        <div className="absolute inset-0 bg-teal-500/10 rounded-[3rem] blur-[80px] -z-10" />
        <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-50">
          <div className="flex items-center justify-between gap-6 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-teal-50 rounded-3xl">
                <Smartphone className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Matched Pool</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Provider · {pool.provider} · ID {pool.id}{owner ? ` · Booking as ${owner.name}` : ''}</p>
              </div>
            </div>

            {pool.deepLink && !disableBooking && (
              <a
                href={pool.deepLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-[1.25rem] font-black text-[11px] uppercase tracking-[0.2em] transition-all shadow-[0_12px_24px_-8px_rgba(20,184,166,0.5)]"
              >
                Book with {pool.provider}{owner ? ` as ${owner.name}` : ''}
                <Share2 className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 bg-white rounded-[3rem] shadow-2xl border border-slate-50 p-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-teal-50 rounded-3xl">
                <Users className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Members</h3>
            </div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{pool.members.length} riders</div>
          </div>

          <div className="space-y-4">
            {pool.members.map((m, idx) => (
              <div key={idx} className="flex items-center justify-between p-5 bg-slate-50/50 rounded-[2.25rem] border border-transparent hover:border-teal-100 transition-all group hover:bg-white hover:shadow-xl">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center font-black text-teal-600 text-lg shadow-sm group-hover:bg-teal-600 group-hover:text-white transition-all">
                      {m.name.charAt(0)}
                    </div>
                    {m.gender === 'female' ? (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-rose-500 border-4 border-white rounded-full" />
                    ) : (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-sky-500 border-4 border-white rounded-full" />
                    )}
                  </div>
                  <div>
                    <p className="font-black text-slate-700 group-hover:text-teal-900 transition-colors">{m.name} {pool.ownerId === m.id ? <span className="ml-2 text-[10px] bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-black uppercase tracking-widest">You</span> : null}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">{m.gender ?? 'na'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-50 p-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-emerald-50 rounded-3xl">
                <MapPin className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Meetup & Pickups</h3>
            </div>

            {pool.meetupPoint && (
              <div className="mb-6 p-5 bg-slate-50 rounded-[2rem] border border-slate-100">
                <p className="text-[10px] font-black text-teal-500 uppercase tracking-[0.3em] mb-1">Meetup</p>
                <p className="text-sm font-black text-slate-700">{pool.meetupPoint.name}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pool.pickupPoints.map((p, i) => (
                <div key={i} className="p-5 bg-slate-50 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-xl border border-slate-100">
                      <MapPin className="w-4 h-4 text-rose-500" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pickup {i + 1}</p>
                      <p className="font-black text-slate-700">{p.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchResults;
