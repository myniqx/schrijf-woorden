# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 16.1 application with App Router, React 19, TypeScript, Tailwind CSS v4, and Biome for linting/formatting. Uses React Compiler (experimental) for automatic optimization.

## Development Commands

### Running the application

```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build production bundle
npm start            # Start production server
```

### Code quality

```bash
npm run lint         # Run Biome linter checks
npm run format       # Format code with Biome
```

## Architecture

- **Framework**: Next.js 16 with App Router (`src/app/`)
- **Styling**: Tailwind CSS v4 with PostCSS
- **Linting/Formatting**: Biome (replaces ESLint + Prettier)
- **Fonts**: Geist Sans and Geist Mono via `next/font/google`
- **React Compiler**: Enabled in `next.config.ts` for automatic optimizations

### Project Structure

```
src/
  app/
    layout.tsx      # Root layout with font configuration
    page.tsx        # Home page component
    globals.css     # Global styles with Tailwind directives
    favicon.ico
```

## Key Configuration Details

### Biome Configuration (`biome.json`)

- Uses Git VCS integration
- Linter includes Next.js and React recommended rules
- Auto-organizes imports
- Ignores `node_modules`, `.next`, `dist`, `build`
- 2-space indentation

### Next.js Configuration (`next.config.ts`)

- React Compiler enabled (`reactCompiler: true`)
- TypeScript strict mode enabled

### Tailwind CSS

- Version 4 (new major version with native engine)
- Uses `@tailwindcss/postcss` plugin
- Configured via `postcss.config.mjs`

## Important Notes

- This project uses **Biome** instead of ESLint/Prettier - do not suggest ESLint or Prettier
- React Compiler is **experimental** - be aware of potential optimization side effects
- Tailwind v4 has breaking changes from v3 - use v4 syntax
- Next.js App Router patterns - use Server Components by default, add "use client" when needed

## Project-Specific Conventions

### Naming Conventions

- **Variables and Functions**: Use Dutch terminology (Nederlands)
- **Documentation**: Bilingual format - Dutch first (Nederlands), then English
- **Examples**:
  - ✅ `gebruikerNaam` (Dutch: gebruiker = user, naam = name)
  - ✅ `woordenLijst` (Dutch: woorden = words, lijst = list)
  - ✅ `opslaan()` (Dutch: opslaan = save)
  - ✅ `verwijderen()` (Dutch: verwijderen = delete)
  - ❌ `userName`, `wordList`, `save()`, `delete()`

### UI Component Library

- Use **shadcn/ui** for UI components
- Install components as needed via CLI: `npx shadcn@latest add <component>`

### Component Architecture

**Avoid prop drilling**: Use providers/hooks/context instead of passing props through multiple levels.

**Component classification**:
- **Main Component (Hoofdcomponent)**: Reusable across multiple locations. A component becomes "main" when it can be used in different places by adding just one prop (e.g., a `variant` prop). This promotes visual consistency and easier maintenance.
- **Child Component (Onderdeelcomponent)**: Used only within one parent component. Can be for repeating patterns OR complex structures that need extraction for readability, even if used once.

**Component folder structure**:
```
components/
  HoofdComponent/              (Dutch: Hoofd = Main)
    index.ts                   # Exports only the main component
    HoofdComponent.tsx         # Main component
    types.ts                   # ONLY if child components exist AND share props
    OnderdeelComponents.tsx    # Child components (Dutch: Onderdeel = Part)
```

**When to create `types.ts`**:
- ✅ Create `types.ts` when you have child components that share common props
- ❌ Do NOT create `types.ts` for every component
- ❌ Do NOT create `types.ts` if components have no props (using context/providers)
- Define types inline in the component file if no shared types are needed

### Component Templates

#### Example 1: Component with Child Components and Shared Props

**Main Component** (`components/KaartComponent/KaartComponent.tsx`):
```tsx
'use client'; // Only if hooks/client-side logic needed

import type { FC } from "react";
import { KaartKop, KaartInhoud } from "./OnderdeelComponents";
import type { KaartComponentProps } from "./types";

export const KaartComponent: FC<KaartComponentProps> = ({
  titel,
  inhoud,
  variant = "standaard"
}) => {
  return (
    <div className={`kaart kaart--${variant}`}>
      <KaartKop titel={titel} variant={variant} />
      <KaartInhoud inhoud={inhoud} />
    </div>
  );
};
```

