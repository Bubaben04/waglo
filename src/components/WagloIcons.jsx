import React from "react";

// ── CATEGORIE ANIMALI ──────────────────────────────────────────

export const IconTutti = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="-4 -4 56 56" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2"/>
    <rect x="28" y="4" width="16" height="16" rx="2"/>
    <rect x="4" y="28" width="16" height="16" rx="2"/>
    <rect x="28" y="28" width="16" height="16" rx="2"/>
  </svg>
);

export const IconCani = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="-4 -4 56 56" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M8,22 Q2,26 3,34 Q4,40 10,40" strokeWidth={strokeWidth}/>
    <path d="M40,22 Q46,26 45,34 Q44,40 38,40" strokeWidth={strokeWidth}/>
    <rect x="10" y="12" width="28" height="26" rx="8"/>
    <circle cx="18" cy="22" r="3" fill={color} stroke="none"/>
    <circle cx="30" cy="22" r="3" fill={color} stroke="none"/>
    <ellipse cx="24" cy="31" rx="7" ry="5"/>
    <ellipse cx="24" cy="31" rx="3" ry="2" fill={color} stroke="none"/>
    <path d="M18,37 Q24,43 30,37"/>
  </svg>
);

export const IconGatti = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="-4 -4 56 56" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="24" cy="26" r="18"/>
    <path d="M10,14 L4,2 L18,10"/>
    <path d="M38,14 L44,2 L30,10"/>
    <path d="M15,22 Q20,16 25,22 Q20,28 15,22Z" fill={color} stroke="none"/>
    <path d="M23,22 Q28,16 33,22 Q28,28 23,22Z" fill={color} stroke="none"/>
    <ellipse cx="24" cy="30" rx="4" ry="3"/>
    <circle cx="24" cy="30" r="1.5" fill={color} stroke="none"/>
    <path d="M6,26 L16,27" strokeWidth="1.4"/>
    <path d="M6,30 L16,29" strokeWidth="1.4"/>
    <path d="M42,26 L32,27" strokeWidth="1.4"/>
    <path d="M42,30 L32,29" strokeWidth="1.4"/>
  </svg>
);

export const IconUccelli = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="-4 -4 56 56" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="18" cy="28" rx="12" ry="10"/>
    <circle cx="32" cy="14" r="8"/>
    <path d="M38,12 L46,14 L38,16"/>
    <circle cx="34" cy="12" r="1.8" fill={color} stroke="none"/>
    <path d="M8,26 Q2,22 4,14 Q14,18 18,22"/>
    <path d="M7,32 L1,28"/>
    <path d="M7,36 L1,40"/>
    <path d="M20,38 L18,46 M18,46 L14,48 M18,46 L20,48 M18,46 L22,48" strokeWidth="1.4"/>
    <path d="M26,38 L24,46 M24,46 L20,48 M24,46 L24,48 M24,46 L28,48" strokeWidth="1.4"/>
  </svg>
);

export const IconPesci = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="-4 -4 56 56" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="20" cy="24" rx="16" ry="9"/>
    <path d="M36,15 L46,6 L46,42 L36,33Z"/>
    <path d="M18,14 Q26,8 34,12" strokeWidth="1.4"/>
    <path d="M18,34 Q26,40 34,36" strokeWidth="1.4"/>
    <circle cx="10" cy="21" r="2" fill={color} stroke="none"/>
  </svg>
);

export const IconRoditori = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="-4 -4 56 56" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="24" cy="30" r="16"/>
    <circle cx="10" cy="14" r="10"/>
    <circle cx="38" cy="14" r="10"/>
    <circle cx="18" cy="26" r="3" fill={color} stroke="none"/>
    <circle cx="30" cy="26" r="3" fill={color} stroke="none"/>
    <ellipse cx="24" cy="36" rx="4" ry="3"/>
    <circle cx="24" cy="36" r="1.5" fill={color} stroke="none"/>
    <path d="M8,38 L16,36" strokeWidth="1.3"/>
    <path d="M8,42 L16,40" strokeWidth="1.3"/>
    <path d="M40,38 L32,36" strokeWidth="1.3"/>
    <path d="M40,42 L32,40" strokeWidth="1.3"/>
  </svg>
);

