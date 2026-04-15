'use client'

import { useState } from 'react'

interface VideoEmbedProps {
  videoUrl: string
  embedType: 'youtube' | 'vimeo'
  title: string
}

function getEmbedUrl(url: string, type: 'youtube' | 'vimeo'): string {
  if (type === 'youtube') {
    // Handle various YouTube URL formats
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^?&\s]+)/
    )
    const id = match?.[1]
    return id
      ? `https://www.youtube.com/embed/${id}?autoplay=0&rel=0&modestbranding=1&color=white`
      : url
  }
  if (type === 'vimeo') {
    const match = url.match(/vimeo\.com\/([0-9]+)/)
    const id = match?.[1]
    return id ? `https://player.vimeo.com/video/${id}?color=c8382a&title=0&byline=0` : url
  }
  return url
}

export default function VideoEmbed({ videoUrl, embedType, title }: VideoEmbedProps) {
  const [loaded, setLoaded] = useState(false)
  const embedUrl = getEmbedUrl(videoUrl, embedType)

  return (
    <div className="relative aspect-video bg-surface overflow-hidden">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border border-muted border-t-text rounded-full animate-spin" />
        </div>
      )}
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={() => setLoaded(true)}
        className={`w-full h-full transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  )
}
