# PLAN.md - Schrijf Woorden Project Implementation Plan

## Project Overview (Projectoverzicht)

**Schrijf Woorden** is a Dutch word learning application that helps users memorize vocabulary through typing practice. Users create "bukets" (buckets) of words, and the system intelligently tests them with spaced repetition and difficulty-based selection.

## Core Features (Kernfuncties)

### 1. Buket Management (Buketbeheer)

- Create new bukets with custom word lists
- Parse pasted text in format: `woorden: words\nwerkwoorden: verbs` OR paragraph text
- Format button cleans whitespace and organizes words
- Save bukets to LocalStorage
- Display all bukets on home page as cards
- Edit/delete existing bukets

### 2. Word Input Formats (Woordinvoerformaten)

- **Format A**: `woord: vertaling` (e.g., `huis: house`)
- **Format B**: Paragraph text (auto-converted to individual words, punctuation removed)
- Each line becomes one testable word

### 3. Practice/Test System (Oefensysteem)

- Select a buket to start practice
- Test 15-20 words per session (not all words)
- Smart word selection based on:
  - Incorrect answers (high priority)
  - Difficulty level (spaced repetition)
  - Shuffled order
- Three test modes (numbered options on UI):
  1. **Hetzelfde schrijven** (Write the same): Show Dutch word → type exact same
  2. **Vertaling schrijven** (Write translation): Show translation → type Dutch word
  3. **Uit geheugen schrijven** (Write from memory): Show word for 1 second → type from memory

### 4. Input & Interaction (Invoer & Interactie)

- Auto-focus on input field
- Auto-advance to next word when correct (no Enter needed)
- Press Enter to skip word (marked as incorrect)
- Special Dutch character toolbar above input: ë, ï, ö, ü, é, etc.
- Keyboard shortcuts:
  - Enter: skip word
  - Tab: navigate special characters
  - Ctrl+Enter: alternative skip
  - ESC: exit test

### 5. Statistics & Progression (Statistieken & Voortgang)

- Track correct/incorrect count per word
- Difficulty level per word
- Session progress (e.g., 5/20 words)
- Daily/weekly statistics
- Spaced repetition algorithm (words learned well appear less frequently)

### 6. Visual Feedback (Visuele Feedback)

- Green tick animation on correct answer
- Red shake animation on incorrect answer
- Progress bar showing session completion
- Modern, clean UI with smooth transitions

## Technical Architecture (Technische Architectuur)

### Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **State Management**: React Context + Hooks
- **Data Storage**: LocalStorage (JSON)
- **Linting/Formatting**: Biome

### Folder Structure (Mappenstructuur)

```
src/
  app/
    page.tsx                    # Home page - buket list
    buket-toevoegen/
      page.tsx                  # Add/create new buket
    buket-bewerken/[id]/
      page.tsx                  # Edit existing buket
    oefenen/[id]/
      page.tsx                  # Practice/test page
    layout.tsx
    globals.css

  components/
    BuketKaart/                 # Buket card component
      BuketKaart.tsx
      index.ts
    BuketFormulier/             # Buket creation form
      BuketFormulier.tsx
      OnderdeelComponents.tsx
      types.ts
      index.ts
    OefenScherm/                # Practice screen
      OefenScherm.tsx
      OnderdeelComponents.tsx   # Input, CharacterToolbar, ProgressBar
      types.ts
      index.ts
    SpecialeKarakters/          # Special character toolbar
      SpecialeKarakters.tsx
      index.ts
    Statistieken/               # Statistics display
      Statistieken.tsx
      types.ts
      index.ts

  lib/
    buket-beheer.ts             # Buket CRUD operations
    woord-parser.ts             # Parse and format word input
    oefen-logica.ts             # Practice logic & word selection
    statistieken-tracker.ts     # Track correct/incorrect answers
    spaced-repetition.ts        # Spaced repetition algorithm
    lokale-opslag.ts            # LocalStorage wrapper utilities

  types/
    buket.ts                    # Buket, Woord types
    statistieken.ts             # Statistics types
    oefen-modus.ts              # Practice mode enums

  hooks/
    useBuketBeheer.ts           # Buket management hook
    useOefenSessie.ts           # Practice session hook
    useStatistieken.ts          # Statistics hook
    useLokaleOpslag.ts          # LocalStorage hook

  context/
    BuketContext.tsx            # Global buket state
    StatistiekenContext.tsx     # Global statistics state
```

