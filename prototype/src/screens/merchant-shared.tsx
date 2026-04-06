// Outfitters merchant site — shared components, constants, product data

export const OUT_BLACK = '#121212'
export const OUT_WHITE = '#ffffff'
export const OUT_GRAY = '#6b6b6b'
export const OUT_BORDER = '#e5e5e5'
export const OUT_BG = '#f5f5f5'
export const OUT_FONT = '"Neue Haas Grotesk Display Pro", -apple-system, "system-ui", Arial, sans-serif'

// Additional merchant tokens
export const CHECKOUT_BLUE = '#205BD1'
export const LINK_BLUE = '#0066cc'
export const WARNING_BG = '#fffbf0'
export const WARNING_BORDER = '#f5c842'
export const WARNING_TEXT = '#7a6000'
export const MERCHANT_AVATAR_BG = '#f5e6c8'
export const MERCHANT_AVATAR_TEXT = '#8B5E2B'
export const CHECKOUT_SELECTED_BG = '#f0f4ff'  // Selection highlight for checkout radio options

// Outfitters wordmark — real SVG logo (viewBox 0 0 615 209)
export function OutfittersLogo({ width = 100 }: { width?: number }) {
  const height = Math.round(width * (209 / 615))
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 615 209"
      fill="none"
      width={width}
      height={height}
      style={{ display: 'block', flexShrink: 0 }}
    >
      <path d="M272.777 44.8033V30.9121C272.777 30.132 273.327 29.4619 274.097 29.3119L297.1 24.9215C298.1 24.7315 299.03 25.5016 299.03 26.5217V44.8033C299.03 45.7034 298.3 46.4335 297.4 46.4335H274.397C273.507 46.4335 272.777 45.7034 272.777 44.8033Z" fill={OUT_BLACK}/>
      <path d="M615 168.875V176.496C615 195.608 602.709 207.649 583.437 207.649C561.085 207.649 549.914 193.247 549.914 164.715V154.374C549.914 153.474 550.644 152.744 551.544 152.744H568.436C569.316 152.744 570.036 153.444 570.066 154.324L570.306 162.355C570.306 180.156 572.536 188.277 581.197 188.277C586.227 188.277 588.738 184.877 588.738 178.066V173.586C588.738 164.685 585.387 155.264 578.127 145.573L564.995 127.511C555.215 113.9 549.914 101.589 549.914 86.6677V80.6172C549.914 62.5555 563.325 49.9844 582.317 49.9844C603.549 49.9844 613.6 64.6657 613.6 93.9884V102.449C613.6 103.349 612.87 104.079 611.97 104.079L595.528 104.099C594.658 104.099 593.938 103.409 593.898 102.539L593.478 92.3982C593.478 76.9468 590.968 69.3561 584.257 69.3561C578.387 69.3561 576.156 73.0265 576.156 80.6172V82.9974C576.156 92.4182 578.387 100.539 583.137 107.08L598.219 128.552C609.41 144.263 615 157.624 615 168.875Z" fill={OUT_BLACK}/>
      <path d="M342.856 52.5064H352.807C353.707 52.5064 354.437 53.2364 354.437 54.1365V71.5481C354.437 72.4482 353.707 73.1782 352.807 73.1782H342.856C341.956 73.1782 341.226 73.9083 341.226 74.8084V170.777C341.226 179.998 342.626 182.508 349.607 182.508C350.597 182.508 351.487 182.408 352.387 182.218C353.397 181.998 354.357 182.768 354.357 183.808V204.63C354.357 205.41 353.807 206.09 353.037 206.23C349.297 206.93 345.566 207.37 342.066 207.37C323.074 207.37 314.974 197.59 314.974 175.808V74.8084C314.974 73.9083 314.243 73.1782 313.343 73.1782H307.103C306.203 73.1782 305.473 72.4482 305.473 71.5481V54.1365C305.473 53.2364 306.203 52.5064 307.103 52.5064H313.343C314.243 52.5064 314.974 51.7763 314.974 50.8762V18.1132C314.974 17.3332 315.524 16.6631 316.294 16.5131L339.296 12.1227C340.296 11.9327 341.226 12.7027 341.226 13.7228V50.8862C341.226 51.7763 341.956 52.5064 342.856 52.5064Z" fill={OUT_BLACK}/>
      <path d="M151.93 190.046V54.1341C151.93 53.234 151.2 52.5039 150.3 52.5039H127.298C126.398 52.5039 125.667 53.234 125.667 54.1341V170.215C125.667 179.715 121.477 185.016 116.167 185.016C109.746 185.016 107.786 180.266 107.786 169.935V54.1341C107.786 53.234 107.056 52.5039 106.156 52.5039H83.1536C82.2535 52.5039 81.5234 53.234 81.5234 54.1341V175.525C81.5234 197.317 88.7841 208.208 103.035 208.208C114.486 208.208 122.587 200.947 128.458 186.416H129.018C129.278 192.917 130.018 198.927 131.248 204.688C131.408 205.438 132.078 205.968 132.848 205.968H151.79C152.83 205.968 153.61 205.008 153.38 203.988C152.35 199.557 151.93 194.907 151.93 190.046Z" fill={OUT_BLACK}/>
      <path d="M36.1075 -0.00976562C14.5955 -0.00976562 0.0742188 13.4015 0.0742188 33.5133V174.966C0.0742188 195.358 14.0455 208.489 36.1075 208.489C57.0594 208.489 71.0207 195.078 71.0207 174.966V33.5133C71.0307 12.8414 57.3394 -0.00976562 36.1075 -0.00976562ZM43.6482 178.166C43.6482 184.007 37.7076 188.257 32.3371 185.967C29.4769 184.747 27.7267 182.107 27.7267 178.876V29.3229C27.7267 25.1325 31.077 21.7822 35.8275 21.7822C40.2979 21.7822 43.6482 25.1325 43.6482 29.3229V178.166Z" fill={OUT_BLACK}/>
      <path d="M297.413 52.5064H248.039C247.449 52.5064 246.898 52.184 246.618 51.674C243.848 46.7235 242.338 42.4931 242.338 38.2628C242.338 28.7619 247.649 23.7414 258.259 23.7414C260.35 23.7414 262.44 23.9014 264.48 24.2215C265.46 24.3715 266.34 23.6014 266.34 22.6113V3.35958C266.34 2.54951 265.74 1.85944 264.94 1.74943C262.05 1.3494 259.31 1.10938 256.579 1.10938C232.837 1.10938 218.866 12.2804 218.866 30.7221C218.866 37.4227 220.636 43.6832 224.156 50.0938C224.756 51.1839 223.976 52.5141 222.736 52.5141H215.736C214.836 52.5141 214.105 53.2441 214.105 54.1442V72.1158C214.105 73.0159 214.836 73.746 215.736 73.746H221.696C222.596 73.746 223.326 74.476 223.326 75.3761V204.358C223.326 205.258 224.056 205.988 224.956 205.988H247.959C248.859 205.988 249.589 205.258 249.589 204.358V74.8061C249.589 73.906 250.319 73.1759 251.219 73.1759H271.151C272.051 73.1759 272.781 73.906 272.781 74.8061V204.348C272.781 205.248 273.511 205.978 274.411 205.978H297.413C298.313 205.978 299.043 205.248 299.043 204.358V54.1365C299.043 53.2364 298.313 52.5064 297.413 52.5064Z" fill={OUT_BLACK}/>
      <path d="M451.005 49.9941C428.653 49.9941 416.082 62.5653 416.082 85.1873V172.735C416.082 196.757 426.693 208.489 448.765 208.489C471.387 208.489 481.448 193.127 481.448 161.284V150.623C481.448 149.723 480.718 148.993 479.818 148.993H463.516C462.616 148.993 461.886 149.723 461.886 150.623V160.444C461.886 178.876 458.536 187.817 450.995 187.817C444.845 187.817 442.334 183.626 442.334 174.965V134.082C442.334 133.182 443.064 132.452 443.965 132.452H481.658C482.778 132.452 483.678 131.542 483.678 130.431V87.1475C483.678 62.5653 472.507 49.9941 451.005 49.9941ZM460.216 85.1873V111.27C460.216 112.17 459.486 112.9 458.586 112.9H443.965C443.064 112.9 442.334 112.17 442.334 111.27V84.6273C442.334 75.4064 445.405 70.936 451.275 70.936C457.706 70.946 460.216 75.4065 460.216 85.1873Z" fill={OUT_BLACK}/>
      <path d="M397.399 52.5064H408.35C409.25 52.5064 409.98 53.2364 409.98 54.1365V71.5481C409.98 72.4482 409.25 73.1782 408.35 73.1782H397.399C396.499 73.1782 395.769 73.9083 395.769 74.8084V170.777C395.769 179.998 397.169 182.508 404.15 182.508C405.14 182.508 406.03 182.408 406.93 182.218C407.94 181.998 408.9 182.768 408.9 183.808V204.63C408.9 205.41 408.34 206.09 407.58 206.23C403.84 206.93 400.109 207.37 396.609 207.37C377.617 207.37 369.516 197.59 369.516 175.808V74.8084C369.516 73.9083 368.786 73.1782 367.886 73.1782H361.646C360.746 73.1782 360.016 72.4482 360.016 71.5481V54.1365C360.016 53.2364 360.746 52.5064 361.646 52.5064H367.886C368.786 52.5064 369.516 51.7763 369.516 50.8762V18.1132C369.516 17.3332 370.067 16.6631 370.837 16.5131L393.839 12.1227C394.839 11.9327 395.769 12.7027 395.769 13.7228V50.8862C395.769 51.7763 396.499 52.5064 397.399 52.5064Z" fill={OUT_BLACK}/>
      <path d="M196.915 52.5064H206.866C207.766 52.5064 208.496 53.2364 208.496 54.1365V71.5481C208.496 72.4482 207.766 73.1782 206.866 73.1782H196.915C196.015 73.1782 195.285 73.9083 195.285 74.8084V170.777C195.285 179.998 196.685 182.508 203.665 182.508C204.655 182.508 205.545 182.408 206.446 182.218C207.456 181.998 208.416 182.768 208.416 183.808V204.63C208.416 205.41 207.866 206.09 207.096 206.23C203.355 206.93 199.625 207.37 196.125 207.37C177.133 207.37 169.032 197.59 169.032 175.808V74.8084C169.032 73.9083 168.302 73.1782 167.402 73.1782H161.161C160.261 73.1782 159.531 72.4482 159.531 71.5481V54.1365C159.531 53.2364 160.261 52.5064 161.161 52.5064H167.402C168.302 52.5064 169.032 51.7763 169.032 50.8762V18.1132C169.032 17.3332 169.582 16.6631 170.352 16.5131L193.354 12.1227C194.354 11.9327 195.285 12.7027 195.285 13.7228V50.8862C195.295 51.7763 196.015 52.5064 196.915 52.5064Z" fill={OUT_BLACK}/>
      <path d="M544.471 53.235C544.471 52.1249 543.621 51.1848 542.511 51.1048C541.601 51.0448 540.441 51.0348 539.171 51.1948C539.101 51.2048 539.031 51.2148 538.961 51.2248C537.361 51.4548 535.611 51.9649 533.97 53.015L534 53.025C528.2 56.3553 522.479 64.016 518.229 75.967H517.669C517.669 68.2763 516.969 61.0657 515.989 54.3151C515.839 53.265 514.939 52.4949 513.889 52.4949C509.558 52.4949 498.677 52.4949 493.697 52.4949C492.387 52.4949 491.377 53.675 491.597 54.9651C492.657 61.1857 493.097 67.5963 493.097 74.0069V204.339C493.097 205.239 493.827 205.969 494.727 205.969H519.359V108.93C519.359 88.8182 526.06 79.5974 541.431 79.5974C541.741 79.5974 542.141 79.5974 542.721 79.6474C543.681 79.7274 544.501 78.9873 544.501 78.0272V53.235H544.471Z" fill={OUT_BLACK}/>
    </svg>
  )
}

