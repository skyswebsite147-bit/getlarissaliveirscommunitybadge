import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState, useRef } from 'react'

export const Route = createFileRoute('/')({
  component: LarissaPage,
})

const SUPPORT_EMAIL = 'managementlarissaliveirr@gmail.com'

const badges = [
  {
    name: 'DIAMOND BADGE',
    price: '$1,500',
    color: 'from-cyan-300 via-blue-200 to-cyan-400',
    border: 'border-cyan-300',
    glow: 'shadow-cyan-400/60',
    icon: '💎',
    perks: [
      'Premium exclusive content',
      'Meet and greet',
      'Direct personalized message',
      'Priority recognition',
    ],
  },
  {
    name: 'ROYAL BADGE',
    price: '$3,000',
    color: 'from-purple-400 via-fuchsia-300 to-purple-500',
    border: 'border-purple-400',
    glow: 'shadow-purple-400/60',
    icon: '👑',
    perks: [
      'Everything in Diamond',
      'Faster direct message priority',
      'Personalized shoutouts',
      'VIP content drops',
    ],
  },
  {
    name: 'LEGACY BADGE',
    price: '$4,500',
    color: 'from-amber-300 via-yellow-200 to-amber-400',
    border: 'border-amber-300',
    glow: 'shadow-amber-400/60',
    icon: '🏆',
    perks: [
      'Everything in Royal',
      'Monthly personalized video',
      'Private virtual event invites',
    ],
  },
  {
    name: 'SUPREME BADGE',
    price: '$6,000',
    color: 'from-rose-400 via-pink-300 to-rose-500',
    border: 'border-rose-400',
    glow: 'shadow-rose-400/60',
    icon: '⚡',
    perks: [
      'Everything in Legacy',
      'Occasional direct interaction',
      'VIP private chat access',
    ],
  },
  {
    name: 'IMMORTAL BADGE',
    price: '$7,500',
    badge: 'LIMITED',
    color: 'from-yellow-300 via-orange-300 to-red-400',
    border: 'border-yellow-300',
    glow: 'shadow-yellow-400/60',
    icon: '🔱',
    perks: [
      'The highest level of access',
      'One-on-one private experience',
      'Permanent recognition',
    ],
  },
]

const paymentMethods = [
  { name: 'Cash App', icon: '💵', handle: '$cashtag' },
  { name: 'PayPal', icon: '🅿️', handle: 'PayPal' },
  { name: 'Apple Pay', icon: '🍎', handle: 'Apple Pay' },
  { name: 'Chime', icon: '🏦', handle: 'Chime' },
  { name: 'Venmo', icon: '💸', handle: 'Venmo' },
  { name: 'Gift Cards', icon: '🎁', handle: 'Gift Card' },
  { name: 'Bitcoin', icon: '₿', handle: 'Bitcoin' },
]

function USAClock() {
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'America/New_York',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      })
      const dateStr = now.toLocaleDateString('en-US', {
        timeZone: 'America/New_York',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      setTime(timeStr)
      setDate(dateStr)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="fixed top-4 right-4 z-50 bg-black/70 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 text-center">
      <div className="text-white font-mono text-lg font-bold tracking-widest">{time}</div>
      <div className="text-white/60 font-mono text-xs">{date}</div>
      <div className="text-white/40 font-mono text-xs">EST · New York</div>
    </div>
  )
}

