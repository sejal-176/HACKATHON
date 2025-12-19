
import React, { useMemo } from 'react';
import { 
  ShieldCheck, Leaf, Map, Wallet, CheckCircle2, TrendingUp, ExternalLink, 
  School, Users, IndianRupee, PieChart as ChartIcon, Coins, 
  Share2, Smartphone, ArrowRight, UserCheck, Zap, Globe, MapPin 
} from 'lucide-react';
import { AnalysisResponse, FareSplitData, RideDetails } from '../types';
import FareSplitChart from './FareSplitChart';

interface AnalysisResultsProps {
  analysis: AnalysisResponse;
  details: RideDetails;
}

const STUDENT_NAMES = [
  'Arjun Mehta', 'Sneha Kapoor', 'Rohan Das', 'Priya Sharma', 
  'Ishaan Iyer', 'Ananya Roy', 'Kabir Singh', 'Mira Nair',
  'Vikram Patil', 'Zoya Khan', 'Rahul Gupta', 'Sanya Verma',
  'Aditi Rao', 'Dev Patel', 'Kriti Sanon', 'Varun Dhawan'
];

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysis, details }) => {
  const perStudentFare = details.totalFare / details.studentCount;
  
  // Generate random names for the students
  const poolStudents = useMemo(() => {
    const shuffled = [...STUDENT_NAMES].sort(() => 0.5 - Math.random());
    return Array.from({ length: details.studentCount }).map((_, i) => ({
      name: shuffled[i % shuffled.length],
      id: `STU-${Math.floor(1000 + Math.random() * 9000)}`
    }));
  }, [details.studentCount]);

  const chartData: FareSplitData[] = poolStudents.map((s, i) => ({
    name: s.name,
    value: perStudentFare,
  }));

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-12 duration-1000 pb-10">
      
      {/* Dynamic Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { icon: School, label: 'Campus', value: details.collegeName, color: 'teal', bg: 'bg-teal-50/50' },
          { icon: Users, label: 'Active Riders', value: `${details.studentCount} Pooled`, color: 'teal', bg: 'bg-teal-50/50' },
          { icon: IndianRupee, label: 'Trip Total', value: `₹${details.totalFare}`, color: 'amber', bg: 'bg-amber-50/50' },
          { icon: Zap, label: 'Service', value: details.provider, color: 'indigo', bg: 'bg-indigo-50/50' },
        ].map((stat, i) => (
          <div key={i} className={`bg-white p-6 rounded-[2.5rem] border border-slate-50 shadow-sm flex flex-col gap-3 transition-all hover:shadow-xl hover:-translate-y-2 group`}>
            <div className={`p-3 w-fit ${stat.bg} rounded-2xl group-hover:scale-110 transition-transform`}>
              <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-black text-slate-300 tracking-[0.15em] mb-1">{stat.label}</p>
              <p className="text-sm font-black text-slate-700 truncate">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Hero Savings Section */}
      <div className="relative group">
        <div className="absolute inset-0 bg-teal-500/20 rounded-[3.5rem] blur-[80px] -z-10 opacity-50 group-hover:opacity-70 transition-opacity"></div>
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 rounded-[3.5rem] p-12 text-white shadow-3xl relative overflow-hidden border border-white/5">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-emerald-500/10 rounded-full text-[10px] font-black uppercase tracking-[0.25em] mb-8 border border-emerald-500/20 text-emerald-300 shadow-inner">
                <Globe className="w-4 h-4" /> Massive Student Network
              </div>
              <p className="text-teal-400 text-xs font-black uppercase tracking-[0.3em] mb-2">Individual Weekly Benefit</p>
              <h3 className="text-8xl font-black tracking-tighter text-white mb-4 leading-none transition-all hover:scale-[1.02]">
                {analysis.weeklySavings}
              </h3>
              <p className="text-slate-400 text-lg font-medium max-w-md leading-relaxed">
                By sharing your commute with {details.studentCount - 1} peers, you are maximizing urban efficiency and student spending power.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-3xl p-8 rounded-[3rem] border border-white/10 group hover:bg-white/10 transition-all cursor-default shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                   <div className="p-4 bg-amber-400 rounded-3xl text-amber-950 shadow-2xl shadow-amber-400/40">
                    <Coins className="w-10 h-10" />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-teal-400 uppercase tracking-widest mb-1">Per Ride Savings</p>
                    <p className="text-4xl font-black">₹{(details.totalFare - perStudentFare).toFixed(0)}</p>
                  </div>
                </div>
                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full shadow-[0_0_15px_rgba(20,184,166,0.5)]"></div>
                </div>
                <div className="flex justify-between mt-4">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-teal-500" /> Community Verified
                  </p>
                  <p className="text-[10px] text-teal-400 font-bold uppercase tracking-widest">Highly Optimized</p>
                </div>
              </div>
              
              <button 
                onClick={() => window.open(`https://www.${details.provider.toLowerCase()}.com`, '_blank')}
                className="w-full py-6 bg-teal-500 hover:bg-teal-400 text-slate-950 rounded-[2rem] font-black text-md uppercase tracking-[0.3em] flex items-center justify-center gap-4 transition-all shadow-[0_0_50px_rgba(20,184,166,0.2)] active:scale-95 group"
              >
                Book with {details.provider}
                <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Massive Rider List */}
        <div className="lg:col-span-5 bg-white rounded-[3rem] shadow-2xl border border-slate-50 p-10 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-teal-50 rounded-3xl">
                <Users className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Active Pool</h3>
            </div>
            <div className="flex items-center gap-2">
               <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Connect</span>
            </div>
          </div>
          
          <div className="space-y-4 flex-1">
            {poolStudents.map((student, idx) => (
              <div key={idx} className="flex items-center justify-between p-5 bg-slate-50/50 rounded-[2.25rem] border border-transparent hover:border-teal-100 transition-all group hover:bg-white hover:shadow-xl">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center font-black text-teal-600 text-lg shadow-sm group-hover:bg-teal-600 group-hover:text-white transition-all">
                      {student.name.charAt(0)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full"></div>
                  </div>
                  <div>
                    <p className="font-black text-slate-700 group-hover:text-teal-900 transition-colors">{student.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">{student.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Share</p>
                  <p className="text-lg font-black text-teal-600">₹{perStudentFare.toFixed(0)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-slate-100">
            <div className="flex justify-between items-center px-4">
              <span className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Group Contribution</span>
              <span className="text-3xl font-black text-slate-800">₹{details.totalFare}</span>
            </div>
          </div>
        </div>

        {/* Visual Chart and Smart Analysis */}
        <div className="lg:col-span-7 space-y-10">
          <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-50 p-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 bg-teal-50 rounded-3xl">
                <ChartIcon className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Fare Distribution</h3>
            </div>
            <div className="h-[350px]">
              <FareSplitChart data={chartData} />
            </div>
          </div>

          {/* Quick Insights Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-[3rem] shadow-xl border border-slate-50 p-8 flex items-center gap-8 group hover:shadow-teal-100/50 transition-all">
              <div className="p-6 bg-emerald-50 rounded-[2rem] group-hover:scale-110 transition-transform">
                <Leaf className="w-10 h-10 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-black text-slate-800 text-sm uppercase tracking-[0.2em] mb-2">Environment</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{analysis.environmentalBenefits}</p>
              </div>
            </div>
            <div className="bg-white rounded-[3rem] shadow-xl border border-slate-50 p-8 flex items-center gap-8 group hover:shadow-rose-100/50 transition-all">
              <div className="p-6 bg-rose-50 rounded-[2rem] group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-10 h-10 text-rose-600" />
              </div>
              <div>
                <h3 className="font-black text-slate-800 text-sm uppercase tracking-[0.2em] mb-2">Safety Lock</h3>
                <p className="text-slate-500 text-xs leading-relaxed">Peer-verified loop for {details.collegeName} students.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Protocol Grid */}
      <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-50 p-10">
        <div className="flex items-center gap-5 mb-8">
          <div className="p-4 bg-rose-50 rounded-3xl text-rose-600">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Safe-Pool Protocols</h3>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Ensuring a secure campus journey</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {analysis.safetyMeasures.map((measure, idx) => (
            <div key={idx} className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-start gap-4 hover:bg-white hover:shadow-lg transition-all">
              <div className="mt-1 text-teal-500"><CheckCircle2 className="w-5 h-5" /></div>
              <p className="text-sm font-bold text-slate-600 leading-relaxed">{measure}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Map Verification Grounding */}
      {analysis.groundingSources && analysis.groundingSources.length > 0 && (
        <div className="bg-white rounded-[3.5rem] shadow-3xl border border-slate-50 p-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-5">
              <div className="p-5 bg-indigo-50 rounded-[2rem]">
                <Map className="w-8 h-8 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-3xl font-black text-slate-800 tracking-tight">Campus Verified</h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Grounding Destination Points</p>
              </div>
            </div>
            <div className="h-px flex-1 bg-slate-100 hidden md:block mx-10"></div>
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">{analysis.feasibilityAnalysis}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {analysis.groundingSources.map((source, i) => (
              <a 
                key={i} 
                href={source.uri} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col p-8 bg-slate-50/50 border border-slate-100 rounded-[2.5rem] hover:border-teal-400 transition-all group shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:bg-white"
              >
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-50 text-teal-600">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <ExternalLink className="w-5 h-5 text-slate-300 group-hover:text-teal-600 transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-teal-500 uppercase tracking-[0.3em] mb-2">Location Found</p>
                  <p className="text-lg font-black text-slate-800 line-clamp-2">{source.title}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisResults;
