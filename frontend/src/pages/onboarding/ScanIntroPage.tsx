import { ScanLine } from 'lucide-react';
import OnboardingLayout from '../../components/OnboardingLayout';

// Page 2: "Scan" onboarding slide.
export default function ScanIntroPage() {
  return (
    <OnboardingLayout
      step={0}
      total={3}
      skipTo="/login"
      nextTo="/onboarding/know"
      title="Scan"
      description="Upload or capture a photo and get instant grading results using AI."
      illustration={
        <div className="w-56 h-56 rounded-3xl bg-white shadow-inner flex items-center justify-center">
          <ScanLine size={80} className="text-primary" />
        </div>
      }
    />
  );
}
