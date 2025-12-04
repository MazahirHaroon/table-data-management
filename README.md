# **table-data-management app**

**Live Demo:** Hosted it: https://moccasin-mosquito-566254.hostingersite.com

A reusable and performant React table system capable of handling **thousands of rows** with smooth virtualization and fully configurable table features.

This project demonstrates how a single generic table component can be plugged into multiple pages with different data structures, feature sets, and configurations — without modifying the table itself.

---

## **Overview**

The table system includes searching, sorting, filtering, row selection, and accessibility features.  
**Virtualization is always enabled** to provide high performance with very large datasets.

You can enable or disable search, sort, filter, and row selection by passing configuration props.  
Virtualization remains on by default and cannot be turned off in this version.

Two demo pages showcase how flexible and powerful the system is:

* **Characters Table** — 1,008 rows
* **Cities Table** — 23,016 rows

Despite the massive difference in dataset size, both use the same table component.

---

## Hosting & Data Source

This project uses separate hosting for the UI and API:

### **Frontend Hosting**
- The **React app** is deployed on **Hostinger**.

### **Backend (Mock API) Hosting**
- The **JSON data API** is hosted on **Render**, running on a Node.js server.
- Locally, you can run the mock API using **json-server**, which serves the same data structure.
- In production, the table fetches data from the Render-hosted API.

---

## **Core Features**

* **Search** across any configured columns
* **Sort** by any column, with optional custom comparators
* **Filter** using configurable filter options
* **Row Selection** with checkbox multi-select + custom actions
* **Feature Interoperability** — search → sort → filter in any order
* **Virtualized Rendering** for fast performance on huge datasets
* **Accessibility** built-in: keyboard-friendly, ARIA attributes, focus management
* **Reusable Component Architecture** — no internal changes needed to add new tables

---

## **Characters Table (1,008 rows)**

This page demonstrates a lightweight configuration using the table system:

* **Search:** by `name` or `location`
* **Filter:** by `health` → `Healthy`, `Injured`, `Critical`
* **Sort:** by `power` (ascending or descending)
* **Selection:** select rows using checkboxes and log selected IDs

---

## **Cities Table (23,016 rows)**

A large dataset that showcases virtualization and complex feature combinations:

* **Search:** by `name`, `country`, or `subCountry`
* **Sort:** by `name`, `country`, or `subCountry`
* **Filter:** demo filter options include:

  * `India`
  * `United States`
  * `United Kingdom`
* **Selection:** same behavior as Characters page

This table demonstrates how the system stays smooth and responsive even with tens of thousands of rows.

---

## **Tech Stack**

- **[React](https://react.dev/)** (v19)
- **[TypeScript](https://www.typescriptlang.org/)** (v5)
- **[Tailwind CSS](https://tailwindcss.com/)** (v4)
- **[Vite](https://vitejs.dev/)** (v7)
- **[json-server](https://github.com/typicode/json-server)** - Mock REST API for local development and testing large table datasets
- **[lucide-react](https://lucide.dev/)** - Icon library used for sort, filter, and UI action icons

---

## **Reusable Components**

The project includes a set of reusable UI components integrated with the table:

* **Input**
* **Checkbox**
* **Primary / Secondary Buttons**
* **Table**, **Header**, **Row** components
* Configurable behavior via props: search keys, sort keys, filters, comparators, actions

All pages use the same table instance — only the data and configuration change.

---

## **Folder Structure**

```graphql
src/
│── components/
│   ├── customUI/
│   │   ├── Input.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Button/
│   │   │   ├── Primary.tsx
│   │   │   ├── index.tsx
│   ├── Table/
│   │   ├── index.tsx
│   │   ├── Header.tsx
│   │   ├── Row.tsx
│
│── pages/
│   ├── App.tsx
│   ├── TableSelection.tsx
│   ├── Characters.tsx
│   ├── Cities.tsx
│   ├── DetailsPage.tsx
│   ├── index.ts
│
│── hooks/
│   ├── API/
│   │   ├── useFetch.ts
│   ├── Table/
│       ├── useFilter.ts
│       ├── useSearch.ts
│       ├── useSelection.ts
│       ├── useSort.ts
│       ├── index.ts
│
│── utils/
│   ├── conditionalCheck.ts
│   ├── ... other helpers
│
│── constants/
│   ├── api.ts
│   ├── characters.ts
│   ├── table.ts
│   ├── ... other constants
│
│── typesData/
│   ├── characters.ts
│   ├── table.ts
│   ├── ... other types
│
│── index.css
│── main.tsx
```

---

## **Path Aliases**

| Alias         | Description                  |
| ------------- | ---------------------------- |
| `@custom-ui`  | Reusable UI components       |
| `@components` | Shared components            |
| `@pages`      | Screens and page components  |
| `@utils`      | Utility functions            |
| `@context`    | Context providers            |
| `@constants`  | App constants and config     |
| `@typesData`  | Shared TypeScript interfaces |

