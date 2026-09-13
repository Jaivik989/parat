# Parat — SIH26031 Frontend

React + TypeScript + Tailwind CSS frontend for the onion grading/procurement
app, built with Vite. Every screen is its own page component under
`src/pages/`, wired together with `react-router-dom`.

## 1. Prerequisites

- Node.js 18 or newer
- npm (comes with Node)

Check your version:

```bash
node -v
npm -v
```

## 2. Create / open the project

Unzip the project you downloaded, then open a terminal in that folder:

```bash
cd parat
```

## 3. Install dependencies

```bash
npm install
```

This pulls in React, React Router, Tailwind, `lucide-react` (icons), and the
Appwrite Web SDK.

## 4. Run it locally

```bash
npm run dev
```

During local development, the frontend uses a same-origin `/api` proxy that
forwards requests to `http://172.20.233.50:8000`. This avoids requiring CORS
configuration in the backend. To override the frontend API base path, create a
`.env` file from `.env.example`:

```bash
VITE_API_BASE_URL=/api
```

Restart Vite after changing `.env`. The backend must listen on the laptop's
network interface (not only `127.0.0.1`).

For Appwrite phone OTP authentication, add these values to `.env`:

```bash
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
```

The Appwrite Web platform must include `localhost`. If you open the app using
the network URL `http://172.20.233.50:5173`, add `172.20.233.50` as another
Appwrite Web platform hostname. Never add an Appwrite API key to the frontend.

Vite will print a local URL, usually:

```
http://localhost:5173
```

Open that in your browser. On your phone (same Wi-Fi), you can also open
`http://<your-computer-ip>:5173` since the dev server is configured with
`host: true`. This lets you test the camera capture buttons on an actual
phone.

## 5. Build for production

```bash
npm run build
```

Output goes to `dist/`. Preview the production build with:

```bash
npm run preview
```

## Project structure

```
src/
  main.tsx                 entry point, wraps <App /> in BrowserRouter
  App.tsx                  ALL routes are registered here
  index.css                Tailwind directives + base styles
  types/index.ts           shared TypeScript types (UserRole, LotRecord...)
  data/mockData.ts         mock lot data + grade badge color map
  components/
    BottomNav.tsx          reusable bottom tab bar (Home/History/Scan/...)
    OnboardingLayout.tsx    shared skeleton for the 3 onboarding slides
  pages/
    onboarding/            Splash, Scan/Know/Connect intro slides (pages 1-4)
    auth/                  Login, Verify OTP, Role selection (pages 5-7)
    shared/                SetupComplete, ScanImage, Policies
                            (used by BOTH farmer and procurement flows)
    farmer/                FarmerInfo(details), FarmerDashboard,
                            FarmerProfile, FarmerReport, FarmerHistory
    procurement/            ProcurementLogin, ProcurementDashboard,
                            LotAnalysis
```

## Navigation flow implemented

```
Splash -> Scan intro -> Know intro -> Connect intro -> Login -> Verify OTP
  -> Role selection
       |
       |-- Farmer --> Farmer Details --> "All Set" --> Farmer Dashboard
       |                                                  |-- Profile
       |                                                  |-- Reports
       |                                                  |-- History
       |                                                  |-- Scan (camera/gallery)
       |                                                  |-- Policies
       |
       |-- Procurement Centre --> Procurement Login --> "All Set"
                                     --> Procurement Dashboard
                                            |-- Lots Analysis
                                            |-- Scan (camera/gallery)
                                            |-- Policies
```

The Scan page is shared: "Take a Photo" uses
`<input type="file" accept="image/*" capture="environment" />` which opens
the device camera on mobile browsers, and "Upload from Gallery" uses a plain
`<input type="file" accept="image/*" />` which opens the OS file picker.

## Adding a new page later

1. Create a component, e.g. `src/pages/farmer/FarmerSettingsPage.tsx`.
2. Import it in `src/App.tsx`.
3. Add a route:
   ```tsx
   <Route path="/farmer/settings" element={<FarmerSettingsPage />} />
   ```
4. If it needs a bottom-nav or button entry point, add a `navigate('/farmer/settings')`
   call or a new item in the relevant `BottomNav items={[...]}` array.

That's it — no other file needs to change, since every page is decoupled.

## Backend integration notes

- `src/config/api.ts` exports `API_BASE_URL` and `apiUrl()` for API calls.
- `src/data/mockData.ts` still holds hardcoded lot data.
- `ScanImagePage.tsx` still simulates AI grading with a `setTimeout`.
- Login and OTP verification use Appwrite phone authentication. The collected
  name is preserved through the flow but is not stored as a profile yet.
