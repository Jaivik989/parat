import { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getAuthErrorMessage, PhoneOtpToken, sendPhoneOtp, verifyPhoneOtp } from '../../services/authService';

interface VerifyOtpState {
  mobile?: string;
  phone?: string;
  name?: string;
  phoneToken?: PhoneOtpToken;
}

// Page 6: OTP verification.
export default function VerifyOtpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as VerifyOtpState | null) ?? {};
  const mobile = state.mobile ?? '';

  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [seconds, setSeconds] = useState(30);
  const [phoneToken, setPhoneToken] = useState<PhoneOtpToken | null>(state.phoneToken ?? null);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (seconds === 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const verifyCode = async (digits: string[]) => {
    if (verifying || !phoneToken) return;
    setError(null);
    setVerifying(true);

    try {
      await verifyPhoneOtp(phoneToken, digits.join(''));
      navigate('/get-started', { state: { mobile, name: state.name } });
    } catch (verificationError) {
      setError(getAuthErrorMessage(verificationError, 'Unable to verify the OTP. Please try again.'));
      setOtp(Array(6).fill(''));
      inputsRef.current[0]?.focus();
    } finally {
      setVerifying(false);
    }
  };

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    if (verifying) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);

    if (value && index < 5) inputsRef.current[index + 1]?.focus();

    if (next.every((d) => d !== '')) {
      void verifyCode(next);
    }
  };

  const handleResend = async () => {
    if (seconds > 0 || resending || !state.phone) return;
    setError(null);
    setResending(true);

    try {
      const nextToken = await sendPhoneOtp(state.phone);
      setPhoneToken(nextToken);
      setOtp(Array(6).fill(''));
      setSeconds(30);
      inputsRef.current[0]?.focus();
    } catch (resendError) {
      setError(getAuthErrorMessage(resendError, 'Unable to resend the OTP. Please try again.'));
    } finally {
      setResending(false);
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-cream flex flex-col px-6 pt-6">
      <button onClick={() => navigate(-1)} className="mb-6 text-gray-600">
        <ArrowLeft size={22} />
      </button>

      <h1 className="text-3xl font-extrabold mb-1">
        Verify <span className="text-primary">OTP</span>
      </h1>
      <p className="text-gray-500 mb-8">We have sent a 6-digit code to +91 {mobile}</p>

      <div className="flex gap-3 mb-6">
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => (inputsRef.current[i] = el)}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            maxLength={1}
            inputMode="numeric"
            className="w-12 h-14 text-center text-xl font-semibold rounded-xl bg-white border border-gray-200 focus:border-primary outline-none"
          />
        ))}
      </div>

      {error && <p className="text-red-600 text-sm mb-4" role="alert">{error}</p>}

      <p className="text-gray-500 text-sm">
        Didn&apos;t receive the code?{' '}
        {seconds > 0 ? (
          <span className="text-primary font-medium">Resend in 00:{String(seconds).padStart(2, '0')}</span>
        ) : (
          <button className="text-primary font-medium disabled:opacity-60" onClick={handleResend} disabled={resending}>
            {resending ? 'Sending...' : 'Resend'}
          </button>
        )}
      </p>
    </div>
  );
}
