export function BanglaAutosLogo({ size = "default" }: { size?: "default" | "large" }) {
  const iconSize = size === "large" ? 40 : 28;
  const needleLength = size === "large" ? 14 : 10;

  return (
    <div className="flex items-center gap-2">
      {/* Speedometer icon */}
      <div className="relative" style={{ width: iconSize, height: iconSize / 2 + 4 }}>
        <svg width={iconSize} height={iconSize / 2 + 4} viewBox="0 0 40 24">
          {/* Arc */}
          <path
            d="M 4 22 A 18 18 0 0 1 36 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-racing-red"
          />
          {/* Tick marks */}
          <line x1="8" y1="16" x2="10" y2="18" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" />
          <line x1="14" y1="10" x2="15" y2="12" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" />
          <line x1="20" y1="7" x2="20" y2="10" stroke="currentColor" strokeWidth="1.5" className="text-foreground" />
          <line x1="26" y1="10" x2="25" y2="12" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" />
          <line x1="32" y1="16" x2="30" y2="18" stroke="currentColor" strokeWidth="1.5" className="text-racing-red" />
          {/* Needle */}
          <line
            x1="20" y1="22"
            x2={20 + needleLength * Math.cos(-Math.PI * 0.3)}
            y2={22 + needleLength * Math.sin(-Math.PI * 0.3)}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-racing-red"
          />
          {/* Center dot */}
          <circle cx="20" cy="22" r="2" fill="currentColor" className="text-racing-red" />
        </svg>
      </div>
      {/* Wordmark */}
      <div className="flex items-baseline gap-1">
        <span className={`font-bengali font-bold text-foreground ${size === "large" ? "text-2xl" : "text-lg"}`}>
          বাংলা
        </span>
        <span className={`font-display font-extrabold text-racing-red tracking-tight ${size === "large" ? "text-2xl" : "text-lg"}`}>
          AUTOS
        </span>
        <span className={`font-body text-muted-foreground ${size === "large" ? "text-sm" : "text-xs"}`}>
          .autos
        </span>
      </div>
    </div>
  );
}
