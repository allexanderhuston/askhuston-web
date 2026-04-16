export default function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0, zIndex: -1,
        background: 'var(--page-bg)', overflow: 'hidden',
        transition: 'background 0.4s ease',
      }}
    >
      <div style={{ position:'absolute', width:'65vw', height:'65vw', borderRadius:'50%', background:'var(--blob-1)', filter:'blur(100px)', top:'-15%', left:'-10%', animation:'askblob1 20s ease-in-out infinite' }} />
      <div style={{ position:'absolute', width:'55vw', height:'55vw', borderRadius:'50%', background:'var(--blob-2)', filter:'blur(100px)', top:'30%', right:'-15%', animation:'askblob2 24s ease-in-out infinite' }} />
      <div style={{ position:'absolute', width:'60vw', height:'60vw', borderRadius:'50%', background:'var(--blob-3)', filter:'blur(100px)', bottom:'-20%', left:'15%', animation:'askblob3 22s ease-in-out infinite' }} />
      <div style={{ position:'absolute', width:'50vw', height:'50vw', borderRadius:'50%', background:'var(--blob-4)', filter:'blur(80px)', top:'20%', left:'30%', animation:'askblob4 28s ease-in-out infinite' }} />
      <div style={{ position:'absolute', width:'45vw', height:'45vw', borderRadius:'50%', background:'var(--blob-5)', filter:'blur(100px)', bottom:'0%', right:'5%', animation:'askblob5 26s ease-in-out infinite' }} />
    </div>
  )
}
