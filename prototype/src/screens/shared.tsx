// Shared UI components
import { FONT_SIZE_XL, FONT_SIZE_BASE } from './yango-tokens'

export const YANGO_RED = '#ff4930'
export const YANGO_YELLOW = '#fce000'
export const TEXT_PRIMARY = 'rgba(0,0,0,0.86)'
export const TEXT_SECONDARY = 'rgba(0,0,0,0.5)'
export const FILL_DEFAULT = '#f3f5f7'
export const GREEN = '#56c776'

// Yango logo SVG (from _Main Header : Logo.svg, 84×28)
export function YangoLogoSVG() {
  return (
    <svg width="84" height="28" viewBox="0 0 84 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M70.7285 27.8321C63.5232 27.8321 63.4858 20.4401 65.9872 12.7867C68.6752 4.4614 72.7072 0.354736 77.2992 0.354736C84.5045 0.354736 84.5418 7.74674 82.0405 15.4001C79.3525 23.7254 75.3205 27.8321 70.7285 27.8321ZM71.3258 23.0907C72.5952 23.0907 73.9765 21.2614 76.1792 14.4294C77.6352 9.9494 78.9045 5.09607 76.7018 5.09607C75.4325 5.09607 74.0512 6.9254 71.8485 13.7574C70.3925 18.1627 69.0858 23.0907 71.3258 23.0907Z" fill="#FF4930"/>
      <path d="M55.3487 17.3414L56.9913 12.3387H65.0553L60.0527 27.3467H55.834L56.2073 25.2187C54.9007 26.8241 53.6313 27.5334 51.802 27.5334C46.538 27.5334 46.314 20.4401 48.8153 12.7867C51.5407 4.46138 55.4233 0.317383 60.314 0.317383C64.57 0.317383 66.3993 3.41605 66.6233 7.26138L61.3593 9.01605C61.1727 5.99205 60.6127 5.13338 59.754 5.13338C58.2233 5.13338 56.8793 7.03738 54.6767 13.7574C53.1087 18.536 52.3993 22.9787 54.266 22.9787C55.9087 22.9787 57.2527 20.1787 58.074 17.6774L58.186 17.3414H55.3487Z" fill="#FF4930"/>
      <path d="M41.1736 13.8694C41.0989 15.1014 40.9869 16.5947 40.9496 17.08C41.0989 16.632 41.4349 15.4 41.9203 14.0187L46.2509 0.840027H51.6643L42.8536 27.3467H36.5816L37.4029 13.6454C37.4776 12.4134 37.6269 10.92 37.6643 10.4347C37.5149 10.8827 37.1789 12.1147 36.6936 13.496L32.1389 27.3467H26.7256L35.5363 0.840027H41.9576L41.1736 13.8694Z" fill="#FF4930"/>
      <path d="M22.0678 0.840027H30.0198L26.1744 27.3467H20.4998L21.3211 22.568H16.5798L14.3398 27.3467H8.3291L22.0678 0.840027ZM18.9691 17.5654H22.2171L23.6731 9.27736C23.8971 8.04536 24.1958 6.58936 24.2704 6.10403C24.0838 6.55203 23.5984 7.74669 22.9638 9.05336L18.9691 17.5654Z" fill="#FF4930"/>
      <path d="M8.81071 7.44803C8.73604 8.68003 8.62404 10.1734 8.54937 10.6587C8.73604 10.2107 9.29604 9.05336 10.0054 7.78403L13.776 0.840027H20.384L8.96004 18.3494L5.97337 27.3467H0.074707L3.21071 17.9014L3.28537 0.840027H9.10938L8.81071 7.44803Z" fill="#FF4930"/>
    </svg>
  )
}

