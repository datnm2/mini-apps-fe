# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mini Apps Hub is a collection of standalone mini-applications built with Next.js 15. The project is deployed at https://apps.dat09vn.com and features multilingual support (English/Vietnamese) with automatic browser language detection.

## Development Commands

```bash
# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm build

# Start production server
npm start

# Run linter
npm run lint
```

## Architecture

### App Structure Pattern

Each mini-app follows this structure:
```
app/apps/{app-id}/
├── page.tsx          # Client component ("use client") with app logic
└── layout.tsx        # Server component with SEO metadata (export const metadata)
```

**Important**: Never add `export const metadata` to client components. Always create a separate `layout.tsx` for SEO metadata.

### Available Apps
- `todo` - Task management
- `calculator` - Basic calculator
- `weather` - Weather information
- `timer` - Pomodoro timer
- `taxcalc` - Vietnam tax calculator
- `godquote` - Motivational quotes

### Internationalization (i18n) System

The project uses a custom React Context-based i18n implementation:

**Translation Files**: `locales/en.json` and `locales/vi.json`

**Usage Pattern**:
```typescript
import { useLanguage } from "@/contexts/LanguageContext";

const { t, locale } = useLanguage();

// Access translations using dot notation
t("apps.todo.name")           // "Todo List" or "Danh Sách Việc Cần Làm"
t("common.loading")           // "Loading..." or "Đang tải..."
```

**Language Detection**: On first visit, automatically detects browser language (`navigator.language`). If Vietnamese, sets to `vi`, otherwise defaults to `en`. Subsequent visits use localStorage preference.

**Translation Structure**:
```json
{
  "common": { /* shared translations */ },
  "home": { /* homepage content */ },
  "apps": {
    "app-id": { /* app-specific translations */ }
  }
}
```

### Environment Variables

**Required Variables** (`.env.local`):
```
NEXT_PUBLIC_SITE_URL=https://apps.dat09vn.com
```

The site URL is used throughout metadata, sitemap, and robots.txt. Always reference via `process.env.NEXT_PUBLIC_SITE_URL` with a fallback:
```typescript
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://apps.dat09vn.com";
```

### SEO Implementation

The project has comprehensive SEO configuration:

1. **Root Layout** (`app/layout.tsx`) - Global metadata with Open Graph, Twitter Cards, keywords
2. **App-Specific Layouts** - Each app has `layout.tsx` with targeted metadata
3. **Sitemap** (`app/sitemap.ts`) - Dynamic sitemap generation using `MetadataRoute.Sitemap`
4. **Robots.txt** (`public/robots.txt`) - Search crawler instructions

When adding new apps, update:
- `app/sitemap.ts` - Add new route entry
- Create `app/apps/{app-id}/layout.tsx` with specific metadata

### Styling System

- **Tailwind CSS v4** with inline config in `app/globals.css`
- Custom animations defined in `globals.css` (e.g., `@keyframes fadeIn`)
- Icon library: `lucide-react`
- Utility libraries: `clsx`, `tailwind-merge`, `class-variance-authority`

**Color/Icon Pattern for Apps** (`app/page.tsx`):
```typescript
const appIcons = { todo: CheckSquare, calculator: Calculator, ... };
const appColors = { todo: "bg-blue-500", calculator: "bg-green-500", ... };
```

### State Management

- **Client-side only**: React hooks (`useState`, `useEffect`)
- **Global state**: `LanguageContext` for i18n (contexts/LanguageContext.tsx)
- **Persistence**: localStorage for language preference and app-specific data

### Path Aliases

Uses `@/*` alias mapping to project root (configured in `tsconfig.json`):
```typescript
import { useLanguage } from "@/contexts/LanguageContext";
import en from "@/locales/en.json";
```

## Adding a New Mini App

1. **Create app structure**:
   ```
   app/apps/{app-id}/
   ├── page.tsx
   └── layout.tsx
   ```

2. **Add translations** to `locales/en.json` and `locales/vi.json`:
   ```json
   "apps": {
     "app-id": {
       "name": "App Name",
       "description": "App description",
       // ... other keys
     }
   }
   ```

3. **Register in homepage** (`app/page.tsx`):
   - Add to `appIcons` object
   - Add to `appColors` object
   - Add to `miniApps` array

4. **Update sitemap** (`app/sitemap.ts`):
   ```typescript
   {
     url: `${baseUrl}/apps/{app-id}`,
     lastModified: new Date(),
     changeFrequency: 'monthly',
     priority: 0.8,
   }
   ```

5. **Import icon** from `lucide-react` if needed

## Key Technical Patterns

### Bilingual Content Pattern

For content with both English and Vietnamese versions (e.g., quotes):
```typescript
interface Quote {
  text: string;       // English
  text_vn: string;    // Vietnamese
  author: string;
}

// Display based on current locale
{locale === 'vi' ? item.text_vn : item.text}
```

### Client Component Pattern

All app pages use `"use client"` directive and follow this structure:
```typescript
"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AppPage() {
  const { t, locale } = useLanguage();
  // ... component logic
}
```

### Preserving State Across Mode Switches

When apps have mode toggles (like taxcalc Gross↔Net), preserve user input:
```typescript
const switchMode = () => {
  setMode(newMode);
  if (inputValue) {
    recalculate(inputValue); // Recalculate with existing input
  } else if (result) {
    setResult(result); // Keep existing result
  }
};
```

## Deployment

- **Platform**: Vercel
- **Domain**: https://apps.dat09vn.com
- **Git**: Automatically deploys from `master` branch on GitHub push

## Technology Stack

- **Framework**: Next.js 16.0.1 (App Router)
- **React**: 19.2.0
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS v4
- **Icons**: lucide-react 0.553.0
- **Node Target**: ES2017
