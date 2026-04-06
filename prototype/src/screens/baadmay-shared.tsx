// Baadmay BNPL — badge and block components
// Visual style matches live outfitters.com.pk implementation

export const BAADMAY_PURPLE = '#6C2BD9'
export const BAADMAY_RED = '#E63946'
export const BAADMAY_LIGHT = '#f9f6ff'         // Selected state bg
export const BAADMAY_TEXT = '#000000'
export const BAADMAY_TEXT_SECONDARY = '#6b6b6b'
export const BAADMAY_TEXT_INVERTED = '#ffffff'
export const BAADMAY_BORDER = '#dddddd'
export const BAADMAY_BORDER_INACTIVE = '#cccccc'

// Small pill badge for PLP product cards
export function BaadmayBadge({ installment }: { installment: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <div style={{
        background: BAADMAY_PURPLE,
        borderRadius: 4,
        padding: '2px 5px',
        display: 'flex',
        alignItems: 'center',
      }}>
        <span style={{
          fontSize: 9,
          fontWeight: 700,
          color: BAADMAY_TEXT_INVERTED,
          fontFamily: 'sans-serif',
          letterSpacing: -0.2,
        }}>baadmay</span>
      </div>
      <span style={{ fontSize: 9, color: BAADMAY_TEXT_SECONDARY, fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, "system-ui", Arial, sans-serif' }}>3× {installment}</span>
    </div>
  )
}

// Full block for PDP — matches outfitters.com.pk layout
export function BaadmayBlock({ price }: { price: number }) {
  const installment = Math.round(price / 3)
  const formatted = `Rs.${installment.toLocaleString('en-PK')}`
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '8px 0',
    }}>
      {/* baadmay pill */}
      <div style={{
        background: BAADMAY_PURPLE,
        borderRadius: 6,
        padding: '4px 10px',
        flexShrink: 0,
      }}>
        <span style={{
          fontSize: 13,
          fontWeight: 700,
          color: BAADMAY_TEXT_INVERTED,
          fontFamily: 'sans-serif',
          letterSpacing: -0.3,
        }}>baadmay</span>
      </div>
      {/* text */}
      <span style={{ fontSize: 13, color: BAADMAY_TEXT }}>
        Pay in 3 Installments of{' '}
        <span style={{ color: BAADMAY_RED, fontWeight: 600 }}>{formatted}</span>
      </span>
    </div>
  )
}

// Checkout option row
export function BaadmayCheckoutOption({
  selected,
  onSelect,
  price,
}: {
  selected: boolean
  onSelect: () => void
  price: number
}) {
  const installment = Math.round(price / 3)
  const formatted = `Rs.${installment.toLocaleString('en-PK')}`
  return (
    <div
      onClick={onSelect}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '14px 16px',
        border: `1.5px solid ${selected ? BAADMAY_PURPLE : BAADMAY_BORDER}`,
        borderRadius: 8,
        cursor: 'pointer',
        background: selected ? BAADMAY_LIGHT : BAADMAY_TEXT_INVERTED,
        marginBottom: 8,
      }}
    >
      {/* Radio */}
      <div style={{
        width: 18,
        height: 18,
        borderRadius: '50%',
        border: `2px solid ${selected ? BAADMAY_PURPLE : BAADMAY_BORDER_INACTIVE}`,
        background: selected ? BAADMAY_PURPLE : 'transparent',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {selected && <div style={{ width: 6, height: 6, borderRadius: '50%', background: BAADMAY_TEXT_INVERTED }} />}
      </div>

      {/* Baadmay pill */}
      <div style={{
        background: BAADMAY_PURPLE,
        borderRadius: 5,
        padding: '3px 8px',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: BAADMAY_TEXT_INVERTED, letterSpacing: -0.2 }}>baadmay</span>
      </div>

      {/* Label */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: BAADMAY_TEXT }}>Pay in 3 installments</div>
        <div style={{ fontSize: 12, color: BAADMAY_TEXT_SECONDARY }}>{formatted} each · No hidden fees</div>
      </div>
    </div>
  )
}
