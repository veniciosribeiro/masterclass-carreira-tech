import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { LandingPageV2 } from './components/v2/LandingPageV2';
import { LandingPageBussola } from './components/bussola/LandingPageBussola';
import { LandingPageSemente } from './components/semente/LandingPageSemente';
import { ObrigadoSemente } from './components/semente/ObrigadoSemente';
import { AdminDashboard } from './components/admin/Dashboard';
import { AdminResultDetail } from './components/admin/AdminResultDetail';

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
        path="/bussola-aceleracao-de-carreira-para-desenvolvedores"
        element={<LandingPageBussola />}
      />
      <Route path="/webinario-carreira-tech" element={<LandingPageSemente />} />
      <Route
        path="/webinario-carreira-tech/obrigado"
        element={<ObrigadoSemente />}
      />
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
      <Route path="/admin/resultado/:id" element={<AdminResultDetail />} />
    </Routes>
  );
};

export default App;
