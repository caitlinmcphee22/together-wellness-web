'use client'

import { useEffect, useRef, useState } from 'react'
import type { Img, TeamMember } from '@/content/types'
import { panelColours } from '@/content/site'
import { VideoLayer } from './VideoLayer'

/* Image slider: tap or click the image (or a dot) to move through the set */
type Slide = Img & { url: string; videoUrl?: { desktop: string; mobile?: string } }

export function Slider({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0)
  if (!slides.length) return null
  const cur = slides[i] || slides[0]
  const many = slides.length > 1
  return (
    <div>
      {many ? (
        <button className="tw-slider" type="button" onClick={() => setI((i + 1) % slides.length)} aria-label="Next image">
          {slides.map((s, n) => (
            <span key={n}>
              <img className={`tw-slide${n === i ? ' is-active' : ''}`} src={s.url} alt={n === i ? s.alt || '' : ''} loading="lazy" />
              {s.videoUrl ? <VideoLayer desktop={s.videoUrl.desktop} mobile={s.videoUrl.mobile} className={`tw-slide${n === i ? ' is-active' : ''}`} /> : null}
            </span>
          ))}
        </button>
      ) : (
        <div className="tw-slider" style={{ cursor: 'default' }}>
          <img className="tw-slide is-active" src={cur.url} alt={cur.alt || ''} loading="lazy" />
          {cur.videoUrl ? <VideoLayer desktop={cur.videoUrl.desktop} mobile={cur.videoUrl.mobile} className="tw-slide is-active" /> : null}
        </div>
      )}
      <div className="tw-slider-bar">
        {many ? (
          <div className="tw-dots">
            {slides.map((_, n) => (
              <button key={n} className={`tw-dot${n === i ? ' is-active' : ''}`} type="button" onClick={() => setI(n)} aria-label={`Show image ${n + 1}`} aria-current={n === i}>
                <span />
              </button>
            ))}
          </div>
        ) : (
          <span />
        )}
        {cur.caption ? <span className="tw-label" style={{ fontSize: 13 }}>{cur.caption}</span> : null}
      </div>
    </div>
  )
}

/* Team grid with slide-in bio panel */
export function TeamGrid({ members }: { members: (TeamMember & { portraitUrl?: string })[] }) {
  const [open, setOpen] = useState(-1)
  const m = open >= 0 ? members[open] : members[0]
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (open < 0) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(-1)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <div className="tw-people">
        {members.map((p, n) => (
          <button key={n} className="tw-person" type="button" onClick={() => setOpen(n)} aria-label={`Read about ${p.name}`}>
            <span
              className="tw-person-ph tw-label"
              style={{ background: panelColours[p.panelColour] || panelColours.sage, ...(p.portraitUrl ? { backgroundImage: `url(${p.portraitUrl})` } : {}) }}
            >
              {p.portraitUrl ? '' : 'Portrait to come'}
            </span>
            <span className="tw-label" style={{ fontSize: 13 }}>{p.name}, {p.role}</span>
          </button>
        ))}
      </div>
      <button className={`tw-scrim${open >= 0 ? ' is-open' : ''}`} type="button" aria-label="Close profile" tabIndex={open >= 0 ? 0 : -1} onClick={() => setOpen(-1)} />
      <aside className={`tw-bio${open >= 0 ? ' is-open' : ''}`} style={{ background: panelColours[m?.panelColour] || panelColours.sage }} aria-label="Team member profile" aria-hidden={open < 0}>
        {m ? (
          <div className="tw-bio-body">
            <div className="tw-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
              <h2 className="tw-head" style={{ margin: 0, padding: '12px 0', fontSize: 13 }}>{m.name}</h2>
              <button ref={closeRef} className="tw-navbtn" type="button" onClick={() => setOpen(-1)} aria-label="Close profile">Close</button>
            </div>
            <p className="tw-label" style={{ margin: 0, fontSize: 14 }}>{m.role}</p>
            {m.bio ? <p style={{ margin: 0, fontSize: 14, lineHeight: 1.555 }}>{m.bio}</p> : null}
            {m.portraitUrl ? (
              <img className="tw-img" src={m.portraitUrl} alt={`Portrait of ${m.name}`} style={{ aspectRatio: '4 / 5' }} />
            ) : (
              <div className="tw-label" style={{ width: '100%', aspectRatio: '4 / 5', background: 'rgba(249,247,238,.35)', display: 'flex', alignItems: 'flex-end', padding: 18, fontSize: 13 }}>
                Portrait to come
              </div>
            )}
          </div>
        ) : null}
      </aside>
    </>
  )
}

/* Policy accordion: one item open at a time, first open by default */
export function Accordion({ items }: { items: { heading: string; body: string }[] }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="acc-list">
      {items.map((it, n) => (
        <div className="acc-item" key={n}>
          <h2>
            <button className="tw-acc tw-label" type="button" onClick={() => setOpen(open === n ? -1 : n)} aria-expanded={open === n} aria-controls={`acc-${n}`}>
              {it.heading}
            </button>
          </h2>
          <div id={`acc-${n}`} hidden={open !== n}>
            {it.body.split(/\n\n+/).map((para, k) => (
              <p className="acc-body" key={k}>{para}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/* Momence timetable: renders the embed code pasted into Site settings, including its scripts */
export function MomenceEmbed({ code }: { code?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !code) return
    el.innerHTML = code
    el.querySelectorAll('script').forEach((old) => {
      const s = document.createElement('script')
      Array.from(old.attributes).forEach((a) => s.setAttribute(a.name, a.value))
      s.text = old.text
      old.replaceWith(s)
    })
  }, [code])
  if (!code)
    return (
      <div className="timetable-ph">
        <p className="tw-label" style={{ margin: 0, fontSize: 13 }}>Timetable coming soon</p>
      </div>
    )
  return <div ref={ref} />
}
