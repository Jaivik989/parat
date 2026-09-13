import { BarChart3 } from 'lucide-react';
import OnboardingLayout from '../../components/OnboardingLayout';

// Page 3: "Know" onboarding slide.
export default function KnowIntroPage() {
  return (
    <OnboardingLayout
      step={1}
      total={3}
      skipTo="/login"
      nextTo="/onboarding/connect"
      title="Know"
      description="Get detailed quality analysis with accurate grading and insights."
      illustration={
        <div className="w-56 h-56 rounded-3xl bg-white shadow-inner flex items-center justify-center">
          <BarChart3 size={80} className="text-secondary" />
        </div>
      }
    />
  );
}
