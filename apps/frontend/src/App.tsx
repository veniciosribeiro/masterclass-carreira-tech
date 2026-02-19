import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { LandingPageV2 } from './components/v2/LandingPageV2';
import { AdminDashboard } from './components/admin/Dashboard';

const AptitudeTest = React.lazy(() =>
  import('./components/test/AptitudeTest').then((m) => ({
    default: m.AptitudeTest,
  }))
);

const LoadingFallback = <div className="min-h-screen bg-background-dark" />;

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/v2" element={<LandingPageV2 />} />
      <Route
        path="/teste"
        element={
          <Suspense fallback={LoadingFallback}>
            <AptitudeTest />
          </Suspense>
        }
      />
      <Route
        path="/teste/:sessionId"
        element={
          <Suspense fallback={LoadingFallback}>
            <AptitudeTest />
          </Suspense>
        }
      />
      <Route
        path="/teste/:sessionId/:step"
        element={
          <Suspense fallback={LoadingFallback}>
            <AptitudeTest />
          </Suspense>
        }
      />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
};

export default App;
