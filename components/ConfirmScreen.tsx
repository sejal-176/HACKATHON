import React from 'react';
import { Smartphone, Shield, Users, MapPin, Check, X } from 'lucide-react';
import { Pool } from '../types';

interface Props {
  pool: Pool;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmScreen: React.FC<Props> = ({ pool, onConfirm, onCancel }) => {
  const owner = pool.ownerId ? pool.members.find(m => m.id === pool.ownerId) : undefined;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
      <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-100 w-full max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-teal-50 rounded-3xl">
              <Smartphone className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Confirm Booking</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{pool.provider} · Pool {pool.id}</p>
            </div>
          </div>
          <div className="p-2 bg-slate-50 rounded-2xl border border-slate-100 text-slate-400 text-xs font-black uppercase tracking-widest">Max 4 Riders</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center gap-3">
            <Users className="w-4 h-4 text-teal-600" />
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Members</p>
              <p className="font-black text-slate-700">{pool.members.length} riders</p>
            </div>
          </div>
          {pool.meetupPoint && (
            <div className="p-5 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center gap-3">
              <MapPin className="w-4 h-4 text-rose-500" />
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Meetup</p>
                <p className="font-black text-slate-700">{pool.meetupPoint.name}</p>
              </div>
            </div>
          )}
        </div>

        <div className="p-5 bg-emerald-50/60 rounded-[2rem] border border-emerald-100 flex items-center gap-3">
          <Shield className="w-4 h-4 text-emerald-600" />
          <p className="text-sm text-emerald-700 font-medium">
            {owner ? <span className="font-black">Booking as {owner.name}.</span> : null} You will be redirected to {pool.provider} to complete the ride booking.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button onClick={onCancel} className="px-5 py-3 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-black text-[11px] uppercase tracking-widest inline-flex items-center gap-2">
            <X className="w-4 h-4" /> Cancel
          </button>
          <button onClick={onConfirm} className="px-6 py-3 rounded-2xl bg-teal-600 text-white hover:bg-teal-700 font-black text-[11px] uppercase tracking-[0.2em] inline-flex items-center gap-2 shadow-[0_12px_24px_-8px_rgba(20,184,166,0.5)]">
            <Check className="w-4 h-4" /> Confirm & Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmScreen;
