import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { RealityCheck } from './components/RealityCheck';
import { LucasProfile } from './components/LucasProfile';
import { Modules } from './components/Modules';
import { Syllabus } from './components/Syllabus';
import { Authority } from './components/Authority';
import { Pricing } from './components/Pricing';
import { Guarantee } from './components/Guarantee';
import { Offer } from './components/Offer';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';

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
      <FAQ />
      <Guarantee />
      <Offer />
      <Footer />
    </div>
  );
};

export default App;