export const IconRettili = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="-4 -4 56 56" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M24,4 Q44,12 44,24 Q44,36 24,42 Q4,36 4,24 Q4,12 24,4Z"/>
    <circle cx="15" cy="20" r="7"/>
    <circle cx="33" cy="20" r="7"/>
    <circle cx="15" cy="20" r="3" fill={color} stroke="none"/>
    <circle cx="33" cy="20" r="3" fill={color} stroke="none"/>
    <path d="M16,34 Q24,38 32,34" strokeWidth="1.4"/>
    <path d="M24,38 L24,46"/>
    <path d="M24,46 L18,52"/>
    <path d="M24,46 L30,52"/>
  </svg>
);

export const IconConigli = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="-4 -4 56 56" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="24" cy="34" rx="18" ry="14"/>
    <path d="M16,22 Q13,2 17,0 Q21,-2 23,0 Q25,2 22,22" />
    <path d="M32,22 Q35,2 31,0 Q27,-2 25,0 Q23,2 26,22"/>
    <circle cx="17" cy="28" r="3" fill={color} stroke="none"/>
    <circle cx="31" cy="28" r="3" fill={color} stroke="none"/>
    <path d="M20,36 Q24,32 28,36 Q26,40 24,40 Q22,40 20,36Z" fill={color} stroke="none"/>
    <path d="M20,36 Q16,42 18,46" strokeWidth="1.3"/>
    <path d="M28,36 Q32,42 30,46" strokeWidth="1.3"/>
  </svg>
);

export const IconCavalli = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="-4 -4 56 56" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="24" cy="28" rx="16" ry="18"/>
    <path d="M10,14 L6,2 L18,10"/>
    <path d="M38,14 L42,2 L30,10"/>
    <circle cx="17" cy="22" r="2.5" fill={color} stroke="none"/>
    <circle cx="31" cy="22" r="2.5" fill={color} stroke="none"/>
    <path d="M17,36 Q14,38 17,40" strokeWidth="1.4"/>
    <path d="M31,36 Q34,38 31,40" strokeWidth="1.4"/>
    <path d="M8,16 Q2,20 3,28" strokeWidth="2"/>
    <path d="M8,22 Q1,28 2,36" strokeWidth="2"/>
    <path d="M8,28 Q2,36 4,42" strokeWidth="2"/>
  </svg>
);

export const IconAltri = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="-4 -4 56 56" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4,20 Q4,20 16,20 L4,36 Q4,36 16,36" strokeWidth="2.8"/>
    <ellipse cx="28" cy="28" rx="10" ry="14" strokeWidth="2.8"/>
    <ellipse cx="46" cy="28" rx="10" ry="14" strokeWidth="2.8"/>
    <line x1="0" y1="44" x2="56" y2="44" strokeWidth="1.6"/>
    <circle cx="58" cy="44" r="3" fill={color} stroke="none"/>
  </svg>
);

// ── CATEGORIE MERCEOLOGICHE ────────────────────────────────────

export const IconAlimenti = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="-4 -4 56 56" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4,28 Q4,44 24,44 Q44,44 44,28Z"/>
    <line x1="2" y1="28" x2="46" y2="28"/>
    <rect x="16" y="10" width="8" height="8" rx="2" fill={color} stroke="none"/>
    <rect x="28" y="4" width="8" height="8" rx="2" fill={color} stroke="none"/>
    <rect x="6" y="2" width="8" height="8" rx="2" fill={color} stroke="none"/>
    <line x1="20" y1="19" x2="20" y2="25" strokeWidth="1.3" strokeDasharray="3,2"/>
    <line x1="32" y1="13" x2="32" y2="19" strokeWidth="1.3" strokeDasharray="3,2"/>
    <line x1="10" y1="11" x2="10" y2="17" strokeWidth="1.3" strokeDasharray="3,2"/>
  </svg>
);

