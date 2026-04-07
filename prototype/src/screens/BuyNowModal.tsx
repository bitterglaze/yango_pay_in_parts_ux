import { useState, useRef } from 'react'
import { YANGO_RED } from './shared'
import { FONT_FAMILY } from './yango-tokens'

const NUM: React.CSSProperties = { fontVariantNumeric: 'lining-nums proportional-nums' }

const STEPS = [
  { icon: '/checkout/HowCalendar.png',  title: 'Complete instant verification',                sub: 'Only CNIC and a selfie required' },
  { icon: '/checkout/HowSuccess.png',   title: 'Confirm your payment plan',                    sub: 'This will be final \u2014 no surprises' },
  { icon: '/checkout/HowWallet.png',    title: 'Make the first payment and receive your order', sub: 'Simple online payment' },
  { icon: '/checkout/Phone Ok.png',     title: 'Pay the rest in the Yango App',                 sub: 'Use card or e-wallet' },
]

const FAQS = [
  { q: 'How does it work?', a: 'Select Pay in Parts at checkout, complete a quick verification with your CNIC and a selfie, and confirm your payment plan. Your first installment is paid online, and the remaining payments are made every two weeks in the Yango app.' },
  { q: 'How do I make installment payments?', a: 'All installment payments are completed online in the Yango app. You can use a mobile wallet (Easypaisa, JazzCash) or a debit/credit card.' },
  { q: 'What happens if I return a product?', a: 'If the merchant approves your return, your installment plan will be updated, and any payments already made will be refunded.' },
  { q: 'Is there any interest?', a: 'No interest is charged. However, the total price of the product may differ from the original price due to a small transparent service fee shown upfront.' },
  { q: 'Who can use Yango Pay in Parts?', a: 'Anyone 18 years or older with a valid CNIC and mobile number in Pakistan.' },
  { q: 'Do I need a credit card?', a: 'A credit card may be used, but it is not required. Installment payments are made via the Yango app using Easypaisa, JazzCash, or a debit card.' },
  { q: 'Why is the first payment higher than the others?', a: 'If the total purchase amount is higher than your available limit, the extra amount is added to the first payment. The remaining installments stay equal.' },
  { q: 'How can I see my repayments schedule?', a: 'You can view your full repayment schedule, upcoming payments, and due dates in the Yango app under the Pay in Parts section. We\u2019ll also send you reminders before each payment is due, so you\u2019ll never miss a deadline.' },
  { q: 'What happens if I miss a payment?', a: 'If a payment is missed, you may be charged a late fee and your account and available limit may be affected. Contact support if you need help.' },
]

