import React, { Suspense } from 'react';
import { HeroV2 } from './HeroV2';
import { DiagnosisV2 } from './DiagnosisV2';
import { MindsetShiftV2 } from './MindsetShiftV2';
import { MethodologyV2 } from './MethodologyV2';
import { AuthorityV2 } from './AuthorityV2';
import { OfferV2 } from './OfferV2';
import { FinalCTA_V2 } from './FinalCTA_V2';
import { Header } from '../Header'; // Reuse Header
// Reuse Footer from v1 as it is generic enough or import lazily

const Footer = React.lazy(() => import('../Footer').then(m => ({ default: m.Footer })));
const Guarantee = React.lazy(() => import('../Guarantee').then(m => ({ default: m.Guarantee })));
const FAQ = React.lazy(() => import('../FAQ').then(m => ({ default: m.FAQ })));


export const LandingPageV2: React.FC = () => {
    return (
        <div className="min-h-screen font-display bg-background-dark text-text-main overflow-x-hidden antialiased">
            <Header />
            <HeroV2 />
            <DiagnosisV2 />
            <MindsetShiftV2 />
            <MethodologyV2 />
            <AuthorityV2 />
            <OfferV2 />
            <Suspense fallback={<div className="min-h-[200px]" />}>
                <Guarantee />
                <FAQ />
            </Suspense>
            <FinalCTA_V2 />
            <Suspense fallback={<div className="min-h-[100px]" />}>
                <Footer />
            </Suspense>
        </div>
    );
};
