
import React from 'react';
import { Users, Leaf, Coins, Clock, Zap, MapPin } from 'lucide-react';

interface ActivityItem {
  id: string;
  riders: string[];
  destination: string;
  savings: number;
  carbonSaved: string;
  time: string;
}

const MOCK_ACTIVITIES: ActivityItem[] = [
  {
    id: '1',
    riders: ['Arjun M.', 'Sneha K.'],
    destination: 'IIT Bombay Gate 1',
    savings: 240,
    carbonSaved: '1.4kg',
    time: '2 mins ago'
  },
  {
    id: '2',
    riders: ['Rohan D.', 'Priya S.', 'Ishaan I.'],
    destination: 'HR College Main',
    savings: 480,
    carbonSaved: '2.8kg',
    time: '15 mins ago'
  },
  {
    id: '3',
    riders: ['Vikram P.', 'Zoya K.'],
    destination: 'St. Xavier\'s Library',
    savings: 180,
    carbonSaved: '1.1kg',
    time: '24 mins ago'
  }
];

const ActivityFeed: React.FC = () => {
  return (
    <div className="bg-white rounded-[3rem] p-8 shadow-2xl border border-slate-50 relative overflow-hidden group h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-rose-500 rounded-full animate-ping"></div>
          <h3 className="text-xl font-black text-slate-800 tracking-tight">Campus Live Feed</h3>
        </div>
        <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {MOCK_ACTIVITIES.map((activity) => (
          <div 
            key={activity.id} 
            className="p-5 bg-slate-50/50 rounded-[2.25rem] border border-transparent hover:border-teal-100 transition-all group hover:bg-white hover:shadow-xl"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex -space-x-3">
                {activity.riders.map((name, i) => (
                  <div 
                    key={i} 
                    className="w-8 h-8 rounded-full border-2 border-white bg-teal-600 flex items-center justify-center text-[10px] font-black text-white shadow-sm"
                  >
                    {name.charAt(0)}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Clock className="w-3 h-3" />
                <span className="text-[10px] font-black uppercase tracking-widest">{activity.time}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <p className="text-xs font-black text-slate-700">
                  {activity.riders.join(' & ')}
                </p>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Pooled</span>
              </div>
              
              <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                <MapPin className="w-3 h-3 text-rose-400" />
                {activity.destination}
              </div>

              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100/50">
                <div className="flex items-center gap-1.5">
                  <Coins className="w-3 h-3 text-amber-500" />
                  <span className="text-[10px] font-black text-amber-600">₹{activity.savings} Saved</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Leaf className="w-3 h-3 text-emerald-500" />
                  <span className="text-[10px] font-black text-emerald-600">{activity.carbonSaved} CO2</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-8 w-full py-4 bg-slate-50 hover:bg-teal-50 text-slate-400 hover:text-teal-600 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] transition-all border border-transparent hover:border-teal-100">
        View All History
      </button>
    </div>
  );
};

export default ActivityFeed;
