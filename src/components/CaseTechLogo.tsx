import React from 'react';

interface CaseTechLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  showMascotBadge?: boolean;
  className?: string;
}

export const CaseTechLogo: React.FC<CaseTechLogoProps> = ({
  size = 'md',
  showTagline = true,
  showMascotBadge = false,
  className = '',
}) => {
  const iconDimensions = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11 sm:w-12 sm:h-12',
    lg: 'w-14 h-14 sm:w-16 sm:h-16',
    xl: 'w-18 h-18 sm:w-20 sm:h-20',
  }[size];

  const textSize = {
    sm: 'text-lg',
    md: 'text-2xl sm:text-3xl',
    lg: 'text-3xl sm:text-4xl',
    xl: 'text-4xl sm:text-5xl',
  }[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Innovative Logo Emblem / Mascot Badge */}
      <div className={`relative ${iconDimensions} shrink-0 group`}>
        {/* Ambient Neon Glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-tr from-cyan-500 via-violet-500 to-amber-500 rounded-xl opacity-75 blur-xs group-hover:opacity-100 transition duration-300"></div>
        
        {/* Shield & Cyber Aperture Geometric Vessel */}
        <div className="relative w-full h-full bg-stone-950 rounded-xl border border-stone-700/80 p-1 flex items-center justify-center overflow-hidden shadow-inner">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <defs>
              <linearGradient id="ctGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
              <linearGradient id="shieldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#A855F7" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Futuristic Phone Case Shield Silhouette */}
            <path
              d="M50 8 L82 20 C82 52 68 80 50 92 C32 80 18 52 18 20 L50 8 Z"
              fill="#0F172A"
              stroke="url(#shieldBorder)"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />

            {/* Internal Shock Absorber Ribs */}
            <path
              d="M32 28 L40 28 M68 28 L60 28 M26 48 L34 48 M74 48 L66 48 M34 70 L42 70 M66 70 L58 70"
              stroke="#06B6D4"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.6"
            />

            {/* Stylized 'C' & 'T' Monogram Integrated with Lens Aperture */}
            {/* Outer 'C' contour */}
            <path
              d="M48 34 H36 C31.5 34 28 37.5 28 42 V58 C28 62.5 31.5 66 36 66 H48"
              stroke="url(#ctGradient)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* 'T' intersecting crossbar & spine */}
            <path
              d="M52 34 H72 M62 34 V66"
              stroke="url(#ctGradient)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Center Smart Tech Sensor / Camera Core */}
            <circle cx="50" cy="50" r="4" fill="#38BDF8" className="animate-pulse" />
          </svg>
        </div>

        {/* Mascot Micro Ear / Corner Accents */}
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border border-stone-950 shadow-sm animate-ping opacity-75"></span>
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border border-stone-950"></span>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline gap-2 leading-none">
          <span className={`font-black text-white tracking-tight drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)] ${textSize}`}>
            كيستيك
          </span>
          <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-amber-400 tracking-wider font-mono text-xs sm:text-sm md:text-base uppercase">
            CaseTech
          </span>
        </div>

        {showTagline && (
          <div className="flex items-center gap-1.5 text-[11px] text-stone-300 font-semibold tracking-wide mt-1">
            <span className="text-cyan-400 font-extrabold">حماية ذكية</span>
            <span className="text-stone-600">·</span>
            <span className="text-stone-300">تصاميم تواكبك</span>
            {showMascotBadge && (
              <span className="hidden sm:inline bg-violet-950/90 text-violet-300 px-1.5 py-0.5 rounded border border-violet-500/40 text-[9px] font-mono font-bold">
                🛡️ TechShield™
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
