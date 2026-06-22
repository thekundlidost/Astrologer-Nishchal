import { BlogPost } from "@/types";

/**
 * Starter blog articles. Each has a slug (its URL), full structured content,
 * and an optional related service for an in-article CTA. Add more by copying a
 * block. The blog listing, homepage "latest articles", individual post pages,
 * sitemap and SEO metadata all read from this single file.
 */
export const BLOG_POSTS: BlogPost[] = [
  {
    id: "b1",
    slug: "career-astrology-guide",
    title: "Career Astrology Guide: Timing Your Next Move with Confidence",
    category: "Career",
    excerpt:
      "How Vedic astrology reads career direction and timing — and how to use it alongside your own judgement for job changes, promotions and big decisions.",
    date: "2026-06-01",
    readMinutes: 6,
    serviceSlug: "kundli-consultation",
    intro:
      "A career question is rarely just about a job — it's about timing, temperament and the season of life you're in. Vedic astrology offers a structured way to think these through. Used well, it complements your own research and instinct rather than replacing them.",
    sections: [
      { heading: "What the chart actually shows about career", paragraphs: [
        "The 10th house of a birth chart relates to profession, public standing and the kind of work that suits you, while the 6th house relates to daily service, competition and the workplace itself. The planets influencing these houses, and the periods (Dashas) running in your life, together paint a picture of tendencies — not a fixed script.",
        "A good career reading translates this into plain language: which fields play to your strengths, whether you thrive in structure or independence, and which periods favour bold moves versus patient consolidation." ] },
      { heading: "Timing: the real value of a career consultation", paragraphs: [
        "Most people don't need to be told what they're good at — they need to know whether now is the right time to act. Planetary periods help separate a passing bout of restlessness from a genuine window for change.",
        "A supportive Dasha period combined with favourable transits over the 10th house often coincides with promotions, successful job changes or recognition. A more challenging period might suggest consolidating skills and relationships rather than making a leap." ] },
      { heading: "Using astrology responsibly for career decisions", paragraphs: [
        "Treat astrology as one input among several. Combine it with honest self-assessment, market research and advice from people in your field. No ethical astrologer can guarantee a promotion or a specific salary — anyone who does is overpromising.",
        "The most useful outcome of a career consultation is clarity and confidence: a clear read on timing, a realistic set of options, and the reassurance to act (or wait) without second-guessing every day." ] },
    ],
  },
  {
    id: "b2",
    slug: "marriage-astrology-guide",
    title: "Marriage Astrology Guide: Timing, Compatibility & Honest Answers",
    category: "Marriage",
    excerpt:
      "What marriage astrology can and can't tell you — from timing windows and Dasha periods to compatibility that goes beyond a single Guna score.",
    date: "2026-06-03",
    readMinutes: 7,
    serviceSlug: "kundli-consultation",
    intro:
      "Marriage is one of the most common reasons people consult an astrologer — and one of the areas where balanced, honest guidance matters most. Here's how marriage astrology actually works, and how to approach it without fear or false certainty.",
    sections: [
      { heading: "How marriage timing is read", paragraphs: [
        "Marriage timing is studied through the 7th house of partnership, the planets influencing it, and the Dasha periods likely to activate it. A skilled astrologer offers this as a likely window — a span of months or a particular period — rather than an exact date.",
        "If someone promises you a precise wedding date years in advance, treat it with healthy scepticism. Timing windows are realistic; guaranteed dates are not." ] },
      { heading: "Compatibility is more than a Guna score", paragraphs: [
        "Traditional Guna Milan gives a compatibility score out of 36, which is a useful starting point but far from the whole story. Mangal Dosha, the strength of the 7th house in both charts, and the couple's overlapping Dasha periods all matter.",
        "Just as importantly, a good reading considers temperament and life-stage fit — the practical, human factors that a single number can't capture." ] },
      { heading: "Approaching difficult answers with calm", paragraphs: [
        "Sometimes a chart highlights genuine concerns. The right response isn't fear — it's understanding what the concern actually means, how significant it is, and what remedies or adjustments can help.",
        "A consultation should leave you calmer and clearer, with language to discuss the decision with family, not more anxious." ] },
    ],
  },
  {
    id: "b3",
    slug: "numerology-basics",
    title: "Numerology Basics: Your Life Path, Destiny & Name Numbers Explained",
    category: "Numerology",
    excerpt:
      "A plain-language introduction to the core numbers in numerology — what they mean, how they're calculated, and where they're genuinely useful.",
    date: "2026-06-05",
    readMinutes: 5,
    serviceSlug: "numerology-report",
    intro:
      "Numerology looks at the numbers behind your birth date and name to describe tendencies, strengths and favourable choices. It's simple to start with and surprisingly practical for decisions like naming a business or choosing important dates.",
    sections: [
      { heading: "The three numbers that matter most", paragraphs: [
        "Your Life Path number, derived from your full date of birth, describes your broad direction and natural tendencies. Your Destiny (or Expression) number, derived from your full name, relates to what you're working toward. Your Name number reflects how your current name 'sounds' numerologically.",
        "Together these give a quick, useful profile — especially when you're weighing a few specific options against each other." ] },
      { heading: "Where numerology is genuinely useful", paragraphs: [
        "Numerology shines for practical comparisons: choosing between two spellings of a brand name, picking a favourable launch date, or understanding why a particular name has felt 'off'.",
        "It's best treated as a supportive tool — a tiebreaker and a lens — rather than a sole decision-maker." ] },
      { heading: "A realistic word on expectations", paragraphs: [
        "Numerology describes tendencies, not guarantees. A favourable name won't replace hard work, and an 'unfavourable' number isn't a curse. Used sensibly, it adds a useful perspective to choices you're already thinking through." ] },
    ],
  },
  {
    id: "b4",
    slug: "gemstone-guide",
    title: "Gemstone Guide: Choosing the Right Stone for Your Birth Chart",
    category: "Gemstones",
    excerpt:
      "Why the right gemstone depends on your chart — not your zodiac sign — and how carat, metal and timing affect whether a stone helps or hinders.",
    date: "2026-06-07",
    readMinutes: 6,
    serviceSlug: "gemstone-consultation",
    intro:
      "Gemstones are among the most popular astrological remedies — and among the most misunderstood. The right stone is determined by your individual birth chart, and wearing the wrong one can do more harm than good. Here's how to approach it sensibly.",
    sections: [
      { heading: "Your chart, not your sun sign", paragraphs: [
        "Generic 'birthstone by month' charts are a Western retail convention, not Vedic astrology. In Vedic practice, a gemstone is recommended to strengthen a specific planet that your chart indicates would benefit you — which is entirely individual.",
        "This is why two people born in the same month can need completely different stones, and why a chart review should always come before a purchase." ] },
      { heading: "Carat, metal and finger all matter", paragraphs: [
        "Beyond which stone, a proper recommendation specifies a minimum carat weight, the right metal for the setting, and the correct finger — all of which affect how the stone is believed to work.",
        "Equally important is knowing which stones to avoid, since some can amplify the difficult tendencies of a planet rather than support you." ] },
      { heading: "Buy with confidence", paragraphs: [
        "Once you know exactly what to look for — stone type, minimum carat and certification — you can buy from any certified jeweller you trust. A good consultation makes you a confident, informed buyer rather than a dependent one." ] },
    ],
  },
  {
    id: "b5",
    slug: "kundli-reading-guide",
    title: "Kundli Reading Guide: How to Read Your First Birth Chart",
    category: "Kundli",
    excerpt:
      "A beginner's glossary for your first Kundli — Lagna, Rashi, Bhava and Dasha explained simply, so your birth chart stops looking like a puzzle.",
    date: "2026-06-09",
    readMinutes: 8,
    serviceSlug: "kundli-report",
    intro:
      "Your first Kundli can look like an intimidating grid of symbols and abbreviations. But a handful of core concepts unlock most of it. Here's a friendly glossary to get you oriented before a consultation or report.",
    sections: [
      { heading: "Lagna, Rashi and the houses", paragraphs: [
        "Your Lagna (Ascendant) is the sign rising on the eastern horizon at your moment of birth — it anchors the whole chart and relates to your self and body. Your Rashi is your Moon sign, central to Vedic astrology and to your emotional nature.",
        "The chart is divided into twelve Bhavas (houses), each governing a life area — the 1st for self, 7th for partnership, 10th for career, and so on. Planets sitting in these houses colour those areas of life." ] },
      { heading: "Dashas: the timing engine", paragraphs: [
        "The Vimshottari Dasha system divides life into planetary periods, each bringing the themes of its ruling planet to the foreground. Knowing which Dasha you're in is central to timing predictions for career, marriage and more.",
        "This is why two people with similar charts can experience very different years — they're running different Dasha periods." ] },
      { heading: "Divisional charts and what a report adds", paragraphs: [
        "Beyond the main chart, divisional charts (like the D-9 Navamsa for marriage) zoom into specific life areas for finer detail. A good Kundli report weaves all of this into plain language across career, marriage, finance and health.",
        "You don't need to master the technicals yourself — but knowing the vocabulary makes any consultation far more useful and far less mysterious." ] },
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getLatestPosts(count = 3): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, count);
}
