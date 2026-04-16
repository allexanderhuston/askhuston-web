'use client'

import { motion } from 'framer-motion'
import { ReactNode, CSSProperties } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  delay?: number
  y?: number
}

export default function Reveal({ children, className, style, delay = 0, y = 24 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

export function RevealStagger({ children, className, stagger = 0.08, y = 16 }: {
  children: ReactNode[]
  className?: string
  stagger?: number
  y?: number
}) {
  return (
    <div className={className}>
      {(children as ReactNode[]).map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ delay: i * stagger, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}
