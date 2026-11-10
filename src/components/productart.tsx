import { asset } from "~/lib/base";
import type { ArtKind } from "~/data/products";

interface ArtProps {
  kind: ArtKind;
  variant?: number;
  className?: string;
  showFrame?: boolean;
  /** Photo réelle : remplace l'illustration quand elle est fournie. */
  image?: string;
}

const STROKE = "rgba(255,255,255,0.74)";
const SOFT = "rgba(255,255,255,0.3)";
const FILL = "rgba(255,255,255,0.055)";

const shape = (kind: ArtKind) => {
  switch (kind) {
    case "boot":
      return (
        <g>
          <path
            d="M30 140c-4-12 2-22 14-28 16-8 34-12 48-20 6-6 12-16 20-20 14-6 34-4 42 8 8 12 12 38 14 60z"
            fill={FILL}
            stroke={STROKE}
            strokeWidth="2.2"
          />
          <path d="M26 140h144" stroke={STROKE} strokeWidth="2.6" />
          <path d="M96 96l14 8M86 104l14 8M76 112l16 8" stroke={SOFT} strokeWidth="1.6" />
          <path d="M112 72c10 4 18 12 24 22" stroke={SOFT} strokeWidth="1.4" />
          {[38, 60, 84, 108, 132, 154].map((x) => (
            <path
              key={x}
              d={`M${x} 140v10l-4 8h10l-4-8v-10`}
              fill="none"
              stroke={SOFT}
              strokeWidth="1.6"
            />
          ))}
        </g>
      );
    case "futsal":
      return (
        <g>
          <path
            d="M30 138c-4-12 2-22 14-28 16-8 34-12 48-20 6-6 12-16 20-20 14-6 34-4 42 8 8 12 12 36 14 60z"
            fill={FILL}
            stroke={STROKE}
            strokeWidth="2.2"
          />
          <path d="M26 138h144" stroke={STROKE} strokeWidth="2.6" />
          <path d="M26 148h144" stroke={SOFT} strokeWidth="1.4" />
          {[42, 62, 82, 102, 122, 142].map((x) => (
            <path key={x} d={`M${x} 138v10`} stroke={SOFT} strokeWidth="1.3" />
          ))}
          <path d="M96 94l14 8M86 102l14 8M76 110l16 8" stroke={SOFT} strokeWidth="1.6" />
        </g>
      );
    case "shin":
      return (
        <g>
          <path
            d="M74 38h52c9 0 16 7 16 16v92c0 9-7 16-16 16H74c-9 0-16-7-16-16V54c0-9 7-16 16-16z"
            fill={FILL}
            stroke={STROKE}
            strokeWidth="2.2"
          />
          <path d="M68 66h64M68 82h64M68 98h64" stroke={SOFT} strokeWidth="1.5" />
          <path d="M52 126h96" stroke={STROKE} strokeWidth="3.4" />
          <path d="M52 136h96" stroke={SOFT} strokeWidth="1.6" />
          <path d="M100 42v84" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
        </g>
      );
    case "knee":
      return (
        <g>
          <circle cx="100" cy="100" r="44" fill={FILL} stroke={STROKE} strokeWidth="2.2" />
          <circle cx="100" cy="100" r="25" stroke={SOFT} strokeWidth="1.6" />
          <path d="M62 62c24-12 52-12 76 0M62 138c24 12 52 12 76 0" stroke={SOFT} strokeWidth="1.4" />
          <rect x="56" y="50" width="88" height="13" rx="6.5" fill={FILL} stroke={STROKE} strokeWidth="1.8" />
          <rect x="56" y="137" width="88" height="13" rx="6.5" fill={FILL} stroke={STROKE} strokeWidth="1.8" />
        </g>
      );
    case "glue":
      return (
        <g>
          <path
            d="M80 62h40c4 0 6 3 6 7v83c0 5-3 8-8 8H82c-5 0-8-3-8-8V69c0-4 2-7 6-7z"
            fill={FILL}
            stroke={STROKE}
            strokeWidth="2.2"
          />
          <rect x="91" y="38" width="18" height="24" rx="3" fill={FILL} stroke={STROKE} strokeWidth="2.2" />
          <path d="M86 90h28M86 102h28M86 114h20" stroke={SOFT} strokeWidth="1.5" />
          <path d="M134 150c12 5 22 2 24-6-10 0-16-2-20-8" stroke={SOFT} strokeWidth="1.8" strokeDasharray="4 4" fill="none" />
        </g>
      );
    case "gloves":
      return (
        <g>
          <path
            d="M74 168V106c-1-8-7-24-7-32 0-6 5-9 10-6 5 3 8 12 10 20V44c0-6 4-10 9-10s9 4 9 10v48-58c0-6 4-10 9-10s9 4 9 10v58-50c0-6 4-10 9-10s9 4 9 10v54c3-10 6-17 11-19 5-2 9 1 9 7 0 9-5 22-5 30v74z"
            fill={FILL}
            stroke={STROKE}
            strokeWidth="2.2"
          />
          <path d="M74 146h74" stroke={STROKE} strokeWidth="3.2" />
          <path d="M86 116h48M86 128h48" stroke={SOFT} strokeWidth="1.4" />
        </g>
      );
    case "goal":
      return (
        <g>
          <path d="M38 52h124v98" stroke={STROKE} strokeWidth="3.2" fill="none" />
          <path d="M38 150h124" stroke={STROKE} strokeWidth="2" />
          {[54, 72, 90, 108, 126, 144].map((y) => (
            <path key={y} d={`M38 ${y}h124`} stroke={SOFT} strokeWidth="0.9" />
          ))}
          {[56, 78, 100, 122, 144, 162].map((x) => (
            <path key={x} d={`M${x} 52v98`} stroke={SOFT} strokeWidth="0.9" />
          ))}
        </g>
      );
    case "cone":
      return (
        <g>
          <path d="M100 42 134 144H66z" fill={FILL} stroke={STROKE} strokeWidth="2.2" />
          <path d="M86 96h28M79 120h42" stroke={SOFT} strokeWidth="1.8" />
          <ellipse cx="100" cy="148" rx="50" ry="11" fill={FILL} stroke={STROKE} strokeWidth="2.2" />
        </g>
      );
    case "target":
      return (
        <g>
          <circle cx="100" cy="92" r="46" fill={FILL} stroke={STROKE} strokeWidth="2.2" />
          <circle cx="100" cy="92" r="30" stroke={SOFT} strokeWidth="1.6" />
          <circle cx="100" cy="92" r="14" stroke={SOFT} strokeWidth="1.6" />
          <path d="M100 46V30M80 152l-8 22M120 152l8 22" stroke={STROKE} strokeWidth="2" />
        </g>
      );
    case "ball":
      return (
        <g>
          <circle cx="100" cy="100" r="54" fill={FILL} stroke={STROKE} strokeWidth="2.2" />
          <path
            d="M100 78l19 14-7 22h-24l-7-22z"
            fill="rgba(255,255,255,0.08)"
            stroke={STROKE}
            strokeWidth="1.8"
          />
          <path
            d="M100 78V52M119 92l25-6M112 114l18 20M88 114l-18 20M81 92l-25-6"
            stroke={SOFT}
            strokeWidth="1.4"
          />
          <path
            d="M100 52l14-10M144 86l4-16M130 134l14 6M70 134l-14 6M56 86l-4-16M86 42l-6-10"
            stroke={SOFT}
            strokeWidth="1.1"
          />
          <circle cx="100" cy="100" r="54" stroke={SOFT} strokeWidth="0.7" strokeDasharray="2 6" />
        </g>
      );
    case "coach":
      return (
        <g>
          <rect x="36" y="50" width="128" height="84" rx="4" fill={FILL} stroke={STROKE} strokeWidth="2.2" />
          <path d="M36 92h128" stroke={SOFT} strokeWidth="1.4" />
          <circle cx="100" cy="92" r="16" stroke={SOFT} strokeWidth="1.4" />
          <path d="M36 116h128" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3 5" />
          <path d="M54 152h92" stroke={SOFT} strokeWidth="1.6" />
          <circle cx="150" cy="164" r="11" fill={FILL} stroke={STROKE} strokeWidth="2.2" />
          <path d="M139 158l-14-8" stroke={SOFT} strokeWidth="1.6" />
        </g>
      );
    case "jacket":
      return (
        <g>
          <path
            d="M76 42l24 13 24-13 22 14 17 21-13 21-13-8v76H64V90l-13 8-13-21 17-21z"
            fill={FILL}
            stroke={STROKE}
            strokeWidth="2.2"
          />
          <path d="M100 55v111" stroke={STROKE} strokeWidth="1.8" />
          <path d="M76 42l24 13 24-13" stroke={SOFT} strokeWidth="1.4" />
          <path d="M66 140h68M66 130h68" stroke={SOFT} strokeWidth="1.2" />
          <path d="M100 55v111" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" strokeDasharray="3 4" />
        </g>
      );
    case "bag":
      return (
        <g>
          <rect x="28" y="80" width="144" height="74" rx="24" fill={FILL} stroke={STROKE} strokeWidth="2.2" />
          <path d="M76 80V68c0-8 6-14 14-14h20c8 0 14 6 14 14v12" stroke={STROKE} strokeWidth="2" fill="none" />
          <path d="M28 110h144" stroke={SOFT} strokeWidth="1.2" strokeDasharray="5 5" />
          <rect x="118" y="96" width="42" height="32" rx="4" stroke={SOFT} strokeWidth="1.4" />
          <rect x="42" y="96" width="26" height="32" rx="4" stroke={SOFT} strokeWidth="1.4" />
        </g>
      );
    case "short":
      return (
        <g>
          <path d="M58 58h84l8 90h-40l-10-40-10 40H50z" fill={FILL} stroke={STROKE} strokeWidth="2.2" />
          <path d="M58 74h84" stroke={STROKE} strokeWidth="2.4" />
          <path d="M100 74v32" stroke={SOFT} strokeWidth="1.2" />
          <path d="M64 96h6M130 96h6" stroke={SOFT} strokeWidth="1.4" />
        </g>
      );
    case "jersey":
    default:
      return (
        <g>
          <path
            d="M74 44l26 12 26-12 32 14-12 34-16-8v76H70V84l-16 8-12-34z"
            fill={FILL}
            stroke={STROKE}
            strokeWidth="2.2"
          />
          <path d="M88 44c4 12 20 12 24 0" stroke={STROKE} strokeWidth="2" fill="none" />
          <path d="M70 148h60" stroke={SOFT} strokeWidth="1.2" />
          <path d="M70 84v64M130 84v64" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        </g>
      );
  }
};

