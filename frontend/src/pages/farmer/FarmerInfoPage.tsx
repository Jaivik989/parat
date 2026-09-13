import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sprout, MapPin, Store } from 'lucide-react';

// Farmer Details form, shown right after choosing the "Farmer" role.
export default function FarmerInfoPage() {
  const navigate = useNavigate();

  const handleContinue = (e: FormEvent) => {
    e.preventDefault();
    navigate('/setup-complete', { state: { role: 'farmer' } });
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-cream flex flex-col px-6 pt-6 pb-10">
      <button onClick={() => navigate(-1)} className="mb-4 text-gray-600">
        <ArrowLeft size={22} />
      </button>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold">
            <span className="text-primary">Farmer</span> Details
          </h1>
          <p className="text-gray-500 mt-1">Help us know about your farm to serve you better</p>
        </div>
        <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center shrink-0">
          <Sprout className="text-primary" size={28} />
        </div>
      </div>

      <form onSubmit={handleContinue} className="space-y-4 flex-1">
        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
            <Sprout size={16} className="text-primary" /> Farm Size
          </label>
          <div className="flex items-center justify-between">
            <input placeholder="Enter farm size" className="flex-1 outline-none bg-transparent" />
            <select className="bg-transparent text-gray-500 outline-none">
              <option>Acres</option>
              <option>Hectares</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-3">
            <MapPin size={16} className="text-primary" /> Location
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-gray-400 mb-1">State</p>
              <select className="w-full bg-gray-50 rounded-xl px-3 py-2 outline-none">
                <option>Select State</option>
                <option>Maharashtra</option>
                <option>Telangana</option>
                <option>Karnataka</option>
              </select>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">City / District</p>
              <select className="w-full bg-gray-50 rounded-xl px-3 py-2 outline-none">
                <option>Select City</option>
                <option>Nashik</option>
                <option>Warangal</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
            Onion Variety <span className="text-gray-400 font-normal">(Optional)</span>
          </label>
          <select className="w-full bg-gray-50 rounded-xl px-3 py-2 outline-none">
            <option>Select variety</option>
            <option>Nashik Red</option>
            <option>Bellary Red</option>
            <option>Pusa Red</option>
          </select>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
            <Store size={16} className="text-primary" /> Nearest Procurement Center
          </label>
          <select className="w-full bg-gray-50 rounded-xl px-3 py-2 outline-none">
            <option>Select center</option>
            <option>FCI Procurement Center</option>
            <option>NAFED Center</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2 mt-2"
        >
          Continue <ArrowRight size={18} />
        </button>
      </form>
    </div>
  );
}
