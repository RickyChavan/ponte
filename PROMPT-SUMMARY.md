# Nanobanana Prompt Summary for Ponte Hero Image

## What's Been Created

I've written a comprehensive prompt for nanobanana to generate a hero image showing **an Indian business team acting as a bridge for growth** — replacing the current Amsterdam canal bridge stock photo in your Ponte landing page.

### Files Created

1. **`nanobanana-hero-image-prompt.md`** (7.3KB)
   - Complete prompt with context, brand guidelines, and implementation instructions
   - Includes technical specs, color palette alignment, and next steps
   - Saved to: `design/nanobanana-prompts/hero-image-prompt.md` in your repo

2. **`nanobanana-prompt-text.txt`** (Clean prompt for direct use)
   - Streamlined prompt text ready to copy-paste into nanobanana interface
   - Saved to: `design/nanobanana-prompts/hero-prompt-clean.txt` in your repo

## Key Prompt Elements

### Core Concept
A diverse Indian business team of 5 people in a modern office, arranged to metaphorically represent a **bridge** connecting foundation (stability) and growth (ambition).

### Visual Details
- **Team**: 5 diverse professionals (gender, skin tone, roles) in business casual to formal wear
- **Setting**: Contemporary Indian office with natural warm lighting (golden hour quality)
- **Composition**: Wide landscape shot (3456 x 2304px / 3:2 ratio), shot from slightly elevated angle
- **Bridge metaphor**: Front team members grounded/stable, back members reaching forward, hands connected
- **Mood**: Confident, collaborative, warm, authentic (not overly corporate)

### Brand Alignment
- **Colors**: Warm tones with terracotta (#F0784A) and amber (#F2B04C) accents
- **Tone**: Professional but approachable, human-centered
- **Context**: Authentically Indian (architecture, fashion mix, design elements)
- **Tagline sync**: Aligns with Ponte's "Build the bridge to your next stage"

## How to Use

### Option 1: Direct Nanobanana Input
1. Copy the text from **`nanobanana-prompt-text.txt`**
2. Paste into your nanobanana API or UI
3. Generate 3-4 variants
4. Review and select the strongest one

### Option 2: With Full Context
1. Read **`nanobanana-hero-image-prompt.md`** for full background
2. Adjust the prompt based on any specific brand tweaks
3. Use the "Primary Prompt" section as your input
4. Follow the "Next Steps" section for integration

## Implementation Checklist

- [ ] Generate 3-4 image variants using the prompt
- [ ] Review each against brand guidelines (warmth, authenticity, Indian context)
- [ ] Select the strongest variant
- [ ] Save as `/frontend/public/photos/ponte-team-bridge.jpg` (or similar)
- [ ] Update `frontend/src/photos.ts` with new image URL and alt text
- [ ] Test responsiveness on mobile/tablet/desktop
- [ ] Commit to `ui-ux-pro` branch with message: "Replace hero image: Indian team bridge concept (AI-generated via nanobanana)"

## Integration with `photos.ts`

Once you have the final image, update the hero entry in `frontend/src/photos.ts`:

```typescript
hero: {
  src: '/photos/ponte-team-bridge.jpg',
  srcSet: '[include multiple sizes if needed]',
  alt: 'A diverse Indian business team standing together in a modern office, representing the human bridge to growth',
  width: 3456,
  height: 2304,
  focus: '50% 50%',
}
```

## Brand Context (for Reference)

- **Ponte**: Management-as-a-service for MSMEs/startups (Italian/Portuguese: ponte = bridge)
- **Tagline**: "Build the bridge to your next stage"
- **Audience**: MSME and startup founders in India
- **Visual**: Dark theme (deep teal #0B2024, cream #F5EEE2, terracotta #F0784A), photographic, full-bleed hero
- **Tone**: Warm, professional, approachable, confident

## Notes

- The prompt emphasizes authenticity and human connection over generic stock photography
- The "bridge" metaphor is implicit (through composition and body language) rather than literal
- Image should work on both light and dark themes
- Generated via AI, so credit as "AI-generated" or "Created with Nanobanana" as needed

---

**Files Location in Repo**: All files saved to `design/nanobanana-prompts/`  
**Branch**: Commit these prompts to `ui-ux-pro` for review  
**Ready to Use**: Yes — copy the clean prompt text and start generating!
