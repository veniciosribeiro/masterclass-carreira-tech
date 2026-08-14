import React, { useEffect } from 'react';
import { trackPageView } from '../../utils/metaPixel';

interface MetaPixelProps {
  pixelId: string;
}

/**
 * Monta o Meta Pixel do público correspondente a esta página.
 * Cada rota deve montar apenas o pixel do seu próprio público
 * (nunca dois pixels na mesma página) para não misturar audiências.
 */
export const MetaPixel: React.FC<MetaPixelProps> = ({ pixelId }) => {
  useEffect(() => {
    trackPageView(pixelId);
  }, [pixelId]);

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  );
};
