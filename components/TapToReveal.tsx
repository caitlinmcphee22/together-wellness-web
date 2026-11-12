'use client'

import { useEffect } from 'react'

/**
 * On touch screens wider than a phone (iPad and similar), image tiles behave like hover:
 * the first tap shows the description over the image, a second tap follows the link.
 * Phones keep the description under the caption, so this does nothing there.
 */
export function TapToReveal() {
  useEffect(() => {
    const touch = window.matchMedia('(hover: none)')
    const wide = window.matchMedia('(min-width: 761px)')

    const onClick = (e: MouseEvent) => {
      if (!touch.matches || !wide.matches) return
      const tile = (e.target as HTMLElement).closest<HTMLElement>('.tw-tile')
      if (!tile || !tile.querySelector('.tw-desc')) return
      if (tile.classList.contains('is-revealed')) return // second tap: follow the link
      e.preventDefault()
      document.querySelectorAll('.tw-tile.is-revealed').forEach((t) => t.classList.remove('is-revealed'))
      tile.classList.add('is-revealed')
    }
    const onOutside = (e: Event) => {
      if (!(e.target as HTMLElement).closest('.tw-tile')) {
        document.querySelectorAll('.tw-tile.is-revealed').forEach((t) => t.classList.remove('is-revealed'))
      }
    }

    document.addEventListener('click', onClick, true)
    document.addEventListener('touchstart', onOutside, { passive: true })
    return () => {
      document.removeEventListener('click', onClick, true)
      document.removeEventListener('touchstart', onOutside)
    }
  }, [])
  return null
}
