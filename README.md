# table-data-management app

A performant and flexible React table demo capable of handling 1000+ rows with fully configurable features.

The table system supports searching, sorting, and filtering on any primitive column by simply passing the column name (and an optional comparator for sorting).

### Core Features

- Search across any chosen columns
- Sort by any column (with optional custom comparator)
- Filter by any column using configurable filter options
- Row selection using checkboxes and custom actions on selected rows, pass custom function and do anything with the selected data.
- Optimized rendering, loading states, and accessibility considerations

### Example: Characters Page

The Characters table demonstrates how the generic system can be configured:

- Search: by name or location
- Filter: by health (Healthy, Injured, Critical)
- Sort: by power (ascending / descending)
- Row selection: select multiple rows using checkboxes and log the selected IDs to the console

## **Tech Stack**

- **[React](https://react.dev/)** (v19)
- **[TypeScript](https://www.typescriptlang.org/)** (v5)
- **[Tailwind CSS](https://tailwindcss.com/)** (v4)
- **[Vite](https://vitejs.dev/)** (v7)
- **[json-server](https://github.com/typicode/json-server)** - Mock REST API for local development and testing large table datasets
- **[lucide-react](https://lucide.dev/)** - Icon library used for sort, filter, and UI action icons

### Folder Structure

```graphql
src/
│── components/ (Reusable UI components)
│   ├── customUI/
│   │   ├── Input.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Button/
│   │   │   ├── Primary.tsx
│   │   │   ├── index.tsx (Re-exports buttons for easy imports)
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
│   ├── index.ts (Re-exports page components)
│
│── hooks/ (Custom hooks)
│   ├── API/
│   │   ├── index.ts
│   │   ├── useFetch.ts
│   ├── Table/
│   │   ├── index.ts
│   │   ├── useFilter.ts
│   │   ├── useSearch.ts
│   │   ├── useSelection.ts
│   │   ├── useSort.ts
│
│── utils/(Utility functions/helpers)
│   ├── conditionalCheck.ts/ (helper function for comparison used in sorting)
│   ├── ... other utility files
│
│── constants/
│   ├── api.ts
│   ├── characters.ts
│   ├── ... other constant files
|
│── typesData/ (shared interfaces/types)
│   ├── characters.ts
│   ├── ... other typeData files
|
│── index.css (Global styles, theme variables, and Tailwind setup)
│── main.tsx
```

### Path Aliases

- `@custom-ui`: UI Components Directory
- `@components`: Components Directory
- `@pages`: Pages Directory
- `@utils`: Utils Directory
- `@context`: Context Directory
- `@constants`: Constants Directory
- `@typesData`: Types/Interfaces Directory
