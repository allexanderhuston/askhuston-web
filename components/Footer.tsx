import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <p className="font-mono text-xs text-muted tracking-wider">
          © {year} Alex Boyanov — @askhuston
        </p>

        <div className="flex items-center gap-8">
          <a
            href="https://instagram.com/askhuston"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted hover:text-text transition-colors tracking-wider"
          >
            Instagram
          </a>
          <a
            href="https://linkedin.com/in/alexanderboyanov"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted hover:text-text transition-colors tracking-wider"
          >
            LinkedIn
          </a>
          <Link
            href="/contact"
            className="font-mono text-xs text-muted hover:text-accent transition-colors tracking-wider"
          >
            alex@askhuston.com
          </Link>
        </div>
      </div>
    </footer>
  )
}
