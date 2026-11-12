import Link from 'next/link'
import type { Block, Img, Settings, TeamMember } from '@/content/types'
import { imgUrl } from '@/lib/sanity'
import { services } from '@/content/site'
import { Logo } from './Logo'
import { Accordion, MomenceEmbed, Slider, TeamGrid } from './Interactive'

const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href)

function SmartLink({ href, className, children, style }: { href: string; className?: string; children: React.ReactNode; style?: React.CSSProperties }) {
  if (isExternal(href) || href.startsWith('#')) return <a href={href} className={className} style={style}>{children}</a>
  return <Link href={href} className={className} style={style}>{children}</Link>
}

function Picture({ img, aspect, style, width = 1800 }: { img: Img; aspect?: string; style?: React.CSSProperties; width?: number }) {
  const url = imgUrl(img, width)
  if (!url) return null
  return <img className="tw-img" src={url} alt={img.alt || ''} loading="lazy" style={{ aspectRatio: aspect, ...style }} />
}

/* Image tile: caption below, description over the image on hover (under the caption on phones) */
function Tile({ image, caption, description, link, width = 'full', aspect }: { image: Img; caption?: string; description?: string; link?: string; width?: string; aspect?: string }) {
  const inner = (
    <>
      <div className="tw-media">
        <Picture img={image} aspect={aspect} />
        {description ? <p className="tw-desc">{description}</p> : null}
      </div>
      {caption ? <p className="tw-label tw-caption">{caption}</p> : null}
    </>
  )
  const cls = `tw-tile w-${width}`
  return link ? <SmartLink href={link} className={cls}>{inner}</SmartLink> : <div className={cls}>{inner}</div>
}

export function Hero({ image }: { image: Img }) {
  return (
    <section className="tw-hero" aria-label="Together Wellness">
      <img className="tw-hero-img" src={imgUrl(image, 2400)} alt={image.alt || ''} fetchPriority="high" />
      <div className="tw-hero-shade" aria-hidden="true" />
      <div className="tw-hero-inner">
        <div className="tw-hero-logo">
          <Logo />
        </div>
      </div>
    </section>
  )
}

