# Design Brief: Gaurav.Create Premium Cyberpunk Creator Platform

**Tone & Differentiation:** Ultra-premium futuristic creator universe. Cyberpunk dark aesthetic with cinematic animations, glassmorphism, and neon glow effects. Every interaction feels immersive, highly animated, and visually distinctive.

**Color Palette:**
| Role | OKLCH | Usage |
|------|-------|-------|
| Neon Purple | oklch(73% 0.23 262) | Primary accent, glow effects, UI highlights |
| Neon Cyan | oklch(76% 0.24 183) | Secondary accent, interactive states, borders |
| Electric Blue | oklch(54% 0.15 260) | Tertiary accent, backgrounds, depth |
| Dark Base | oklch(12% 0 0) | Darkest background, text contrast |
| Surface | oklch(18% 0 0) | Cards, elevated surfaces, panels |
| Text Primary | oklch(92% 0 0) | Headlines, body text |
| Text Secondary | oklch(72% 0 0) | Labels, hints, tertiary text |
| Border | oklch(28% 0 0) | Dividers, subtle edges |

**Typography:**
- **Display:** Space Grotesk (bold geometric, futuristic)
- **Body:** Inter (neutral, highly legible)
- **Mono:** JetBrains Mono (premium tech aesthetic)

**Elevation & Depth:** Multi-layer glassmorphism with backdrop blur. Purple and cyan neon glows on hover. Layered shadows (outer glow + inner elevation) create dimensional depth. 3D perspective transforms on interactive elements.

**Structural Zones:**
| Zone | Purpose | Treatment |
|------|---------|----------|
| Hero | Cinematic entrance | Animated title, cyber-grid background, floating panels |
| Navigation | Primary access | Floating dock nav with glow, smooth transitions |
| Cards | Content containers | Glassmorphic, neon-bordered, hover glow effects |
| Chat | Real-time messaging | Glow bubbles, typing animations, online indicators |
| Dashboard | Owner-only controls | Premium widgets, smooth animations, analytics overview |
| Footer | Social/legal | Neon-linked social icons, minimal dark theme |

**Spacing & Rhythm:** 8px grid system. Generous padding (1.5rem–2.5rem) for premium feel. Consistent gaps between sections (2rem–4rem). Breathing room around interactive elements.

**Component Patterns:** Glassmorphic cards with subtle borders. Neon-glowing buttons and links. Animated hover states (glow-pulse, float). Loading spinners with neon pulse. Toast notifications with glow effects.

**Motion:** Smooth 0.2–0.3s eases for UI interactions. 2–3s duration for continuous animations (float, glow-pulse). Scroll-triggered reveals with stagger. Hover glow-pulse on active elements. Typing animations in chat. Floating particles in background.

**Constraints:** No light theme. No default Tailwind colors. All glows use OKLCH functions. Premium spacing, no cramped layouts. Animations only enhance, never distract.

**Signature Detail:** Neon glow effects on interactive surfaces. Glassmorphism backdrop blur on elevated UI. Floating and pulsing elements. Premium cursor with glow trail. Cinematic hero section with cyber-grid.
