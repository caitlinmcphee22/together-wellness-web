'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

export type PopupData = {
  enabled?: boolean
  colour?: string
  heading?: string
  body?: string
  ctaLabel?: string
  ctaLink?: string
  delaySeconds?: number
  imageUrl?: string
  imageAlt?: string
  version?: string
}

const COLOURS: Record<string, string> = {
  cornflower: 'var(--cornflower)',
  sage: 'var(--sage)',
  nude: 'var(--nude)',
  clay: 'var(--clay)',
  bone: 'var(--bone)',
}

const KEY = 'tw-popup-dismissed'
const REMEMBER_DAYS = 14

/* Sign-up popup, shown once to each visitor (again after two weeks, or straight away if the copy changes). */
export function Popup({ data }: { data: PopupData }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const boxRef = useRef<HTMLDivElement>(null)
  const stamp = data.version || `${data.heading}|${data.body}`

  useEffect(() => {
    if (!data.enabled) return
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || 'null')
      if (saved && saved.stamp === stamp && Date.now() - saved.at < REMEMBER_DAYS * 864e5) return
    } catch {}
    const t = window.setTimeout(() => setOpen(true), Math.max(0, data.delaySeconds ?? 4) * 1000)
    return () => window.clearTimeout(t)
  }, [data.enabled, data.delaySeconds, stamp])

  useEffect(() => {
    if (!open) return
    boxRef.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && dismiss()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Close it if the visitor navigates elsewhere while it is open
  useEffect(() => { if (open) dismiss() }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  function remember() {
    try { localStorage.setItem(KEY, JSON.stringify({ stamp, at: Date.now() })) } catch {}
  }
  function dismiss() { remember(); setOpen(false) }

  function goToCta(e: React.MouseEvent<HTMLAnchorElement>) {
    const href = data.ctaLink || '#subscribe'
    remember()
    setOpen(false)
    if (href.startsWith('#')) {
      const el = document.getElementById(href.slice(1))
      if (el) {
        e.preventDefault()
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        window.setTimeout(() => el.querySelector<HTMLInputElement>('input')?.focus({ preventScroll: true }), 700)
      }
    }
  }

  if (!data.enabled) return null
  const bg = COLOURS[data.colour || 'cornflower'] || COLOURS.cornflower

  return (
    <div className={`tw-pop-wrap${open ? ' is-open' : ''}`} aria-hidden={!open}>
      <button className="tw-pop-scrim" type="button" tabIndex={-1} aria-label="Close" onClick={dismiss} />
      <div ref={boxRef} tabIndex={-1} className="tw-pop" role="dialog" aria-modal="true" aria-labelledby="tw-pop-heading" style={{ background: bg }}>
        <button className="tw-navbtn tw-pop-close" type="button" onClick={dismiss} tabIndex={open ? 0 : -1}>Close</button>
        <div className="tw-pop-text">
          {data.heading ? <h2 id="tw-pop-heading" className="tw-head tw-pop-heading">{data.heading}</h2> : null}
          {data.body ? <p className="tw-pop-body">{data.body}</p> : null}
          <a className="tw-label tw-pop-cta" href={data.ctaLink || '#subscribe'} onClick={goToCta} tabIndex={open ? 0 : -1}>
            {data.ctaLabel || 'Subscribe'}
          </a>
        </div>
        {data.imageUrl ? (
          <div className="tw-pop-img">
            <Image src={data.imageUrl} alt={data.imageAlt || ''} fill sizes="(max-width: 760px) 90vw, 360px" quality={80} />
          </div>
        ) : null}
      </div>
    </div>
  )
}
