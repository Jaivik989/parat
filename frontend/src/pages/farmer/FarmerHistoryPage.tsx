import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Search, SlidersHorizontal } from 'lucide-react';
import { recentLots, gradeStyles } from '../../data/mockData';

// Full scan/lot history for the farmer, opened via "History" tab or "View All".
export default function FarmerHistoryPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto min-h-screen bg-cream pb-10">
      <div className="px-5 pt-6 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-primary">
          <ArrowLeft size={22} />
        </button>
        <h1 className="font-extrabold text-xl text-primary">History</h1>
        <div className="flex items-center gap-3">
          <Bell className="text-primary" size={20} />
          <div className="w-8 h-8 rounded-full bg-gray-300" />
        </div>
      </div>
      <p className="px-5 text-gray-500 text-sm mt-1">All your previous lot reports at one place.</p>

      <div className="px-5 mt-4 flex gap-3">
        <div className="flex-1 flex items-center gap-2 bg-white rounded-xl px-3 py-2.5 border border-gray-100">
          <Search size={16} className="text-gray-400" />
          <input placeholder="Search by Lot ID or date..." className="flex-1 outline-none text-sm bg-transparent" />
        </div>
        <button className="flex items-center gap-1 bg-white border border-gray-100 rounded-xl px-3 text-sm font-medium">
          <SlidersHorizontal size={14} /> Sort
        </button>
      </div>

      <div className="px-5 mt-4 space-y-3">
        {recentLots.map((lot) => (
          <div key={lot.id} className="bg-white rounded-2xl p-3 flex items-center gap-3 border border-gray-100">
            <div className="w-14 h-14 rounded-xl bg-primary-light flex items-center justify-center text-2xl shrink-0">🧅</div>
            <div className="flex-1 min-w-0">
              <p className="font-bold">Lot #{lot.id}</p>
              <p className="text-xs text-gray-400">
                {lot.date} | {lot.weightKg} kg
              </p>
            </div>
            <div className="text-right text-xs space-y-0.5 mr-2 shrink-0">
              <p className="text-secondary font-semibold">{lot.healthy}% Healthy</p>
              <p className="text-red-500 font-semibold">{lot.rotten}% Rotten</p>
              <p className="text-amber-500 font-semibold">{lot.sprouted}% Sprouted</p>
            </div>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${gradeStyles[lot.grade]}`}>
              Grade {lot.grade}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
