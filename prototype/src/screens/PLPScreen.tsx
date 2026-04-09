import { useState } from 'react'
import type { NavProps } from '../App'
import { OutfittersHeader, CategoryTabs, PRODUCTS, filterBySubcategory, formatSubcategoryLabel, formatPrice, bnplYango, bnplBaadmay, OUT_BLACK, OUT_WHITE, OUT_BORDER, OUT_GRAY, OUT_BG, OUT_FONT } from './merchant-shared'
import type { Category, Subcategory } from './merchant-shared'

const TAB_LABEL: Record<Category, string> = {
  MEN: 'Men',
  WOMEN: 'Women',
  JUNIORS: 'Juniors',
}

export default function PLPScreen({ goTo, goBack, goToProduct, cartCount, plpFilter }: NavProps) {
  const [activeTab, setActiveTab] = useState<Category>(plpFilter.tab)
  const [subcategory, setSubcategory] = useState<Subcategory | null>(plpFilter.subcategory)

  const handleTabChange = (tab: Category) => {
    setActiveTab(tab)
    setSubcategory(null) // reset subcategory when switching tabs
  }

  const products = filterBySubcategory(
    PRODUCTS.filter(p => p.category === activeTab),
    subcategory,
  )

  const breadcrumb = subcategory
    ? `${TAB_LABEL[activeTab]} / ${formatSubcategoryLabel(subcategory)}`
    : `${TAB_LABEL[activeTab]} / All`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: OUT_WHITE, overflow: 'hidden', fontFamily: OUT_FONT }}>
      <OutfittersHeader onBack={goBack} onCart={() => goTo('cart')} cartCount={cartCount} />
      <CategoryTabs active={activeTab} onChange={handleTabChange} />

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
          {breadcrumb}
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
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 10px 32px' }}>
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
                  width: 28, height: 28, borderRadius: 0,
                  background: 'rgba(220,220,220,0.75)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 3V15M3 9H15" stroke={OUT_BLACK} strokeWidth="1"/>
                  </svg>
                </div>
              </div>

              {/* Info — same style as HomeScreen snippets */}
              <div style={{ padding: '6px 4px 15px', fontFamily: OUT_FONT }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#000000', lineHeight: 1.3, marginBottom: 0 }}>{p.name}</div>
                <div style={{ fontSize: 8, color: '#202020', letterSpacing: '0.03em', marginTop: 3, marginBottom: 3 }}>{p.fit}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#121212', marginBottom: 3 }}>{formatPrice(p.price)}</div>
                {/* BNPL badges — Pay only Rs.X now */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {/* Baadmay */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <img src="/checkout/baadmay-icon.svg" alt="" style={{ width: 12, height: 12, display: 'block', flexShrink: 0 }} />
                    <span style={{ fontSize: 8, fontWeight: 400, color: '#202020', lineHeight: '10px', whiteSpace: 'nowrap', fontFamily: OUT_FONT, textTransform: 'uppercase' as const, letterSpacing: '0.03em', fontVariantNumeric: 'lining-nums proportional-nums' }}>
                      Pay only <span style={{ color: '#690ff5', fontWeight: 700 }}>{bnplBaadmay(p.price)}</span> now
                    </span>
                  </div>
                  {/* Yango */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <img src="/checkout/Yango-logo.svg" alt="" style={{ width: 24.86, height: 12, display: 'block', flexShrink: 0 }} />
                    <span style={{ fontSize: 8, fontWeight: 400, color: '#202020', lineHeight: '10px', whiteSpace: 'nowrap', fontFamily: OUT_FONT, textTransform: 'uppercase' as const, letterSpacing: '0.03em', fontVariantNumeric: 'lining-nums proportional-nums' }}>
                      Pay only <span style={{ color: '#029154', fontWeight: 700 }}>{bnplYango(p.price)}</span> now
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
