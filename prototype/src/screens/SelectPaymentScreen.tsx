import { useState } from 'react'
import type { NavProps } from '../App'
import { TEXT_PRIMARY, YANGO_RED } from './shared'
import { BACKGROUND, SECONDARY_BG, TEXT_INVERTED, RADIUS_LG, FONT_SIZE_BASE, FONT_SIZE_LG, FONT_SIZE_XL } from './yango-tokens'

// Local public assets — work in all environments including GitHub Pages
const ASSET_SPLIT_ICON = '/checkout/Split.png'
const ASSET_EASYPAISA  = '/checkout/Method-Easypaisa.png'
const ASSET_JAZZCASH   = '/checkout/Method-JazzCash.png'

interface SelectPaymentScreenProps extends NavProps {
  // Modal mode: if provided, overrides navigation behaviour
  onCloseModal?: () => void
  onConfirmModal?: (method: string) => void
}

// Radio button — 26×26 circle
function RadioButton({ selected }: { selected: boolean }) {
  return (
    <div style={{
      width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
      background: selected ? '#777a85' : '#e1e3e8',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {selected && (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3.5 8L6.5 11L12.5 5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </div>
  )
}

const methods = [
  {
    id: 'easypaisa',
    label: 'Easypaisa',
    iconBg: '#332c3d',
    iconBorderRadius: 6,
    iconAsset: ASSET_EASYPAISA,
    useFullImg: true,
  },
  {
    id: 'jazzcash',
    label: 'Jazz Cash',
    iconBg: '#010101',
    iconBorderRadius: 5,
    iconAsset: ASSET_JAZZCASH,
    useFullImg: true,
  },
  {
    id: 'card',
    label: 'Add card',
    iconBg: SECONDARY_BG,
    iconBorderRadius: 5,
    iconAsset: null,
    useFullImg: false,
    isAdd: true,
  },
]

const DIVIDER_COLOR = 'rgba(0,0,0,0.08)'
const NUM_VARIANT: React.CSSProperties = { fontVariantNumeric: 'lining-nums proportional-nums' }

export default function SelectPaymentScreen({ goTo, goBack, selectedPaymentMethod, setPaymentMethod, onCloseModal, onConfirmModal }: SelectPaymentScreenProps) {
  const [selected, setSelected] = useState<string>(selectedPaymentMethod && selectedPaymentMethod !== '' ? selectedPaymentMethod : 'easypaisa')

  const handleClose = () => {
    if (onCloseModal) onCloseModal()
    else goBack()
  }

  const handleConfirm = () => {
    if (onConfirmModal) {
      onConfirmModal(selected)
    } else {
      setPaymentMethod(selected)
      goTo('confirm-plan')
    }
  }

  return (
    <div style={{
      position: 'relative',
      display: 'flex', flexDirection: 'column',
      height: '100%',
      background: 'rgba(0,0,0,0.5)',
    }}>
      {/* Sheet slide-up animation */}
      <style>{`@keyframes sheetSlideUp { from { transform: translateY(100%) } to { transform: translateY(0) } }`}</style>

      {/* Tap-to-close backdrop */}
      <div style={{ flex: 1 }} onClick={handleClose} />

      {/* Bottom sheet */}
      <div style={{
        background: BACKGROUND,
        borderRadius: '24px 24px 0 0',
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        animation: 'sheetSlideUp 340ms cubic-bezier(0.32,0.72,0,1) both',
      }}>
        {/* Pull bar */}
        <div style={{
          height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: '24px 24px 0 0', flexShrink: 0,
        }}>
          <div style={{ width: 34, height: 4, borderRadius: 2.5, background: 'rgba(0,0,0,0.3)' }} />
        </div>

        {/* Sheet header — split logo + "Pay in parts" + close button */}
        <div style={{
          position: 'relative',
          padding: '4px 24px 8px',
          display: 'flex', alignItems: 'center',
          flexShrink: 0,
        }}>
          {/* Split logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, height: 28, zIndex: 1 }}>
            <div style={{ width: 28, height: 28, overflow: 'hidden', borderRadius: 8, flexShrink: 0 }}>
              <img src={ASSET_SPLIT_ICON} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <span style={{
              fontSize: 22, fontWeight: 500, color: TEXT_PRIMARY,
              lineHeight: '24px', letterSpacing: 0, whiteSpace: 'nowrap',
              ...NUM_VARIANT,
            }}>
              Pay in parts
            </span>
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            style={{
              position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="rgba(0,0,0,0.7)" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Title block */}
        <div style={{ padding: '24px 24px 16px', flexShrink: 0 }}>
          <div style={{
            fontSize: 32, fontWeight: 500, letterSpacing: -0.5, lineHeight: '34px',
            color: TEXT_PRIMARY, marginBottom: 12, ...NUM_VARIANT,
          }}>
            Select how to pay for{'\n'}the first part
          </div>
          <div style={{ fontSize: FONT_SIZE_LG, color: TEXT_PRIMARY, lineHeight: '20px', ...NUM_VARIANT }}>
            If you choose online payment and the order{'\n'}is cancelled, you'll be fully refunded
          </div>
        </div>

        {/* Payment methods list */}
        <div style={{
          overflowY: 'auto', padding: '8px 20px 20px',
          display: 'flex', flexDirection: 'column', gap: 0,
          flexShrink: 0,
        }}>
          <div style={{ padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {methods.map((method, i) => (
              <div key={method.id}>
                {/* Method row */}
                <div
                  onClick={() => !method.isAdd && setSelected(method.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    paddingRight: 4, cursor: method.isAdd ? 'default' : 'pointer',
                  }}
                >
                  {/* Method icon — 36×24 */}
                  <div style={{
                    width: 36, height: 24, borderRadius: method.iconBorderRadius,
                    background: method.iconBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden', flexShrink: 0,
                  }}>
                    {method.useFullImg && method.iconAsset ? (
                      <img
                        src={method.iconAsset}
                        alt={method.label}
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    ) : (
                      /* Add card — plus icon */
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 2V12M2 7H12" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    )}
                  </div>

                  {/* Label */}
                  <div style={{ flex: 1, height: 40, display: 'flex', alignItems: 'center' }}>
                    <span style={{
                      fontSize: FONT_SIZE_BASE, fontWeight: 500, color: TEXT_PRIMARY,
                      lineHeight: '18px', ...NUM_VARIANT,
                    }}>
                      {method.label}
                    </span>
                  </div>

                  {/* Radio */}
                  <RadioButton selected={selected === method.id} />
                </div>

                {/* Divider (except after last item) */}
                {i < methods.length - 1 && (
                  <div style={{ paddingLeft: 48, marginTop: 12 }}>
                    <div style={{ height: 1, background: DIVIDER_COLOR }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sticky bottom — Confirm button */}
        <div style={{
          background: BACKGROUND,
          padding: '20px 24px 8px',
          flexShrink: 0,
        }}>
          <button
            onClick={handleConfirm}
            style={{
              width: '100%', height: 56,
              background: YANGO_RED, color: TEXT_INVERTED,
              border: 'none', borderRadius: RADIUS_LG,
              fontSize: FONT_SIZE_XL, fontWeight: 500, cursor: 'pointer',
              lineHeight: '20px', ...NUM_VARIANT,
            }}
          >
            Confirm
          </button>
        </div>

        {/* Bottom safe area */}
        <div style={{ height: 20, background: BACKGROUND }} />
      </div>
    </div>
  )
}