export function BuyNowModal({
  price, onClose, onSplit,
}: {
  price: number; onClose: () => void; onSplit: () => void
}) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [closing, setClosing] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const touchStartY = useRef(0)

  const handleClose = () => {
    setClosing(true)
    setTimeout(onClose, 360)
  }

  const handleTouchStart = (e: React.TouchEvent) => { touchStartY.current = e.touches[0].clientY }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartY.current - e.changedTouches[0].clientY
    const scrollEl = scrollRef.current
    if (scrollEl && scrollEl.scrollTop > 0) return
    if (diff > 60) setIsFullScreen(true)
    if (diff < -60) { if (isFullScreen) setIsFullScreen(false); else handleClose() }
  }

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 50 }}>
      <style>{`
        @keyframes sheetSlideUp { from { transform: translateY(100%) } to { transform: translateY(0) } }
        @keyframes sheetSlideDown { from { transform: translateY(0) } to { transform: translateY(100%) } }
      `}</style>
      <div onClick={handleClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', opacity: closing ? 0 : 1, transition: 'opacity 350ms ease' }} />

      <div
        onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: '#fff',
          borderTopLeftRadius: 16, borderTopRightRadius: 16,
          overflow: 'hidden', display: 'flex', flexDirection: 'column',
          boxShadow: '0px 7px 23px 0px rgba(33,34,36,0.17)',
          animation: closing ? 'sheetSlideDown 300ms ease forwards' : 'sheetSlideUp 340ms cubic-bezier(0.32,0.72,0,1) both',
          transition: 'top 300ms ease, border-radius 300ms ease',
        }}
      >
        {/* Grabber indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8, paddingBottom: 4, flexShrink: 0 }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(0,0,0,0.2)' }} />
        </div>

        {/* Sticky header: Yango logo + close */}
        <div style={{
          height: 44, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'sticky', top: 0, zIndex: 10, background: '#fff',
        }}>
          <img src="/checkout/YangoMainLogo.svg" alt="Yango" style={{ height: 22 }} />
          <button onClick={handleClose} style={{
            position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
            width: 40, height: 40, background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
          }}>
            <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/checkout/Close.svg" alt="Close" style={{ width: 24, height: 24, display: 'block' }} />
            </div>
          </button>
        </div>

        {/* Scrollable content */}
        <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', paddingBottom: 100 }}>

          {/* Price + merchant — #1 "Outfitters" = Text Icon / Secondary */}
          <div style={{ textAlign: 'center', padding: '12px 20px 20px' }}>
            <p style={{ margin: 0, fontFamily: FONT_FAMILY, fontSize: 32, fontWeight: 500, lineHeight: '34px', letterSpacing: -0.5, color: 'rgba(0,0,0,0.86)', ...NUM }}>
              Rs.{price.toLocaleString('en-PK')}
            </p>
            <p style={{ margin: '4px 0 0', fontFamily: FONT_FAMILY, fontSize: 14, fontWeight: 400, lineHeight: '18px', color: 'rgba(0,0,0,0.5)' }}>
              Outfitters
            </p>
          </div>

          {/* #3 — "Pay overtime" block: sides 24px, top 32px, bottom 20px */}
          <div style={{ padding: '32px 24px 20px', textAlign: 'center' }}>
            <p style={{ margin: 0, fontFamily: FONT_FAMILY, fontSize: 26, fontWeight: 500, lineHeight: '28px', letterSpacing: -0.5, color: 'rgba(0,0,0,0.86)' }}>
              Shop now, pay later with{' '}
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, verticalAlign: 'middle' }}>
                <img src="/checkout/Split.png" alt="" style={{ width: 24, height: 24 }} />
                <span style={{ fontFamily: FONT_FAMILY, fontSize: 26, fontWeight: 500, color: '#2C9E56' }}>Pay in parts</span>
              </span>
            </p>
          </div>

          {/* #3 — Payment schedule: sides 32px, top 0, bottom 32px */}
          <div style={{ padding: '0 32px 32px' }}>
            {/* Bars — each in container with 3px top+bottom padding */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 3 }}>
              {[0, 1, 2, 3].map(i => (
                <div key={i} style={{ flex: 1, padding: '3px 0' }}>
                  <div style={{ height: 4, borderRadius: 2, background: i === 0 ? YANGO_RED : '#e1e3e8' }} />
                </div>
              ))}
            </div>
            {/* Labels — 3px gap from bars, then lines with 1px gap */}
            <div style={{ display: 'flex', gap: 6 }}>
              {(() => {
                const perPart = `Rs.${Math.round(price / 4).toLocaleString('en-PK')}`
                return [
                  { top: 'now', bottom: perPart },
                  { top: 'in 2 weeks', bottom: perPart },
                  { top: 'in 4 weeks', bottom: perPart },
                  { top: 'in 6 weeks', bottom: perPart },
                ]
              })().map((slot, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {/* Line 1: caption C1, 13px, regular, black */}
                  <span style={{
                    fontSize: 13, fontWeight: 400, fontFamily: FONT_FAMILY, ...NUM,
                    color: i === 0 ? 'rgba(0,0,0,0.86)' : 'rgba(0,0,0,0.5)',
                    whiteSpace: 'nowrap', lineHeight: '16px',
                  }}>
                    {slot.top}
                  </span>
                  {/* Line 2: title T3, 14px, lh 18px */}
                  <span style={{
                    fontSize: 14, fontWeight: 500, fontFamily: FONT_FAMILY, ...NUM,
                    color: 'rgba(0,0,0,0.86)', whiteSpace: 'nowrap', lineHeight: '18px',
                  }}>
                    {slot.bottom}
                  </span>
                </div>
              ))}
            </div>
            {/* Info note */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 12 }}>
              <img src="/checkout/InfoIcon.svg" alt="" style={{ width: 12, height: 12, display: 'block', flexShrink: 0 }} />
              <span style={{ fontFamily: FONT_FAMILY, fontSize: 13, fontWeight: 400, color: 'rgba(0,0,0,0.3)', lineHeight: '14px' }}>
                Final plan available after verification
              </span>
            </div>
          </div>

          {/* #4 — Promo cards */}
          <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              {/* Approval in minutes */}
              <div style={{ flex: 1, background: '#f3f5f7', borderRadius: 24, overflow: 'hidden', position: 'relative', padding: 20, minWidth: 0, aspectRatio: '163.5 / 200' }}>
                <p style={{ margin: 0, position: 'relative', zIndex: 1, fontFamily: FONT_FAMILY, fontSize: 18, fontWeight: 500, lineHeight: '20px', color: 'rgba(0,0,0,0.86)' }}>Approval<br/>in minutes</p>
                <p style={{ margin: '4px 0 0', position: 'relative', zIndex: 1, fontFamily: FONT_FAMILY, fontSize: 14, color: 'rgba(0,0,0,0.5)', lineHeight: '18px' }}>Fully online</p>
                <img src="/checkout/PromoCard1.png" alt="" style={{
                  position: 'absolute', bottom: -10, left: -20,
                  width: '130%', pointerEvents: 'none',
                }} />
              </div>
              {/* Repayments in the app */}
              <div style={{ flex: 1, background: '#f3f5f7', borderRadius: 24, overflow: 'hidden', position: 'relative', padding: 20, minWidth: 0, aspectRatio: '163.5 / 200' }}>
                <p style={{ margin: 0, position: 'relative', zIndex: 1, fontFamily: FONT_FAMILY, fontSize: 18, fontWeight: 500, lineHeight: '20px', color: 'rgba(0,0,0,0.86)' }}>Repayments<br/>in the app</p>
                <p style={{ margin: '4px 0 0', position: 'relative', zIndex: 1, fontFamily: FONT_FAMILY, fontSize: 14, color: 'rgba(0,0,0,0.5)', lineHeight: '18px' }}>Card, Easypaisa<br/>or JazzCash</p>
                <img src="/checkout/PromoCard2.png" alt="" style={{
                  position: 'absolute', bottom: 0, right: 0,
                  width: '85%', pointerEvents: 'none',
                }} />
              </div>
            </div>
            {/* Clear upfront pricing */}
            <div style={{
              background: '#f3f5f7', borderRadius: 24, height: 200,
              overflow: 'hidden', position: 'relative', padding: 20,
              backgroundImage: 'url(/checkout/PromoCard3.png)',
              backgroundSize: '55% auto', backgroundPosition: 'right center', backgroundRepeat: 'no-repeat',
            }}>
              <p style={{ margin: 0, position: 'relative', zIndex: 1, fontFamily: FONT_FAMILY, fontSize: 18, fontWeight: 500, lineHeight: '20px', color: 'rgba(0,0,0,0.86)', maxWidth: '50%' }}>Clear upfront pricing</p>
              <p style={{ margin: '4px 0 0', position: 'relative', zIndex: 1, fontFamily: FONT_FAMILY, fontSize: 14, color: 'rgba(0,0,0,0.5)', lineHeight: '18px', maxWidth: '50%' }}>No hidden fees and terms</p>
            </div>
          </div>

          {/* How it works — 32px gap after promo cards */}
          <div style={{ padding: '32px 20px 0' }}>
            <p style={{ margin: '0 0 16px', fontFamily: FONT_FAMILY, fontSize: 26, fontWeight: 500, lineHeight: '28px', color: 'rgba(0,0,0,0.86)' }}>How it works</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {STEPS.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <img src={step.icon} alt="" style={{ width: 40, height: 40, objectFit: 'contain', flexShrink: 0 }} />
                  <div style={{ flex: 1, paddingTop: 2 }}>
                    <p style={{ margin: '0 0 4px', fontFamily: FONT_FAMILY, fontSize: 18, fontWeight: 500, color: 'rgba(0,0,0,0.86)', lineHeight: '20px' }}>{step.title}</p>
                    <p style={{ margin: 0, fontFamily: FONT_FAMILY, fontSize: 13, fontWeight: 400, color: 'rgba(0,0,0,0.5)', lineHeight: '16px' }}>{step.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ — 32px gap after How it works, 32px bottom padding */}
          <div style={{ padding: '32px 20px 32px' }}>
            <p style={{ margin: '0 0 8px', fontFamily: FONT_FAMILY, fontSize: 26, fontWeight: 500, lineHeight: '28px', color: 'rgba(0,0,0,0.86)' }}>You may ask</p>
            {FAQS.map((faq, i) => {
              const isOpen = expandedFaq === i
              return (
                <div key={i}>
                  <div onClick={() => setExpandedFaq(isOpen ? null : i)} style={{
                    display: 'flex', gap: 12, alignItems: 'flex-start', padding: '20px 0', cursor: 'pointer',
                  }}>
                    <div style={{ flex: 1, fontFamily: FONT_FAMILY, fontSize: 18, fontWeight: 500, lineHeight: '20px', color: 'rgba(0,0,0,0.86)', paddingTop: 2, ...NUM }}>{faq.q}</div>
                    <img src="/checkout/ArrowDown.svg" alt="" style={{
                      width: 24, height: 24, flexShrink: 0,
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 200ms ease',
                    }} />
                  </div>
                  {isOpen && (
                    <div style={{ paddingBottom: 20, fontFamily: FONT_FAMILY, fontSize: 16, fontWeight: 400, lineHeight: '20px', color: 'rgba(0,0,0,0.86)', ...NUM }}>{faq.a}</div>
                  )}
                  {i < FAQS.length - 1 && <div style={{ height: 1, background: 'rgba(0,0,0,0.08)' }} />}
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer CTA — always on top, never overlapped */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 20,
          background: '#fff', boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
          padding: '12px 20px 28px',
          borderTopLeftRadius: 24, borderTopRightRadius: 24,
        }}>
          <button onClick={onSplit} style={{
            width: '100%', height: 54, background: YANGO_RED, color: '#fff',
            border: 'none', borderRadius: 14,
            fontFamily: FONT_FAMILY, fontSize: 18, fontWeight: 500, lineHeight: '20px', cursor: 'pointer',
          }}>
            Pay in parts
          </button>
        </div>
      </div>
    </div>
  )
}