export function ExploreServices({ heading = 'Explore our services' }: { heading?: string }) {
  return (
    <section className="sec ruled pb-60">
      <div className="tw-rail">
        <h2 className="tw-head" style={{ margin: 0, fontSize: 16 }}>{heading}</h2>
        {services.map((s) => (
          <Link key={s.href} className="tw-card-link" href={s.href}>
            <img className="tw-img" src={s.image} alt="" loading="lazy" style={{ aspectRatio: '3 / 2' }} />
            <span className="tw-label" style={{ fontSize: 14 }}>{s.label}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

type Ctx = { settings: Settings; team: TeamMember[]; first: boolean }

function RenderBlock({ b, ctx }: { b: Block; ctx: Ctx }) {
  const firstPad = ctx.first ? 'pt-140 ' : ''
  switch (b._type) {
    case 'statement':
      return (
        <section className={`sec ${firstPad}${b.spacing === 'large' ? (ctx.first ? 'pb-120' : 'pb-180') : 'pb-160'}`}>
          <p className="tw-quote">{b.text}</p>
          {b.label ? <p className="tw-label" style={{ margin: '24px 0 0', fontSize: 14 }}>{b.label}</p> : null}
        </section>
      )

    case 'sectionIntro':
      return (
        <section className={`sec ${firstPad}pb-120`}>
          <h2 className="tw-head h-section">{b.heading}</h2>
          {b.subheading ? <p className="tw-label" style={{ margin: '14px 0 0', fontSize: 14 }}>{b.subheading}</p> : null}
          {b.body ? <p style={{ margin: '28px 0 0', maxWidth: 900, fontSize: 16, lineHeight: 1.55 }}>{b.body}</p> : null}
        </section>
      )

    case 'tile':
      return (
        <section className={`sec ${firstPad}pb-160`}>
          <Tile image={b.image} caption={b.caption} description={b.description} link={b.link} width={b.width} aspect={b.aspect} />
        </section>
      )

    case 'fullImage':
      return (
        <section className="sec pb-120">
          <Picture img={b.image} aspect={b.aspect} width={2400} />
          {b.caption ? <p className="tw-label tw-caption">{b.caption}</p> : null}
        </section>
      )

    case 'pageTitle':
      return (
        <section className="sec pt-120 pb-48 tw-in">
          <div className="title-grid">
            <div>
              {b.eyebrow ? <p className="tw-label eyebrow">{b.eyebrow}</p> : null}
              <h1 className="tw-head h-page">{b.title}</h1>
            </div>
            <div>
              {b.quote ? <p className="tw-quote" style={{ margin: '0 0 10px', fontSize: 20 }}>{b.quote}</p> : null}
              {b.intro ? <p style={{ margin: 0, fontSize: 13 }}>{b.intro}</p> : null}
            </div>
          </div>
        </section>
      )

    case 'splitTitle':
      return (
        <section className="tw-split tw-in pt-120">
          <div className="tw-split-text">
            {b.eyebrow ? <p className="tw-label eyebrow">{b.eyebrow}</p> : null}
            <h1 className="tw-head h-split">{b.title}</h1>
          </div>
          <Slider slides={[{ ...b.image, url: imgUrl(b.image) }]} />
        </section>
      )

    case 'split': {
      const slides = (b.slides || []).map((s) => ({ ...s, url: imgUrl(s) }))
      return (
        <section className="tw-split">
          <div className={`tw-split-text${b.pinned ? ' tw-pin' : ''}`}>
            <h2 className="tw-head">{b.heading}</h2>
            {(b.paragraphs || []).map((p, i) => <p key={i}>{p}</p>)}
            {b.link ? (
              <p>
                <SmartLink href={b.link.href} className="tw-label tw-split-link">{b.link.label}</SmartLink>
              </p>
            ) : null}
          </div>
          {b.layout === 'cards' ? (
            <div className="tw-cards">
              {slides.map((s, i) => (
                <figure key={i}>
                  <img className="tw-img" src={s.url} alt={s.alt || ''} loading="lazy" style={{ aspectRatio: '4 / 5' }} />
                  {s.caption ? <figcaption className="tw-label tw-caption">{s.caption}</figcaption> : null}
                </figure>
              ))}
            </div>
          ) : b.layout === 'stack' ? (
            <div className="tw-stack">
              {slides.map((s, i) => (
                <figure key={i}>
                  <img className="tw-img" src={s.url} alt={s.alt || ''} loading="lazy" style={{ aspectRatio: '3 / 2' }} />
                  {s.caption ? <figcaption className="tw-label tw-caption">{s.caption}</figcaption> : null}
                </figure>
              ))}
            </div>
          ) : (
            <Slider slides={slides} />
          )}
        </section>
      )
    }

    case 'team':
      return (
        <section className="tw-split">
          <div className="tw-split-text tw-pin">
            <h2 className="tw-head">{b.heading}</h2>
            {(b.paragraphs || []).map((p, i) => <p key={i}>{p}</p>)}
            {b.note ? <p className="tw-label" style={{ fontSize: 13 }}>{b.note}</p> : null}
          </div>
          <TeamGrid members={ctx.team.map((m) => ({ ...m, portraitUrl: m.portrait ? imgUrl(m.portrait, 900) : undefined }))} />
        </section>
      )

    case 'cardGrid': {
      const cols = b.columns === 3 ? 'g3' : 'g4'
      if (b.style === 'ruled')
        return (
          <section className="sec pb-140">
            {b.heading ? <h2 className="tw-head h-section" style={{ marginBottom: 18 }}>{b.heading}</h2> : null}
            {b.intro ? <p className="body-copy" style={{ margin: '0 0 48px', maxWidth: 760 }}>{b.intro}</p> : null}
            <div className={`grid ${cols}`}>
              {b.items.map((it, i) => (
                <div key={i} className="rule-item" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <h3 className="tw-head" style={{ margin: 0, fontSize: 13 }}>{it.title}</h3>
                  {it.body ? <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55 }}>{it.body}</p> : null}
                </div>
              ))}
            </div>
            {b.cta ? (
              <p style={{ margin: '40px 0 0' }}>
                <SmartLink href={b.cta.href} className="tw-btn tw-label">{b.cta.label}</SmartLink>
              </p>
            ) : null}
          </section>
        )
      return (
        <section className="sec ruled pb-140">
          {b.label ? <h2 className="tw-label" style={{ margin: '0 0 40px', fontSize: 13 }}>{b.label}</h2> : null}
          <div className={`grid ${cols}`}>
            {b.items.map((it, i) => (
              <article key={i} className="card">
                <h3 className="tw-head">{it.title}</h3>
                {it.body ? <p>{it.body}</p> : null}
                {it.meta ? <p className="tw-label">{it.meta}</p> : null}
              </article>
            ))}
          </div>
        </section>
      )
    }

    case 'imagePair':
      return (
        <section className="sec pb-160">
          <div className="grid g2" style={{ gap: 30, alignItems: 'start' }}>
            {b.left.description || b.left.caption ? (
              <Tile image={b.left} caption={b.left.caption} description={b.left.description} aspect={b.aspect || '4 / 5'} />
            ) : (
              <Picture img={b.left} aspect={b.aspect || '4 / 5'} />
            )}
            <div className="offset" style={{ paddingTop: 160 }}>
              <Picture img={b.right} aspect={b.aspect || '4 / 5'} />
            </div>
          </div>
        </section>
      )

    case 'tileWithText':
      return (
        <section className="sec pb-160">
          <div className="grid g2" style={{ gap: 30, alignItems: 'start' }}>
            <Tile image={b.tile} caption={b.tile.caption} description={b.tile.description} aspect="3 / 5" />
            <div className="offset" style={{ paddingTop: 120, display: 'flex', flexDirection: 'column', gap: 28 }}>
              <h2 className="tw-head h-section">{b.heading}</h2>
              {(b.paragraphs || []).map((p, i) => <p key={i} className="body-copy">{p}</p>)}
              {b.image ? <Picture img={b.image} aspect="4 / 5" style={{ marginTop: 20 }} /> : null}
            </div>
          </div>
        </section>
      )

    case 'numbered':
      return (
        <section className="sec pb-140">
          <h2 className="tw-head h-section" style={{ marginBottom: 48 }}>{b.heading}</h2>
          <div className="grid g2" style={{ columnGap: 48, rowGap: 40 }}>
            {b.items.map((it, i) => (
              <div key={i} className="rule-item num-item">
                <span className="tw-label" style={{ fontSize: 13, minWidth: 28 }}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="tw-head">{it.title}</h3>
                  <p>{it.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )

    case 'appointments':
      return (
        <section className="sec ruled pb-140">
          <div className="grid g4">
            <h2 className="tw-label" style={{ margin: 0, fontSize: 13 }}>{b.label}</h2>
            {b.items.map((it, i) => (
              <div key={i}>
                <h3 className="tw-head" style={{ margin: '0 0 10px', fontSize: 18 }}>{it.title}</h3>
                <p className="tw-label" style={{ margin: 0, fontSize: 14 }}>{it.meta}</p>
              </div>
            ))}
            {b.cta ? (
              <div>
                <SmartLink href={b.cta.href} className="tw-btn tw-label">{b.cta.label}</SmartLink>
              </div>
            ) : null}
          </div>
          {b.note ? <p style={{ margin: '40px 0 0', fontSize: 13 }}>{b.note}</p> : null}
        </section>
      )

    case 'bookingOptions':
      return (
        <section className="sec pb-140">
          <div className="grid g3">
            {b.items.map((it, i) => (
              <article key={i} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Tile image={it.image} caption={it.caption} description={it.description} aspect="4 / 3" />
                <p className="body-copy" style={{ lineHeight: 1.55 }}>{it.body}</p>
                <div>
                  <SmartLink href={it.cta.href} className="tw-btn tw-label">{it.cta.label}</SmartLink>
                </div>
              </article>
            ))}
          </div>
        </section>
      )

    case 'timetable':
      return (
        <section id="timetable" className="sec pb-140" style={{ scrollMarginTop: 80 }}>
          <h2 className="tw-head h-section" style={{ marginBottom: 32 }}>{b.heading}</h2>
          <MomenceEmbed code={ctx.settings.momenceEmbed} />
        </section>
      )

    case 'contactPrompt': {
      const { phone, email } = ctx.settings
      return (
        <section className="sec ruled pb-120">
          <div className="grid g2">
            <h2 className="tw-head" style={{ margin: 0, fontSize: 18 }}>{b.heading}</h2>
            <p className="body-copy">
              {b.body}{' '}
              {phone ? (
                <>
                  <a href={`tel:${phone.replace(/\s/g, '')}`} style={{ textDecoration: 'underline' }}>{phone}</a> or{' '}
                </>
              ) : null}
              <a href={`mailto:${email}`} style={{ textDecoration: 'underline' }}>{email}</a>.
            </p>
          </div>
        </section>
      )
    }

    case 'exploreServices':
      return <ExploreServices heading={b.heading} />

    default:
      return null
  }
}

export function Blocks({ blocks, settings, team }: { blocks: Block[]; settings: Settings; team: TeamMember[] }) {
  return (
    <>
      {blocks.map((b, i) => (
        <RenderBlock key={b._key || i} b={b} ctx={{ settings, team, first: i === 0 }} />
      ))}
    </>
  )
}

export function PolicyBody({ title, items }: { title: string; items: { heading: string; body: string }[] }) {
  return (
    <section className="sec pt-120 pb-140">
      <div className="policy">
        <h1 className="tw-head">{title}</h1>
        <Accordion items={items} />
      </div>
    </section>
  )
}
