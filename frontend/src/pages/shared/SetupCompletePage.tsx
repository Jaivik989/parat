import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { UserRole } from '../../types';

// Shown after Farmer Details or Procurement Centre login is submitted.
// Reads the chosen role from router state to know where "Go to Home" leads.
export default function SetupCompletePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = (location.state as { role?: UserRole })?.role ?? 'farmer';

  const handleGoHome = () => {
    navigate(role === 'farmer' ? '/farmer/dashboard' : '/procurement/dashboard');
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-cream flex flex-col items-center justify-center px-8 text-center">
      <div className="relative mb-6">
        <div className="w-40 h-40 rounded-full bg-primary-light flex items-center justify-center">
          <span className="text-6xl">🧅</span>
        </div>
        <CheckCircle2 className="absolute -bottom-2 -right-2 text-secondary bg-white rounded-full" size={44} />
      </div>
      <h1 className="text-3xl font-extrabold mb-2">
        You&apos;re <span className="text-primary">All Set!</span>
      </h1>
      <h2 className="font-semibold mb-2">Welcome to Parat!</h2>
      <p className="text-gray-500 mb-10">
        Let&apos;s build a better, more transparent onion ecosystem together.
      </p>
      <button onClick={handleGoHome} className="w-full bg-primary text-white font-semibold py-3.5 rounded-2xl">
        Go to Home
      </button>
    </div>
  );
}
