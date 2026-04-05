import { useState, useEffect } from 'react'
import type { NavProps } from '../App'
import { YangoHeader, SafeAreaBottom, TEXT_PRIMARY, TEXT_SECONDARY, YANGO_RED } from './shared'
import { BACKGROUND, SURFACE_SECONDARY, BORDER_DEFAULT, DARK_TEXT, RADIUS_SM, RADIUS_LG, FONT_SIZE_XS, FONT_SIZE_LG, FONT_SIZE_2XL, FONT_SIZE_NUM_SM, FONT_SIZE_DISPLAY } from './yango-tokens'

interface OTPScreenProps extends NavProps {
  filled: boolean
}

const CODE = ['4', '7', '1', '9', '1', '0']

export default function OTPScreen({ goTo, goBack, filled }: OTPScreenProps) {
  const [digits, setDigits] = useState<string[]>(filled ? CODE : [])
  const [loading, setLoading] = useState(filled)

  // Auto-advance when filled
  useEffect(() => {
    if (filled) {
      const timer = setTimeout(() => {
        goTo('payment-plan')
      }, 1200)
      return () => clearTimeout(timer)
    }
  }, [filled])

  const handleKey = (key: string) => {
    if (key === 'del') {
      setDigits(d => d.slice(0, -1))
      return
    }
    if (digits.length < 6) {
      const next = [...digits, key]
      setDigits(next)
      if (next.length === 6) {
        setTimeout(() => goTo('otp-filled'), 300)
      }
    }
  }

  const keys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['', '0', 'del'],
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: BACKGROUND }}>
      <YangoHeader onBack={goBack} />

      {/* OTP input area */}
      <div style={{ flex: 1, padding: '12px 24px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h1 style={{ fontSize: FONT_SIZE_DISPLAY, fontWeight: 500, color: TEXT_PRIMARY, margin: 0, letterSpacing: -0.5 }}>
            Confirm the code
          </h1>
          <p style={{ fontSize: FONT_SIZE_LG, color: TEXT_PRIMARY, lineHeight: 1.4, margin: 0 }}>
            Sent the code via WhatsApp or SMS<br />
            to +92 988 9<span style={{ fontFamily: 'monospace' }}>****</span>93
          </p>
        </div>

        {/* Code input field — fixed width per Figma (6 digits × 18px + gaps + padding) */}
        <div style={{
          background: SURFACE_SECONDARY,
          borderRadius: RADIUS_LG,
          height: 68,
          width: 168,
          padding: '10px 20px 8px',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          position: 'relative',
          overflow: 'hidden',
        }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{
              width: 18,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {digits[i] ? (
                <span style={{ fontSize: FONT_SIZE_NUM_SM, fontWeight: 500, color: TEXT_PRIMARY, letterSpacing: -0.5 }}>
                  {digits[i]}
                </span>
              ) : (
                <span style={{ fontSize: FONT_SIZE_NUM_SM, color: 'transparent' }}>·</span>
              )}
            </div>
          ))}
          {/* Cursor */}
          {!filled && digits.length < 6 && (
            <div style={{
              position: 'absolute',
              left: `${20 + (digits.length * 22)}px`,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 2,
              height: 32,
              background: TEXT_PRIMARY,
              animation: 'blink 1s infinite',
            }} />
          )}
          {/* Shimmer animation (replaces spinner) */}
          {loading && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: '-90px',
              width: 90,
              height: '100%',
              background: 'white',
              filter: 'blur(17px)',
              opacity: 0.9,
              animation: 'shimmerSweep 1.5s ease-in-out infinite',
              pointerEvents: 'none',
            }} />
          )}
        </div>

        <p style={{ fontSize: FONT_SIZE_LG, color: TEXT_SECONDARY, margin: 0 }}>
          Get another code in 0:59
        </p>

        {/* Suggestion bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          padding: '4px 0',
        }}>
          <div style={{ width: 1, height: 18, background: 'rgba(0,0,0,0.1)' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: FONT_SIZE_XS, color: TEXT_SECONDARY, letterSpacing: 1 }}>YANGO</div>
            <div style={{ fontSize: FONT_SIZE_LG, fontWeight: 500, color: DARK_TEXT }}>471910</div>
          </div>
          <div style={{ width: 1, height: 18, background: 'rgba(0,0,0,0.1)' }} />
        </div>
      </div>

      {/* Numeric keyboard */}
      <div style={{
        background: 'rgba(214,214,214,0.75)',
        backdropFilter: 'blur(5px)',
        borderRadius: '27px 27px 0 0',
        padding: '10px 6.75px 74px',
        flexShrink: 0,
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 6,
        }}>
          {keys.flat().map((key, i) => (
            <button
              key={i}
              onClick={() => key && handleKey(key)}
              style={{
                height: 50,
                background: key === '' ? 'transparent' : key === 'del' ? 'transparent' : 'rgba(255,255,255,0.89)',
                border: 'none',
                borderRadius: RADIUS_SM,
                cursor: key ? 'pointer' : 'default',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {key === 'del' ? (
                <span style={{ fontSize: FONT_SIZE_2XL, color: 'rgba(0,0,0,0.65)' }}>⌫</span>
              ) : key ? (
                <span style={{ fontSize: 23, color: 'rgba(0,0,0,0.65)', fontWeight: 400 }}>{key}</span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      <SafeAreaBottom />

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes spin { to { transform: rotate(360deg) } }
        @keyframes shimmerSweep { 0% { left: -90px; } 100% { left: calc(100% + 90px); } }
      `}</style>
    </div>
  )
}
