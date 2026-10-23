import type { ReactNode } from 'react'
import { PHOTOS } from '../photos'

export function Logo({ className = 'logo' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <path d="M4 32V22C4 12 11 6 20 6s16 6 16 16v10" fill="none" stroke="var(--color-accent)" strokeWidth="4" strokeLinecap="round" />
      <path d="M13 32V24c0-4 3-7 7-7s7 3 7 7v8" fill="none" stroke="var(--color-ink)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

/** A picture slot: the supplied photograph, or a plain wash until one is added (see src/photos.ts). */
export function Slot({
  name,
  className = '',
  priority = false,
  sizes = '100vw',
  children,
}: {
  name: keyof typeof PHOTOS
  className?: string
  priority?: boolean
  sizes?: string
  children?: ReactNode
}) {
  const p = PHOTOS[name]
  return (
    <figure className={`slot ${className}`} data-slot={name} data-alt={p.alt}>
      {p.src && (
        <img
          src={p.src}
          srcSet={p.srcSet}
          sizes={sizes}
          width={p.width}
          height={p.height}
          alt={p.alt}
          style={p.focus ? { objectPosition: p.focus } : undefined}
          fetchPriority={priority ? 'high' : undefined}
          loading={priority ? undefined : 'lazy'}
          decoding="async"
        />
      )}
      {children}
    </figure>
  )
}

const icon = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
  viewBox: '0 0 24 24',
}

export const Icons = {
  menu: () => (
    <svg {...icon} aria-hidden="true" className="icon"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
  ),
  close: () => (
    <svg {...icon} aria-hidden="true" className="icon"><path d="M6 6l12 12M18 6L6 18" /></svg>
  ),
}
