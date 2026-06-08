import React from "react";

const defaultProps = {
  size: 24,
  color: "#1a7a6e",
  strokeWidth: 2.2,
};

// ── CATEGORIE ANIMALI ──────────────────────────────────────────

export const IconTutti = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
);

export const IconCani = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="15" rx="7" ry="5"/>
    <circle cx="12" cy="8" r="4.5"/>
    <path d="M9 4.5Q6 2 7.5 6"/>
    <path d="M15 4.5Q18 2 16.5 6"/>
    <ellipse cx="12" cy="8.5" rx="1.2" ry="0.8" fill={color} stroke="none"/>
    <circle cx="10.5" cy="7" r="0.7" fill={color} stroke="none"/>
    <circle cx="13.5" cy="7" r="0.7" fill={color} stroke="none"/>
    <path d="M18 13Q22 11 21 7"/>
    <path d="M8 19.5V23"/>
    <path d="M10.5 20V23"/>
    <path d="M13.5 20V23"/>
    <path d="M16 19.5V23"/>
  </svg>
);

export const IconGatti = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="15" rx="6.5" ry="5"/>
    <circle cx="12" cy="8" r="4.5"/>
    <polygon points="8,4.5 6,1 10,3.5" stroke={color} strokeWidth={strokeWidth} fill="none"/>
    <polygon points="16,4.5 18,1 14,3.5" stroke={color} strokeWidth={strokeWidth} fill="none"/>
    <polygon points="12,10 10.5,11.5 13.5,11.5" fill={color} stroke="none"/>
    <path d="M9.5,7.5 Q11,6 12.5,7.5 Q11,9 9.5,7.5Z" fill={color} stroke="none"/>
    <path d="M11.5,7.5 Q13,6 14.5,7.5 Q13,9 11.5,7.5Z" fill={color} stroke="none"/>
    <path d="M5,9 L9,9.5" strokeWidth="1.2"/>
    <path d="M5,10.5 L9,10" strokeWidth="1.2"/>
    <path d="M19,9 L15,9.5" strokeWidth="1.2"/>
    <path d="M19,10.5 L15,10" strokeWidth="1.2"/>
    <path d="M18,13Q22,15 21,19Q19,21 18,18"/>
    <path d="M7,19.5V23"/>
    <path d="M9.5,20V23"/>
    <path d="M14.5,20V23"/>
    <path d="M17,19.5V23"/>
  </svg>
);

export const IconUccelli = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="9" cy="14" rx="5.5" ry="5"/>
    <circle cx="16" cy="7" r="4"/>
    <path d="M20,6 L24,7 L20,8"/>
    <circle cx="17" cy="6" r="0.9" fill={color} stroke="none"/>
    <path d="M5,13 Q1,11 2,6 Q8,9 9,11"/>
    <path d="M4,16 L0,14"/>
    <path d="M4,17.5 L0,19"/>
    <path d="M10,19 L9,23 M9,23 L7,24 M9,23 L10,24 M9,23 L11,24" strokeWidth="1.4"/>
    <path d="M13,19 L12,23 M12,23 L10,24 M12,23 L12,24 M12,23 L14,24" strokeWidth="1.4"/>
  </svg>
);

export const IconPesci = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="10" cy="12" rx="8" ry="4.5"/>
    <path d="M18,7.5 L24,3 L24,21 L18,16.5Z"/>
    <path d="M5,7.5 Q8,3 12,5"/>
    <path d="M5,16.5 Q8,21 12,19"/>
    <circle cx="5" cy="10.5" r="1" fill={color} stroke="none"/>
    <path d="M2,14 Q6,17 10,15.5" strokeWidth="1.2"/>
  </svg>
);

export const IconRoditori = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="9" cy="15" rx="7" ry="5.5"/>
    <circle cx="17" cy="9" r="4"/>
    <circle cx="14" cy="3" r="3"/>
    <circle cx="18" cy="8" r="0.9" fill={color} stroke="none"/>
    <circle cx="21" cy="10" r="0.7" fill={color} stroke="none"/>
    <path d="M20,8.5 L24,6" strokeWidth="1.2"/>
    <path d="M20,10 L24,10" strokeWidth="1.2"/>
    <path d="M3,16 Q-2,19 -1,23 Q1,26 5,24"/>
    <path d="M5,20 L4,24"/>
    <path d="M9,21 L9,24"/>
    <path d="M13,20 L14,24"/>
  </svg>
);

export const IconRettili = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12,2 Q19,2 19,8 Q19,14 12,14 Q5,14 5,20 Q5,26 12,26"/>
    <ellipse cx="12" cy="0.5" rx="3.5" ry="2.5"/>
    <circle cx="13.5" cy="-0.5" r="0.9" fill={color} stroke="none"/>
    <path d="M12,-2 L12,-5 M12,-5 L10,-7 M12,-5 L14,-7" strokeWidth="1.6"/>
  </svg>
);

