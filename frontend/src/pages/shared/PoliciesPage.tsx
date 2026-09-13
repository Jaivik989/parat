import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Info, Palette, ShieldCheck, Sparkles, Ruler } from 'lucide-react';

const grades = [
  {
    label: 'Grade A',
    color: 'bg-secondary-light text-secondary border-secondary/30',
    points: ['Firm and fresh', 'Uniform size and shape', 'No visible defects', 'Clean and dry outer skin'],
  },
  {
    label: 'Grade B',
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    points: ['Slight irregularities in shape/size', 'Minor skin blemishes', 'No major defects', 'Fit for consumption'],
  },
  {
    label: 'Grade C',
    color: 'bg-red-50 text-red-600 border-red-200',
    points: ['Visible blemishes', 'Irregular shape/size', 'Slight softness', 'Still usable for certain markets'],
  },
  {
    label: 'Rejected',
    color: 'bg-gray-100 text-gray-600 border-gray-200',
    points: ['Severely rotten', 'Heavily sprouted', 'Major physical damage', 'Not fit for sale or consumption'],
  },
];

const defects = [
  { label: 'Rotten', desc: 'Soft, discolored, moldy or wet patches.' },
  { label: 'Sprouted', desc: 'Visible sprouts of any length.' },
  { label: 'Damaged', desc: 'Cuts, cracks, bruises or peeled layers beyond normal handling.' },
  { label: 'Undersized/Oversized', desc: 'Outside the acceptable size range defined for the market.' },
];

const parameters = [
  { label: 'Size & Shape', desc: 'Uniformity and standard market size.', icon: Ruler },
  { label: 'Color', desc: 'Natural color as per variety standards.', icon: Palette },
  { label: 'Surface Quality', desc: 'Checks for blemishes, spots and skin condition.', icon: ShieldCheck },
  { label: 'Texture & Firmness', desc: 'Detects softness, wrinkling or dryness indicating low quality.', icon: Sparkles },
];

// Shared "Policies" page linked from both Farmer and Procurement dashboards.
export default function PoliciesPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto min-h-screen bg-cream px-5 pt-6 pb-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-primary">
            <ArrowLeft size={22} />
          </button>
          <h1 className="font-extrabold text-2xl text-primary">Policies</h1>
        </div>
        <div className="flex items-center gap-3">
          <Bell className="text-primary" size={20} />
          <div className="w-8 h-8 rounded-full bg-gray-300" />
        </div>
      </div>

      <div className="bg-primary-light rounded-2xl p-5 mb-5">
        <h2 className="font-extrabold text-lg mb-1">Our Grading Policy</h2>
        <p className="text-gray-500 text-sm">Transparent rules for fair pricing and better markets.</p>
      </div>

      <h3 className="font-bold text-primary mb-1">Grade Classification</h3>
      <p className="text-gray-500 text-sm mb-3">
        Onions are graded based on overall appearance, size, firmness and absence of defects.
      </p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {grades.map(({ label, color, points }) => (
          <div key={label} className={`rounded-2xl border p-4 ${color}`}>
            <p className="font-bold mb-2">{label}</p>
            <ul className="text-xs space-y-1 text-gray-600">
              {points.map((point) => (
                <li key={point} className="flex gap-1">
                  <span>•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h3 className="font-bold text-primary mb-3">Defect Identification Rules</h3>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {defects.map(({ label, desc }) => (
          <div key={label} className="bg-white rounded-2xl p-4 border border-gray-100">
            <p className="font-bold text-sm mb-1">{label}</p>
            <p className="text-xs text-gray-500">{desc}</p>
          </div>
        ))}
      </div>

      <h3 className="font-bold text-primary mb-1">Grading Parameters</h3>
      <p className="text-gray-500 text-sm mb-3">
        Our AI model evaluates multiple factors to ensure accurate and consistent grading.
      </p>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {parameters.map(({ label, desc, icon: Icon }) => (
          <div key={label} className="bg-white rounded-2xl p-4 border border-gray-100 flex flex-col gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary-light flex items-center justify-center">
              <Icon size={16} className="text-primary" />
            </div>
            <p className="font-bold text-sm">{label}</p>
            <p className="text-xs text-gray-500">{desc}</p>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-3 bg-primary-light rounded-2xl p-4">
        <Info size={20} className="text-primary shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-primary text-sm mb-1">Important Note</p>
          <p className="text-xs text-gray-600">
            Our grading system follows general market standards for onions. Final acceptance and pricing may vary
            based on specific procurement center guidelines and state regulations.
          </p>
        </div>
      </div>
    </div>
  );
}
