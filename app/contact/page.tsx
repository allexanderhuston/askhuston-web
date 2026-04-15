import type { Metadata } from 'next'
import AnimatedSection from '@/components/AnimatedSection'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch for AI campaign direction, brand films, UGC series, and creative partnerships.',
}

export default function Contact() {
  return (
    <>
      <section className="pt-32 pb-16 px-6 md:px-10 max-w-7xl mx-auto">
        <AnimatedSection delay={0.1}>
          <p className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase mb-8">
            Contact
          </p>
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <h1 className="font-display text-[clamp(3rem,8vw,7rem)] font-black leading-none text-text mb-6">
            Let's work.
          </h1>
        </AnimatedSection>
        <AnimatedSection delay={0.3}>
          <p className="font-mono text-sm text-muted max-w-md leading-relaxed">
            describe the brand, the brief, and when you need it. i'll respond
            within 24 hours.
          </p>
        </AnimatedSection>
      </section>

      <section className="px-6 md:px-10 max-w-7xl mx-auto pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {/* Form */}
          <div className="md:col-span-2 bg-bg py-0 pr-0 md:pr-16">
            <AnimatedSection delay={0.1}>
              <ContactForm />
            </AnimatedSection>
          </div>

          {/* Sidebar */}
          <div className="bg-surface border-l border-border p-8 space-y-10">
            <AnimatedSection delay={0.2}>
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase mb-5">
                  Direct
                </p>
                <a
                  href="mailto:alex@askhuston.com"
                  className="font-mono text-xs text-text hover:text-accent transition-colors"
                >
                  alex@askhuston.com
                </a>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.25}>
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase mb-5">
                  Instagram
                </p>
                <a
                  href="https://instagram.com/askhuston"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-text hover:text-accent transition-colors"
                >
                  @askhuston →
                </a>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase mb-5">
                  Response time
                </p>
                <p className="font-mono text-xs text-muted leading-relaxed">
                  Usually within 24 hours.
                  <br />
                  For urgent work, DM on Instagram.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.35}>
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase mb-5">
                  Based In
                </p>
                <p className="font-mono text-xs text-muted">
                  Sofia, Bulgaria
                  <br />
                  Works globally
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
