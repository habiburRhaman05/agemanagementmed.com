'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ScrollFeatures() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show button when page is scrolled down 400px
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {/* Scroll Progress Bar at the top of the viewport */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-sage-600 origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          y: showScrollTop ? 0 : 20,
          pointerEvents: showScrollTop ? 'auto' : 'none',
        }}
        className="fixed bottom-6 right-6 z-[90] flex size-12 cursor-pointer items-center justify-center rounded-full bg-ink-900 text-white shadow-lg transition-colors hover:bg-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600 focus:ring-offset-2"
        aria-label="Scroll to top"
      >
        <ArrowUp className="size-5" />
      </motion.button>
    </>
  )
}
