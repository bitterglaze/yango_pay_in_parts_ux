import { useState } from 'react'
import type { NavProps } from '../App'
import { OutfittersHeader, CategoryTabs, PRODUCTS, formatPrice, bnplYango, bnplBaadmay, OUT_BLACK, OUT_WHITE, OUT_BORDER, OUT_GRAY, OUT_BG, OUT_FONT } from './merchant-shared'
import { BaadmayBadge } from './baadmay-shared'
import { SplitBadge } from './shared'

export default function PLPScreen({ goTo, goBack, goToProduct, cartCount }: NavProps) {
  const [activeTab, setActiveTab] = useState<'MEN' | 'WOMEN' | 'JUNIORS'>('MEN')

  const products = PRODUCTS.filter(p => p.category === activeTab)

  const categoryLabel: Record<string, string> = {
    MEN: 'Men / T-Shirts & Polos',
    WOMEN: 'Women / T-Shirts',
    JUNIORS: 'Juniors / Girls 6–14Y',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: OUT_WHITE, overflow: 'hidden', fontFamily: OUT_FONT }}>
      <OutfittersHeader onBack={goBack} onCart={() => goTo('cart')} cartCount={cartCount} />
      <CategoryTabs active={activeTab} onChange={setActiveTab} />

      {/* Breadcrumb + Filter bar */}
      <div style={{
        padding: '8px 16px',
        borderBottom: `1px solid ${OUT_BORDER}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 11, color: OUT_GRAY, letterSpacing: '0.02em' }}>
          {categoryLabel[activeTab]}
        </span>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{
            border: `1px solid ${OUT_BORDER}`, borderRadius: 2,
            padding: '4px 10px', fontSize: 10, fontWeight: 600,
            letterSpacing: '0.08em', cursor: 'pointer', color: OUT_BLACK,
          }}>
            FILTER
          </div>
          <div style={{
            border: `1px solid ${OUT_BORDER}`, borderRadius: 2,
            padding: '4px 10px', fontSize: 10, fontWeight: 600,
            letterSpacing: '0.08em', cursor: 'pointer', color: OUT_BLACK,
          }}>
            SORT
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          {products.map(p => (
            <div key={p.id} onClick={() => goToProduct(p.id)} style={{ cursor: 'pointer' }}>
              {/* Image */}
              <div style={{ aspectRatio: '3/4', overflow: 'hidden', position: 'relative', background: OUT_BG }}>
                <img
                  src={p.img}
                  alt={p.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                {/* Quick add */}
                <div style={{
                  position: 'absolute', bottom: 8, right: 8,
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.92)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 2V12M2 7H12" stroke={OUT_BLACK} strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: '7px 6px 12px' }}>
                <div style={{
                  fontSize: 10, fontWeight: 600, letterSpacing: '0.04em',
                  color: OUT_BLACK, lineHeight: 1.3, marginBottom: 1,
                }}>
                  {p.name}
                </div>
                <div style={{ fontSize: 9, color: OUT_GRAY, letterSpacing: '0.03em', marginBottom: 3 }}>
                  {p.fit}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: OUT_BLACK, marginBottom: 4 }}>
                  {formatPrice(p.price)}
                </div>

                {/* BNPL badges row */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <BaadmayBadge installment={bnplBaadmay(p.price)} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <SplitBadge size="sm" />
                    <span style={{ fontSize: 9, color: OUT_GRAY }}>4× {bnplYango(p.price)}</span>
                  </div>
                </div>

                {/* Color swatches */}
                <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                  {p.colors.map((c, i) => (
                    <div key={i} style={{
                      width: 12, height: 12, borderRadius: '50%',
                      background: c,
                      border: i === 0 ? `1.5px solid ${OUT_BLACK}` : `1px solid ${OUT_BORDER}`,
                    }} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
