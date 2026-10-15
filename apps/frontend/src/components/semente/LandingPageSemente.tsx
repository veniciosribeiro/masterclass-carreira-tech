import React from 'react';
import { PageTitle } from '../seo/PageTitle';
import { ROUTE_TITLES } from '../../seo/routeTitles';
import { MetaPixel } from '../analytics/MetaPixel';
import { BUSSOLA_PIXEL_ID } from '../../utils/metaPixel';
import { SementeHeader } from './SementeHeader';
import { SementeHero } from './SementeHero';
import { SementeRealityCheck } from './SementeRealityCheck';
import { SementeProtocolOverview } from './SementeProtocolOverview';
import { SementeInscricao } from './SementeInscricao';
import { SementeAuthority } from './SementeAuthority';
import { SementeFAQ } from './SementeFAQ';
import { SementeFooter } from './SementeFooter';

export const LandingPageSemente: React.FC = () => {
  return (
    <div className="min-h-screen font-display bg-background-dark text-text-main overflow-x-hidden antialiased">
      <PageTitle title={ROUTE_TITLES['/webinario-carreira-tech']} />
      <MetaPixel pixelId={BUSSOLA_PIXEL_ID} />
      <SementeHeader />
      <main>
        <SementeHero />
        <div className="defer-render">
          <SementeRealityCheck />
        </div>
        <div className="defer-render">
          <SementeProtocolOverview />
        </div>
        <div className="defer-render">
          <SementeInscricao />
        </div>
        <div className="defer-render">
          <SementeAuthority />
        </div>
        <div className="defer-render">
          <SementeFAQ />
        </div>
      </main>
      <SementeFooter />
    </div>
  );
};