export const IconConigli = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="15.5" rx="6" ry="5.5"/>
    <circle cx="12" cy="8" r="4.5"/>
    <path d="M8.5,4 Q7,0 9.5,1.5 Q12,3 9.5,5"/>
    <path d="M15.5,4 Q17,0 14.5,1.5 Q12,3 14.5,5"/>
    <circle cx="10.5" cy="8.5" r="0.7" fill={color} stroke="none"/>
    <circle cx="13.5" cy="8.5" r="0.7" fill={color} stroke="none"/>
    <ellipse cx="12" cy="10" rx="1" ry="0.8" fill={color} stroke="none"/>
    <circle cx="18" cy="14" r="2"/>
    <path d="M7,20.5V24"/>
    <path d="M9.5,21V24"/>
    <path d="M14.5,21V24"/>
    <path d="M17,20.5V24"/>
  </svg>
);

export const IconCavalli = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    {/* testa ovale */}
    <ellipse cx="12" cy="13" rx="6.5" ry="9"/>
    {/* orecchie appuntite */}
    <path d="M7.5,5.5 L5.5,0 L10,3.5"/>
    <path d="M16.5,5.5 L18.5,0 L14,3.5"/>
    {/* occhi */}
    <circle cx="9.5" cy="10" r="0.8" fill={color} stroke="none"/>
    <circle cx="14.5" cy="10" r="0.8" fill={color} stroke="none"/>
    {/* narici */}
    <path d="M9.5,18 Q7.5,19 9.5,20" strokeWidth="1.4"/>
    <path d="M14.5,18 Q16.5,19 14.5,20" strokeWidth="1.4"/>
    {/* criniera laterale sinistra */}
    <path d="M5.5,7 Q1,9 2,13" strokeWidth="1.8"/>
    <path d="M5.5,10 Q0,13 1,17" strokeWidth="1.8"/>
    <path d="M5.5,13 Q1,17 3,20" strokeWidth="1.8"/>
  </svg>
);

export const IconAltri = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    {/* testa tonda maialino */}
    <circle cx="12" cy="11" r="8"/>
    {/* orecchie triangolari */}
    <path d="M6,4.5 L4,0 L10,3"/>
    <path d="M18,4.5 L20,0 L14,3"/>
    {/* occhi */}
    <circle cx="9" cy="9" r="0.9" fill={color} stroke="none"/>
    <circle cx="15" cy="9" r="0.9" fill={color} stroke="none"/>
    {/* grugno */}
    <ellipse cx="12" cy="14" rx="4" ry="3"/>
    <circle cx="10.5" cy="14" r="0.9" fill={color} stroke="none"/>
    <circle cx="13.5" cy="14" r="0.9" fill={color} stroke="none"/>
  </svg>
);

// ── CATEGORIE MERCEOLOGICHE ────────────────────────────────────

export const IconAlimenti = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3,13 Q3,21 12,21 Q21,21 21,13Z"/>
    <line x1="2" y1="13" x2="22" y2="13"/>
    <rect x="8" y="4" width="3.5" height="3.5" rx="1" fill={color} stroke="none"/>
    <rect x="13" y="1.5" width="3.5" height="3.5" rx="1" fill={color} stroke="none"/>
    <rect x="3.5" y="0.5" width="3.5" height="3.5" rx="1" fill={color} stroke="none"/>
    <line x1="9.5" y1="8.5" x2="9.5" y2="11" strokeWidth="1.3" strokeDasharray="2,1.5"/>
    <line x1="14.5" y1="6" x2="14.5" y2="8.5" strokeWidth="1.3" strokeDasharray="2,1.5"/>
    <line x1="5" y1="5" x2="5" y2="7.5" strokeWidth="1.3" strokeDasharray="2,1.5"/>
  </svg>
);

export const IconAccessori = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M6,9 Q6,3 12,3 Q18,3 18,9"/>
    <rect x="2" y="9" width="20" height="13" rx="2"/>
    <circle cx="12" cy="15.5" r="2.5"/>
    <line x1="12" y1="13" x2="12" y2="9"/>
  </svg>
);

export const IconIntegratori = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="8" width="22" height="8" rx="4"/>
    <path d="M1,8 Q1,16 5,16 L12,16 L12,8 Z" fill={color} stroke="none"/>
    <line x1="12" y1="8" x2="12" y2="16"/>
    <rect x="1" y="8" width="22" height="8" rx="4"/>
  </svg>
);

export const IconIgiene = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12,1 Q20,8 20,15 Q20,21 12,21 Q4,21 4,15 Q4,8 12,1Z"/>
    <circle cx="20" cy="9" r="2.2"/>
    <circle cx="22.5" cy="15" r="1.6"/>
    <circle cx="19" cy="19" r="1.8"/>
  </svg>
);

