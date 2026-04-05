import { useState, useRef } from 'react'
import type { NavProps } from '../App'
import { OutfittersHeader, PRODUCTS, formatPrice, OUT_BLACK, OUT_WHITE, OUT_BORDER, OUT_GRAY, OUT_BG, OUT_FONT } from './merchant-shared'
import { BuyNowModal } from './BuyNowModal'
import { BaadmayWidget, YangoWidget } from './bnpl-widgets'

const COLOR_NAMES: Record<string, string> = {
  '#1b1b1b': 'Black', '#8B5E2B': 'Brown', '#5c4a2a': 'Olive Brown',
  '#3d5c3d': 'Dark Green', '#e0d8cc': 'Cream', '#2a4d6e': 'Dark Blue',
  '#c87941': 'Rust', '#556b4e': 'Olive', '#e8e0d5': 'Off White', '#fff': 'White',
}
function getColorName(hex: string): string {
  return COLOR_NAMES[hex.toLowerCase()] ?? COLOR_NAMES[hex] ?? 'Black'
}
function toTitleCase(str: string): string {
  return str.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
}

export default function PDPScreen({ goTo, goBack, goToProduct, selectedProductId, cartCount, setCartCount }: NavProps) {
  const product = PRODUCTS.find(p => p.id === selectedProductId) ?? PRODUCTS[0]
  const images = [product.img]

  const [selectedColorIdx, setSelectedColorIdx] = useState(0)
  const [openSection, setOpenSection] = useState<string | null>(null)
  const [showBuyModal, setShowBuyModal] = useState(false)
  const touchStartX = useRef(0)

  const fitParts = product.fit.split(' | ')
  const fitLabel = fitParts[0] || ''
  const catLabel = fitParts[1] || ''
  const selectedColorName = getColorName(product.colors[selectedColorIdx] ?? product.colors[0])
  const hasMultipleColors = product.colors.length > 1

  const accordionSections = [
    { key: 'size', label: 'SIZE GUIDE', content: 'XS: Chest 34–36" · S: 36–38" · M: 38–40" · L: 40–42" · XL: 42–44"' },
    { key: 'comp', label: 'PRODUCT DETAILS & COMPOSITION', content: '100% Premium Cotton · Machine wash cold · Do not bleach · Tumble dry low' },
    { key: 'del', label: 'DELIVERIES & RETURNS', content: 'Free delivery on orders over PKR 3,000. Returns accepted within 14 days of delivery for unused items in original packaging.' },
  ]

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%', background: OUT_WHITE, overflow: 'hidden', fontFamily: OUT_FONT }}>
      <OutfittersHeader onBack={goBack} onCart={() => goTo('cart')} cartCount={cartCount} />

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Gallery */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden', background: OUT_BG, touchAction: 'pan-y' }}
          onTouchStart={e => { touchStartX.current = e.touches[0].clientX }}
          onTouchEnd={() => {}}>
          <img src={images[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>

        {/* Product info */}
        <div style={{ padding: '14px 16px 0' }}>
          {/* #28 — Name: Bold 700, CAPS, 14px, no italic */}
          <div style={{ fontSize: 14, fontWeight: 700, color: OUT_BLACK, marginBottom: 2, lineHeight: 1.3, fontFamily: OUT_FONT, fontStyle: 'normal', textTransform: 'uppercase' as const }}>
            {product.name}
          </div>

          {/* #28 — Price: bold, NO italic, reduced gap to baadmay (1px margin) */}
          <div style={{ fontSize: 11, fontWeight: 700, color: OUT_BLACK, marginBottom: 1, fontFamily: OUT_FONT, fontStyle: 'normal' }}>
            {formatPrice(product.price)}
          </div>

          {/* #29 — Baadmay first */}
          <BaadmayWidget price={product.price} size="sm" />

          {/* #29+30 — Yango widget immediately after Baadmay, ABOVE Add to Cart */}
          <div style={{ marginTop: 2 }}>
            <YangoWidget price={product.price} size="sm" onBuy={() => setShowBuyModal(true)} />
          </div>

          {/* Fit info */}
          <div style={{ fontSize: 9, color: OUT_BLACK, padding: '6px 0 6px', fontFamily: OUT_FONT }}>
            {toTitleCase(fitLabel)} - {toTitleCase(catLabel)} - {selectedColorName}
          </div>

          {/* Color selector — only if multiple */}
          {hasMultipleColors && (
            <div style={{ display: 'flex', gap: 10, padding: '0 0 10px' }}>
              {product.colors.map((c, i) => (
                <div key={i} onClick={() => setSelectedColorIdx(i)} style={{
                  width: 28, height: 28, borderRadius: 2, background: c,
                  border: i === selectedColorIdx ? `2px solid ${OUT_BLACK}` : `1px solid ${OUT_BORDER}`,
                  cursor: 'pointer', position: 'relative',
                }}>
                  {i === selectedColorIdx && (
                    <div style={{ position: 'absolute', bottom: -6, left: '50%', transform: 'translateX(-50%)', width: 16, height: 2, background: OUT_BLACK, borderRadius: 1 }} />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* #31 — Add to Cart: text only, no icon */}
          <button onClick={() => { setCartCount(1); goTo('cart') }} style={{
            width: '100%', height: 48, background: OUT_BLACK, color: OUT_WHITE,
            border: 'none', borderRadius: 0, fontSize: 13, fontWeight: 700, letterSpacing: '0.1em',
            cursor: 'pointer', marginBottom: 16, marginTop: hasMultipleColors ? 6 : 0,
            fontFamily: OUT_FONT,
          }}>
            ADD TO CART
          </button>
        </div>

        {/* Product description */}
        <div style={{ padding: '0 16px 16px', borderTop: `1px solid ${OUT_BORDER}` }}>
          <div style={{ padding: '14px 0' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: OUT_BLACK, marginBottom: 10, fontFamily: OUT_FONT }}>PRODUCT DESCRIPTION</div>
            <div style={{ fontSize: 13, color: OUT_GRAY, lineHeight: 1.7, whiteSpace: 'pre-line', fontFamily: OUT_FONT }}>
              {'Sophisticated raglan polo with striking color-block design and refined v-neck styling. Crafted from premium cotton for breathable comfort. Perfect for the modern man seeking effortless elegance and relaxed sophistication.\n\nModel Details: The Model is Wearing Size: L; Model Height: 5.11 Ft'}
            </div>
          </div>
        </div>

        {/* Accordion */}
        <div style={{ borderTop: `1px solid ${OUT_BORDER}` }}>
          {accordionSections.map(sec => (
            <div key={sec.key} style={{ borderBottom: `1px solid ${OUT_BORDER}` }}>
              <div onClick={() => toggleSection(sec.key)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', cursor: 'pointer' }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: OUT_BLACK, fontFamily: OUT_FONT }}>{sec.label}</span>
                <span style={{ fontSize: 18, color: OUT_GRAY, lineHeight: 1 }}>{openSection === sec.key ? '−' : '+'}</span>
              </div>
              {openSection === sec.key && (
                <div style={{ padding: '0 16px 14px', fontSize: 13, color: OUT_GRAY, lineHeight: 1.6, fontFamily: OUT_FONT }}>{sec.content}</div>
              )}
            </div>
          ))}
        </div>

        {/* You may also like */}
        <div style={{ padding: '20px 16px 32px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: OUT_BLACK, marginBottom: 12, fontFamily: OUT_FONT }}>YOU MAY ALSO LIKE</div>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
            {PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4).map(p => (
              <div key={p.id} onClick={() => goToProduct(p.id)} style={{ flexShrink: 0, width: 100, cursor: 'pointer' }}>
                <div style={{ width: 100, height: 130, overflow: 'hidden', background: OUT_BG }}>
                  <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.03em', color: OUT_BLACK, marginTop: 4, fontFamily: OUT_FONT }}>{p.name}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: OUT_BLACK, marginTop: 2, fontFamily: OUT_FONT }}>{formatPrice(p.price)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showBuyModal && (
        <BuyNowModal price={product.price} onClose={() => setShowBuyModal(false)} onSplit={() => { setShowBuyModal(false); goTo('yango-checkout') }} />
      )}
    </div>
  )

  function toggleSection(s: string) { setOpenSection(openSection === s ? null : s) }
}
