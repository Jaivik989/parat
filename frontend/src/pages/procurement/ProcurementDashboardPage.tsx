import { useNavigate } from 'react-router-dom';
import { Bell, Camera, ChevronRight, Home, ListOrdered, ScanLine, FileText, ShieldCheck } from 'lucide-react';
import { recentLots, gradeStyles } from '../../data/mockData';
import BottomNav from '../../components/BottomNav';

// Procurement Centre home / dashboard.
export default function ProcurementDashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto min-h-screen bg-cream pb-24">
      <div className="px-5 pt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧅</span>
          <div>
            <h1 className="font-extrabold text-lg leading-none text-primary">Parat</h1>
            <p className="text-xs text-gray-400">From Farms to Fair Value</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative text-secondary">
            <Bell size={22} />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">👤</div>
        </div>
      </div>

      <div className="px-5 mt-4">
        <p className="text-xl font-bold">Hello, Rohit Sharma! 👋</p>
        <p className="text-gray-500 text-sm">Procurement Center</p>
        <p className="text-gray-400 text-sm">Quality sourcing. Stronger markets.</p>
      </div>

      <div className="mx-5 mt-4 bg-primary-light rounded-2xl p-5 flex items-center gap-4">
        <div className="flex-1">
          <h2 className="font-bold text-lg mb-1">Scan Onion Lots</h2>
          <p className="text-sm text-gray-500 mb-3">
            Upload or capture a photo to get instant grading results and add it to your lot records.
          </p>
          <button
            onClick={() => navigate('/scan', { state: { role: 'procurement' } })}
            className="flex items-center gap-2 text-primary font-semibold"
          >
            <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">→</span>
            Start Scanning
          </button>
        </div>
        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shrink-0">
          <Camera className="text-primary" size={28} />
        </div>
      </div>

      <button
        onClick={() => navigate('/procurement/lots-analysis')}
        className="mx-5 mt-4 w-[calc(100%-2.5rem)] bg-secondary-light rounded-2xl p-4 flex items-center gap-4 text-left"
      >
        <div className="flex-1">
          <h3 className="font-bold text-secondary mb-1">Lots Analysis</h3>
          <p className="text-xs text-gray-500 mb-2">Track quality distribution, grades and trends of all incoming lots.</p>
          <span className="inline-flex items-center gap-1 bg-white text-secondary text-sm font-semibold px-3 py-1.5 rounded-full">
            View Analysis <ChevronRight size={14} />
          </span>
        </div>
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center shrink-0"
          style={{
            background: 'conic-gradient(#1F5C3D 0% 58%, #C98A1F 58% 84%, #E58FA0 84% 96%, #DC4C4C 96% 100%)',
          }}
        >
          <div className="w-14 h-14 bg-white rounded-full flex flex-col items-center justify-center">
            <p className="font-extrabold text-sm">24</p>
            <p className="text-[10px] text-gray-400">Lots</p>
          </div>
        </div>
      </button>

      <div className="px-5 mt-6 flex items-center justify-between">
        <h3 className="font-bold text-lg">Recent Lots</h3>
        <button
          onClick={() => navigate('/procurement/lots-analysis')}
          className="text-secondary text-sm font-medium flex items-center gap-1"
        >
          View All <ChevronRight size={14} />
        </button>
      </div>

      <div className="px-5 mt-3 space-y-3">
        {recentLots.slice(0, 3).map((lot) => (
          <button
            key={lot.id}
            onClick={() => navigate('/procurement/lots-analysis')}
            className="w-full bg-white rounded-2xl p-3 flex items-center gap-3 border border-gray-100 text-left"
          >
            <div className="w-14 h-14 rounded-xl bg-primary-light flex items-center justify-center text-2xl shrink-0">🧅</div>
            <div className="flex-1 min-w-0">
              <p className="font-bold">Lot #{lot.id}</p>
              <p className="text-xs text-gray-400 mb-1">
                {lot.date} | {lot.weightKg} kg
              </p>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${gradeStyles[lot.grade]}`}>
                Grade {lot.grade}
              </span>
            </div>
            <div className="text-right text-xs space-y-0.5 shrink-0">
              <p className="text-secondary font-semibold">{lot.healthy}% Healthy</p>
              <p className="text-red-500 font-semibold">{lot.rotten}% Rotten</p>
              <p className="text-amber-500 font-semibold">{lot.sprouted}% Sprouted</p>
            </div>
            <ChevronRight size={16} className="text-gray-300 shrink-0" />
          </button>
        ))}
      </div>

      <button
        onClick={() => navigate('/policies')}
        className="mx-5 mt-6 mb-4 block rounded-2xl overflow-hidden bg-gradient-to-r from-secondary to-secondary/80 p-5 text-left w-[calc(100%-2.5rem)]"
      >
        <h3 className="text-white font-bold mb-1">Government Policies for a Stronger Agriculture</h3>
        <p className="text-white/80 text-sm mb-3">
          Stay informed about the latest government schemes for onion procurement.
        </p>
        <span className="inline-flex items-center gap-1 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-full">
          View Policies <ChevronRight size={14} />
        </span>
      </button>

      <BottomNav
        items={[
          { label: 'Home', to: '/procurement/dashboard', icon: Home },
          { label: 'Lots', to: '/procurement/lots-analysis', icon: ListOrdered },
          { label: 'Scan', to: '/scan', icon: ScanLine },
          { label: 'Reports', to: '/procurement/lots-analysis', icon: FileText },
          { label: 'Policies', to: '/policies', icon: ShieldCheck },
        ]}
      />
    </div>
  );
}