// Status bar (iPhone 14+ Dynamic Island style)
export function StatusBar() {
  return (
    <div style={{
      height: 56,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 27px 0',
      flexShrink: 0,
    }}>
      <span style={{
        fontFamily: "'SF Pro Text', -apple-system, sans-serif",
        fontSize: 17,
        fontWeight: 600,
        lineHeight: '22px',
        letterSpacing: -0.408,
        color: '#21201F',
      }}>9:41</span>

      {/* Dynamic Island — 122×36, top 12, black, radius 32 */}
      <div style={{
        position: 'absolute',
        top: 12,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 122,
        height: 36,
        background: '#000',
        borderRadius: 32,
      }} />

      {/* Right: signal + wifi + battery */}
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="4" width="3" height="8" rx="1" fill="#000" opacity="0.4"/>
          <rect x="4.5" y="2.5" width="3" height="9.5" rx="1" fill="#000" opacity="0.6"/>
          <rect x="9" y="0.5" width="3" height="11.5" rx="1" fill="#000"/>
          <rect x="13.5" y="5" width="3" height="2" rx="0.5" fill="#000"/>
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <circle cx="8" cy="11" r="1" fill="#000"/>
          <path d="M5.3 8.3C6.0 7.6 7.0 7.1 8 7.1C9.0 7.1 10.0 7.6 10.7 8.3" stroke="#000" strokeWidth="1.3" strokeLinecap="round"/>
          <path d="M2.9 5.9C4.3 4.5 6.0 3.7 8 3.7C10.0 3.7 11.7 4.5 13.1 5.9" stroke="#000" strokeWidth="1.3" strokeLinecap="round"/>
          <path d="M0.5 3.5C2.3 1.7 5.0 0.5 8 0.5C11.0 0.5 13.7 1.7 15.5 3.5" stroke="#000" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#000" strokeOpacity="0.35"/>
          <rect x="1.5" y="1.5" width="18.5" height="9" rx="2.5" fill="#000"/>
          <path d="M23 4.25V7.75C23.8 7.4 24.5 6.8 24.5 6C24.5 5.2 23.8 4.6 23 4.25Z" fill="#000" fillOpacity="0.4"/>
        </svg>
      </div>
    </div>
  )
}

// Yango header — FAQ icon left, logo center, empty right
// No fake status bar — real device status bar shows through
export function YangoHeader({ onBack }: { onBack?: () => void }) {
  return (
    <div style={{ background: '#fff', flexShrink: 0, paddingTop: 0 }}>
      <div style={{
        height: 60,
        display: 'flex',
        alignItems: 'center',
        padding: '6px 16px',
      }}>
        {/* Left: FAQ/support icon — uses /checkout/FAQ.svg, same as Order Paid screen */}
        <button
          onClick={onBack}
          style={{
            width: 40, height: 40,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'none', border: 'none', cursor: onBack ? 'pointer' : 'default',
            padding: 8, flexShrink: 0,
          }}
        >
          <img src="/checkout/FAQ.svg" alt="Help" style={{ width: 24, height: 24 }} />
        </button>

        {/* Center: YANGO SVG logo */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <YangoLogoSVG />
        </div>

        {/* Right: empty placeholder */}
        <div style={{ width: 40, flexShrink: 0 }} />
      </div>
    </div>
  )
}

// Bottom safe area — padding for real device home indicator, no fake browser nav
export function SafeAreaBottom({ children }: { children?: React.ReactNode }) {
  return (
    <div style={{
      background: '#fff',
      paddingBottom: 24,
      flexShrink: 0,
    }}>
      {children}
    </div>
  )
}

// Red primary button
export function PrimaryButton({ label, onClick, style }: { label: string; onClick: () => void; style?: React.CSSProperties }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: YANGO_RED,
        border: 'none',
        borderRadius: 16,
        height: 56,
        width: '100%',
        color: 'rgba(255,255,255,0.98)',
        fontSize: FONT_SIZE_XL,
        fontWeight: 500,
        cursor: 'pointer',
        letterSpacing: 0,
        ...style,
      }}
    >
      {label}
    </button>
  )
}

// Yellow button
export function YellowButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: YANGO_YELLOW,
        border: 'none',
        borderRadius: 16,
        height: 56,
        width: '100%',
        color: TEXT_PRIMARY,
        fontSize: FONT_SIZE_XL,
        fontWeight: 500,
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  )
}

// Yango Split logo badge
export function SplitBadge({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const h = size === 'sm' ? 16 : size === 'md' ? 22 : 28
  const fontSize = size === 'sm' ? 10 : size === 'md' ? FONT_SIZE_BASE : FONT_SIZE_XL
  return (
    <div style={{ display: 'flex', alignItems: 'center', height: h }}>
      <div style={{
        background: '#ff0000',
        height: h,
        paddingLeft: 3,
        paddingRight: 0,
        display: 'flex',
        alignItems: 'center',
        borderRadius: `${h / 2}px 0 0 ${h / 2}px`,
        fontSize: fontSize,
      }}>
        <div style={{ width: h * 0.75, height: h * 0.75, position: 'relative' }}>
          {/* Split circle icon */}
          <div style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'conic-gradient(#4CAF50 0deg 180deg, #fff 180deg 360deg)',
            border: '1.5px solid rgba(0,0,0,0.1)',
          }} />
        </div>
      </div>
      <div style={{
        background: '#ff0000',
        height: h,
        paddingLeft: 3,
        paddingRight: 6,
        display: 'flex',
        alignItems: 'center',
        borderRadius: `0 2px 2px 0`,
      }}>
        <span style={{
          fontFamily: 'sans-serif',
          fontStyle: 'italic',
          fontWeight: 900,
          fontSize,
          color: '#fff',
          lineHeight: 1,
        }}>yango</span>
      </div>
    </div>
  )
}
