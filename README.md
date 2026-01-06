# Schrijf Woorden

**Nederlandse woorden leren door te typen** - Een interactieve applicatie voor het oefenen van woordenschat met slimme herhaling en spaced repetition algoritme.

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)

## 📖 Over dit Project

Schrijf Woorden is een web-applicatie waarmee gebruikers Nederlandse woorden kunnen oefenen door ze te typen. De app gebruikt intelligente algoritmen om woorden te selecteren op basis van moeilijkheid en eerder gemaakte fouten, waardoor het leerproces effectiever wordt.

### Belangrijkste Kenmerken

- ✅ **Bukets aanmaken** - Organiseer woorden in thematische bukets
- 🎯 **Slimme woordselectie** - Algoritme kiest 15-20 woorden per sessie op basis van moeilijkheid
- 🔄 **Spaced Repetition** - Woorden worden herhaald op optimale intervallen
- 📊 **Statistieken** - Volg je voortgang met juiste/onjuiste antwoorden
- 🎨 **Drie oefen modi**:
  1. Hetzelfde schrijven - Type het getoonde woord
  2. Vertaling schrijven - Type de vertaling
  3. Uit geheugen schrijven - Woord wordt 1 seconde getoond, dan typen
- ⌨️ **Speciale karakters** - Toolbar voor Nederlandse karakters (ë, ï, ö, etc.)
- 🔊 **Spraakuitvoer** - Luister naar de uitspraak van woorden
- 🌙 **Dark Mode** - Volledig ondersteund

## 🚀 Snel aan de Slag

### Vereisten

- Node.js 20+
- npm of pnpm

### Installatie

```bash
# Clone de repository
git clone https://github.com/jouw-gebruikersnaam/schrijf-woorden.git

# Ga naar de projectmap
cd schrijf-woorden

# Installeer dependencies
npm install

# Start de development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in je browser.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Linting/Formatting**: [Biome](https://biomejs.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Storage**: LocalStorage (client-side)

## 📁 Project Structuur

```
src/
├── app/                          # Next.js App Router paginas
│   ├── page.tsx                 # Home - buket lijst
│   ├── buket-toevoegen/         # Nieuwe buket aanmaken
│   ├── buket-bewerken/[id]/     # Buket bewerken
│   └── oefenen/[id]/            # Oefen/test pagina
├── components/                   # React componenten
│   ├── BuketKaart/              # Buket card component
│   ├── BuketFormulier/          # Buket formulier
│   └── SpecialeKarakters/       # Speciale karakters toolbar
├── lib/                          # Utility functies
│   ├── buket-beheer.ts          # Buket CRUD operaties
│   ├── woord-parser.ts          # Woord parsing logica
│   ├── oefen-logica.ts          # Oefen algoritme
│   ├── spaced-repetition.ts     # Spaced repetition algoritme
│   ├── statistieken-tracker.ts  # Statistieken tracking
│   ├── lokale-opslag.ts         # LocalStorage wrapper
│   └── spraak.ts                # Spraaksynthese (Text-to-Speech)
└── types/                        # TypeScript type definities
    ├── buket.ts
    ├── oefen-modus.ts
    └── statistieken.ts
```

## 🎮 Gebruik

### 1. Buket Aanmaken

- Klik op **"+ Nieuwe Buket"**
- Geef de buket een naam
- Voeg woorden toe in twee formaten:
  - **Format 1**: `woord: vertaling` (bijv. `huis: house`)
  - **Format 2**: Plak een paragraaf tekst (wordt automatisch opgesplitst)
- Klik op **"Formatteren"** om tekst op te schonen
- Klik op **"Opslaan"**

### 2. Oefenen

- Selecteer een buket op de home pagina
- Kies een oefen modus (1, 2, of 3)
- Type het woord in het invoerveld
- Het systeem gaat automatisch naar het volgende woord bij een correct antwoord
- Druk op **Enter** om een woord over te slaan
- Klik op **🔊** om de uitspraak te horen

### 3. Voortgang Volgen

- Zie je statistieken na elke sessie
- Bekijk totaal juiste/onjuiste antwoorden
- Woorden worden automatisch geprioriteerd op basis van moeilijkheid

## 🧠 Algoritmen

### Woordselectie Algoritme

Het systeem selecteert 15-20 woorden per sessie op basis van:
- **Prioriteit score** (hoogste eerst):
  - Onjuiste antwoorden × 3
  - Moeilijkheidsgraad × 2
  - Herhalingsdatum verlopen + 5
  - Straf voor recent correcte antwoorden

### Spaced Repetition

- Correcte antwoorden → interval verdubbelt (max 30 dagen)
- Onjuiste antwoorden → interval reset naar 1 dag
- Moeilijkheidsgraad: 0-10 schaal, past zich aan per antwoord

## 📜 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build voor productie
npm start            # Start productie server
npm run lint         # Run Biome linter
npm run format       # Format code met Biome
```

## 🎨 Styling Conventies

- **Tailwind CSS v4** met native engine
- **Dark mode** via Tailwind class-based system
- **Responsive design** - Mobile-first approach
- **shadcn/ui** componenten voor consistente UI

## 🔧 Ontwikkeling

### Code Conventies

- **Naming**: Gebruik Nederlandse termen voor variabelen en functies
  - ✅ `gebruikerNaam`, `woordenLijst`, `opslaan()`
  - ❌ `userName`, `wordList`, `save()`
- **Components**: Per component een folder met:
  - `ComponentNaam.tsx` - Hoofdcomponent
  - `OnderdeelComponents.tsx` - Child components (indien nodig)
  - `types.ts` - Alleen als types gedeeld worden
  - `index.ts` - Exports
- **Geen `any` types** - Altijd expliciete types gebruiken

Zie [CLAUDE.md](./CLAUDE.md) voor volledige ontwikkelconventies.

## 📊 Data Opslag

Alle data wordt lokaal opgeslagen in de browser via **LocalStorage**:

- `schrijf-woorden-bukets` - Bukets en woorden
- `schrijf-woorden-statistieken` - Globale statistieken

**Geen server of database nodig!** Je data blijft privé op je apparaat.

## 🚧 Toekomstige Features

Geplande verbeteringen (zie [PLAN.md](./PLAN.md)):

- [ ] Export/import bukets (JSON)
- [ ] Zoeken en filteren van bukets
- [ ] Gedetailleerde statistieken pagina met grafieken
- [ ] Keyboard shortcuts help modal
- [ ] Instellingen pagina (oefen duur, woord aantal)
- [ ] Meerdere gebruikers support
- [ ] Cloud sync (Firebase/Supabase)

## 🤝 Bijdragen

Dit is een persoonlijk leerproject, maar suggesties zijn welkom! Open een issue of pull request.

## 📄 Licentie

MIT License - Vrij te gebruiken voor persoonlijke en educatieve doeleinden.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide](https://lucide.dev/) - Icons
- [Biome](https://biomejs.dev/) - Linting & formatting

---

**Made with ❤️ for Dutch language learners**

Voor meer technische details, zie [PLAN.md](./PLAN.md) en [CLAUDE.md](./CLAUDE.md).
