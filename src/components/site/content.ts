import {
  BarChart3,
  Bell,
  Briefcase,
  Building2,
  Code,
  GraduationCap,
  HeartPulse,
  Landmark,
  LineChart,
  Megaphone,
  MessageSquare,
  Newspaper,
  Rocket,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';

export const DATA_SOURCES = ['Google News', 'Wikipedia', 'GitHub', 'App Store', 'Hacker News', 'Reddit', 'Groq AI'];

export const REPORT_FEATURES = [
  {
    icon: Sparkles,
    tone: 'violet',
    label: 'AI Overview',
    title: 'Know their strategy in one paragraph',
    body: 'An AI-written summary of what each competitor has been doing lately and where they are heading.',
  },
  {
    icon: Newspaper,
    tone: 'blue',
    label: 'Intelligence Feed',
    title: 'Every move, scored for relevance',
    body: 'News is gathered, scored 1–10 for strategic relevance and tagged: launch, pricing, funding, hiring and more.',
  },
  {
    icon: Building2,
    tone: 'blue',
    label: 'Company Snapshot',
    title: 'Who they are, at a glance',
    body: 'Company background from Wikipedia plus GitHub activity: stars, followers, active repos and top projects.',
  },
  {
    icon: Smartphone,
    tone: 'emerald',
    label: 'Customer Snapshot',
    title: 'See how customers rate them',
    body: 'App Store rating, total reviews, category, current version and the latest release notes.',
  },
  {
    icon: MessageSquare,
    tone: 'amber',
    label: 'Customer Reviews',
    title: 'Hear their customers, unfiltered',
    body: 'Recent iOS reviews, tinted by rating, so you can spot the complaints you could solve better.',
  },
  {
    icon: TrendingUp,
    tone: 'rose',
    label: 'Market Sentiment',
    title: 'Track what the community says',
    body: 'Hacker News stories, Reddit threads and press coverage, ranked by how much traction they got.',
  },
  {
    icon: BarChart3,
    tone: 'violet',
    label: 'Strategic Narrative',
    title: 'Get the "so what"',
    body: 'Top market themes, an activity ranking, the biggest competitive shift and three recommended actions.',
  },
  {
    icon: Target,
    tone: 'emerald',
    label: 'Compare',
    title: 'Benchmark side by side',
    body: 'One table comparing intel volume, app ratings, GitHub traction and community buzz, with leaders highlighted.',
  },
] as const;

export const TONE_CLASSES: Record<string, { text: string; bg: string; border: string }> = {
  violet: { text: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/30' },
  blue: { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
  emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  amber: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  rose: { text: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30' },
};

export const TEAMS = [
  {
    slug: 'founders',
    icon: Rocket,
    title: 'Founders & Strategy',
    tagline: 'Validate strategy against real market moves',
    points: [
      'Brief yourself on a market in minutes before a board meeting',
      "See rivals' funding, launches and hiring as they happen",
      'Spot white space from recurring customer complaints',
      'Get three recommended actions with every report',
    ],
  },
  {
    slug: 'product',
    icon: Briefcase,
    title: 'Product Management',
    tagline: 'Build what competitors are missing',
    points: [
      "Track competitors' feature launches and release notes",
      'Mine low-star App Store reviews for unmet needs',
      'Watch engineering activity through GitHub',
      'Prioritise the roadmap using real competitive signals',
    ],
  },
  {
    slug: 'marketing',
    icon: Megaphone,
    title: 'Marketing',
    tagline: 'Sharpen positioning and messaging',
    points: [
      'Understand how competitors position themselves',
      'Catch pricing changes and campaign launches early',
      'Measure buzz on Hacker News and Reddit',
      'Turn competitor weaknesses into messaging angles',
    ],
  },
  {
    slug: 'sales',
    icon: Users,
    title: 'Sales & Customer Success',
    tagline: 'Win competitive deals',
    points: [
      'Walk into calls knowing what rivals shipped last week',
      'Arm reps with real customer complaints about competitors',
      'Build battle cards from AI overviews',
      'Keep objection handling current with the latest news',
    ],
  },
  {
    slug: 'investors',
    icon: LineChart,
    title: 'Investors & Analysts',
    tagline: 'Diligence a market fast',
    points: [
      'Map a category and its most active players',
      'Compare traction signals side by side',
      'Track momentum shifts over 7, 30 or 90 days',
      'Back up every memo with source links',
    ],
  },
  {
    slug: 'engineering',
    icon: Code,
    title: 'Engineering & DevRel',
    tagline: 'Benchmark developer mindshare',
    points: [
      "Compare competitors' open-source footprint and stars",
      'See which projects are actively maintained',
      'Track Show HN launches and developer discussions',
      'Identify the languages and ecosystems rivals invest in',
    ],
  },
];

export const INDUSTRIES_SOLUTIONS = [
  {
    slug: 'saas',
    icon: Sparkles,
    title: 'SaaS & Software',
    tagline: 'Track launches, pricing and developer buzz',
    body: 'Follow feature launches, pricing-page changes, GitHub momentum and Hacker News reception across your category.',
  },
  {
    slug: 'fintech',
    icon: Landmark,
    title: 'Fintech',
    tagline: 'Monitor funding, partnerships and app ratings',
    body: 'Watch funding rounds, bank partnerships and regulatory news, and see how customers rate each app.',
  },
  {
    slug: 'ecommerce',
    icon: ShoppingBag,
    title: 'E-commerce & Retail',
    tagline: 'Follow promotions and shopper sentiment',
    body: 'Catch promotions, expansion announcements and shopper sentiment from app reviews and community threads.',
  },
  {
    slug: 'healthcare',
    icon: HeartPulse,
    title: 'Healthcare',
    tagline: 'Watch approvals, launches and patient feedback',
    body: 'Keep tabs on product approvals, partnerships and patient feedback on digital health apps.',
  },
  {
    slug: 'edtech',
    icon: GraduationCap,
    title: 'EdTech',
    tagline: 'Track product moves and learner reviews',
    body: 'See new course launches and pricing changes, and what learners say in reviews and on Reddit.',
  },
  {
    slug: 'agencies',
    icon: Bell,
    title: 'Agencies & Consultancies',
    tagline: 'Deliver competitor briefs to clients',
    body: "Produce polished competitive landscapes for clients' categories in minutes instead of days.",
  },
];

export const FAQS = [
  {
    q: 'Is IntelliWatch really free?',
    a: 'Yes. The Free plan runs full reports on up to 5 competitors with no account and no credit card. Paid plans add saved reports, scheduled tracking and team features.',
  },
  {
    q: 'Where does the data come from?',
    a: 'Public sources we query live: Google News, Wikipedia, GitHub, the Apple App Store, Hacker News and Reddit. AI (Groq) scores, summarises and synthesises what it finds. Every item links back to its source.',
  },
  {
    q: 'How long does a report take?',
    a: 'Usually one to three minutes, depending on how many competitors you add. You can watch every step in the live pipeline log while it runs.',
  },
  {
    q: 'How is relevance scored?',
    a: 'Each news item is scored 1–10 for strategic relevance to that company. Items scoring 6 or higher make the Intelligence Feed; 8 or higher are marked High Signal.',
  },
  {
    q: 'Can I focus on specific topics?',
    a: 'Yes. Add keywords like "pricing" or "funding" and choose a 7, 30 or 90-day window. The search and scoring both weight your focus topics.',
  },
  {
    q: 'Is the data always accurate?',
    a: 'IntelliWatch reports what public sources say, and AI summaries can make mistakes. Companies with common-word names (for example "Linear") can pick up unrelated results, so check the source links before acting.',
  },
];
