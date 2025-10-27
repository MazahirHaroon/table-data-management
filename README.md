# table-data-management app

A performant React table demo that renders 1000+ rows and supports:

- Row selection with checkboxes
- Search by name or location
- Filter by health (Healthy / Injured / Critical)
- Sort by power (ascending / descending)
- Console action to mark selected rows as "viewed" (logs selected IDs)
- Loading states and accessibility considerations

## **Tech Stack**

- **[React](https://react.dev/)** (v19)
- **[TypeScript](https://www.typescriptlang.org/)** (v5)
- **[Tailwind CSS](https://tailwindcss.com/)** (v4)
- **[Vite](https://vitejs.dev/)** (v7)

### Folder Structure

```graphql
src/
│── components/ (Reusable UI components)
│   ├── Table/
│   │   ├── index.tsx
│   │   ├── Header.tsx
│   │   ├── Row.tsx
│   ├── ... other components
│
│── pages/ (App pages/screens)
│   ├── App.tsx
│   ├── Characters.tsx
│   ├── ... other pages
│
│── utils/(Utility functions/helpers)
│   ├── api.ts/ (helper function to connect with json server)
│   ├── ... other utility files
│
│── constants/
│   ├── api.ts
│   ├── characters.ts
│   ├── ... other constant files
|
│── typesData/ (shared interaces/types)
│   ├── characters.ts
│   ├── ... other typeData files
|
│── index.css (Global styles, theme variables, and Tailwind setup)
│── main.tsx
```

### Path Aliases

- `@components`: Components Directory
- `@pages`: Pages Directory
- `@utils`: Utils Directory
- `@constants`: Constants Directory
- `@typesData`: Types/Interfaces Directory