// Outfitters top header bar
export function OutfittersHeader({
  onBack,
  cartCount = 0,
  onCart,
}: {
  onBack?: () => void
  cartCount?: number
  onCart?: () => void
}) {
  return (
    <div style={{
      background: OUT_WHITE,
      borderBottom: `1px solid ${OUT_BORDER}`,
      flexShrink: 0,
      fontFamily: OUT_FONT,
    }}>
      {/* Header row */}
      <div style={{
        height: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
      }}>
        {/* Left: hamburger or back + logo (20px gap) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {onBack ? (
            <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', flexShrink: 0 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke={OUT_BLACK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ) : (
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', flexDirection: 'column', gap: 5, flexShrink: 0 }}>
              <div style={{ width: 22, height: 1.5, background: OUT_BLACK }} />
              <div style={{ width: 22, height: 1.5, background: OUT_BLACK }} />
              <div style={{ width: 22, height: 1.5, background: OUT_BLACK }} />
            </button>
          )}
          <OutfittersLogo width={108} />
        </div>

        {/* Right: icons */}
        <div style={{ width: 72, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 16 }}>
          {/* Search */}
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke={OUT_BLACK} strokeWidth="1.6"/>
              <path d="M16.5 16.5L21 21" stroke={OUT_BLACK} strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>
          {/* Cart */}
          <button onClick={onCart} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, position: 'relative' }}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
              <path d="M6 2L3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6L18 2H6Z" stroke={OUT_BLACK} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 6H21" stroke={OUT_BLACK} strokeWidth="1.6"/>
              <path d="M16 10C16 12.2 14.2 14 12 14C9.8 14 8 12.2 8 10" stroke={OUT_BLACK} strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
            {cartCount > 0 && (
              <div style={{
                position: 'absolute', top: -4, right: -4,
                width: 14, height: 14, borderRadius: 7,
                background: OUT_BLACK,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: 8, color: OUT_WHITE, fontWeight: 600 }}>{cartCount}</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// Category nav tabs (MEN / WOMEN / JUNIORS)
export function CategoryTabs({
  active,
  onChange,
}: {
  active: 'MEN' | 'WOMEN' | 'JUNIORS'
  onChange?: (tab: 'MEN' | 'WOMEN' | 'JUNIORS') => void
}) {
  const tabs: ('MEN' | 'WOMEN' | 'JUNIORS')[] = ['MEN', 'WOMEN', 'JUNIORS']
  return (
    <div style={{
      display: 'flex',
      borderBottom: `1px solid ${OUT_BORDER}`,
      background: OUT_WHITE,
      flexShrink: 0,
      fontFamily: OUT_FONT,
    }}>
      {tabs.map(tab => (
        <div
          key={tab}
          onClick={() => onChange?.(tab)}
          style={{
            flex: 1,
            textAlign: 'center',
            padding: '10px 0',
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: '0.6px',
            color: OUT_BLACK,
            borderBottom: tab === active ? `2px solid ${OUT_BLACK}` : '2px solid transparent',
            cursor: 'pointer',
          }}
        >
          {tab}
        </div>
      ))}
    </div>
  )
}

// ─── Product catalog ───────────────────────────────────────────────

export type Category = 'MEN' | 'WOMEN' | 'JUNIORS'

export interface Product {
  id: number
  name: string
  fit: string
  price: number        // PKR
  img: string
  category: Category
  colors: string[]
}

export const PRODUCTS: Product[] = [
  // MEN — T-Shirts & Polos
  {
    id: 1,
    name: 'RAGLAN SLOGAN POLO SHIRT',
    fit: 'RELAXED FIT | MEN',
    price: 4990,
    img: 'https://outfitters.com.pk/cdn/shop/files/F1726106901_2_copy.jpg?v=1774500764',
    category: 'MEN',
    colors: ['#1b1b1b', '#8B5E2B'],
  },
  {
    id: 2,
    name: 'WASHED PRINT T-SHIRT',
    fit: 'REGULAR FIT | MEN',
    price: 3690,
    img: 'https://outfitters.com.pk/cdn/shop/files/F1748106801_2.jpg?v=1773914778',
    category: 'MEN',
    colors: ['#5c4a2a', '#3d5c3d'],
  },
  {
    id: 3,
    name: 'TEXTURED KNIT T-SHIRT',
    fit: 'REGULAR FIT | MEN',
    price: 3290,
    img: 'https://outfitters.com.pk/cdn/shop/files/F1745106006_3.jpg?v=1773904640',
    category: 'MEN',
    colors: ['#e0d8cc', '#1b1b1b'],
  },
  {
    id: 4,
    name: 'COLOR BLOCK POLO SHIRT',
    fit: 'RELAXED FIT | MEN',
    price: 4290,
    img: 'https://outfitters.com.pk/cdn/shop/files/F1730106628_2.jpg?v=1773904544',
    category: 'MEN',
    colors: ['#2a4d6e', '#c87941'],
  },
  {
    id: 5,
    name: 'STRIPED T-SHIRT',
    fit: 'REGULAR FIT | MEN',
    price: 3690,
    img: 'https://outfitters.com.pk/cdn/shop/files/F1761106618.jpg?v=1773635661',
    category: 'MEN',
    colors: ['#1b1b1b'],
  },
  {
    id: 6,
    name: 'RIBBED T-SHIRT',
    fit: 'REGULAR FIT | MEN',
    price: 3690,
    img: 'https://outfitters.com.pk/cdn/shop/files/F1763106910_3fea4dca-810a-4381-8232-c0a3534122a8.jpg?v=1773635003',
    category: 'MEN',
    colors: ['#556b4e', '#c87941'],
  },
  {
    id: 7,
    name: 'EMBROIDERED TEXTURED T-SHIRT',
    fit: 'REGULAR FIT | MEN',
    price: 3690,
    img: 'https://outfitters.com.pk/cdn/shop/files/F1947106901_2.jpg?v=1773914952',
    category: 'MEN',
    colors: ['#1b1b1b'],
  },
  {
    id: 8,
    name: 'CROPPED GRAPHIC T-SHIRT',
    fit: 'RELAXED FIT | MEN',
    price: 3290,
    img: 'https://outfitters.com.pk/cdn/shop/files/F1942106914_4.jpg?v=1773394073',
    category: 'MEN',
    colors: ['#e8e0d5', '#1b1b1b'],
  },

  // MEN — Denim
  {
    id: 25,
    name: 'STRAIGHT FIT DENIM JEANS',
    fit: 'STRAIGHT FIT | MEN',
    price: 5490,
    img: 'https://cdn.shopify.com/s/files/1/2290/7887/files/F0638109622LOWER.jpg?v=1771477072',
    category: 'MEN',
    colors: ['#2a4d6e', '#1b1b1b'],
  },
  {
    id: 26,
    name: 'RELAXED FIT DENIM JEANS',
    fit: 'RELAXED FIT | MEN',
    price: 5990,
    img: 'https://cdn.shopify.com/s/files/1/2290/7887/files/F0734109117LOWER_42b979a1-79ba-4014-a0dd-0b086fc45325.jpg?v=1769773639',
    category: 'MEN',
    colors: ['#6b8cae'],
  },
  {
    id: 27,
    name: 'SLIM FIT DENIM JEANS',
    fit: 'SLIM FIT | MEN',
    price: 4990,
    img: 'https://cdn.shopify.com/s/files/1/2290/7887/files/F0775109622LOWER.jpg?v=1769671433',
    category: 'MEN',
    colors: ['#1b1b1b', '#2a4d6e'],
  },
  {
    id: 28,
    name: 'CARGO FIT DENIM JEANS',
    fit: 'CARGO FIT | MEN',
    price: 6490,
    img: 'https://outfitters.com.pk/cdn/shop/files/F0691108002_2.jpg?v=1774414575',
    category: 'MEN',
    colors: ['#2a4d6e'],
  },
  // MEN — Trousers
  {
    id: 29,
    name: 'CARGO TROUSERS',
    fit: 'RELAXED FIT | MEN',
    price: 5490,
    img: 'https://outfitters.com.pk/cdn/shop/files/F0575108317_3.jpg?v=1766047558',
    category: 'MEN',
    colors: ['#1b1b1b', '#556b4e'],
  },
  {
    id: 30,
    name: 'WIDE LEG TROUSERS',
    fit: 'WIDE LEG | MEN',
    price: 4990,
    img: 'https://outfitters.com.pk/cdn/shop/files/F0710108117_3_copy.jpg?v=1774952292',
    category: 'MEN',
    colors: ['#e8e0d5'],
  },
  {
    id: 31,
    name: 'MARINE FIT CARGO TROUSERS',
    fit: 'MARINE FIT | MEN',
    price: 5990,
    img: 'https://outfitters.com.pk/cdn/shop/files/F0696108801_2.jpg?v=1773724183',
    category: 'MEN',
    colors: ['#556b4e', '#1b1b1b'],
  },
  {
    id: 32,
    name: 'STRAIGHT FIT TROUSERS',
    fit: 'STRAIGHT FIT | MEN',
    price: 4490,
    img: 'https://outfitters.com.pk/cdn/shop/files/F0710108117_3_copy.jpg?v=1774952292',
    category: 'MEN',
    colors: ['#1b1b1b'],
  },

  // WOMEN — T-Shirts
  {
    id: 9,
    name: 'GRAPHIC T-SHIRT',
    fit: 'REGULAR FIT | WOMEN',
    price: 2890,
    img: 'https://outfitters.com.pk/cdn/shop/files/F1608206001_3_copy.jpg?v=1774441087',
    category: 'WOMEN',
    colors: ['#fff', '#1b1b1b'],
  },
  {
    id: 10,
    name: 'CROPPED STRIPED T-SHIRT',
    fit: 'CROPPED FIT | WOMEN',
    price: 2490,
    img: 'https://outfitters.com.pk/cdn/shop/files/F1392206998.jpg?v=1773655084',
    category: 'WOMEN',
    colors: ['#1b1b1b'],
  },
  {
    id: 11,
    name: 'CROPPED STRIPED T-SHIRT',
    fit: 'CROPPED FIT | WOMEN',
    price: 2890,
    img: 'https://outfitters.com.pk/cdn/shop/files/F1399206998_2.jpg?v=1772085107',
    category: 'WOMEN',
    colors: ['#3d5c3d', '#1b1b1b'],
  },
  {
    id: 12,
    name: 'CROPPED STRIPED T-SHIRT',
    fit: 'CROPPED FIT | WOMEN',
    price: 2890,
    img: 'https://outfitters.com.pk/cdn/shop/files/F1397206998_2.jpg?v=1773915294',
    category: 'WOMEN',
    colors: ['#c87941'],
  },
  {
    id: 13,
    name: 'BASIC SLIM FIT T-SHIRT',
    fit: 'SLIM FIT | WOMEN',
    price: 1890,
    img: 'https://outfitters.com.pk/cdn/shop/files/F1207206005_1.jpg?v=1769426785',
    category: 'WOMEN',
    colors: ['#e8e0d5', '#1b1b1b', '#556b4e'],
  },
  {
    id: 14,
    name: 'SUPER CROPPED RIBBED TANK TOP',
    fit: 'CROPPED FIT | WOMEN',
    price: 1890,
    img: 'https://outfitters.com.pk/cdn/shop/files/F1341206901_6_7116c54e-6bec-42e1-9682-913e919db1ef.jpg?v=1773130129',
    category: 'WOMEN',
    colors: ['#1b1b1b', '#fff'],
  },
  {
    id: 15,
    name: 'SUPER CROPPED SLOGAN T-SHIRT',
    fit: 'CROPPED FIT | WOMEN',
    price: 2290,
    img: 'https://outfitters.com.pk/cdn/shop/files/F1267206306_4.jpg?v=1772084487',
    category: 'WOMEN',
    colors: ['#e8e0d5'],
  },
  {
    id: 16,
    name: 'CROPPED EMBROIDERED T-SHIRT',
    fit: 'CROPPED FIT | WOMEN',
    price: 2290,
    img: 'https://outfitters.com.pk/cdn/shop/files/F1376206911_7.jpg?v=1773205261',
    category: 'WOMEN',
    colors: ['#fff', '#c87941'],
  },

  // WOMEN — Denim
  {
    id: 33,
    name: 'WIDE LEG DENIM JEANS',
    fit: 'WIDE LEG | WOMEN',
    price: 4990,
    img: 'https://cdn.shopify.com/s/files/1/2290/7887/files/F0708209630LOWER.jpg?v=1775020746',
    category: 'WOMEN',
    colors: ['#6b8cae', '#1b1b1b'],
  },
  {
    id: 34,
    name: 'STRAIGHT FIT DENIM JEANS',
    fit: 'STRAIGHT FIT | WOMEN',
    price: 4490,
    img: 'https://cdn.shopify.com/s/files/1/2290/7887/files/F0711209622._dee76ed2-7eed-47f0-8b71-8bf936572663.jpg?v=1772607988',
    category: 'WOMEN',
    colors: ['#2a4d6e'],
  },
  {
    id: 35,
    name: 'CULOTTE FIT DENIM JEANS',
    fit: 'CULOTTE FIT | WOMEN',
    price: 4990,
    img: 'https://outfitters.com.pk/cdn/shop/files/F0608209625_2_copy.jpg',
    category: 'WOMEN',
    colors: ['#6b8cae'],
  },
  {
    id: 36,
    name: 'MOM FIT DENIM JEANS',
    fit: 'MOM FIT | WOMEN',
    price: 5490,
    img: 'https://cdn.shopify.com/s/files/1/2290/7887/files/F0460209625LOWER_2.jpg?v=1738133831',
    category: 'WOMEN',
    colors: ['#1b1b1b', '#2a4d6e'],
  },
  // WOMEN — Trousers
  {
    id: 37,
    name: 'WIDE LEG TROUSERS',
    fit: 'WIDE LEG | WOMEN',
    price: 4490,
    img: 'https://cdn.shopify.com/s/files/1/2290/7887/files/F0601208003LOWER_269abfb3-933e-4fa4-8745-d052585eaa41.jpg',
    category: 'WOMEN',
    colors: ['#e8e0d5', '#1b1b1b'],
  },
  {
    id: 38,
    name: 'CARGO TROUSERS',
    fit: 'RELAXED FIT | WOMEN',
    price: 4990,
    img: 'https://cdn.shopify.com/s/files/1/2290/7887/files/F0265408425_3_copy.jpg?v=1750239465',
    category: 'WOMEN',
    colors: ['#1b1b1b'],
  },
  {
    id: 39,
    name: 'STRAIGHT FIT TROUSERS',
    fit: 'STRAIGHT FIT | WOMEN',
    price: 3990,
    img: 'https://cdn.shopify.com/s/files/1/2290/7887/files/F0428208113LOWER_2.jpg?v=1750839907',
    category: 'WOMEN',
    colors: ['#556b4e'],
  },
  {
    id: 40,
    name: 'MARINE FIT TROUSERS',
    fit: 'MARINE FIT | WOMEN',
    price: 4290,
    img: 'https://cdn.shopify.com/s/files/1/2290/7887/files/F0409209618_2.jpg?v=1754977992',
    category: 'WOMEN',
    colors: ['#1b1b1b', '#e8e0d5'],
  },

  // JUNIORS — T-Shirts
  {
    id: 41,
    name: 'GRAPHIC T-SHIRT',
    fit: 'GIRLS 6–14Y | JUNIORS',
    price: 2490,
    img: 'https://cdn.shopify.com/s/files/1/2290/7887/files/F1186506604_1_5d656e8a-a6d0-496a-b3f4-9cecd7d7002a.jpg?v=1772169581',
    category: 'JUNIORS',
    colors: ['#c87941', '#1b1b1b'],
  },
  {
    id: 42,
    name: 'PRINTED T-SHIRT',
    fit: 'GIRLS 6–14Y | JUNIORS',
    price: 1990,
    img: 'https://cdn.shopify.com/s/files/1/2290/7887/files/F1160506604_3.jpg?v=1773741564',
    category: 'JUNIORS',
    colors: ['#e8e0d5'],
  },
  {
    id: 43,
    name: 'SLOGAN T-SHIRT',
    fit: 'GIRLS 6–14Y | JUNIORS',
    price: 2290,
    img: 'https://cdn.shopify.com/s/files/1/2290/7887/files/F1236506001_4.jpg?v=1773117886',
    category: 'JUNIORS',
    colors: ['#556b4e', '#c87941'],
  },
  {
    id: 44,
    name: 'BASIC POLO SHIRT',
    fit: 'GIRLS 6–14Y | JUNIORS',
    price: 2690,
    img: 'https://cdn.shopify.com/s/files/1/2290/7887/files/F1235506902_1_00114bc4-0afd-41e4-89c1-e60f21f0b104.jpg?v=1773741256',
    category: 'JUNIORS',
    colors: ['#1b1b1b'],
  },

  // JUNIORS — Trousers
  {
    id: 45,
    name: 'CARGO TROUSERS',
    fit: 'GIRLS 6–14Y | JUNIORS',
    price: 3490,
    img: 'https://outfitters.com.pk/cdn/shop/files/F0487508902_2_copy.jpg?v=1772168840',
    category: 'JUNIORS',
    colors: ['#556b4e', '#1b1b1b'],
  },
  {
    id: 46,
    name: 'STRAIGHT FIT TROUSERS',
    fit: 'GIRLS 6–14Y | JUNIORS',
    price: 2990,
    img: 'https://outfitters.com.pk/cdn/shop/files/F0482508803LOWER_2.jpg?v=1772693969',
    category: 'JUNIORS',
    colors: ['#1b1b1b'],
  },

  // JUNIORS — existing
  {
    id: 17,
    name: 'GRAPHIC CO-ORD SET',
    fit: 'GIRLS 6–14Y | JUNIORS',
    price: 4490,
    img: 'https://outfitters.com.pk/cdn/shop/files/F0243605901SUIT_6.jpg?v=1770879638',
    category: 'JUNIORS',
    colors: ['#c87941'],
  },
  {
    id: 18,
    name: 'EMBELLISHED CO-ORD SET',
    fit: 'GIRLS 6–14Y | JUNIORS',
    price: 3990,
    img: 'https://outfitters.com.pk/cdn/shop/files/F0246605413SUIT_3_cc92f779-ebc6-473f-b2de-271d6d3b38b9.jpg?v=1772523313',
    category: 'JUNIORS',
    colors: ['#e8e0d5', '#3d5c3d'],
  },
  {
    id: 19,
    name: 'TEXTURED CO-ORD SET',
    fit: 'GIRLS 6–14Y | JUNIORS',
    price: 5990,
    img: 'https://outfitters.com.pk/cdn/shop/files/F0244605624SUIT_thumbnail_copy2.jpg?v=1771303802',
    category: 'JUNIORS',
    colors: ['#556b4e'],
  },
  {
    id: 20,
    name: 'WIDE LEG JEANS WITH APPLIQUÉ',
    fit: 'GIRLS 6–14Y | JUNIORS',
    price: 4490,
    img: 'https://outfitters.com.pk/cdn/shop/files/F0256609625_3_copy.jpg?v=1771216046',
    category: 'JUNIORS',
    colors: ['#2a4d6e'],
  },
  {
    id: 21,
    name: 'CARGO FIT JEANS',
    fit: 'GIRLS 6–14Y | JUNIORS',
    price: 4990,
    img: 'https://outfitters.com.pk/cdn/shop/files/F0249609629_1.jpg?v=1773894483',
    category: 'JUNIORS',
    colors: ['#1b1b1b', '#2a4d6e'],
  },
  {
    id: 22,
    name: 'MARINE FIT TROUSERS',
    fit: 'GIRLS 6–14Y | JUNIORS',
    price: 3990,
    img: 'https://outfitters.com.pk/cdn/shop/files/F0510608001LOWER_3.jpg?v=1772098856',
    category: 'JUNIORS',
    colors: ['#e8e0d5'],
  },
  {
    id: 23,
    name: 'WIDE LEG TROUSERS BELT DETAIL',
    fit: 'GIRLS 6–14Y | JUNIORS',
    price: 3690,
    img: 'https://outfitters.com.pk/cdn/shop/files/F0533608621_2.jpg?v=1773120976',
    category: 'JUNIORS',
    colors: ['#1b1b1b'],
  },
  {
    id: 24,
    name: 'CULOTTE FIT JEANS',
    fit: 'GIRLS 6–14Y | JUNIORS',
    price: 4990,
    img: 'https://outfitters.com.pk/cdn/shop/files/F0250609629_2.jpg?v=1772690607',
    category: 'JUNIORS',
    colors: ['#2a4d6e'],
  },
]

export function formatPrice(pkr: number): string {
  return `Rs.${pkr.toLocaleString('en-PK')}`
}

export function bnplYango(price: number): string {
  return `Rs.${Math.round(price / 4).toLocaleString('en-PK')}`
}

export function bnplBaadmay(price: number): string {
  return `Rs.${Math.round(price / 3).toLocaleString('en-PK')}`
}
