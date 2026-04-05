import { useEffect } from 'react'
import type { NavProps } from '../App'
import { YangoHeader, SafeAreaBottom } from './shared'
import { BACKGROUND, FONT_FAMILY, FONT_SIZE_H2 } from './yango-tokens'

// Figma 923-26377 — Status Screen / Processing your payment...
// Spinner: thin arc circle, animated rotation

export default function ProcessingScreen({ goTo, goBack }: NavProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      goTo('order-paid')
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      background: BACKGROUND, fontFamily: FONT_FAMILY,
    }}>
      <YangoHeader onBack={goBack} />

      {/* Centered content */}
      <div style={{
        flex: 1,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 24,
        paddingBottom: 80,
      }}>
        {/* Arc spinner — thin circle with a gap, rotates */}
        <div style={{ position: 'relative', width: 80, height: 80 }}>
          <svg
            width="80" height="80" viewBox="0 0 80 80" fill="none"
            style={{ animation: 'spinArc 1s linear infinite', display: 'block' }}
          >
            {/* Animated arc on black half-circle — no gray track */}
            <circle
              cx="40" cy="40" r="36"
              stroke="rgba(0,0,0,0.86)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="170 56"
              strokeDashoffset="0"
              transform="rotate(-90 40 40)"
            />
          </svg>
        </div>

        {/* "Processing your payment..." */}
        <div style={{
          fontSize: FONT_SIZE_H2,
          fontWeight: 500,
          lineHeight: '30px',
          letterSpacing: -0.5,
          color: 'rgba(0,0,0,0.86)',
          textAlign: 'center',
          padding: '0 32px',
        }}>
          Processing your{'\n'}payment...
        </div>
      </div>

      <SafeAreaBottom />
    </div>
  )
}
