import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, MapPin, User, Bell, Settings, Users, Pencil } from 'lucide-react';

const menuItems = [
  { label: 'Edit Profile', icon: User },
  { label: 'Notifications', icon: Bell },
  { label: 'Settings', icon: Settings },
  { label: 'Contacts', icon: Users },
];

// Farmer profile page, opened from the profile icon on the dashboard.
export default function FarmerProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto min-h-screen bg-cream px-6 pt-6 pb-10">
      <button onClick={() => navigate(-1)} className="text-gray-600 mb-4">
        <ArrowLeft size={22} />
      </button>

      <div className="flex items-center gap-2 mb-6">
        <span className="text-xl">🧅</span>
        <span className="font-extrabold text-primary text-lg">Parat</span>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold">Ramesh Yadav</h1>
          <p className="text-gray-500">Farmer</p>
          <p className="flex items-center gap-1 text-gray-500 text-sm mt-1">
            <MapPin size={14} /> Nashik, Maharashtra
          </p>
        </div>
        <div className="relative shrink-0">
          <div className="w-20 h-20 rounded-full bg-secondary-light flex items-center justify-center text-4xl">
            🧑‍🌾
          </div>
          <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary-light flex items-center justify-center">
            <Pencil size={12} className="text-primary" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {menuItems.map(({ label, icon: Icon }) => (
          <button key={label} className="w-full flex items-center gap-4 bg-white rounded-2xl p-4 border border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center shrink-0">
              <Icon size={18} className="text-primary" />
            </div>
            <span className="flex-1 text-left font-medium">{label}</span>
            <ChevronRight size={18} className="text-gray-300" />
          </button>
        ))}
      </div>
    </div>
  );
}