function PaymentModal({ method, onClose }: { method: string; onClose: () => void }) {
  const subject = encodeURIComponent(`Payment via ${method} - Larissa Liveira Community Badge`)
  const body = encodeURIComponent(
    `Hello,\n\nI would like to make a payment for a Larissa Liveira Community Badge using ${method}.\n\nPlease provide payment details and next steps.\n\nThank you!`
  )
  const mailtoLink = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`

  useEffect(() => {
    window.location.href = mailtoLink
  }, [mailtoLink])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-2xl p-8 max-w-md w-full mx-4 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-5xl mb-4">✉️</div>
        <h3 className="text-white text-2xl font-bold mb-2">Payment Request Sent!</h3>
        <p className="text-white/70 mb-4">
          An email to <span className="text-yellow-300 font-semibold">{SUPPORT_EMAIL}</span> has been opened requesting{' '}
          <span className="text-white font-semibold">{method}</span> payment details.
        </p>
        <p className="text-white/50 text-sm mb-6">
          If your email client didn't open, please email us directly at the address below.
        </p>
        <a
          href={mailtoLink}
          className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-6 py-3 rounded-full hover:scale-105 transition-transform mb-4"
        >
          Open Email Again
        </a>
        <br />
        <button
          onClick={onClose}
          className="text-white/50 hover:text-white text-sm underline mt-2 cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  )
}

function CopyEmailButton() {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(SUPPORT_EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={copy}
      className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-5 py-3 rounded-full transition-all hover:scale-105 cursor-pointer font-mono text-sm"
    >
      {copied ? '✅ Copied!' : '📋 Copy Email'}
    </button>
  )
}

export default function LarissaPage() {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [audioPlaying, setAudioPlaying] = useState(false)

  const handlePaymentClick = (name: string) => {
    setSelectedPayment(name)
  }

  const toggleAudio = () => {
    if (audioRef.current) {
      if (audioPlaying) {
        audioRef.current.pause()
        setAudioPlaying(false)
      } else {
        audioRef.current.play()
        setAudioPlaying(true)
      }
    }
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Animated concert background */}
      <div className="fixed inset-0 z-0">
        <img
          src="/larissa-bg.jpeg"
          alt="Larissa Liveira"
          className="w-full h-full object-cover concert-bg"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55" />
        {/* Animated light rays */}
        <div className="absolute inset-0 concert-lights" />
        {/* Spotlight sweeps */}
        <div className="absolute inset-0 spotlight-1" />
        <div className="absolute inset-0 spotlight-2" />
        <div className="absolute inset-0 spotlight-3" />
        {/* Particle shimmer */}
        <div className="absolute inset-0 shimmer-overlay" />
      </div>

      <USAClock />

      {/* Audio controls */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={toggleAudio}
          className="bg-black/70 backdrop-blur-md border border-white/20 text-white rounded-full px-4 py-3 flex items-center gap-2 hover:bg-white/10 transition-all cursor-pointer"
        >
          <span className="text-lg">{audioPlaying ? '⏸' : '▶️'}</span>
          <span className="text-xs font-semibold">{audioPlaying ? 'Pause Music' : 'Play Music'}</span>
        </button>
        {/* Spotify embed iframe (hidden audio player) */}
        <iframe
          ref={audioRef as any}
          style={{ display: 'none' }}
          src="https://open.spotify.com/embed/album/15K3nMiL6LZ5a7e9V9aBQ5"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        />
      </div>

      {/* Spotify mini player (visible) */}
      <div className="fixed bottom-16 right-4 z-50 w-64 rounded-xl overflow-hidden shadow-2xl border border-white/10">
        <iframe
          style={{ borderRadius: '12px' }}
          src="https://open.spotify.com/embed/album/15K3nMiL6LZ5a7e9V9aBQ5?utm_source=generator&theme=0"
          width="100%"
          height="80"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Hero */}
        <header className="text-center py-20 px-4">
          <div className="inline-block mb-4">
            <span className="text-white/60 text-sm tracking-[0.3em] uppercase font-semibold">Welcome to the</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-2xl tracking-tight">
            <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-400 bg-clip-text text-transparent">
              Larissa Liveira
            </span>
          </h1>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 drop-shadow-xl">
            Community Badge 🎸
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed">
            Join the most exclusive fan community. Choose your badge level and unlock a world of personalized connection.
          </p>
          <div className="mt-8 flex justify-center gap-2">
            <span className="animate-bounce text-3xl">🎵</span>
            <span className="animate-bounce text-3xl delay-100">🎸</span>
            <span className="animate-bounce text-3xl delay-200">🎤</span>
          </div>
        </header>

        {/* Badge Pricing Section */}
        <section className="px-4 pb-20 max-w-6xl mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-black text-white mb-2 drop-shadow-lg">
            Choose Your Badge
          </h2>
          <p className="text-center text-white/50 mb-12 text-sm tracking-widest uppercase">Select your level of access</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {badges.map((badge) => (
              <div
                key={badge.name}
                className={`relative rounded-2xl border ${badge.border} bg-black/60 backdrop-blur-md p-6 shadow-2xl ${badge.glow} hover:scale-105 transition-all duration-300`}
              >
                {badge.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-red-500 text-black text-xs font-black px-4 py-1 rounded-full tracking-widest">
                    {badge.badge}
                  </div>
                )}
                <div className="text-4xl mb-3">{badge.icon}</div>
                <h3 className={`text-lg font-black bg-gradient-to-r ${badge.color} bg-clip-text text-transparent mb-1`}>
                  {badge.name}
                </h3>
                <div className="text-3xl font-black text-white mb-4">{badge.price}</div>
                <ul className="space-y-2">
                  {badge.perks.map((perk) => (
                    <li key={perk} className="text-white/80 text-sm flex items-start gap-2">
                      <span className="text-yellow-300 mt-0.5">✦</span>
                      {perk}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    const el = document.getElementById('payment-section')
                    el?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className={`mt-6 w-full py-2.5 rounded-full font-bold text-black bg-gradient-to-r ${badge.color} hover:opacity-90 transition-opacity cursor-pointer text-sm`}
                >
                  Get This Badge →
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Payment Methods Section */}
        <section id="payment-section" className="px-4 pb-20 max-w-4xl mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-black text-white mb-2 drop-shadow-lg">
            Payment Methods
          </h2>
          <p className="text-center text-white/50 mb-12 text-sm tracking-widest uppercase">
            Click your preferred payment method to get started
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {paymentMethods.map((method) => (
              <button
                key={method.name}
                onClick={() => handlePaymentClick(method.name)}
                className="group relative bg-black/60 backdrop-blur-md border border-white/20 hover:border-yellow-400/60 rounded-2xl p-5 text-center hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-yellow-400/20"
              >
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{method.icon}</div>
                <div className="text-white font-bold text-sm">{method.name}</div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/0 to-orange-500/0 group-hover:from-yellow-400/10 group-hover:to-orange-500/10 transition-all" />
              </button>
            ))}
          </div>

          <p className="text-center text-white/40 text-xs mt-6">
            Clicking a payment method will open your email client to contact our management team.
          </p>
        </section>

        {/* Customer Support Section */}
        <section className="px-4 pb-20 max-w-2xl mx-auto text-center">
          <div className="bg-black/60 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
            <div className="text-5xl mb-4">📬</div>
            <h2 className="text-2xl font-black text-white mb-2">Customer Support</h2>
            <p className="text-white/60 mb-6 text-sm leading-relaxed">
              Have a question, complaint, or need help? Reach out to our management team directly. We're here for the community.
            </p>
            <div className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 mb-4 font-mono text-white break-all">
              {SUPPORT_EMAIL}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <CopyEmailButton />
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-5 py-3 rounded-full hover:scale-105 transition-transform text-sm"
              >
                ✉️ Email Us Directly
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center pb-40 px-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Larissa Liveira Community · All rights reserved
          </p>
          <p className="text-white/20 text-xs mt-1">🎸 Keep rocking with the community</p>
        </footer>
      </div>

      {/* Payment Modal */}
      {selectedPayment && (
        <PaymentModal method={selectedPayment} onClose={() => setSelectedPayment(null)} />
      )}
    </div>
  )
}
