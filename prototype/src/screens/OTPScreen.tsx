import { useState, useEffect } from 'react'
import type { NavProps } from '../App'
import { YangoHeader, TEXT_PRIMARY, TEXT_SECONDARY } from './shared'
import { BACKGROUND, SURFACE_SECONDARY, DARK_TEXT, RADIUS_LG, FONT_SIZE_LG, FONT_SIZE_DISPLAY, FONT_SIZE_NUM_SM, FONT_FAMILY } from './yango-tokens'

interface OTPScreenProps extends NavProps {
  filled: boolean
}

const CODE = ['4', '7', '1', '9', '1', '0']

const KEY_LETTERS: Record<string, string> = {
  '2': 'ABC', '3': 'DEF', '4': 'GHI', '5': 'JKL', '6': 'MNO',
  '7': 'PQRS', '8': 'TUV', '9': 'WXYZ',
}

export default function OTPScreen({ goTo, goBack, filled }: OTPScreenProps) {
  const [digits, setDigits] = useState<string[]>(filled ? CODE : [])
  const [loading] = useState(filled)

  useEffect(() => {
    if (filled) {
      const timer = setTimeout(() => goTo('payment-plan'), 1200)
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
    ['sym', '0', 'del'],
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: BACKGROUND, fontFamily: FONT_FAMILY }}>
      <YangoHeader onBack={goBack} />

      {/* OTP input area */}
      <div style={{ flex: 1, padding: '12px 24px 0', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h1 style={{ fontSize: FONT_SIZE_DISPLAY, fontWeight: 500, color: TEXT_PRIMARY, margin: 0, letterSpacing: -0.5 }}>
            Confirm the code
          </h1>
          <p style={{ fontSize: FONT_SIZE_LG, color: TEXT_PRIMARY, lineHeight: 1.4, margin: 0 }}>
            Sent the code via WhatsApp or SMS<br />
            to +92 988 9<span style={{ fontFamily: 'monospace' }}>****</span>93
          </p>
        </div>

        {/* Code input field */}
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
              width: 18, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
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
              top: '50%', transform: 'translateY(-50%)',
              width: 2, height: 32,
              background: TEXT_PRIMARY,
              animation: 'blink 1s infinite',
            }} />
          )}
          {/* Shimmer */}
          {loading && (
            <div style={{
              position: 'absolute', top: 0, left: '-90px',
              width: 90, height: '100%',
              background: 'white', filter: 'blur(17px)', opacity: 0.9,
              animation: 'shimmerSweep 1.5s ease-in-out infinite',
              pointerEvents: 'none',
            }} />
          )}
        </div>

        <p style={{ fontSize: FONT_SIZE_LG, color: TEXT_SECONDARY, margin: 0 }}>
          Get another code in 0:59
        </p>
      </div>

      {/* iOS-style numeric keyboard */}
      <div style={{
        background: 'rgba(214,214,214,0.75)',
        borderRadius: '27px 27px 0 0',
        padding: '8px 3px 20px',
        flexShrink: 0,
      }}>
        {/* YANGO suggestion bar inside keyboard */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          paddingBottom: 6,
        }}>
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 1,
          }}>
            <span style={{ fontFamily: '-apple-system, "SF Pro", system-ui, sans-serif', fontSize: 13, fontWeight: 400, lineHeight: '16px', color: 'rgba(0,0,0,0.8)', letterSpacing: 1 }}>YANGO</span>
            <span style={{ fontFamily: '-apple-system, "SF Pro", system-ui, sans-serif', fontSize: 16, fontWeight: 400, lineHeight: '19px', color: 'rgba(0,0,0,0.8)' }}>471910</span>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 6,
          padding: '0 3px',
        }}>
          {keys.flat().map((key, i) => {
            const isSym = key === 'sym'
            const isDel = key === 'del'
            const isNum = !isSym && !isDel && key !== ''
            const letters = KEY_LETTERS[key]

            return (
              <button
                key={i}
                onClick={() => {
                  if (isDel) handleKey('del')
                  else if (isNum) handleKey(key)
                }}
                style={{
                  height: 52,
                  background: isNum ? 'rgba(255,255,255,0.95)' : 'transparent',
                  border: 'none',
                  borderRadius: 6,
                  cursor: isNum || isDel || isSym ? 'pointer' : 'default',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isSym ? 'center' : isDel ? 'center' : 'center',
                  justifyContent: 'center',
                  gap: 1,
                  boxShadow: isNum ? '0 1px 0 rgba(0,0,0,0.3)' : 'none',
                }}
              >
                {isDel ? (
                  <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
                    <path d="M8.4 1H20C21.1 1 22 1.9 22 3V15C22 16.1 21.1 17 20 17H8.4C7.7 17 7.1 16.7 6.7 16.1L1 9L6.7 1.9C7.1 1.3 7.7 1 8.4 1Z" stroke="rgba(0,0,0,0.65)" strokeWidth="1.3" fill="none"/>
                    <path d="M11 5.5L17 12.5M17 5.5L11 12.5" stroke="rgba(0,0,0,0.65)" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                ) : isSym ? (
                  <span style={{ fontSize: 17, color: 'rgba(0,0,0,0.65)', fontWeight: 300, opacity: 0 }}>+*#</span>
                ) : (
                  <>
                    <span style={{ fontSize: 25, color: DARK_TEXT, fontWeight: 300, lineHeight: '28px' }}>{key}</span>
                    {letters && (
                      <span style={{ fontSize: 9, fontWeight: 600, color: 'rgba(0,0,0,0.45)', letterSpacing: 2.5, lineHeight: '10px' }}>{letters}</span>
                    )}
                  </>
                )}
              </button>
            )
          })}
        </div>

      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes shimmerSweep { 0% { left: -90px; } 100% { left: calc(100% + 90px); } }
      `}</style>
    </div>
  )
}