### Data Models (Gegevensmodellen)

```typescript
// Buket type
type Buket = {
	id: string; // UUID
	naam: string; // Buket name
	aanmaakDatum: string; // ISO date
	laatsteOefening: string; // ISO date
	woorden: Woord[];
};

// Woord type
type Woord = {
	id: string; // UUID
	origineel: string; // Original word (e.g., "huis")
	vertaling?: string; // Translation (e.g., "house") - optional
	juistAantal: number; // Correct count
	onjuistAantal: number; // Incorrect count
	moeilijkheidsgraad: number; // Difficulty level (0-10)
	laatsteTest: string; // ISO date
	volgendeHerhaling: string; // ISO date (spaced repetition)
};

// OefenModus enum
enum OefenModus {
	HetzelfdSchrijven = 1, // Write the same
	VertalingSchrijven = 2, // Write translation
	UitGeheugenSchrijven = 3, // Write from memory
}

// OefenSessie type
type OefenSessie = {
	buketId: string;
	geselecteerdeWoorden: Woord[]; // 15-20 words
	huidigeIndex: number;
	juisteAntwoorden: number;
	onjuisteAntwoorden: number;
	modus: OefenModus;
};

// Statistieken type
type Statistieken = {
	totaalWoorden: number;
	totaalJuist: number;
	totaalOnjuist: number;
	dagelijks: Record<string, { juist: number; onjuist: number }>;
};
```

## Implementation Phases (Implementatiefasen)

### Phase 1: Foundation (Fundament) ✅ COMPLETED

- [x] Set up Next.js project with TypeScript + Tailwind
- [x] Create folder structure
- [x] Define TypeScript types (Buket, Woord, etc.)
- [x] Set up LocalStorage utilities
- [x] Install shadcn/ui components

### Phase 2: Buket Management (Buketbeheer) ✅ COMPLETED

- [x] Create home page with buket list
- [x] Implement BuketKaart component
- [x] Build buket creation form
- [x] Implement word parsing logic (both formats)
- [x] Add format button functionality
- [x] Save/load bukets from LocalStorage
- [x] Add edit/delete functionality

### Phase 3: Practice System (Oefensysteem) ✅ COMPLETED

- [x] Create practice page layout
- [x] Implement word selection algorithm (15-20 words, prioritize incorrect)
- [x] Build input field with auto-focus
- [x] Add special character toolbar
- [x] Implement auto-advance on correct answer
- [x] Add Enter to skip functionality
- [x] Create three practice modes

### Phase 4: Statistics & Algorithm (Statistieken & Algoritme) ✅ COMPLETED

- [x] Track correct/incorrect per word
- [x] Calculate difficulty level
- [x] Implement spaced repetition algorithm
- [x] Build statistics display component (session stats on completion)
- [x] Add session progress tracking
- [ ] Create daily/weekly stats view (separate page - optional)

### Phase 5: Visual Polish (Visuele Afwerking) ✅ COMPLETED

- [x] Add success/error animations (color feedback on cards)
- [x] Implement progress bar (counter display)
- [x] Add smooth transitions
- [x] Responsive design
- [x] Dark mode support (via Tailwind)
- [x] Polish overall UI/UX

### Phase 6: Advanced Features (Geavanceerde Functies) 🚧 TODO

- [ ] Export/import bukets (JSON)
- [ ] Duplicate buket functionality
- [ ] Search/filter bukets
- [ ] Keyboard shortcuts help modal
- [ ] Settings page (test duration, word count, etc.)
- [ ] Separate statistics page with charts
- [ ] Audio pronunciation (Text-to-Speech)

## Key Algorithms (Belangrijke Algoritmen)

### 1. Word Selection Algorithm (Woordselectie-algoritme)

```typescript
function selecteerWoorden(woorden: Woord[], aantal: number = 20): Woord[] {
	// Priority scoring
	const gescoreerdWoorden = woorden.map((woord) => ({
		woord,
		score: berekenPrioriteit(woord),
	}));

	// Sort by priority (high to low)
	gescoreerdWoorden.sort((a, b) => b.score - a.score);

	// Take top N, shuffle
	const geselecteerd = gescoreerdWoorden
		.slice(0, aantal)
		.map((item) => item.woord);

	return shuffle(geselecteerd);
}

function berekenPrioriteit(woord: Woord): number {
	let score = 0;

	// High priority: many incorrect answers
	score += woord.onjuistAantal * 3;

	// Medium priority: high difficulty
	score += woord.moeilijkheidsgraad * 2;

	// Low priority: needs repetition (due date passed)
	if (new Date(woord.volgendeHerhaling) < new Date()) {
		score += 5;
	}

	// Penalty: recently correct
	if (woord.juistAantal > woord.onjuistAantal) {
		score -= woord.juistAantal;
	}

	return Math.max(0, score);
}
```

