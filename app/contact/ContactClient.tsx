'use client'

import { useState } from 'react'
import PatternDivider from '@/components/ui/PatternDivider'
import SectionHeader from '@/components/ui/SectionHeader'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'

const SUBJECT_OPTIONS = [
  { value: '',              label: 'Select a subject…' },
  { value: 'general',      label: 'General Inquiry' },
  { value: 'order',        label: 'Order Inquiry' },
  { value: 'custom-order', label: 'Custom Order' },
  { value: 'other',        label: 'Other' },
]

interface FormState {
  name:    string
  email:   string
  subject: string
  message: string
}

const EMPTY: FormState = { name: '', email: '', subject: '', message: '' }

export default function ContactPage() {
  const [form,      setForm]      = useState<FormState>(EMPTY)
  const [errors,    setErrors]    = useState<Partial<FormState>>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)

  function validate(): boolean {
    const e: Partial<FormState> = {}
    if (!form.name.trim())    e.name    = 'Name is required.'
    if (!form.email.trim())   e.email   = 'Email is required.'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email address.'
    if (!form.subject)        e.subject = 'Please select a subject.'
    if (!form.message.trim()) e.message = 'Message cannot be empty.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleChange(field: keyof FormState, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    setSubmitted(true)
    setForm(EMPTY)
  }

  const inputCls = (hasError: boolean) => [
    'w-full font-body text-sm text-afghan-warm bg-afghan-off-white',
    'border rounded-lg px-3.5 py-2.5',
    'placeholder:text-afghan-stone/50',
    'focus:outline-none focus:ring-2 focus:ring-afghan-dusty-rose/40',
    'transition-colors duration-200',
    hasError ? 'border-red-400' : 'border-afghan-border focus:border-afghan-dusty-rose',
  ].join(' ')

  return (
    <main className="min-h-screen bg-afghan-off-white">

      {/* Hero */}
      <section className="bg-afghan-ivory border-b border-afghan-border py-20 px-4 text-center">
        <Reveal>
          <p className="font-body text-sm uppercase tracking-widest text-afghan-dusty-rose mb-4">
            Get in Touch
          </p>
          <h1 className="font-heading text-display text-afghan-warm max-w-2xl mx-auto leading-tight mb-6">
            We&apos;d Love to Hear from You
          </h1>
          <p className="font-body text-lg text-afghan-stone max-w-xl mx-auto leading-relaxed">
            Questions about an order, custom garment inquiries, or just want to say salaam —
            reach out and we&apos;ll respond within 24 hours.
          </p>
        </Reveal>
      </section>

      <PatternDivider />

      {/* Contact Layout */}
      <section className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-5 gap-12">

        {/* Left: Contact Info */}
        <RevealGroup as="aside" className="md:col-span-2 space-y-8" stagger={0.1}>
          <RevealItem><SectionHeader title="Contact Details" subtitle="Multiple ways to reach us" /></RevealItem>

          {/* Email */}
          <RevealItem className="flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-afghan-blush flex items-center justify-center text-afghan-warm flex-shrink-0 mt-0.5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div>
              <h3 className="font-heading text-h4 text-afghan-warm mb-0.5">Email</h3>
              <p className="font-body text-sm text-afghan-stone mb-2">For general inquiries and order questions.</p>
              <a href="mailto:hello@amiranistore.com" className="font-body text-sm text-afghan-dusty-rose hover:text-afghan-muted transition-colors duration-200 break-all">
                hello@amiranistore.com
              </a>
            </div>
          </RevealItem>

          {/* WhatsApp */}
          <RevealItem className="flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-afghan-blush flex items-center justify-center text-afghan-warm flex-shrink-0 mt-0.5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
            </div>
            <div>
              <h3 className="font-heading text-h4 text-afghan-warm mb-0.5">WhatsApp</h3>
              <p className="font-body text-sm text-afghan-stone mb-2">Preferred for custom order discussions — fast replies.</p>
              <a
                href="https://wa.me/32000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-sm font-semibold text-white px-4 py-2 rounded-lg mt-1 transition-colors duration-200"
                style={{ backgroundColor: '#25D366' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </RevealItem>

          {/* Social */}
          <RevealItem className="flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-afghan-blush flex items-center justify-center text-afghan-warm flex-shrink-0 mt-0.5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </div>
            <div>
              <h3 className="font-heading text-h4 text-afghan-warm mb-0.5">Follow Us</h3>
              <p className="font-body text-sm text-afghan-stone mb-2">New pieces, behind-the-scenes, and community stories.</p>
              <div className="flex gap-3">
                {[
                  { href: 'https://tiktok.com', label: 'TikTok', icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.67a8.16 8.16 0 0 0 4.77 1.52V7.74a4.85 4.85 0 0 1-1-.05z"/></svg>
                  )},
                  { href: 'https://instagram.com', label: 'Instagram', icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" /></svg>
                  )},
                  { href: 'https://facebook.com', label: 'Facebook', icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  )},
                ].map(({ href, label, icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-afghan-off-white border border-afghan-border text-afghan-stone hover:text-afghan-dusty-rose hover:border-afghan-dusty-rose transition-colors duration-200">
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </RevealItem>

          {/* Response note */}
          <RevealItem className="bg-afghan-blush/30 border border-afghan-border rounded-xl p-4">
            <p className="font-body text-sm text-afghan-stone leading-relaxed">
              <span className="font-semibold text-afghan-warm">Response time:</span>{' '}
              We aim to reply within 24 hours on weekdays. For urgent custom order questions, WhatsApp is fastest.
            </p>
          </RevealItem>
        </RevealGroup>

        {/* Right: Form */}
        <Reveal className="md:col-span-3" delay={0.1}>
          {submitted ? (
            <div className="bg-afghan-ivory border border-afghan-border rounded-2xl p-10 shadow-card text-center">
              <div className="w-16 h-16 rounded-full bg-afghan-blush/50 flex items-center justify-center mx-auto mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9897A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="font-heading text-h3 text-afghan-warm mb-3">Message Received</h2>
              <p className="font-body text-afghan-stone max-w-sm mx-auto mb-8 leading-relaxed">
                Thank you for reaching out. We&apos;ll get back to you within 24 hours —
                usually sooner. In the meantime, feel free to browse our collection.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="font-body text-sm text-afghan-dusty-rose hover:text-afghan-muted underline underline-offset-4 transition-colors duration-200"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="bg-afghan-ivory border border-afghan-border rounded-2xl p-8 shadow-card">
              <h2 className="font-heading text-h3 text-afghan-warm mb-6">Send a Message</h2>

              {/* Name */}
              <div className="mb-5">
                <label className="block font-body text-sm font-medium text-afghan-warm mb-1.5">
                  Full Name <span className="text-afghan-dusty-rose">*</span>
                </label>
                <input type="text" value={form.name} onChange={e => handleChange('name', e.target.value)}
                  placeholder="Fatima Rahimi" autoComplete="name"
                  className={inputCls(!!errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />
                {errors.name && <p id="name-error" role="alert" className="font-body text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="mb-5">
                <label className="block font-body text-sm font-medium text-afghan-warm mb-1.5">
                  Email Address <span className="text-afghan-dusty-rose">*</span>
                </label>
                <input type="email" value={form.email} onChange={e => handleChange('email', e.target.value)}
                  placeholder="fatima@example.com" autoComplete="email"
                  className={inputCls(!!errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
                {errors.email && <p id="email-error" role="alert" className="font-body text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              {/* Subject */}
              <div className="mb-5">
                <label className="block font-body text-sm font-medium text-afghan-warm mb-1.5">
                  Subject <span className="text-afghan-dusty-rose">*</span>
                </label>
                <select value={form.subject} onChange={e => handleChange('subject', e.target.value)}
                  className={inputCls(!!errors.subject)} aria-describedby={errors.subject ? 'subject-error' : undefined}>
                  {SUBJECT_OPTIONS.map(o => (
                    <option key={o.value} value={o.value} disabled={o.value === ''}>{o.label}</option>
                  ))}
                </select>
                {errors.subject && <p id="subject-error" role="alert" className="font-body text-xs text-red-500 mt-1">{errors.subject}</p>}
              </div>

              {/* Message */}
              <div className="mb-5">
                <label className="block font-body text-sm font-medium text-afghan-warm mb-1.5">
                  Message <span className="text-afghan-dusty-rose">*</span>
                </label>
                <textarea value={form.message} onChange={e => handleChange('message', e.target.value)}
                  placeholder="Tell us what you need — we're happy to help."
                  rows={5} maxLength={1000}
                  className={`${inputCls(!!errors.message)} resize-none`}
                  aria-describedby={errors.message ? 'message-error' : undefined} />
                <div className="flex justify-between items-start mt-1">
                  {errors.message
                    ? <p id="message-error" role="alert" className="font-body text-xs text-red-500">{errors.message}</p>
                    : <span />}
                  <span className="font-body text-xs text-afghan-stone/60 ml-auto">{form.message.length}/1000</span>
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-afghan-dusty-rose hover:bg-afghan-muted disabled:opacity-60 disabled:cursor-not-allowed text-white font-body font-semibold rounded-xl transition-colors duration-200">
                {loading ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" style={{ animation: 'spin 0.8s linear infinite' }}>
                      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                    Sending…
                  </>
                ) : 'Send Message'}
              </button>
            </form>
          )}
        </Reveal>
      </section>

      <PatternDivider />
    </main>
  )
}
