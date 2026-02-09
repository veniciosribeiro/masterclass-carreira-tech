import React, { Suspense } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { RealityCheck } from './components/RealityCheck';
import { LucasProfile } from './components/LucasProfile';
import { Modules } from './components/Modules';
import { Syllabus } from './components/Syllabus';
import { Authority } from './components/Authority';
import { Pricing } from './components/Pricing';

// Lazy load below-fold components for better initial load
const Guarantee = React.lazy(() => import('./components/Guarantee').then(m => ({ default: m.Guarantee })));
const Offer = React.lazy(() => import('./components/Offer').then(m => ({ default: m.Offer })));
const FAQ = React.lazy(() => import('./components/FAQ').then(m => ({ default: m.FAQ })));
const Footer = React.lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));

const App: React.FC = () => {
  return (
    <div className="min-h-screen font-display bg-background-dark text-text-main overflow-x-hidden antialiased">
      <Header />
      <Hero />
      <RealityCheck />
      <LucasProfile />
      <Modules />
      <Syllabus />
      <Pricing />
      <Authority />
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <FAQ />
        <Guarantee />
        <Offer />
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;