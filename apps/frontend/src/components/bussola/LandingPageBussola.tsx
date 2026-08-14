import React, { Suspense } from 'react';
import { MetaPixel } from '../analytics/MetaPixel';
import { BUSSOLA_PIXEL_ID } from '../../utils/metaPixel';
import { BussolaHeader } from './BussolaHeader';
import { BussolaHero } from './BussolaHero';
import { BussolaOutcome } from './BussolaOutcome';
import { BussolaProblem } from './BussolaProblem';
import { BussolaModules } from './BussolaModules';
import { BussolaProvas } from './BussolaProvas';
import { BussolaEntregaveis } from './BussolaEntregaveis';
import { BussolaAuthority } from './BussolaAuthority';
import { BussolaPricing } from './BussolaPricing';

const BussolaGuarantee = React.lazy(() =>
  import('./BussolaGuarantee').then((m) => ({ default: m.BussolaGuarantee }))
);
const BussolaFAQ = React.lazy(() =>
  import('./BussolaFAQ').then((m) => ({ default: m.BussolaFAQ }))
);
const BussolaFooter = React.lazy(() =>
  import('./BussolaFooter').then((m) => ({ default: m.BussolaFooter }))
);

export const LandingPageBussola: React.FC = () => {
  return (
    <div className="min-h-screen font-display bg-background-dark text-text-main overflow-x-hidden antialiased">
      <MetaPixel pixelId={BUSSOLA_PIXEL_ID} />
      <BussolaHeader />
      <BussolaHero />
      <BussolaOutcome />
      <BussolaProblem />
      <BussolaModules />
      <BussolaProvas />
      <BussolaEntregaveis />
      <BussolaAuthority />
      <BussolaPricing />
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <BussolaGuarantee />
        <BussolaFAQ />
        <BussolaFooter />
      </Suspense>
    </div>
  );
};
