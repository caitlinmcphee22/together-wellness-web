'use client'

import { useEffect, useState } from 'react'

/**
 * A silent looping video laid over its still photo. The photo stays underneath and keeps the layout,
 * so the page looks right before the video loads and for anyone with "reduce motion" turned on.
 * Phones get the smaller file when one has been uploaded.
 */
export function VideoLayer({ desktop, mobile, className = '' }: { desktop: string; mobile?: string; className?: string }) {
  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const phone = window.matchMedia('(max-width: 760px)')
    const pick = () => setSrc(reduce.matches ? null : phone.matches && mobile ? mobile : desktop)
    pick()
    reduce.addEventListener('change', pick)
    phone.addEventListener('change', pick)
    return () => {
      reduce.removeEventListener('change', pick)
      phone.removeEventListener('change', pick)
    }
  }, [desktop, mobile])

  if (!src) return null
  return (
    <video
      key={src}
      className={`tw-video ${className}`}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
    />
  )
}
