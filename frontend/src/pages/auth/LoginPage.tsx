import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, ArrowLeft } from 'lucide-react';

// Page 5: Login / signup form.
export default function LoginPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const handleGetOtp = (e: FormEvent) => {
    e.preventDefault();
    navigate('/get-started', { state: { mobile, name } });
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-cream flex flex-col px-6 pt-6 pb-10">
      <button onClick={() => navigate(-1)} className="mb-4 text-gray-600">
        <ArrowLeft size={22} />
      </button>

      <h1 className="text-3xl font-extrabold mb-1">
        Log<span className="text-primary">in</span>
      </h1>
      <p className="text-gray-500 mb-8">Create your account to continue</p>

      <form onSubmit={handleGetOtp} className="space-y-4">
        <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 border border-gray-100">
          <User size={20} className="text-gray-400" />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="flex-1 outline-none bg-transparent"
          />
        </div>

        <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 border border-gray-100">
          <Mail size={20} className="text-gray-400" />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address (Optional)"
            className="flex-1 outline-none bg-transparent"
          />
        </div>

        <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 border border-gray-100">
          <span className="text-gray-700 font-medium border-r border-gray-200 pr-3">+91</span>
          <Phone size={18} className="text-gray-400" />
          <input
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Mobile Number"
            className="flex-1 outline-none bg-transparent"
          />
        </div>

        <button type="submit" className="w-full bg-primary text-white font-semibold py-3.5 rounded-2xl mt-2">
          Get OTP
        </button>
      </form>

      <p className="text-center text-xs text-gray-400 mt-6">
        By continuing, you agree to our <span className="text-primary underline">Terms of Service</span> and{' '}
        <span className="text-primary underline">Privacy Policy</span>
      </p>
    </div>
  );
}
