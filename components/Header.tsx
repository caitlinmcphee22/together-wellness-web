'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Logo } from './Logo'
import { policyLinks } from '@/content/site'

type Props = { tagline: string; instagram: string }

export function Header({ tagline, instagram }: Props) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const [logoOn, setLogoOn] = useState(false)
  const lastY = useRef(0)
  const logoTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0
      const vh = window.innerHeight || 800
      if (y > lastY.current + 4 && y > 80) setHidden(true)
      else if (y < lastY.current - 4 || y <= 80) setHidden(false)
      const past = y > vh - 60
      setPastHero(past)
      lastY.current = y
      // Homepage only: the logo reappears in the centre ~600ms after scrolling stops
      setLogoOn(false)
      if (logoTimer.current) clearTimeout(logoTimer.current)
      logoTimer.current = setTimeout(() => {
        if (window.scrollY > (window.innerHeight || 800) - 60) setLogoOn(true)
      }, 600)
    }
    onScroll()
    setLogoOn(false)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (logoTimer.current) clearTimeout(logoTimer.current)
    }
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const close = () => setMenuOpen(false)
  const headerClass = `tw-header ${pastHero ? 'is-on-page' : 'is-over-hero'}${hidden && !menuOpen ? ' is-hidden' : ''}`

  return (
    <>
      <header className={headerClass}>
        <div className="tw-header-row tw-header-in tw-label">
          <div className="tw-header-side">
            <button className="tw-navbtn" type="button" onClick={() => setMenuOpen(true)} aria-expanded={menuOpen} aria-controls="site-menu">
              Menu
            </button>
          </div>
          <Link href="/" className="tw-header-mid tw-hide-sm">
            {tagline}
          </Link>
          <div className="tw-header-side end">
            <Link href="/book-now" style={{ padding: '12px 0' }}>
              Book Now
            </Link>
          </div>
        </div>
      </header>

      {isHome && (
        <div className={`tw-float-logo${logoOn && pastHero && !menuOpen ? ' is-on' : ''}`} aria-hidden="true">
          <Logo decorative />
        </div>
      )}

      <button className={`tw-scrim${menuOpen ? ' is-open' : ''}`} type="button" aria-label="Close menu" tabIndex={menuOpen ? 0 : -1} onClick={close} />
      <nav id="site-menu" className={`tw-panel${menuOpen ? ' is-open' : ''}`} aria-label="Menu">
        <div className="tw-panel-body tw-label">
          <div className="tw-menu-top">
            <span className="tw-hide-sm">Menu</span>
            <span className="tw-show-sm">{tagline}</span>
            <button className="tw-navbtn" type="button" onClick={close} aria-label="Close menu" style={{ fontSize: 13 }}>
              Close
            </button>
          </div>
          <div className="tw-menu-main">
            <Link className="tw-panel-link" href="/" onClick={close}>Home</Link>
            <Link className="tw-panel-link" href="/about" onClick={close}>About</Link>
            <button className="tw-panel-link" type="button" onClick={() => setServicesOpen((v) => !v)} aria-expanded={servicesOpen}>
              Services
            </button>
            <div className={`tw-sub${servicesOpen ? ' is-open' : ''}`}>
              <Link href="/pilates" onClick={close} tabIndex={servicesOpen ? 0 : -1}>Pilates</Link>
              <Link href="/physiotherapy" onClick={close} tabIndex={servicesOpen ? 0 : -1}>Physiotherapy</Link>
              <Link href="/wellness" onClick={close} tabIndex={servicesOpen ? 0 : -1}>Wellness</Link>
            </div>
            <Link className="tw-panel-link" href="/our-space" onClick={close}>Our Space</Link>
            <Link className="tw-panel-link" href="/book-now" onClick={close}>Book Now</Link>
            <a className="tw-panel-link" href="#contact" onClick={close}>Contact</a>
          </div>
          <div className="tw-menu-foot">
            {policyLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={close}>{l.label}</Link>
            ))}
            <a href={instagram} onClick={close}>Instagram</a>
          </div>
        </div>
      </nav>
    </>
  )
}
