export default function PortfolioHeader() {
  return (
    <div
      className="rounded-2xl px-8 py-6 mb-8"
      style={{
        background: 'rgba(255,255,255,0.18)',
        backdropFilter: 'blur(48px) saturate(1.8)',
        WebkitBackdropFilter: 'blur(48px) saturate(1.8)',
        border: '1.5px solid rgba(255,255,255,0.55)',
        boxShadow: '0 2px 24px rgba(0,0,0,0.1), inset 0 1.5px 0 rgba(255,255,255,0.65)',
      }}
    >
      <p className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase mb-1">
        Selected Work
      </p>
      <h1 className="font-display text-3xl md:text-4xl font-black text-[#1a1a1a]">
        Portfolio
      </h1>
    </div>
  )
}
