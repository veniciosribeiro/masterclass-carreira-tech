import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

/**
 * Cada rota é um chunk próprio: quem abre o webinário não baixa o código da
 * Bússola, do admin nem do teste. O plugin `routeHtml` (vite.config.ts) grava
 * um <link rel="modulepreload"> do chunk da rota em cada `dist/<rota>/index.html`,
 * então o chunk baixa em paralelo com o bundle principal, sem cascata.
 */
const LandingPage = React.lazy(() =>
  import('./components/LandingPage').then((m) => ({ default: m.LandingPage }))
);
const LandingPageV2 = React.lazy(() =>
  import('./components/v2/LandingPageV2').then((m) => ({
    default: m.LandingPageV2,
  }))
);
const LandingPageBussola = React.lazy(() =>
  import('./components/bussola/LandingPageBussola').then((m) => ({
    default: m.LandingPageBussola,
  }))
);
const LandingPageSemente = React.lazy(() =>
  import('./components/semente/LandingPageSemente').then((m) => ({
    default: m.LandingPageSemente,
  }))
);
const ObrigadoSemente = React.lazy(() =>
  import('./components/semente/ObrigadoSemente').then((m) => ({
    default: m.ObrigadoSemente,
  }))
);
const PrivacyPolicy = React.lazy(() =>
  import('./components/legal/PrivacyPolicy').then((m) => ({
    default: m.PrivacyPolicy,
  }))
);
const AdminDashboard = React.lazy(() =>
  import('./components/admin/Dashboard').then((m) => ({
    default: m.AdminDashboard,
  }))
);
const AdminResultDetail = React.lazy(() =>
  import('./components/admin/AdminResultDetail').then((m) => ({
    default: m.AdminResultDetail,
  }))
);
const AptitudeTest = React.lazy(() =>
  import('./components/test/AptitudeTest').then((m) => ({
    default: m.AptitudeTest,
  }))
);

const LoadingFallback = <div className="min-h-screen bg-background-dark" />;

const App: React.FC = () => {
  return (
    <Suspense fallback={LoadingFallback}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/v2" element={<LandingPageV2 />} />
        <Route
          path="/bussola-aceleracao-de-carreira-para-desenvolvedores"
          element={<LandingPageBussola />}
        />
        <Route
          path="/webinario-carreira-tech"
          element={<LandingPageSemente />}
        />
        <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
        <Route
          path="/webinario-carreira-tech/obrigado"
          element={<ObrigadoSemente />}
        />
        <Route path="/teste" element={<AptitudeTest />} />
        <Route path="/teste/:sessionId" element={<AptitudeTest />} />
        <Route path="/teste/:sessionId/:step" element={<AptitudeTest />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/resultado/:id" element={<AdminResultDetail />} />
      </Routes>
    </Suspense>
  );
};

export default App;
