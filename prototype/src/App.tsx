import { useState, useRef, useEffect } from 'react'
import HomeScreen from './screens/HomeScreen'
import PLPScreen from './screens/PLPScreen'
import PDPScreen from './screens/PDPScreen'
import CartScreen from './screens/CartScreen'
import CheckoutScreen from './screens/CheckoutScreen'
import YangoCheckoutScreen from './screens/YangoCheckoutScreen'
import BNPLAuthScreen from './screens/BNPLAuthScreen'
import OTPScreen from './screens/OTPScreen'
import PaymentPlanScreen from './screens/PaymentPlanScreen'
import SelectPaymentScreen from './screens/SelectPaymentScreen'
import ConfirmPlanScreen from './screens/ConfirmPlanScreen'
import ProcessingScreen from './screens/ProcessingScreen'
import OrderPaidScreen from './screens/OrderPaidScreen'
import MerchantScreen from './screens/MerchantScreen'
import './index.css'

export type ScreenId =
  | 'home'
  | 'plp'
  | 'pdp'
  | 'cart'
  | 'checkout'
  | 'yango-checkout'
  | 'bnpl-auth'
  | 'otp-empty'
  | 'otp-filled'
  | 'payment-plan'
  | 'select-payment'
  | 'confirm-plan'
  | 'processing'
  | 'order-paid'
  | 'merchant'

const SCREEN_ORDER: ScreenId[] = [
  'home',
  'plp',
  'pdp',
  'cart',
  'checkout',
  'yango-checkout',
  'bnpl-auth',
  'otp-empty',
  'otp-filled',
  'payment-plan',
  'select-payment',
  'confirm-plan',
  'processing',
  'order-paid',
  'merchant',
]

export interface NavProps {
  goTo: (screen: ScreenId) => void
  goBack: () => void
  currentScreen: ScreenId
  selectedProductId: number
  goToProduct: (id: number) => void
  addToCart: (id: number) => void
  selectedPaymentMethod: string
  setPaymentMethod: (m: string) => void
  cartCount: number
  setCartCount: (n: number) => void
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home')
  const [prevScreen, setPrevScreen] = useState<ScreenId | null>(null)
  const [animating, setAnimating] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState<number>(1)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('')
  const [cartCount, setCartCount] = useState<number>(1)
  const history = useRef<ScreenId[]>(['home'])

  // Sync with browser history for real back/forward button support
  useEffect(() => {
    window.history.replaceState({ screen: 'home' }, '', '#home')

    const onPop = (e: PopStateEvent) => {
      const screen = (e.state?.screen ?? 'home') as ScreenId
      if (!SCREEN_ORDER.includes(screen)) return
      // Rebuild internal history on browser navigation
      const idx = history.current.lastIndexOf(screen)
      if (idx >= 0) {
        history.current = history.current.slice(0, idx + 1)
      } else {
        history.current = [screen]
      }
      setCurrentScreen(screen)
      setPrevScreen(null)
      setAnimating(false)
    }

    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = (screen: ScreenId) => {
    if (animating) return
    setAnimating(true)
    setPrevScreen(currentScreen)
    setCurrentScreen(screen)
    setTimeout(() => {
      setPrevScreen(null)
      setAnimating(false)
    }, 340)
  }

  const goTo = (screen: ScreenId) => {
    history.current.push(screen)
    window.history.pushState({ screen }, '', `#${screen}`)
    navigate(screen)
  }

  const goBack = () => {
    if (history.current.length <= 1) return
    window.history.back()
  }

  const goToProduct = (id: number) => {
    setSelectedProductId(id)
    goTo('pdp')
  }

  const addToCart = (id: number) => {
    setSelectedProductId(id)
    setCartCount(1)
    goTo('cart')
  }

  const setPaymentMethod = (m: string) => setSelectedPaymentMethod(m)
  const nav: NavProps = { goTo, goBack, currentScreen, selectedProductId, goToProduct, addToCart, selectedPaymentMethod, setPaymentMethod, cartCount, setCartCount }

  const screenNode = (id: ScreenId) => {
    switch (id) {
      case 'home': return <HomeScreen {...nav} />
      case 'plp': return <PLPScreen {...nav} />
      case 'pdp': return <PDPScreen {...nav} />
      case 'cart': return <CartScreen {...nav} />
      case 'checkout': return <CheckoutScreen {...nav} />
      case 'yango-checkout': return <YangoCheckoutScreen {...nav} />
      case 'bnpl-auth': return <BNPLAuthScreen {...nav} />
      case 'otp-empty': return <OTPScreen {...nav} filled={false} />
      case 'otp-filled': return <OTPScreen {...nav} filled={true} />
      case 'payment-plan': return <PaymentPlanScreen {...nav} />
      case 'select-payment': return <SelectPaymentScreen {...nav} />
      case 'confirm-plan': return <ConfirmPlanScreen {...nav} />
      case 'processing': return <ProcessingScreen {...nav} />
      case 'order-paid': return <OrderPaidScreen {...nav} />
      case 'merchant': return <MerchantScreen {...nav} />
    }
  }

  const idx = SCREEN_ORDER.indexOf(currentScreen)

  return (
    <>
      <style>{`
        @keyframes screenFadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes screenFadeOut { from { opacity: 1 } to { opacity: 0 } }
        @keyframes sheetSlideUp  { from { transform: translateY(100%) } to { transform: translateY(0) } }
        @keyframes sheetSlideDown { from { transform: translateY(0) } to { transform: translateY(100%) } }
        @keyframes spinArc { to { transform: rotate(360deg) } }

        /* Desktop: fixed mobile viewport centered */
        @media (min-width: 481px) {
          html, body { background: #fff !important; }
          #root {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            min-height: 100vh !important;
          }
          .mobile-viewport {
            width: 390px !important;
            height: 100vh !important;
            overflow: hidden;
          }
        }
        /* Mobile: full width */
        @media (max-width: 480px) {
          .mobile-viewport {
            width: 100% !important;
            height: 100vh !important;
          }
        }
      `}</style>
      <div className="mobile-viewport" style={{ position: 'relative', overflow: 'hidden', background: '#fff' }}>
        {/* Exit screen — fades out */}
        {prevScreen && (
          <div key={`exit-${prevScreen}`} style={{
            position: 'absolute', inset: 0, zIndex: 1,
            animation: 'screenFadeOut 300ms ease forwards',
          }}>
            {screenNode(prevScreen)}
          </div>
        )}

        {/* Enter screen — fades in */}
        <div key={`enter-${currentScreen}-${animating}`} style={{
          position: 'absolute', inset: 0, zIndex: 2,
          animation: animating ? 'screenFadeIn 300ms ease forwards' : 'none',
        }}>
          {screenNode(currentScreen)}
        </div>
      </div>
    </>
  )
}
