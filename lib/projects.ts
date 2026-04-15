export type ProjectCategory =
  | 'Speculative Campaign'
  | 'Short Film'
  | 'UGC Series'
  | 'Product Photography'

export type Project = {
  slug: string
  title: string
  brand: string
  year: number
  category: ProjectCategory
  tagline: string
  brief: string
  approach: string
  tools: string[]
  coverGradient: string
  coverImage?: string
  accentColor: string
  videoUrl?: string
  embedType?: 'youtube' | 'vimeo'
  images: string[]
  featured: boolean
  order: number
  status?: 'live' | 'in-progress'
}

const projects: Project[] = [
  {
    slug: 'ferrari-mcdonalds',
    title: 'Wrong Place',
    brand: "Ferrari × McDonald's",
    year: 2025,
    category: 'Speculative Campaign',
    tagline:
      'The collision nobody asked for. A speculative campaign about aspiration, mundanity, and the gap between them.',
    brief:
      "No brief. No client. The concept came from a simple observation: what happens when the world's most aspirational car meets the world's most accessible food? The tension is the campaign. Every frame was built to make you feel something — not just look at something.",
    approach:
      "Hyper-realistic AI-generated scenes placing a Ferrari in the wrong context — a drive-through, a supermarket car park, a kids' meal on the passenger seat. Direct on-camera flash. Wet asphalt. Fluorescent light. Everything looks like it cost €50,000 to shoot. None of it did.",
    tools: ['Kling 3.0', 'Higgsfield Cinema Studio', 'Nano Banana Pro', 'Premiere Pro'],
    coverGradient: 'from-red-950 via-zinc-900 to-black',
    accentColor: '#c8382a',
    images: [],
    featured: true,
    order: 1,
    status: 'live',
  },
  {
    slug: 'soul-13-mine',
    title: 'Mine',
    brand: 'Soul 13 Pilates',
    year: 2025,
    category: 'Short Film',
    tagline:
      'A 60-second brand film for a pilates studio. Shot entirely in AI. Jacquemus visual language. Extreme close-ups only.',
    brief:
      'Soul 13 needed a brand film. The brief I set myself: make a pilates studio campaign that feels like fashion week coverage — intimate, physical, present. The body as subject, not backdrop. No wide shots. No context. Just the practice.',
    approach:
      "Every shot is a close-up. Hands on reformers. The sound of breath. Fabric against skin. Shot language pulled from Jacquemus runway coverage and analog sports photography. The studio space disappears — only the sensation remains. All sound designed in ElevenLabs.",
    tools: [
      'Kling 3.0',
      'Higgsfield Cinema Studio',
      'Nano Banana Pro',
      'ElevenLabs',
      'Premiere Pro',
    ],
    coverGradient: 'from-stone-800 via-zinc-900 to-black',
    accentColor: '#c9a84c',
    images: [],
    featured: true,
    order: 2,
    status: 'live',
  },
  {
    slug: 'vivora-calm',
    title: 'Calm',
    brand: 'Vivora',
    year: 2025,
    category: 'Speculative Campaign',
    tagline:
      'A beverage campaign built around a locked AI character. 12 scenes, one face, complete consistency.',
    brief:
      "Vivora CALM is a functional beverage in the calming/adaptogens category. The brief: a premium lifestyle campaign that belongs next to Kinfolk or Monocle. One consistent character — male, late 20s — across all scenes and lighting environments. Character consistency was the technical problem. Solving it was the campaign.",
    approach:
      "Built a locked character reference through Nano Banana Pro's consistency system combined with manual prompt architecture. Tested across 12 different AI-generated environments — outdoor morning light, interior afternoon, urban evening, golden hour. Every scene is the same person. The technical challenge became the creative proof of concept.",
    tools: ['Nano Banana Pro', 'Kling 3.0', 'Seedance', 'Premiere Pro'],
    coverGradient: 'from-blue-950 via-zinc-900 to-black',
    accentColor: '#a0b4c8',
    images: [],
    featured: true,
    order: 3,
    status: 'live',
  },
  {
    slug: 'fioris-essentials',
    title: 'Ritual',
    brand: 'Fioris Essentials',
    year: 2025,
    category: 'UGC Series',
    tagline: 'A UGC series for a hair serum brand. Authentic, hand-held, designed to convert.',
    brief:
      'UGC that performs. The objective: content that looks like a real customer filmed it but with the hook structure, lighting intent, and product placement of a paid performance ad. Every frame decided by a single question: does this make someone stop scrolling?',
    approach:
      "Shot language pulled from real UGC — handheld, bathroom lighting, unpacked product on a wet countertop. The hook was written first. The visuals were reverse-engineered from it. Result: content that reads authentic but converts like a produced ad.",
    tools: ['Nano Banana Pro', 'Kling 3.0', 'Premiere Pro'],
    coverGradient: 'from-amber-950 via-zinc-900 to-black',
    accentColor: '#c9a84c',
    images: [],
    featured: false,
    order: 4,
    status: 'live',
  },
  {
    slug: 'the-culture-tokyo',
    title: 'Tokyo',
    brand: 'The Culture',
    year: 2026,
    category: 'Short Film',
    coverImage: '/projects/the-culture-tokyo.png',
    tagline:
      'A cinematic short film for the brand that started everything. The last document. In production.',
    brief:
      'The Culture was a streetwear and sneaker brand I founded in Sofia in 2019 and closed in 2024. This film is its last document — a 3-minute short set in Tokyo, building a mythology around the brand\'s final chapter. A closing statement, not an advertisement.',
    approach:
      "Tokyo because it's the city that shaped the brand's visual reference — JDM culture, Harajuku overlap, brutalist backstreets, fluorescent convenience stores. The film is being built entirely in AI. No location scouting. No casting. No flights. Just the visual language of a city that never existed on this timeline.",
    tools: ['Kling 3.0', 'Higgsfield Cinema Studio', 'Seedance', 'ElevenLabs', 'Premiere Pro'],
    coverGradient: 'from-violet-950 via-zinc-900 to-black',
    accentColor: '#888888',
    images: [],
    featured: false,
    order: 5,
    status: 'in-progress',
  },
]

export default projects

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) => a.order - b.order)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured).sort((a, b) => a.order - b.order)
}

export function getAdjacentProjects(
  slug: string
): { prev: Project | null; next: Project | null } {
  const sorted = getAllProjects()
  const idx = sorted.findIndex((p) => p.slug === slug)
  return {
    prev: idx > 0 ? sorted[idx - 1] : null,
    next: idx < sorted.length - 1 ? sorted[idx + 1] : null,
  }
}
