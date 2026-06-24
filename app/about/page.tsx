import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import PatternDivider from '@/components/ui/PatternDivider'
import SectionHeader from '@/components/ui/SectionHeader'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'About Amirani Store — Afghan Fashion for the European Diaspora',
  description:
    'Amirani Store was founded to bring authentic Afghan craftsmanship to the diaspora community across Europe. Learn about our story, mission, and the artisans behind every garment.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-afghan-off-white">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="bg-afghan-ivory border-b border-afghan-border py-20 px-4 text-center">
        <Reveal>
          <Image
            src="/images/logo.jpeg"
            alt="Amirani"
            width={88}
            height={88}
            className="mx-auto mb-6 rounded-2xl shadow-md"
          />
          <p className="font-body text-sm uppercase tracking-widest text-afghan-dusty-rose mb-4">
            Our Story
          </p>
          <h1 className="font-heading text-display text-afghan-warm max-w-2xl mx-auto leading-tight mb-6">
            Wear Your Roots
          </h1>
          <p className="font-body text-lg text-afghan-stone max-w-xl mx-auto leading-relaxed">
            Amirani Store was founded to bring authentic Afghan craftsmanship
            to the diaspora community across Europe — one garment at a time.
          </p>
        </Reveal>
      </section>

      <PatternDivider />

      {/* ── Brand Story ───────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <Reveal>
          <SectionHeader
            title="Where It Started"
            subtitle="From a TikTok video to a European brand"
          />

          <div className="mt-8 space-y-5 font-body text-afghan-stone leading-relaxed text-base">
            <p>
              Amirani Store started as a simple idea: what if Afghan families living in Belgium,
              the Netherlands, and across Europe could order the same handcrafted garments they
              grew up with — without waiting for a trip back home, or relying on someone to bring
              things in a suitcase?
            </p>
            <p>
              The first videos went up on TikTok. Orders came in from Brussels, Antwerp, Amsterdam,
              Frankfurt. Each package shipped with care — wrapped in tissue, tucked with a note.
              Word spread the way Afghan community news always does: through family groups, through
              neighbours, through weddings and Eid gatherings where someone showed up in something
              beautiful and was asked where they got it.
            </p>
            <p>
              That original business has since been sold and has grown into something larger. This
              store is a rebuild — a portfolio version of the same vision, rebuilt from scratch
              to demonstrate what a modern Afghan e-commerce brand can look and feel like.
            </p>
          </div>
        </Reveal>
      </section>

      <PatternDivider />

      {/* ── Mission ───────────────────────────────────────────── */}
      <section className="bg-afghan-linen py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <SectionHeader
              title="Our Mission"
              subtitle="Craftsmanship without compromise"
            />
          </Reveal>

          <RevealGroup className="mt-10 grid sm:grid-cols-3 gap-6" stagger={0.12}>
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
                title: 'Authentic Craft',
                body: 'Every piece draws from Afghan embroidery traditions — mirror work, khamak, and ikat patterns that have been passed down through generations.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                  </svg>
                ),
                title: 'Diaspora First',
                body: 'Designed for Afghan families living across Europe — people who want to celebrate their culture without compromise on quality or fit.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                ),
                title: 'Made to Measure',
                body: 'Our custom order flow lets you choose fabric, describe your vision, and submit exact measurements. No generic sizing — every garment fits you.',
              },
            ].map(({ icon, title, body }) => (
              <RevealItem key={title} className="bg-afghan-ivory rounded-xl border border-afghan-border p-6">
                <div className="w-10 h-10 rounded-lg bg-afghan-blush flex items-center justify-center text-afghan-warm mb-4">
                  {icon}
                </div>
                <h3 className="font-heading text-h4 text-afghan-warm mb-2">{title}</h3>
                <p className="font-body text-sm text-afghan-stone leading-relaxed">{body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <PatternDivider />

      {/* ── Craftsmanship ─────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <Reveal>
          <SectionHeader
            title="Quality & Craftsmanship"
            subtitle="Made with love, shipped with care"
          />

          <div className="mt-8 space-y-5 font-body text-afghan-stone leading-relaxed text-base">
            <p>
              Afghan garments are not fast fashion. A single kameez with hand-embroidered detail
              can take days of skilled work. The fabrics — silk from Herat, fine cotton, rich
              velvet — are chosen for how they feel against skin as much as how they look.
            </p>
            <p>
              Our custom order process exists because no two bodies are the same, and no two
              occasions call for exactly the same garment. You describe what you want, we make
              it to your exact measurements, and we ship it to your door across Europe.
            </p>
            <p>
              Every order is packed with care. We don't do bulk warehouse shipping. Each package
              leaves as if it were going to family.
            </p>
          </div>

          {/* Ethos quote */}
          <blockquote className="mt-10 border-l-4 border-afghan-dusty-rose pl-5 py-2">
            <p className="font-heading text-h3 text-afghan-warm italic leading-relaxed">
              "Made with love, shipped with care."
            </p>
          </blockquote>
        </Reveal>
      </section>

      <PatternDivider />

      {/* ── How Custom Orders Work ────────────────────────────── */}
      <section className="bg-afghan-linen py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <SectionHeader
              title="How Custom Orders Work"
              subtitle="Four steps from idea to garment"
            />
          </Reveal>

          <RevealGroup as="ol" className="mt-10 space-y-6" stagger={0.1}>
            {[
              {
                step: '01',
                title: 'Choose Your Fabric',
                body: 'Browse our curated selection of Afghan fabrics — silk, cotton, chiffon, velvet, and more. Each fabric has a price modifier and a character of its own.',
              },
              {
                step: '02',
                title: 'Describe Your Design',
                body: 'Tell us what you want: garment type, colour preference, embroidery style, neckline, length. Paste a reference image link if you have one.',
              },
              {
                step: '03',
                title: 'Submit Your Measurements',
                body: 'Enter your exact measurements in cm or inches. We provide a guide so every number is accurate. No guesswork, no generic sizing.',
              },
              {
                step: '04',
                title: 'We Confirm & Deliver',
                body: 'We review your order and contact you within 24 hours to confirm details and arrange payment. Then we get to work.',
              },
            ].map(({ step, title, body }) => (
              <RevealItem as="li" key={step} className="flex gap-5">
                <span className="font-heading text-2xl text-afghan-dusty-rose/40 flex-shrink-0 w-10 text-right mt-0.5">
                  {step}
                </span>
                <div>
                  <h3 className="font-heading text-h4 text-afghan-warm mb-1">{title}</h3>
                  <p className="font-body text-sm text-afghan-stone leading-relaxed">{body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <PatternDivider />

      {/* ── CTAs ──────────────────────────────────────────────── */}
      <section className="py-16 px-4 text-center">
        <Reveal>
          <h2 className="font-heading text-h2 text-afghan-warm mb-3">
            Ready to wear your roots?
          </h2>
          <p className="font-body text-afghan-stone max-w-md mx-auto mb-8">
            Browse our ready-to-ship collection or design something made exactly for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-afghan-dusty-rose text-white font-body font-semibold rounded-xl hover:bg-afghan-muted transition-colors duration-200"
            >
              Shop Collection
            </Link>
            <Link
              href="/custom-order"
              className="inline-flex items-center justify-center px-7 py-3.5 border border-afghan-border text-afghan-warm font-body font-semibold rounded-xl hover:bg-afghan-linen transition-colors duration-200"
            >
              Start Custom Order
            </Link>
          </div>
        </Reveal>
      </section>

    </main>
  )
}
