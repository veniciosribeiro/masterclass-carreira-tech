/**
 * Single source of truth for human-readable profile labels and emojis.
 * The `profile` field stored in the DB uses these keys (e.g. "backend_dataAI").
 * Use `getProfileLabel` / `getProfileEmoji` wherever you display a profile.
 */
export const PROFILE_LABELS: Record<string, { label: string; emoji: string }> =
  {
    frontend: { label: 'Desenvolvedor Front-End', emoji: '🎨' },
    backend: { label: 'Desenvolvedor Back-End', emoji: '⚙️' },
    dataAI: { label: 'Especialista em Dados & IA', emoji: '📊' },
    frontend_backend: { label: 'Desenvolvedor Full-Stack', emoji: '🚀' },
    frontend_dataAI: {
      label: 'Especialista em Visualização de Dados',
      emoji: '📈',
    },
    backend_dataAI: { label: 'Engenheiro de Dados', emoji: '🔧' },
    generalist: { label: 'Perfil Generalista', emoji: '🌐' },
  };

export function getProfileLabel(key: string): string {
  return PROFILE_LABELS[key]?.label ?? key;
}

export function getProfileEmoji(key: string): string {
  return PROFILE_LABELS[key]?.emoji ?? '💻';
}

/**
 * Color of each technical area, the same on the results screen and in the
 * admin (bars, percentages). `soft` is the color at 10% for backgrounds.
 */
export const AREA_COLORS: Record<
  'frontend' | 'backend' | 'dataAI',
  { color: string; soft: string }
> = {
  frontend: { color: '#19e65e', soft: 'rgba(25,230,94,0.1)' },
  backend: { color: '#3b82f6', soft: 'rgba(59,130,246,0.1)' },
  dataAI: { color: '#a855f7', soft: 'rgba(168,85,247,0.1)' },
};
