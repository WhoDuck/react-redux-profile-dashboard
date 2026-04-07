# Profile Dashboard

## Overview

React + Redux Toolkit application that demonstrates production-style frontend state architecture. The project focuses on normalized Redux state, asynchronous data handling, memoized selector composition, and clear separation of domain data from UI query state.

## Purpose

This project was built to demonstrate production-style Redux Toolkit architecture, including normalized state management, selector-driven UI derivation, and scalable frontend structure suitable for real-world applications.

## Features

- Fetch profiles from an async API.
- Add and delete profiles.
- Follow profile and toggle like state.
- Debounced search input.
- Filter profiles by role.
- Sort profiles by followers or name.
- Pagination for large result sets.
- Loading, error, retry, and empty states.
- Memoized selectors for derived data.

## Tech Stack

- React
- Redux Toolkit
- createSlice
- createAsyncThunk
- createEntityAdapter
- Reselect (createSelector)
- React Redux
- Vite
- CSS
- ESLint

## Architecture Highlights

- Feature-based folder structure for scalability.
- Data slice and UI slice separation.
- Selector layer for derived view state.
- API layer separated from Redux reducers.
- Container component orchestration with presentational UI components.
- Normalized Redux state using entity adapters.

## Architecture

```text
UI Components
	↓
Container (App)
	↓
Redux Actions
	↓
Slices (profile + profileUi)
	↓
Selectors (memoized)
	↓
Derived UI State
	↓
Presentational Components
```

## Project Structure

```text
profile-card-react/
	src/
		components/
			AddProfileForm.jsx
			FilterBar.jsx
			Pagination.jsx
			ProfileCard.jsx
			ProfileList.jsx
			SearchBar.jsx
			SortSelect.jsx
		features/profile/
			profileApi.js
			profileSelectors.js
			profileSlice.js
			profileUiSlice.js
		store/
			store.js
		App.jsx
		App.css
		main.jsx
```

## State Management

```text
profile
- ids
- entities
- status
- error

profileUi
- search
- roleFilter
- sortBy
- page
```

- profile slice owns normalized entities and async request lifecycle.
- profileUi slice owns query and pagination controls.
- selectors combine both slices into render-ready data.

## Data Flow

1. App dispatches async thunk to fetch profiles.
2. profile slice transitions through idle, loading, succeeded, or failed.
3. User interactions dispatch UI actions (search, filter, sort, page).
4. Memoized selectors compute filtered, sorted, and paginated results.
5. Presentational components render from selector outputs.

## Performance Optimizations

- Normalized entities reduce update cost and simplify lookup.
- createSelector memoization avoids unnecessary recomputation.
- Debounced search reduces dispatch frequency during typing.
- React.memo on list and card components limits unnecessary re-renders.

## Skills Demonstrated

- Redux Toolkit architecture for real-world frontend apps.
- Async state management with error and retry handling.
- State normalization and selector-driven UI derivation.
- Component design with clear container/presentational boundaries.
- Maintainable project organization and scalable state modeling.

## Getting Started

```bash
npm install
npm run dev
```

Build and quality checks:

```bash
npm run build
npm run preview
npm run lint
```

## Future Improvements

- Add automated tests for reducers, selectors, and core UI flows.
- Introduce TypeScript for stronger contracts and maintainability.
- Replace mock API with real backend integration.
- Add RTK Query for standardized data fetching and caching.
- Improve accessibility coverage and keyboard navigation.