export const IconAccessori = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="-4 -4 56 56" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4,26 L24,6 L44,26" strokeWidth="2.6"/>
    <rect x="8" y="26" width="32" height="20" rx="2"/>
    <path d="M18,46 L18,34 Q18,26 24,26 Q30,26 30,34 L30,46"/>
    <line x1="2" y1="20" x2="8" y2="26" strokeWidth="1.4"/>
  </svg>
);

export const IconIntegratori = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="-4 -4 56 56" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="18" width="44" height="16" rx="8"/>
    <path d="M2,18 Q2,34 10,34 L24,34 L24,18 Z" fill={color} stroke="none"/>
    <line x1="24" y1="18" x2="24" y2="34"/>
    <rect x="2" y="18" width="44" height="16" rx="8"/>
  </svg>
);

export const IconIgiene = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="-4 -4 56 56" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M24,2 Q36,14 36,26 Q36,40 24,42 Q12,40 12,26 Q12,14 24,2Z"/>
    <circle cx="42" cy="18" r="6"/>
    <circle cx="46" cy="30" r="4.5"/>
    <circle cx="40" cy="40" r="5"/>
  </svg>
);

export const IconAntiparassitari = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="-4 -4 56 56" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="24" cy="24" r="14"/>
    <circle cx="24" cy="16" r="5"/>
    <line x1="10" y1="24" x2="38" y2="24"/>
    <path d="M13,13 L4,4"/>
    <path d="M35,13 L44,4"/>
    <path d="M10,24 L2,20"/>
    <path d="M38,24 L46,20"/>
    <path d="M13,35 L4,44"/>
    <path d="M35,35 L44,44"/>
    <line x1="20" y1="18" x2="20" y2="30" stroke="white" strokeWidth="3.5"/>
    <line x1="28" y1="18" x2="28" y2="30" stroke="white" strokeWidth="3.5"/>
    <line x1="17" y1="24" x2="31" y2="24" strokeWidth="2.2"/>
  </svg>
);

export const IconAltro = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="-4 -4 56 56" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="24" cy="10" r="4" fill={color} stroke="none"/>
    <circle cx="24" cy="24" r="4" fill={color} stroke="none"/>
    <circle cx="24" cy="38" r="4" fill={color} stroke="none"/>
  </svg>
);

// ── TAB BAR ───────────────────────────────────────────────────

export const IconHome = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="-4 -4 56 56" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4,20 L24,4 L44,20"/>
    <path d="M10,20 L10,44 L38,44 L38,20"/>
    <path d="M18,44 L18,30 Q18,24 24,24 Q30,24 30,30 L30,44"/>
    <rect x="30" y="8" width="7" height="9" rx="1"/>
  </svg>
);

export const IconSalvati = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="-4 -4 56 56" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M24,42 Q-2,28 4,12 Q8,2 24,14 Q40,2 44,12 Q50,28 24,42Z"/>
  </svg>
);

export const IconPubblica = ({ size = 32, color = "#ffffff", strokeWidth = 3 }) => (
  <svg width={size} height={size} viewBox="-4 -4 56 56" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <line x1="24" y1="6" x2="24" y2="42"/>
    <line x1="6" y1="24" x2="42" y2="24"/>
  </svg>
);

export const IconChat = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="-4 -4 56 56" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4,6 Q4,2 8,2 L40,2 Q44,2 44,6 L44,30 Q44,34 40,34 L28,34 L18,44 L18,34 L8,34 Q4,34 4,30 Z"/>
    <circle cx="16" cy="18" r="2.4" fill={color} stroke="none"/>
    <circle cx="24" cy="18" r="2.4" fill={color} stroke="none"/>
    <circle cx="32" cy="18" r="2.4" fill={color} stroke="none"/>
  </svg>
);

export const IconProfilo = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="-4 -4 56 56" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="24" cy="14" r="10"/>
    <path d="M4,44 Q4,30 24,30 Q44,30 44,44"/>
  </svg>
);

// ── NOTE LEGALI ───────────────────────────────────────────────