export const IconAntiparassitari = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="7"/>
    <circle cx="12" cy="8" r="2.5"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
    <path d="M6.5,6.5 L2,2"/>
    <path d="M17.5,6.5 L22,2"/>
    <path d="M5,12 L1,10"/>
    <path d="M19,12 L23,10"/>
    <path d="M6.5,17.5 L3,21"/>
    <path d="M17.5,17.5 L21,21"/>
    <line x1="10" y1="9" x2="10" y2="15" stroke="white" strokeWidth="3"/>
    <line x1="14" y1="9" x2="14" y2="15" stroke="white" strokeWidth="3"/>
    <line x1="8.5" y1="12" x2="15.5" y2="12" strokeWidth="2"/>
  </svg>
);

export const IconAltro = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="1.8" fill={color} stroke="none"/>
    <circle cx="12" cy="12" r="1.8" fill={color} stroke="none"/>
    <circle cx="12" cy="19" r="1.8" fill={color} stroke="none"/>
  </svg>
);

// ── TAB BAR ───────────────────────────────────────────────────

export const IconHome = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M2,10 L12,2 L22,10"/>
    <path d="M5,10 L5,22 L19,22 L19,10"/>
    <path d="M9,22 L9,15 Q9,12 12,12 Q15,12 15,15 L15,22"/>
    <rect x="15" y="4" width="3.5" height="4.5" rx="0.5"/>
  </svg>
);

export const IconSalvati = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12,21 Q-2,12 2,5 Q5,0 12,6 Q19,0 22,5 Q26,12 12,21Z"/>
  </svg>
);

export const IconPubblica = ({ size = 32, color = "#ffffff", strokeWidth = 3 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="3" x2="12" y2="21"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
  </svg>
);

export const IconChat = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M2,3 Q2,1 4,1 L20,1 Q22,1 22,3 L22,15 Q22,17 20,17 L14,17 L9,22 L9,17 L4,17 Q2,17 2,15 Z"/>
    <circle cx="8" cy="9" r="1.2" fill={color} stroke="none"/>
    <circle cx="12" cy="9" r="1.2" fill={color} stroke="none"/>
    <circle cx="16" cy="9" r="1.2" fill={color} stroke="none"/>
  </svg>
);

export const IconProfilo = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="7" r="5"/>
    <path d="M2,22 Q2,15 12,15 Q22,15 22,22"/>
  </svg>
);

export const IconNoteLegali = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="2" x2="12" y2="22"/>
    <path d="M4,22 L20,22" strokeWidth="2.6"/>
    <line x1="2" y1="8" x2="22" y2="8"/>
    <line x1="2" y1="8" x2="2" y2="14"/>
    <line x1="22" y1="8" x2="22" y2="14"/>
    <path d="M-2,14 Q2,18 6,14" fill="none"/>
    <path d="M18,14 Q22,18 26,14" fill="none"/>
    <circle cx="12" cy="8" r="1.8" fill={color} stroke="none"/>
  </svg>
);
export const IconTermini = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="1" width="18" height="22" rx="2"/>
    <path d="M15,1 L15,7 L21,7"/>
    <line x1="7" y1="11" x2="17" y2="11" strokeWidth="1.4"/>
    <line x1="7" y1="14" x2="17" y2="14" strokeWidth="1.4"/>
    <line x1="7" y1="17" x2="13" y2="17" strokeWidth="1.4"/>
    <circle cx="16" cy="19" r="3"/>
    <circle cx="16" cy="19" r="1.2" fill={color} stroke="none"/>
  </svg>
);
export const IconPrivacy = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="11" width="14" height="11" rx="2"/>
    <path d="M8,11 L8,7 Q8,3 12,3 Q16,3 16,7 L16,11"/>
    <circle cx="12" cy="16" r="2"/>
    <line x1="12" y1="18" x2="12" y2="20" strokeWidth="2"/>
  </svg>
);
export const IconCookie = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="8" cy="8" r="1.5" fill={color} stroke="none"/>
    <circle cx="14" cy="9" r="1.5" fill={color} stroke="none"/>
    <circle cx="9" cy="14" r="1.5" fill={color} stroke="none"/>
    <circle cx="15" cy="15" r="1.2" fill={color} stroke="none"/>
    <circle cx="6" cy="13" r="1" fill={color} stroke="none"/>
  </svg>
);
export const IconDSA = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3,9 L3,15 L9,19 L9,5 Z"/>
    <path d="M9,7 L21,2 L21,22 L9,17"/>
    <path d="M21,8 Q24,10 24,12 Q24,14 21,16" strokeWidth="1.8"/>
    <line x1="3" y1="15" x2="3" y2="22"/>
  </svg>
);
export const IconVietati = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" strokeWidth="2.6"/>
    <rect x="5" y="10" width="14" height="4" rx="1" fill={color} stroke="none"/>
  </svg>
);
