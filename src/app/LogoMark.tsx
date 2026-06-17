/**
 * IMAI brand mark — a "#" of 4 rounded bars (teal top, yellow right, purple
 * bottom, pink left). Sizing is controlled by the parent's `.logo-mark`
 * class (width/height in CSS).
 */
export function LogoMark({ className = "logo-mark" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* verticals first so horizontals visually overlap them at intersections */}
      <rect x="6" y="2.5" width="5.5" height="27" rx="2.75" fill="#f9476c" />
      <rect x="20.5" y="2.5" width="5.5" height="27" rx="2.75" fill="#efcc01" />
      <rect x="2.5" y="9" width="27" height="5.5" rx="2.75" fill="#06c7a9" />
      <rect x="2.5" y="17.5" width="27" height="5.5" rx="2.75" fill="#8564ff" />
    </svg>
  );
}