export const IconNoteLegali = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="-4 -4 56 56" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <line x1="24" y1="4" x2="24" y2="44"/>
    <path d="M8,44 L40,44" strokeWidth="2.8"/>
    <line x1="4" y1="16" x2="44" y2="16"/>
    <line x1="4" y1="16" x2="4" y2="28"/>
    <line x1="44" y1="16" x2="44" y2="28"/>
    <path d="M0,28 Q4,36 8,28" fill="none"/>
    <path d="M40,28 Q44,36 48,28" fill="none"/>
    <circle cx="24" cy="16" r="3" fill={color} stroke="none"/>
  </svg>
);

export const IconTermini = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="-4 -4 56 56" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="2" width="36" height="44" rx="3"/>
    <path d="M30,2 L30,14 L42,14"/>
    <line x1="14" y1="22" x2="34" y2="22" strokeWidth="1.4"/>
    <line x1="14" y1="28" x2="34" y2="28" strokeWidth="1.4"/>
    <line x1="14" y1="34" x2="26" y2="34" strokeWidth="1.4"/>
    <circle cx="32" cy="38" r="6"/>
    <circle cx="32" cy="38" r="2.5" fill={color} stroke="none"/>
  </svg>
);

export const IconPrivacy = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="-4 -4 56 56" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <rect x="10" y="22" width="28" height="22" rx="4"/>
    <path d="M16,22 L16,14 Q16,6 24,6 Q32,6 32,14 L32,22"/>
    <circle cx="24" cy="32" r="4"/>
    <line x1="24" y1="36" x2="24" y2="40" strokeWidth="2.5"/>
  </svg>
);

export const IconCookie = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="-4 -4 56 56" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="24" cy="24" r="20"/>
    <circle cx="16" cy="16" r="3" fill={color} stroke="none"/>
    <circle cx="28" cy="18" r="3" fill={color} stroke="none"/>
    <circle cx="18" cy="28" r="3" fill={color} stroke="none"/>
    <circle cx="30" cy="30" r="2.5" fill={color} stroke="none"/>
    <circle cx="12" cy="26" r="2" fill={color} stroke="none"/>
  </svg>
);

export const IconDSA = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="-4 -4 56 56" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M6,18 L6,30 L18,38 L18,10 Z"/>
    <path d="M18,14 L42,4 L42,44 L18,34"/>
    <path d="M42,16 Q48,20 48,24 Q48,28 42,32" strokeWidth="1.8"/>
    <line x1="6" y1="30" x2="6" y2="44"/>
  </svg>
);

export const IconVietati = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="-4 -4 56 56" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="24" cy="24" r="20" strokeWidth="2.8"/>
    <rect x="10" y="20" width="28" height="8" rx="2" fill={color} stroke="none"/>
  </svg>
);

// ── ICONE VARIE ───────────────────────────────────────────────

export const IconRicerca = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="-4 -4 56 56" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="20" cy="20" r="14"/>
    <line x1="30" y1="30" x2="44" y2="44" strokeWidth="2.8"/>
  </svg>
);

export const IconChatVuota = ({ size = 48, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="-4 -4 56 56" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4,6 Q4,2 8,2 L40,2 Q44,2 44,6 L44,30 Q44,34 40,34 L28,34 L18,44 L18,34 L8,34 Q4,34 4,30 Z"/>
    <circle cx="16" cy="18" r="2.4" fill={color} stroke="none"/>
    <circle cx="24" cy="18" r="2.4" fill={color} stroke="none"/>
    <circle cx="32" cy="18" r="2.4" fill={color} stroke="none"/>
  </svg>
);

export const IconPacco = ({ size = 48, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="-4 -4 56 56" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="18" width="40" height="26" rx="3"/>
    <path d="M4,18 L4,10 Q4,4 12,4 L36,4 Q44,4 44,10 L44,18"/>
    <line x1="4" y1="18" x2="44" y2="18"/>
    <line x1="24" y1="4" x2="24" y2="44" strokeWidth="1.6"/>
    <path d="M24,4 Q14,0 8,6 Q4,12 24,16 Q44,12 40,6 Q34,0 24,4Z"/>
  </svg>
);

export const IconCuore = ({ size = 24, color = "currentColor", strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="-4 -4 56 56" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M24,42 Q-2,28 4,12 Q8,2 24,14 Q40,2 44,12 Q50,28 24,42Z"/>
  </svg>
);
