import type { ReactNode } from 'react'

export function Logo({ className = 'size-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <path d="M4 32V22C4 12 11 6 20 6s16 6 16 16v10" fill="none" stroke="#B4441F" strokeWidth="4" strokeLinecap="round" />
      <path d="M13 32V24c0-4 3-7 7-7s7 3 7 7v8" fill="none" stroke="#E8A33D" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

/** Arch-shaped frame used for decorative illustrations. */
export function ArchFrame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative mx-auto aspect-4/5 w-full max-w-sm ${className}`} aria-hidden="true">
      <div className="absolute -top-3 -right-3 h-3/4 w-3/4 rounded-t-full rounded-b-3xl border-[3px] border-primary/50" />
      <div className="relative h-full overflow-hidden rounded-t-full rounded-b-3xl bg-base-200">{children}</div>
      <span className="absolute -left-4 bottom-10 size-16 rounded-full bg-accent" />
    </div>
  )
}

export function HeroArt() {
  return (
    <ArchFrame>
      <svg viewBox="0 0 320 400" preserveAspectRatio="xMidYMid slice" className="h-full w-full" focusable="false">
        <circle cx="220" cy="120" r="46" fill="#E8A33D" />
        <path d="M0 292h320v108H0z" fill="#12383C" opacity=".92" />
        <path d="M-20 360q40-18 80 0t80 0 80 0 80 0" fill="none" stroke="#FBF6EE" strokeWidth="3" opacity=".35" />
        <path d="M-10 300a85 85 0 01170 0M160 300a85 85 0 01170 0" fill="none" stroke="#B4441F" strokeWidth="14" />
        <rect x="-10" y="280" width="340" height="16" rx="8" fill="#B4441F" />
        <g fill="#12383C">
          <circle cx="110" cy="214" r="13" />
          <rect x="95" y="230" width="30" height="50" rx="15" />
          <circle cx="160" cy="204" r="15" />
          <rect x="143" y="222" width="34" height="58" rx="17" />
          <circle cx="212" cy="214" r="13" />
          <rect x="197" y="230" width="30" height="50" rx="15" />
        </g>
      </svg>
    </ArchFrame>
  )
}

export function TeamArt() {
  return (
    <ArchFrame>
      <svg viewBox="0 0 320 400" preserveAspectRatio="xMidYMid slice" className="h-full w-full" focusable="false">
        <circle cx="160" cy="150" r="70" fill="#E8A33D" opacity=".85" />
        <g fill="#12383C">
          <circle cx="100" cy="230" r="16" />
          <rect x="82" y="250" width="36" height="70" rx="18" />
          <circle cx="160" cy="215" r="18" />
          <rect x="140" y="237" width="40" height="83" rx="20" />
          <circle cx="220" cy="230" r="16" />
          <rect x="202" y="250" width="36" height="70" rx="18" />
        </g>
        <g fill="#B4441F">
          <circle cx="130" cy="262" r="12" />
          <rect x="116" y="278" width="28" height="42" rx="14" />
          <circle cx="192" cy="262" r="12" />
          <rect x="178" y="278" width="28" height="42" rx="14" />
        </g>
        <rect x="0" y="320" width="320" height="80" fill="#12383C" opacity=".92" />
      </svg>
    </ArchFrame>
  )
}

const icon = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  className: 'size-6',
  viewBox: '0 0 24 24',
}

export const Icons = {
  code: () => (
    <svg {...icon}><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></svg>
  ),
  megaphone: () => (
    <svg {...icon}><path d="M3 11l14-6v14L3 13zM7 13v5a2 2 0 002 2h1" /></svg>
  ),
  ops: () => (
    <svg {...icon}><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" /></svg>
  ),
  finance: () => (
    <svg {...icon}><path d="M4 19V5M4 19h16M8 15v-4M12 15V8M16 15v-6" /></svg>
  ),
  lock: () => (
    <svg {...icon}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 018 0v3" /></svg>
  ),
  clock: () => (
    <svg {...icon}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
  ),
  rupee: () => (
    <svg {...icon}><path d="M6 4h12M6 9h12M9 9c0 6 6 6 6 0M8 20l8-11" /></svg>
  ),
  menu: () => (
    <svg {...icon} className="size-7"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
  ),
  close: () => (
    <svg {...icon} className="size-7"><path d="M6 6l12 12M18 6L6 18" /></svg>
  ),
}
