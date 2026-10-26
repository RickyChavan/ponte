# Nanobanana Prompt: Ponte Hero Image
## "Indian Team as a Bridge for Growth"

### Purpose
Replace the current Amsterdam canal bridge stock photo with an authentic image of an Indian business team serving as a metaphorical bridge connecting growth and ambition. This is for the hero section of the Ponte website (ponte.co.in) — a management-as-a-service platform for MSMEs and startups.

---

## Primary Prompt (Image Generation)

### Core Concept
**A professional portrait of a diverse Indian business team of 4–6 people, standing together as a human bridge connecting two sides — one representing foundation/stability, the other representing growth/ambition. The image should feel warm, authentic, and aspirational.**

### Detailed Description

**Setting & Composition:**
- **Location**: Modern office or open workspace in India (glass windows, contemporary design, natural light)
- **Camera angle**: Wide shot that captures the full team, shot from a slightly lower angle looking up (empowering, aspirational)
- **Frame orientation**: Horizontal/landscape (3456 x 2304 pixels, 3:2 aspect ratio for web hero)
- **Depth of field**: Slight blur in background to keep focus on the team; clear, sharp focus on the team members

**The Team (5 people, diverse roles):**
1. A woman in business attire (project manager/operations lead) — center-front, confident posture
2. A man in tech clothing (engineer/DevOps) — left side, holding a laptop or tablet
3. A woman in sales attire (sales/marketing lead) — right side, gesturing forward
4. A man in formal wear (finance/admin) — back left, professional appearance
5. A younger woman (intern/growth specialist) — back right, dynamic energy

**Visual Elements of "Bridge":**
- The team physically arranged so they form a bridge: front members grounded/stable, back members reaching upward or forward
- Hands connected or overlapping to show unity and support
- Perhaps one person literally bridging/connecting others (arm over shoulder, helping gesture)
- The background splits subtly into two zones: left side hints at foundation (darker, more grounded), right side hints at growth (brighter, more open)

**Lighting & Mood:**
- **Lighting**: Warm natural light from the side (golden hour if outdoors) or professional indoor lighting
- **Color tone**: Warm, welcoming, professional. Slightly saturated to feel energetic without being artificial
- **Mood**: Confident, collaborative, trustworthy, human-centered
- **Atmosphere**: Modern, progressive, Indian (visible cultural elements like diverse fashion, architecture suggesting India)

**Visual Style:**
- **Photography style**: Contemporary corporate/startup photography mixed with authenticity (not over-stylized or stock-photo-generic)
- **Finish**: Professional, sharp, ready for web use
- **Authenticity**: Real people (or AI-generated in a realistic style), genuine expressions, not overly posed

**People Details:**
- **Diversity**: Mix of genders, skin tones, professional backgrounds
- **Clothing**: Business casual to business formal (mix of traditional Indian and contemporary business wear)
- **Expressions**: Confident, approachable, warm smiles; not stiff or corporate
- **Body language**: Open, collaborative, forward-facing; hands visible and gesturing positively

**Background Context:**
- Modern office with visible elements: glass partitions, collaboration spaces, plants, tech equipment
- India indicators: architectural style, cultural design elements, or subtle contextual clues (not heavy-handed)
- Clean, uncluttered background that doesn't compete with the team
- Perhaps a skyline or growth chart visible (subtle, not literal)

**Color Palette (Align with Ponte Brand):**
- **Background tones**: Deep teals (#0B2024–#102B30) should work as backdrop OR warm office lighting
- **Team clothing**: Mix of terracotta (#F0784A), amber (#F2B04C), and natural professional colors
- **Overall warmth**: The image should feel warm and inviting, not cold or clinical
- **Contrast**: Good contrast for readability; skin tones and clothing should stand out

**Technical Specifications:**
- **Aspect Ratio**: 3456 x 2304 (3:2)
- **Resolution**: High-resolution, suitable for full-bleed web hero (1920px minimum width)
- **Format**: JPG or PNG, optimized for web
- **Subject Focus**: Team as the clear focal point (object-position: 50% 50%)

---

## Alternative Prompt (If Literal "Bridge" Needed)

If a more literal bridge metaphor is preferred:

**A diverse Indian business team standing on or framing a modern architectural bridge, silhouetted or backlit at sunset/sunrise, representing the connection between foundation and growth. The bridge is both literal and metaphorical — connecting two shores of a river or valley, with the team as its human expression.**

---

## Context for Nanobanana

### Brand Context
- **Brand name**: Ponte (Italian/Portuguese for "bridge")
- **Tagline**: "Build the bridge to your next stage"
- **Positioning**: Bridge between founder ambition and the right team for growth
- **Audience**: MSME and startup founders in India
- **Tone**: Warm, professional, approachable, confident

### Usage
- **Location**: Hero section of ponte.co.in
- **Display size**: Full-width browser hero (1280px–1920px wide)
- **Replacement for**: Current Amsterdam canal bridge stock photo
- **Credit**: Will be credited in footer if required

### Design Notes
- Should feel authentic to Indian business context
- Avoid stereotypes or "diversity for diversity's sake"
- Prioritize warmth and human connection over corporate stiffness
- The bridge metaphor should be implicit (through composition, body language) rather than literal
- Image should work equally well on light and dark themes

---

## Generation Parameters (for nanobanana API)

```
model: "flux-pro" (or latest pro model)
size: "3456x2304" (3:2 landscape)
prompt: [See Primary Prompt section above]
style: "photography"
quality: "hd"
num_images: 4 (generate variants)
seed: [optional for consistency]
```

---

## Next Steps

1. **Generate** 3–4 variants using the primary prompt
2. **Review** each variant against:
   - Brand alignment (warmth, professionalism)
   - Authenticity (realistic, not generic stock photo)
   - Bridge metaphor clarity (composition shows connection)
   - Indian context (visible, respectful, not tokenizing)
3. **Select** the strongest variant
4. **Optimize** for web (crop to exact hero dimensions if needed, compress for page load)
5. **Credit** the AI generation in footer or metadata
6. **Update** `frontend/src/photos.ts` with the new image URL and alt text:
   ```typescript
   hero: {
     src: '/photos/ponte-team-bridge.jpg',
     alt: 'Indian business team standing together, representing the bridge to growth',
     width: 3456,
     height: 2304,
     focus: '50% 50%',
   }
   ```
7. **Test** responsiveness across devices (mobile, tablet, desktop)

---

## Alt Text Options

- "A diverse Indian business team of five professionals standing together in a modern office, representing the human bridge to growth"
- "Professional Indian team united as a bridge connecting foundation and ambition"
- "Five Indian business professionals collaborating as a metaphorical bridge for startup growth"

---

## File Location in Repo

Save this prompt document to: **`design/nanobanana-prompts/hero-image-prompt.md`**

This keeps all AI generation prompts in one organized place for future reference and iteration.
