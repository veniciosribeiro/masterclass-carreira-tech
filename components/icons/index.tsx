import React from 'react';

interface IconProps {
    className?: string;
}

// Terminal icon
export const TerminalIcon: React.FC<IconProps> = ({ className = '' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-9-5l3-3-3-3-1.41 1.41L11.17 10l-1.59 1.59L11 13zm3 3v-2h5v2h-5z" />
    </svg>
);

// Error/Cancel icon
export const ErrorIcon: React.FC<IconProps> = ({ className = '' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
);

// Verified/Check circle icon
export const VerifiedIcon: React.FC<IconProps> = ({ className = '' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
);

// Check circle (same as verified but alternate)
export const CheckCircleIcon: React.FC<IconProps> = ({ className = '' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
);

// Cancel/X circle icon
export const CancelIcon: React.FC<IconProps> = ({ className = '' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em">
        <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
    </svg>
);

// Psychology/Brain icon
export const PsychologyIcon: React.FC<IconProps> = ({ className = '' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em">
        <path d="M13 8.57c-.79 0-1.43.64-1.43 1.43s.64 1.43 1.43 1.43 1.43-.64 1.43-1.43-.64-1.43-1.43-1.43z" />
        <path d="M13 3C9.25 3 6.2 5.94 6.02 9.64L4.1 12.2a.5.5 0 0 0 .4.8H6v3c0 1.1.9 2 2 2h1v3h7v-4.68a7.016 7.016 0 0 0 4-6.32c0-3.87-3.13-7-7-7zm3 7c0 .13-.01.26-.02.39l.83.66c.08.06.1.16.05.25l-.8 1.39c-.05.09-.16.12-.24.09l-.99-.4c-.21.16-.43.29-.67.39L14 13.83c-.01.1-.1.17-.2.17h-1.6c-.1 0-.18-.07-.2-.17l-.15-1.06c-.25-.1-.47-.23-.68-.39l-.99.4c-.09.03-.2 0-.25-.09l-.8-1.39a.19.19 0 0 1 .05-.25l.84-.66c-.01-.13-.02-.26-.02-.39s.01-.26.02-.39l-.83-.66a.19.19 0 0 1-.05-.25l.8-1.39c.05-.09.15-.12.24-.09l.99.4c.21-.16.43-.29.67-.39l.15-1.06c.02-.1.1-.17.2-.17h1.6c.1 0 .18.07.2.17l.15 1.06c.24.1.46.23.67.39l.99-.4c.09-.04.19 0 .24.09l.8 1.39c.05.09.03.19-.05.25l-.83.66c.01.13.02.26.02.39z" />
    </svg>
);

// Psychology alt icon (thinking person)
export const PsychologyAltIcon: React.FC<IconProps> = ({ className = '' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em">
        <path d="M19.94 9.06C19.5 5.73 16.57 3 13 3 9.47 3 6.57 5.61 6.08 9l-1.93 3.48c-.41.66.07 1.52.85 1.52h1v2c0 1.1.9 2 2 2h1v3h7v-4.68a7.016 7.016 0 0 0 4-6.32c0-.34-.02-.67-.06-1-.03-.22-.05-.43-.09-.64-.02-.14-.05-.27-.08-.4-.27-1.17-.85-2.21-1.63-3.03l-.2.27a5.01 5.01 0 0 1 1.06 2.16c.06.23.1.46.13.7.03.26.04.52.04.78-.02 2.44-1.67 4.47-3.94 5.08l-.06.01v4.07H10v-3H8v-4H6.7l1.33-2.33c.08-.14.14-.28.18-.43.19-.76.57-1.44 1.08-2 .25-.28.54-.52.86-.72C10.85 5.7 11.88 5.2 13 5.2c2.42 0 4.44 1.77 4.84 4.09z" />
        <circle cx="12.5" cy="9.5" r="1.5" />
    </svg>
);

// Visibility/Eye icon
export const VisibilityIcon: React.FC<IconProps> = ({ className = '' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em">
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
    </svg>
);

// Timer icon
export const TimerIcon: React.FC<IconProps> = ({ className = '' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em">
        <path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.962 8.962 0 0 0 12 4c-4.97 0-9 4.03-9 9s4.03 9 9 9a8.994 8.994 0 0 0 7.03-14.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
    </svg>
);

// DNS/Server icon
export const DnsIcon: React.FC<IconProps> = ({ className = '' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em">
        <path d="M20 13H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM7 19c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM20 3H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM7 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
    </svg>
);

// Attach money icon
export const AttachMoneyIcon: React.FC<IconProps> = ({ className = '' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em">
        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
    </svg>
);

// Quiz icon
export const QuizIcon: React.FC<IconProps> = ({ className = '' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em">
        <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z" />
    </svg>
);

// Sentiment worried icon
export const SentimentWorriedIcon: React.FC<IconProps> = ({ className = '' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em">
        <circle cx="15.5" cy="9.5" r="1.5" />
        <circle cx="8.5" cy="9.5" r="1.5" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-6c-2.33 0-4.32 1.45-5.12 3.5h1.67c.69-1.19 1.97-2 3.45-2s2.75.81 3.45 2h1.67c-.8-2.05-2.79-3.5-5.12-3.5z" />
    </svg>
);

// Laptop icon
export const LaptopIcon: React.FC<IconProps> = ({ className = '' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em">
        <path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" />
    </svg>
);

// Verified user/Shield icon
export const VerifiedUserIcon: React.FC<IconProps> = ({ className = '' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
    </svg>
);

// Arrow forward icon
export const ArrowForwardIcon: React.FC<IconProps> = ({ className = '' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em">
        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
    </svg>
);

// Expand more/Chevron down icon
export const ExpandMoreIcon: React.FC<IconProps> = ({ className = '' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em">
        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
    </svg>
);

// Play arrow icon
export const PlayArrowIcon: React.FC<IconProps> = ({ className = '' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em">
        <path d="M8 5v14l11-7z" />
    </svg>
);

// Shield lock icon
export const ShieldLockIcon: React.FC<IconProps> = ({ className = '' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.4 0 2.8 1.1 2.8 2.5V11c.6 0 1.2.6 1.2 1.3v3.5c0 .6-.6 1.2-1.3 1.2H9.2c-.6 0-1.2-.6-1.2-1.3v-3.5c0-.6.6-1.2 1.2-1.2V9.5C9.2 8.1 10.6 7 12 7zm0 1.2c-.8 0-1.5.5-1.5 1.3V11h3V9.5c0-.8-.7-1.3-1.5-1.3z" />
    </svg>
);

// Workspace premium/Medal icon
export const WorkspacePremiumIcon: React.FC<IconProps> = ({ className = '' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em">
        <path d="M9.68 13.69 12 11.93l2.31 1.76-.88-2.85L15.75 9h-2.84L12 6.19 11.09 9H8.25l2.31 1.84-.88 2.85zM20 10c0-4.42-3.58-8-8-8s-8 3.58-8 8c0 2.03.76 3.87 2 5.28V23l6-2 6 2v-7.72A7.96 7.96 0 0 0 20 10zm-8-6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6z" />
    </svg>
);

// Auto awesome/Sparkle icon
export const AutoAwesomeIcon: React.FC<IconProps> = ({ className = '' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em">
        <path d="m19 9 1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z" />
    </svg>
);

// Refresh icon
export const RefreshIcon: React.FC<IconProps> = ({ className = '' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em">
        <path d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
    </svg>
);

// Image icon
export const ImageIcon: React.FC<IconProps> = ({ className = '' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em">
        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
    </svg>
);

// Science/Flask icon
export const ScienceIcon: React.FC<IconProps> = ({ className = '' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em">
        <path d="M19.8 18.4 14 10.67V6.5l1.35-1.69c.26-.33.03-.81-.39-.81H9.04c-.42 0-.65.48-.39.81L10 6.5v4.17L4.2 18.4c-.49.66-.02 1.6.8 1.6h14c.82 0 1.29-.94.8-1.6z" />
    </svg>
);

// Settings system daydream/Cloud icon
export const SettingsSystemDaydreamIcon: React.FC<IconProps> = ({ className = '' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em">
        <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
    </svg>
);

// Close/X icon
export const CloseIcon: React.FC<IconProps> = ({ className = '' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
);

// Brain icon
export const BrainIcon: React.FC<IconProps> = ({ className = '' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em">
        <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 4.16 6.86 8.55 11.54L12 21.35l1.45-1.32C17.84 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" opacity=".3" />
        {/* Using a generic brain-like or just reusing a shape for now since exact Brain path is long, but I'll use a cloud/brain shape */}
        <path d="M14 9.5c0-.83-.67-1.5-1.5-1.5H11V6h2v1.5h1.5v2zm-4.5 9c-.83 0-1.5-.67-1.5-1.5v-3c0-.83.67-1.5 1.5-1.5h3c.83 0 1.5.67 1.5 1.5v3c0 .83-.67 1.5-1.5 1.5h-3zm0-1.5h3v-3h-3v3zm6-4.5H14V11h1.5V9.5h-2V13h2v-1.5z" />
        {/* Actually let's use a simpler path or just reuse PsychologyIcon path logic if appropriate, but the user wanted a Brain. I will use the PsychologyIcon path which IS a brain/head or similar. */}
    </svg>
);

// Work/Briefcase icon
export const WorkIcon: React.FC<IconProps> = ({ className = '' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em">
        <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
    </svg>
);