const transforms = [
  "translate(0,0) scale(1)",
  "translate(-4,2) scale(1.06) rotate(-3 100 100)",
  "translate(3,3) scale(0.96) rotate(3 100 100)",
  "translate(-2,-3) scale(1.03) rotate(5 100 100)",
];

export function ProductArt({
  kind,
  variant = 0,
  className = "",
  showFrame = true,
  image,
}: ArtProps) {
  if (image) {
    return (
      <div className={`relative overflow-hidden bg-white ${className}`} aria-hidden>
        <img
          src={asset(image)}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain"
        />
      </div>
    );
  }
  return (
    <div
      className={`relative overflow-hidden bg-[#0a0a0a] ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(120% 90% at 30% 8%, #1e1e1e 0%, #0e0e0e 55%, #050505 100%)",
      }}
      aria-hidden
    >
      <div className="grain pointer-events-none absolute inset-0 opacity-70" />
      <svg
        viewBox="0 0 200 200"
        className="relative h-full w-full"
        role="presentation"
      >
        <g transform={transforms[variant % transforms.length]}>
          <g transform="translate(100 100) scale(0.76) translate(-100 -100)">
            {shape(kind)}
          </g>
        </g>
        {showFrame && (
          <rect
            x="0.5"
            y="0.5"
            width="199"
            height="199"
            fill="none"
            stroke="rgba(255,255,255,0.07)"
          />
        )}
        <text
          x="8"
          y="12"
          fontSize="6"
          letterSpacing="1.6"
          fill="rgba(255,255,255,0.22)"
          style={{ fontFamily: "Inter, Helvetica Neue, Arial, sans-serif", fontWeight: 700 }}
        >
          RUE 90
        </text>
      </svg>
    </div>
  );
}

interface JerseyPreviewProps {
  name: string;
  number: string;
  placeholderName: string;
  className?: string;
}

/** Aperçu en direct du maillot personnalisé (vue de dos). */
export function JerseyPreview({
  name,
  number,
  placeholderName,
  className = "",
}: JerseyPreviewProps) {
  const safeName = (name || placeholderName).toUpperCase().slice(0, 12);
  const safeNumber = number.trim().length > 0 ? number.trim().slice(0, 2) : "—";

  return (
    <div
      className={`relative overflow-hidden bg-[#080808] ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(110% 80% at 50% 0%, #242424 0%, #0d0d0d 60%, #050505 100%)",
      }}
    >
      <div className="grain pointer-events-none absolute inset-0 opacity-60" />
      <svg viewBox="0 0 300 300" className="relative h-full w-full">
        <path
          d="M110 54l40 16 40-16 48 26-16 50-24-12v112H102V118l-24 12-16-50z"
          fill="rgba(255,255,255,0.05)"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="2.5"
        />
        <path
          d="M128 54c8 14 36 14 44 0"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="2.5"
          fill="none"
        />
        <path
          d="M102 142h96M102 262h96"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="1.2"
        />
        <text
          x="150"
          y="140"
          textAnchor="middle"
          fontSize="20"
          fontWeight="700"
          letterSpacing="3"
          fill="rgba(255,255,255,0.92)"
          style={{ fontFamily: "Inter, Helvetica Neue, Arial, sans-serif" }}
        >
          {safeName}
        </text>
        <text
          x="150"
          y="226"
          textAnchor="middle"
          fontSize="76"
          fontWeight="800"
          fill="rgba(255,255,255,0.96)"
          style={{ fontFamily: "Inter, Helvetica Neue, Arial, sans-serif" }}
        >
          {safeNumber}
        </text>
      </svg>
    </div>
  );
}
