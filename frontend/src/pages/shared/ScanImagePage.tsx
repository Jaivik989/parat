import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Image as ImageIcon, Lightbulb, CheckCircle2 } from 'lucide-react';
import { UserRole, ScanResult } from '../../types';
import { apiUrl } from '../../config/api';

const normalizeKey = (key: string) => key.replace(/[^a-zA-Z]/g, '').toLowerCase();

function findValue(value: unknown, keys: string[], depth = 0): unknown {
  if (!value || typeof value !== 'object' || depth > 3) return undefined;

  const object = value as Record<string, unknown>;
  const normalizedKeys = keys.map(normalizeKey);
  const matchingKey = Object.keys(object).find((key) => normalizedKeys.includes(normalizeKey(key)));
  if (matchingKey) return object[matchingKey];

  for (const child of Object.values(object)) {
    const found = findValue(child, keys, depth + 1);
    if (found !== undefined) return found;
  }

  return undefined;
}

function toNumber(value: unknown): number | null {
  const number = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(number)) return null;
  return number;
}

function toPercentage(value: unknown, total: number | null): number | null {
  const number = toNumber(value);
  if (number === null) return null;
  const percentage = total && total > 0 && number <= total ? (number / total) * 100 : number <= 1 ? number * 100 : number;
  return Math.round(Math.max(0, Math.min(100, percentage)));
}

function toScanResult(payload: unknown): ScanResult {
  const total = toNumber(findValue(payload, ['total_count', 'total', 'count']));
  if (total === 0) throw new Error('No onions were detected in this image.');

  const healthyCount = toNumber(findValue(payload, ['healthy', 'healthy_count', 'healthy_percentage', 'healthy_percent', 'good']));
  const rottenCount = toNumber(findValue(payload, ['rotten', 'rotten_count', 'rotten_percentage', 'rotten_percent', 'rot']));
  const sproutedCount = toNumber(findValue(payload, ['sprouted', 'sprouted_count', 'sprouted_percentage', 'sprouted_percent', 'sprout']));
  const damagedCount = toNumber(findValue(payload, ['damaged', 'damaged_count', 'damaged_percentage', 'damaged_percent', 'damage']));
  const derivedDamagedCount = total === null || healthyCount === null || rottenCount === null || sproutedCount === null
    ? null
    : Math.max(0, total - healthyCount - rottenCount - sproutedCount);

  const healthy = toPercentage(healthyCount, total);
  const rotten = toPercentage(rottenCount, total);
  const sprouted = toPercentage(sproutedCount, total);
  const damaged = toPercentage(damagedCount ?? derivedDamagedCount, total);

  if (healthy === null || rotten === null || sprouted === null || damaged === null) {
    throw new Error('The backend response did not include all quality metrics.');
  }

  const gradeValue = findValue(payload, ['grade', 'quality_grade', 'quality'])
    ?.toString()
    .toUpperCase()
    .match(/[ABC]/)?.[0];
  const grade = gradeValue === 'A' || gradeValue === 'B' || gradeValue === 'C'
    ? gradeValue
    : healthy >= 80
      ? 'A'
      : healthy >= 60
        ? 'B'
        : 'C';

  return { healthy, rotten, sprouted, damaged, grade };
}

// Shared scan page used by both Farmer and Procurement Centre flows.
// "Take a Photo" opens the device camera (capture="environment").
// "Upload from Gallery" opens a normal file picker.
export default function ScanImagePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = (location.state as { role?: UserRole })?.role;

  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File | null) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setResult(null);
    setError(null);
    setAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(apiUrl('/predict'), {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Prediction failed (${response.status})`);
      }

      const payload = await response.json();
      setResult(toScanResult(payload));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to analyze this image.');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleDone = () => {
    navigate(role === 'procurement' ? '/procurement/dashboard' : '/farmer/dashboard');
  };

  const reset = () => {
    setPreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-cream px-6 pt-6 pb-10">
      <button onClick={() => navigate(-1)} className="text-gray-800 mb-4">
        <ArrowLeft size={22} />
      </button>

      <h1 className="text-3xl font-extrabold mb-2">Scan Your Onions</h1>
      <p className="text-gray-500 mb-6">Upload or capture a photo to get quality analysis and price evaluation.</p>

      {!preview && (
        <div className="space-y-4">
          <button
            onClick={() => cameraInputRef.current?.click()}
            className="w-full border-2 border-dashed border-primary/30 rounded-2xl py-8 flex flex-col items-center gap-2 bg-white/60"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white">
              <Camera size={26} />
            </div>
            <p className="font-bold">Take a Photo</p>
            <p className="text-sm text-gray-500">Use your camera to capture</p>
          </button>

          <button
            onClick={() => galleryInputRef.current?.click()}
            className="w-full border-2 border-dashed border-primary/30 rounded-2xl py-8 flex flex-col items-center gap-2 bg-white/60"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white">
              <ImageIcon size={26} />
            </div>
            <p className="font-bold">Upload from Gallery</p>
            <p className="text-sm text-gray-500">Choose an image from your device</p>
          </button>

          <div className="bg-white rounded-2xl p-4 mt-2">
            <p className="font-bold flex items-center gap-2 mb-2">
              <Lightbulb size={18} className="text-amber-400" /> Tips for better results
            </p>
            <ul className="text-sm text-gray-500 list-disc list-inside space-y-1">
              <li>Use good lighting</li>
              <li>Keep onions clearly visible</li>
              <li>Place on a plain background</li>
              <li>Capture multiple onions together</li>
            </ul>
          </div>
        </div>
      )}

      {preview && (
        <div className="space-y-4">
          <div className="rounded-2xl overflow-hidden bg-white border border-gray-100">
            <img src={preview} alt="Selected onions" className="w-full h-56 object-cover" />
          </div>

          {analyzing && (
            <div className="flex items-center gap-3 bg-white rounded-2xl p-4 border border-gray-100">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-600 font-medium">Analyzing image with AI...</p>
            </div>
          )}

          {error && !analyzing && (
            <div className="bg-red-50 text-red-700 rounded-2xl p-4 border border-red-100">
              <p className="font-semibold">Could not analyze this image</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          )}

          {result && !analyzing && (
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <span className="inline-block bg-secondary text-white font-bold px-4 py-1.5 rounded-full mb-4">
                Grade {result.grade}
              </span>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-gray-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary" /> Healthy
                  </span>
                  <span className="font-semibold text-secondary">{result.healthy}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-gray-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary" /> Rotten
                  </span>
                  <span className="font-semibold text-primary">{result.rotten}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-gray-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Sprouted
                  </span>
                  <span className="font-semibold text-amber-500">{result.sprouted}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-gray-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-gray-400" /> Damaged
                  </span>
                  <span className="font-semibold text-gray-500">{result.damaged}%</span>
                </div>
              </div>

              <button
                onClick={handleDone}
                className="w-full mt-5 bg-primary text-white font-semibold py-3 rounded-2xl flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={18} /> Save &amp; Go to Dashboard
              </button>
            </div>
          )}

          <button onClick={reset} className="w-full text-primary font-medium py-2">
            Scan another onion
          </button>
        </div>
      )}

      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}
