'use client'

/**
 * Reveal / RevealGroup / RevealItem
 *
 * Scroll-triggered fade-up animation system, matching the easing and feel
 * of the homepage HeroSection's mount animation — but triggered on scroll
 * into view instead of on page load, so it works for below-the-fold content
 * on any page.
 *
 * Usage:
 *   <Reveal><section>...</section></Reveal>
 *
 *   <RevealGroup className="grid ...">
 *     {items.map(item => <RevealItem key={item.id}>...</RevealItem>)}
 *   </RevealGroup>
 */

import { motion, type Variants } from 'framer-motion'
import { CSSProperties, ReactNode } from 'react'

/** The handful of semantic tags Reveal/RevealGroup/RevealItem support via the `as` prop. */
type RevealTag = 'div' | 'section' | 'ol' | 'ul' | 'li' | 'aside' | 'article'

const MOTION_TAGS: Record<RevealTag, any> = {
  div:     motion.div,
  section: motion.section,
  ol:      motion.ol,
  ul:      motion.ul,
  li:      motion.li,
  aside:   motion.aside,
  article: motion.article,
}

const EASE = [0.22, 1, 0.36, 1] as const

interface RevealProps {
  children:   ReactNode
  delay?:     number
  y?:         number
  duration?:  number
  className?: string
  style?:     CSSProperties
}

/** Wrap a single block (a section, a card, a heading) to fade + rise into view once, on scroll. */
export function Reveal({ children, delay = 0, y = 28, duration = 0.6, className, style }: RevealProps) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

interface RevealGroupProps {
  children:   ReactNode
  stagger?:   number
  className?: string
  style?:     CSSProperties
  /** Semantic tag to render, e.g. 'ol', 'ul'. Defaults to 'div'. */
  as?:        RevealTag
}

/** Wrap a grid/list container — its RevealItem children animate in one after another. */
export function RevealGroup({ children, stagger = 0.1, className, style, as = 'div' }: RevealGroupProps) {
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger } },
  }

  const MotionTag = MOTION_TAGS[as]

  return (
    <MotionTag
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={variants}
    >
      {children}
    </MotionTag>
  )
}

interface RevealItemProps {
  children:   ReactNode
  y?:         number
  duration?:  number
  className?: string
  style?:     CSSProperties
  /** Semantic tag to render, e.g. 'li'. Defaults to 'div'. */
  as?:        RevealTag
}

/** A single item inside a RevealGroup. Must be a direct or near-direct child to inherit the stagger timing. */
export function RevealItem({ children, y = 24, duration = 0.5, className, style, as = 'div' }: RevealItemProps) {
  const variants: Variants = {
    hidden: { opacity: 0, y },
    show:   { opacity: 1, y: 0, transition: { duration, ease: EASE } },
  }

  const MotionTag = MOTION_TAGS[as]

  return (
    <MotionTag className={className} style={style} variants={variants}>
      {children}
    </MotionTag>
  )
}

export default Reveal
