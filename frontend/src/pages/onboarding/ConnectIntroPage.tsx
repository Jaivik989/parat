import { Users } from 'lucide-react';
import OnboardingLayout from '../../components/OnboardingLayout';

// Page 4: "Connect" onboarding slide.
export default function ConnectIntroPage() {
  return (
    <OnboardingLayout
      step={2}
      total={3}
      skipTo="/login"
      nextTo="/login"
      title="Connect"
      description="A transparent platform for farmers, intermediaries and customers."
      illustration={
        <div className="w-56 h-56 rounded-3xl bg-white shadow-inner flex items-center justify-center">
          <Users size={80} className="text-primary" />
        </div>
      }
    />
  );
}
