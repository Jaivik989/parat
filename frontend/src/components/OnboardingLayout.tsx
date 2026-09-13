import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface OnboardingLayoutProps {
  step: number;
  total: number;
  skipTo: string;
  nextTo: string;
  title: string;
  description: string;
  illustration: ReactNode;
}

// Shared skeleton for the three onboarding slides (Scan / Know / Connect).
export default function OnboardingLayout({
  step,
  total,
  skipTo,
  nextTo,
  title,
  description,
  illustration,
}: OnboardingLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto min-h-screen bg-cream flex flex-col px-6 pt-6 pb-10">
      <div className="flex justify-end">
        <button onClick={() => navigate(skipTo)} className="text-primary font-medium">
          Skip
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center py-8">{illustration}</div>

      <div>
        <h1 className="text-3xl font-extrabold text-primary mb-3">{title}</h1>
        <p className="text-gray-500 text-lg leading-relaxed mb-8">{description}</p>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {Array.from({ length: total }).map((_, i) => (
              <span
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === step ? 'w-6 bg-primary' : 'w-2 bg-primary-light'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => navigate(nextTo)}
            className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary-dark transition"
          >
            <ArrowRight size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
