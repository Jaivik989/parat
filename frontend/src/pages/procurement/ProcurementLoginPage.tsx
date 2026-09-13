import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Landmark, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';

// Procurement Centre login (eNAM ID based).
export default function ProcurementLoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    navigate('/setup-complete', { state: { role: 'procurement' } });
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-cream flex flex-col px-6 pt-6 pb-10">
      <button onClick={() => navigate(-1)} className="text-primary mb-6">
        <ArrowLeft size={22} />
      </button>

      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-28 h-28 rounded-full bg-primary-light flex items-center justify-center mb-4">
          <Landmark size={48} className="text-primary" />
        </div>
        <h1 className="text-2xl font-extrabold text-primary mb-1">Procurement Center</h1>
        <p className="text-gray-500">Login to access quality reports and manage procurement.</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 border border-gray-100">
          <User size={18} className="text-gray-400" />
          <input placeholder="Enter eNAM ID" className="flex-1 outline-none bg-transparent" />
        </div>

        <div className="flex items-center gap-3 bg-gray-100 rounded-2xl px-4 py-3.5">
          <Landmark size={18} className="text-gray-400" />
          <span className="text-gray-600 font-medium">FCI</span>
        </div>

        <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 border border-gray-100">
          <Lock size={18} className="text-gray-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            className="flex-1 outline-none bg-transparent"
          />
          <button type="button" onClick={() => setShowPassword((s) => !s)} className="text-gray-400">
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <p className="text-right text-primary text-sm font-medium">Forgot password?</p>

        <div className="flex items-center gap-3 bg-primary-light rounded-2xl px-4 py-3.5">
          <ShieldCheck size={20} className="text-primary shrink-0" />
          <p className="text-sm text-gray-600">Secure access for authorized procurement center officials only.</p>
        </div>

        <button type="submit" className="w-full bg-primary text-white font-semibold py-3.5 rounded-2xl mt-2">
          Login
        </button>
      </form>
    </div>
  );
}
