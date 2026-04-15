export type Influencer = {
  id: string
  name: string
  handle: string
  niche: string
  coverGradient: string
  photo?: string
  heroPhoto?: string
  rotation: number
  slug: string
  status: 'live' | 'in-progress'
  accentColor: string
  // Character
  age?: number
  basedIn?: string
  bio?: string
  personality?: string[]
  // Build
  characterBrief?: string
  consistencyMethod?: string
  tools?: string[]
  // Strategy
  platforms?: string[]
  contentPillars?: string[]
  targetAudience?: string
  brandFit?: string[]
  // Content
  images?: string[]
}

const influencers: Influencer[] = [
  {
    id: '1',
    name: 'Sofia',
    handle: '@sofia.aesthetics',
    niche: 'Fashion & Lifestyle',
    coverGradient: 'from-rose-300 via-pink-200 to-stone-100',
    rotation: -3,
    slug: 'sofia',
    status: 'in-progress',
    accentColor: '#c9a084',
    age: 24,
    basedIn: 'Milan',
    bio: '24. Milan-based. Obsessed with quiet luxury, bad decisions, and expensive coffee she can\'t afford.',
    personality: ['Aspirational', 'Minimalist', 'Dry humour', 'Effortlessly cool'],
    characterBrief: 'A mid-20s fashion girl who feels authentically European — thinks in aesthetics, posts like she doesn\'t care, secretly does. Visual references: early Jacquemus campaigns, Matilda Djerf\'s feed structure, old Celine under Phoebe Philo.',
    consistencyMethod: 'Character locked via Nano Banana Pro consistency system. Face reference tested across 8 lighting environments — indoor morning, golden hour exterior, overcast fashion week street. Same person, every frame.',
    tools: ['Nano Banana Pro', 'Kling 3.0', 'Higgsfield Cinema Studio', 'Premiere Pro'],
    platforms: ['Instagram', 'TikTok'],
    contentPillars: ['OOTD & styling', 'Travel aesthetics', 'Brand unboxing', 'Day-in-my-life'],
    targetAudience: 'Women 20–34. Fashion-forward, aspirational income bracket, responds to authenticity over polish.',
    brandFit: ['Luxury fashion', 'Premium skincare', 'Travel & hotels', 'Jewellery'],
    images: [],
  },
  {
    id: '2',
    name: 'Kai',
    handle: '@kai.visuals',
    niche: 'Streetwear & Culture',
    coverGradient: 'from-zinc-800 via-slate-700 to-zinc-900',
    rotation: 2,
    slug: 'kai',
    status: 'in-progress',
    accentColor: '#888888',
    age: 22,
    basedIn: 'Tokyo',
    bio: '22. Tokyo. Into things before they\'re cool. Archive pieces, underground music, and ramen at 3am.',
    personality: ['Low-key', 'Culturally sharp', 'Understated flex', 'Gen Z native'],
    characterBrief: 'A streetwear-obsessed creative in his early 20s who lives in Tokyo. Shoots everything on film (or what looks like it). Doesn\'t explain himself. Visual references: Highsnobiety editorial, early Virgil Abloh era, Japanese street photography.',
    consistencyMethod: 'Built with darker, more textured lighting references to match the streetwear aesthetic. Locked face tested across outdoor city environments, studio flash setups, and candid-style handheld frames.',
    tools: ['Nano Banana Pro', 'Kling 3.0', 'Seedance', 'Premiere Pro'],
    platforms: ['Instagram', 'TikTok', 'X'],
    contentPillars: ['Fit checks', 'Archive deep dives', 'Culture commentary', 'City exploration'],
    targetAudience: 'Men 18–28. Streetwear enthusiasts, culture-first consumers, high brand loyalty when trust is built.',
    brandFit: ['Streetwear brands', 'Sneakers', 'Lifestyle tech', 'Music & events'],
    images: [],
  },
  {
    id: '3',
    name: 'Luna',
    handle: '@luna.world',
    niche: 'Wellness & Beauty',
    coverGradient: 'from-violet-300 via-purple-200 to-fuchsia-100',
    rotation: -1,
    slug: 'luna',
    status: 'in-progress',
    accentColor: '#a07cc0',
    age: 27,
    basedIn: 'Los Angeles',
    bio: '27. LA. Former burnout survivor turned wellness obsessive. Your fave routine is probably hers first.',
    personality: ['Warm & approachable', 'Evidence-based', 'Slightly woo', 'Relatable realness'],
    characterBrief: 'A late-20s wellness creator who bridges clinical and spiritual — talks about supplements with the same energy as crystals. Not preachy. Visual references: Glossier campaign energy, clean-girl aesthetic, soft natural light always.',
    consistencyMethod: 'Softer lighting references used throughout — diffused window light, bathroom mirror setups, outdoor golden hour. Tested across skincare routine formats, product flat lays, and lifestyle B-roll.',
    tools: ['Nano Banana Pro', 'Kling 3.0', 'ElevenLabs', 'Premiere Pro'],
    platforms: ['Instagram', 'TikTok', 'YouTube Shorts'],
    contentPillars: ['Skincare routines', 'Supplement stacks', 'Morning rituals', 'Mental health check-ins'],
    targetAudience: 'Women 22–38. Health-conscious, disposable income, high purchase intent on wellness and beauty.',
    brandFit: ['Skincare & beauty', 'Supplements & wellness', 'Activewear', 'Food & beverage (health)'],
    images: [],
  },
]

export default influencers

export function getAllInfluencers(): Influencer[] {
  return influencers
}

export function getInfluencerBySlug(slug: string): Influencer | undefined {
  return influencers.find(i => i.slug === slug)
}
