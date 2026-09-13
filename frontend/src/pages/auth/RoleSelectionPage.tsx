import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Sprout, Warehouse } from 'lucide-react';
import { UserRole } from '../../types';

// Page 7: Role selection - Farmer or Procurement Centre.
export default function RoleSelectionPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole | null>(null);

  const handleContinue = () => {
    if (role === 'farmer') navigate('/farmer/details');
    if (role === 'procurement') navigate('/procurement/login');
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-cream flex flex-col px-6 pt-10">
      <h1 className="text-3xl font-extrabold mb-1">
        Let&apos;s Get <span className="text-primary">Started</span>
      </h1>
      <p className="text-gray-500 mb-8">Choose your role to continue</p>

      <button
        onClick={() => setRole('farmer')}
        className={`flex items-center gap-4 text-left rounded-2xl p-5 mb-4 border-2 transition ${
          role === 'farmer' ? 'border-primary bg-secondary-light' : 'border-transparent bg-secondary-light/60'
        }`}
      >
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shrink-0">
          <Sprout size={30} className="text-secondary" />
        </div>
        <div className="flex-1">
          <p className="text-gray-500 text-sm">I am a</p>
          <p className="text-primary font-bold text-lg">Farmer</p>
          <p className="text-gray-500 text-sm">Scan, grade and sell your produce</p>
        </div>
        <ChevronRight className="text-primary shrink-0" />
      </button>

      <button
        onClick={() => setRole('procurement')}
        className={`flex items-center gap-4 text-left rounded-2xl p-5 mb-8 border-2 transition ${
          role === 'procurement' ? 'border-primary bg-indigo-50' : 'border-transparent bg-indigo-50/60'
        }`}
      >
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shrink-0">
          <Warehouse size={30} className="text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-gray-500 text-sm">I am a</p>
          <p className="text-primary font-bold text-lg">Procurement Centre</p>
          <p className="text-gray-500 text-sm">Receive graded produce and manage procurement</p>
        </div>
        <ChevronRight className="text-primary shrink-0" />
      </button>

      <button
        onClick={handleContinue}
        disabled={!role}
        className={`w-full py-3.5 rounded-2xl font-semibold text-white transition ${
          role ? 'bg-primary' : 'bg-primary/40 cursor-not-allowed'
        }`}
      >
        Continue
      </button>
    </div>
  );
}