### 2. Spaced Repetition Algorithm (Herhalingsalgoritme)

```typescript
function berekenVolgendeHerhaling(woord: Woord, juist: boolean): string {
	const nu = new Date();
	let interval: number; // days

	if (juist) {
		// Increase interval on success
		const successStreak = woord.juistAantal - woord.onjuistAantal;
		interval = Math.min(30, Math.pow(2, successStreak)); // Max 30 days
	} else {
		// Reset to 1 day on failure
		interval = 1;
	}

	nu.setDate(nu.getDate() + interval);
	return nu.toISOString();
}

function updateMoeilijkheidsgraad(woord: Woord, juist: boolean): number {
	const huidig = woord.moeilijkheidsgraad;

	if (juist) {
		return Math.max(0, huidig - 1);
	} else {
		return Math.min(10, huidig + 2);
	}
}
```

### 3. Format Text Algorithm (Tekstopmaak-algoritme)

```typescript
function formateerTekst(input: string): string[] {
	// Remove extra whitespace and split by newline
	const regels = input
		.split("\n")
		.map((regel) => regel.trim())
		.filter((regel) => regel.length > 0);

	const geformatteerd: string[] = [];

	for (const regel of regels) {
		// Check if line contains colon (word:translation format)
		if (regel.includes(":")) {
			const [woord, vertaling] = regel.split(":").map((s) => s.trim());
			if (woord && vertaling) {
				geformatteerd.push(`${woord}: ${vertaling}`);
			}
		} else {
			// Paragraph mode: extract individual words
			const woorden = regel
				.replace(/[.,!?;:()""'']/g, "") // Remove punctuation
				.split(/\s+/)
				.filter((w) => w.length > 0);

			geformatteerd.push(...woorden);
		}
	}

	return geformatteerd;
}
```

## UI/UX Considerations (UI/UX Overwegingen)

### Color Scheme (Kleurenschema)

- Primary: Blue/Indigo (learning, trust)
- Success: Green (correct answers)
- Error: Red (incorrect answers)
- Neutral: Gray scales (backgrounds, text)

### Typography (Typografie)

- Headings: Bold, clear
- Body: Geist Sans (readable)
- Code/Input: Geist Mono (monospace for typing)

### Animations (Animaties)

- Success: Scale + fade in green checkmark
- Error: Shake + red highlight
- Transitions: 200-300ms easing
- Page transitions: Smooth fade

### Accessibility (Toegankelijkheid)

- High contrast text
- Focus indicators for keyboard navigation
- ARIA labels for screen readers
- Keyboard shortcuts documented

## Testing Strategy (Teststrategie)

### Manual Testing Checklist

- [ ] Create buket with word:translation format
- [ ] Create buket with paragraph text
- [ ] Format button works correctly
- [ ] Save/load from LocalStorage
- [ ] Practice session starts correctly
- [ ] Auto-advance on correct answer
- [ ] Skip on Enter key
- [ ] Special characters work
- [ ] Statistics update correctly
- [ ] Spaced repetition works
- [ ] Responsive design on mobile

## Performance Considerations (Prestatieoverwegingen)

- LocalStorage has 5-10MB limit (sufficient for thousands of words)
- Memoize expensive calculations (word selection)
- Debounce input validation
- Lazy load statistics page
- Optimize re-renders with React.memo

## Future Enhancements (Toekomstige Verbeteringen)

- [ ] Voice pronunciation (Text-to-Speech)
- [ ] Image support for words
- [ ] Multiple users (accounts)
- [ ] Cloud sync (Firebase/Supabase)
- [ ] Mobile app (React Native)
- [ ] Gamification (streaks, achievements)
- [ ] Social features (share bukets)
- [ ] AI-powered word suggestions

---

**Project Start Date**: 2026-01-06
**Estimated Completion**: Phase 1-5 (2-3 weeks of development)