**Child Components** (`components/KaartComponent/OnderdeelComponents.tsx`):
```tsx
import type { FC } from "react";
import type { KaartKopProps, KaartInhoudProps } from "./types";

export const KaartKop: FC<KaartKopProps> = ({ titel, variant }) => {
  return <h3 className={`kaart__kop kaart__kop--${variant}`}>{titel}</h3>;
};

export const KaartInhoud: FC<KaartInhoudProps> = ({ inhoud }) => {
  return <div className="kaart__inhoud">{inhoud}</div>;
};
```

**Types** (`components/KaartComponent/types.ts`):
```ts
// Main component props
export type KaartComponentProps = {
  titel: string;
  inhoud: string;
  variant?: "standaard" | "uitgelicht" | "compact";
};

// Shared type for variant (used by multiple child components)
type KaartVariant = "standaard" | "uitgelicht" | "compact";

// Child component props
export type KaartKopProps = {
  titel: string;
  variant: KaartVariant;
};

export type KaartInhoudProps = {
  inhoud: string;
};
```

**Index** (`components/KaartComponent/index.ts`):
```ts
export * from "./KaartComponent";
export * from "./types";
```

#### Example 2: Simple Component Without Props (Using Context)

**Component** (`components/GebruikerProfiel/GebruikerProfiel.tsx`):
```tsx
'use client';

import type { FC } from "react";
import { useGebruiker } from "@/hooks/useGebruiker";

// No types.ts needed - no props, using context
export const GebruikerProfiel: FC = () => {
  const { naam, email } = useGebruiker();

  return (
    <div className="profiel">
      <h2>{naam}</h2>
      <p>{email}</p>
    </div>
  );
};
```

**Index** (`components/GebruikerProfiel/index.ts`):
```ts
export * from "./GebruikerProfiel";
```

#### Example 3: Component with Inline Types (No Shared Props)

**Component** (`components/WoordenTeller/WoordenTeller.tsx`):
```tsx
import type { FC } from "react";

// Types defined inline - not shared with other files
type WoordenTellerProps = {
  aantal: number;
  maximum?: number;
};

export const WoordenTeller: FC<WoordenTellerProps> = ({
  aantal,
  maximum = 100
}) => {
  const percentage = (aantal / maximum) * 100;

  return (
    <div className="teller">
      <span>{aantal} / {maximum}</span>
      <div className="teller__balk" style={{ width: `${percentage}%` }} />
    </div>
  );
};
```

**Index** (`components/WoordenTeller/index.ts`):
```ts
export * from "./WoordenTeller";
```

### Common Dutch Terms for Development

| English | Nederlands | Usage |
|---------|-----------|-------|
| user | gebruiker | `gebruikerProfiel`, `gebruikerNaam` |
| word | woord | `woordenLijst`, `nieuwWoord` |
| words | woorden | `schrijfWoorden`, `woordenTeller` |
| list | lijst | `taalLijst`, `woordenLijst` |
| save | opslaan | `opslaanKnop()`, `dataOpslaan()` |
| delete | verwijderen | `verwijderenActie()`, `itemVerwijderen()` |
| edit | bewerken | `bewerkenModus`, `tekstBewerken()` |
| add | toevoegen | `toevoegenKnop()`, `nieuwItemToevoegen()` |
| write | schrijven | `schrijfModus`, `tekstSchrijven()` |
| read | lezen | `lezenModus`, `dataLezen()` |
| language | taal | `taalSelectie`, `huidigeLanguage` |
| button | knop | `opslaanKnop`, `verwijderenKnop` |
| form | formulier | `gebruikerFormulier`, `invoerFormulier` |
| input | invoer | `tekstInvoer`, `invoerVeld` |
| output | uitvoer | `resultaatUitvoer` |

### Component Best Practices

1. **One component = One responsibility**: Each component should have a single, clear purpose
2. **Minimize props**: Only pass what's necessary. Use context/providers/hooks for shared state to avoid prop drilling
3. **Reusability through variants**: If you can reuse a component in different places by adding one prop (like `variant`), make it a main component for better visual consistency
4. **Extract for clarity**: Create child components for repeating patterns OR complex structures that need extraction for readability, even if used only once
5. **Type everything, but smartly**:
   - ❌ **NEVER use `any`** - always define explicit types
   - ✅ Create `types.ts` when child components share props
   - ✅ Define types inline when props are not shared
   - ❌ Don't create `types.ts` for components without props (using context)
6. **Server Components by default**: Only add `'use client'` when absolutely necessary (hooks, events, browser APIs)
7. **Dutch naming**: Use Dutch terms consistently for all variables and function names (see Common Dutch Terms table)
