import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sprout } from "lucide-react";

// Page 1: Splash screen, auto-advances to the onboarding carousel.
export default function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/onboarding/scan"), 2200);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-cream flex flex-col items-center justify-center px-8 text-center">
      <div className="w-28 h-28 rounded-full bg-primary-light flex items-center justify-center mb-6">
        <Sprout size={56} className="text-primary" />
      </div>
      <h1 className="text-4xl font-extrabold mb-2">
        <span className="text-secondary">Para</span>
        <span className="text-primary">t</span>
      </h1>
      <p className="text-gray-500 mb-16">Better Onions, Brighter Futures</p>
      <div className="w-40 h-1.5 bg-primary-light rounded-full overflow-hidden mb-3">
        <div className="h-full bg-primary w-2/3 animate-pulse" />
      </div>
      <p className="text-sm text-gray-400">Loading a fresher tomorrow...</p>
    </div>
  );
}
