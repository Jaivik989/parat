import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Bell,
  Package,
  Search,
  Award,
  AlertTriangle,
  ChevronDown,
  Calendar,
  MapPin,
  ChevronRight,
} from 'lucide-react';
import { recentLots, gradeStyles } from '../../data/mockData';

const stats = [
  { label: 'Total Lots', value: '1284', icon: Package, bg: 'bg-primary-light', color: 'text-primary' },
  { label: 'Inspected', value: '1172', icon: Search, bg: 'bg-secondary-light', color: 'text-secondary' },
  { label: 'Grade A', value: '82.5%', icon: Award, bg: 'bg-indigo-100', color: 'text-indigo-600' },
  { label: 'Rejected', value: '8.7%', icon: AlertTriangle, bg: 'bg-red-100', color: 'text-red-500' },
];

const defects = [
  { label: 'Rotten', value: 4.2, color: 'bg-red-400' },
  { label: 'Sprouted', value: 3.1, color: 'bg-secondary' },
  { label: 'Damaged', value: 5.7, color: 'bg-amber-400' },
  { label: 'Undersized', value: 9.2, color: 'bg-indigo-400' },
];

// Detailed lot quality analysis for the procurement centre.
export default function LotAnalysisPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto min-h-screen bg-cream px-5 pt-6 pb-10">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-primary">
            <ArrowLeft size={22} />
          </button>
          <span className="text-2xl">🧅</span>
          <div>
            <h1 className="font-extrabold text-lg text-primary leading-none">Lots Analysis</h1>
            <p className="text-xs text-gray-400">Procurement Center</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Bell className="text-primary" size={20} />
          <div className="w-8 h-8 rounded-full bg-gray-300" />
        </div>
      </div>
      <p className="text-gray-400 text-sm mb-4">Monitor quality. Ensure better procurement.</p>

      <div className="flex gap-2 mb-5">
        <span className="flex items-center gap-1 bg-white border border-gray-200 rounded-full px-3 py-1.5 text-sm font-medium">
          <Calendar size={14} /> Today <ChevronDown size={14} />
        </span>
        <span className="flex items-center gap-1 bg-white border border-gray-200 rounded-full px-3 py-1.5 text-sm font-medium">
          <MapPin size={14} /> All Centers <ChevronDown size={14} />
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2 bg-white rounded-2xl p-4 border border-gray-100 mb-5">
        {stats.map(({ label, value, icon: Icon, bg, color }) => (
          <div key={label} className="flex flex-col items-center text-center gap-1">
            <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center`}>
              <Icon size={16} className={color} />
            </div>
            <p className="text-xs text-gray-400">{label}</p>
            <p className="font-bold text-sm">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-white rounded-2xl p-4 border border-gray-100 flex flex-col items-center">
          <p className="font-bold text-primary self-start mb-2">Quality Overview</p>
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center"
            style={{ background: 'conic-gradient(#1F5C3D 0% 82.5%, #E5E7EB 82.5% 100%)' }}
          >
            <div className="w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center">
              <p className="text-xs text-gray-400">Grade A</p>
              <p className="font-extrabold text-lg text-secondary">82.5%</p>
            </div>
          </div>
          <span className="mt-3 text-xs bg-secondary-light text-secondary px-3 py-1 rounded-full font-medium">
            Good quality intake today
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <p className="font-bold text-primary mb-3">Defect Overview</p>
          <div className="space-y-3">
            {defects.map(({ label, value, color }) => (
              <div key={label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">{label}</span>
                  <span className="font-semibold">{value}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${color}`} style={{ width: `${value * 5}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-primary">Previous Reports</h3>
        <button className="text-secondary text-sm font-medium flex items-center gap-1">
          View All <ChevronRight size={14} />
        </button>
      </div>

      <div className="space-y-3">
        {recentLots.slice(0, 4).map((lot) => (
          <div key={lot.id} className="bg-white rounded-2xl p-3 flex items-center gap-3 border border-gray-100">
            <div className="w-14 h-14 rounded-xl bg-primary-light flex items-center justify-center text-2xl shrink-0">🧅</div>
            <div className="flex-1 min-w-0">
              <p className="font-bold">Lot #{lot.id}</p>
              <p className="text-xs text-gray-400">
                {lot.date} | {lot.weightKg} kg
              </p>
            </div>
            <div className="text-right text-xs space-y-0.5 mr-1 shrink-0">
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
