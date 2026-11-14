'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { Settings } from '@/content/types'
import { policyLinks } from '@/content/site'

export function Footer({ settings }: { settings: Settings }) {
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const year = new Date().getFullYear()

  async function subscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    const form = e.currentTarget
    const data = new FormData(form)
    // Mailchimp: posts to the waitlist audience form once its action URL is set in Site settings.
    if (settings.mailchimpAction) {
      try {
        await fetch(settings.mailchimpAction, { method: 'POST', mode: 'no-cors', body: data })
      } catch {
        setError('Something went wrong. Please try again.')
        return
      }
    }
    form.reset()
    setDone(true)
  }

  const Address = ({ className }: { className: string }) => (
    <div className={`tw-foot-addr ${className}`}>
      <p>Together Wellness</p>
      <p>{settings.address}</p>
    </div>
  )

  return (
    <>
      <section className="sec ruled pb-60" style={{ paddingTop: 48 }}>
        <p className="brand-message">{settings.brandMessage}</p>
      </section>
      <footer id="contact" className="tw-footer tw-label">
        <div className="tw-foot-grid">
          <div className="tw-foot-col">
            <div>
              <p style={{ margin: '0 0 40px', maxWidth: 470 }}>{settings.acknowledgement}</p>
              <div className="tw-foot-links">
                <div>
                  {policyLinks.map((l) => (
                    <Link key={l.href} href={l.href}>{l.label}</Link>
                  ))}
                </div>
                <div>
                  {settings.phone ? <a href={`tel:${settings.phone.replace(/\s/g, '')}`}>Call</a> : null}
                  <a href={`mailto:${settings.email}`}>Email</a>
                  <a href={settings.instagram}>Instagram</a>
                </div>
              </div>
            </div>
            <Address className="tw-hide-sm" />
          </div>
          <div className="tw-foot-col">
            <div id="subscribe" style={{ scrollMarginTop: 120 }}>
              <h2 className="tw-label" style={{ margin: '0 0 4px', fontSize: 12 }}>Sign up for occasional updates</h2>
              <form className="tw-form" onSubmit={subscribe} action={settings.mailchimpAction || undefined} method="post">
                <label>
                  <span className="sr-only">First name</span>
                  <input className="tw-finput" type="text" name="FNAME" autoComplete="given-name" placeholder="First name" />
                </label>
                <label>
                  <span className="sr-only">Email</span>
                  <input className="tw-finput" type="email" name="EMAIL" autoComplete="email" placeholder="Email" required />
                </label>
                {done ? (
                  <p style={{ margin: '12px 0 0' }} role="status">Got it. Thanks!</p>
                ) : (
                  <button type="submit" className="tw-label tw-fsubmit">Submit</button>
                )}
                {error ? <p role="alert" style={{ margin: '8px 0 0' }}>{error}</p> : null}
              </form>
            </div>
            <Address className="tw-show-sm" />
            <p style={{ margin: 0 }}>&copy; {year} Together Wellness</p>
          </div>
        </div>
      </footer>
    </>
  )
}
