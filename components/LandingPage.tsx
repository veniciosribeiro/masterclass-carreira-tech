import React, { Suspense } from 'react';
import { Header } from './Header';
import { Hero } from './Hero';
import { RealityCheck } from './RealityCheck';
import { ProtocolOverview } from './ProtocolOverview';
import { Syllabus } from './Syllabus';
import { Authority } from './Authority';
import { Pricing } from './Pricing';

// Lazy load below-fold components for better initial load
const Guarantee = React.lazy(() => import('./Guarantee').then(m => ({ default: m.Guarantee })));
const FAQ = React.lazy(() => import('./FAQ').then(m => ({ default: m.FAQ })));
const Footer = React.lazy(() => import('./Footer').then(m => ({ default: m.Footer })));

export const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen font-display bg-background-dark text-text-main overflow-x-hidden antialiased">
            <Header />
            <Hero />
            <RealityCheck />
            <ProtocolOverview />
            <Syllabus />
            <Pricing />
            <Authority />
            <Suspense fallback={<div className="min-h-[200px]" />}>
                <Guarantee />
                <FAQ />
                <Footer />
            </Suspense>
        </div>
    );
};
