import React, { Suspense } from 'react';
import { PageTitle } from '../seo/PageTitle';
import { MetaPixel } from '../analytics/MetaPixel';
import { BUSSOLA_PIXEL_ID } from '../../utils/metaPixel';
import { SementeHeader } from './SementeHeader';
import { SementeHero } from './SementeHero';
import { SementeRealityCheck } from './SementeRealityCheck';
import { SementeProtocolOverview } from './SementeProtocolOverview';
import { SementeInscricao } from './SementeInscricao';
import { SementeAuthority } from './SementeAuthority';

const SementeFAQ = React.lazy(() =>
  import('./SementeFAQ').then((m) => ({ default: m.SementeFAQ }))
);
const SementeFooter = React.lazy(() =>
  import('./SementeFooter').then((m) => ({ default: m.SementeFooter }))
);

export const LandingPageSemente: React.FC = () => {
  return (
    <div className="min-h-screen font-display bg-background-dark text-text-main overflow-x-hidden antialiased">
      <PageTitle title="Webinário Gratuito — Aceleração de Carreira Para Desenvolvedores" />
      <MetaPixel pixelId={BUSSOLA_PIXEL_ID} />
      <SementeHeader />
      <SementeHero />
      <SementeRealityCheck />
      <SementeProtocolOverview />
      <SementeInscricao />
      <SementeAuthority />
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <SementeFAQ />
        <SementeFooter />
      </Suspense>
    </div>
  );
};
