import { useMemo, useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"

import AddProfileForm from "./components/AddProfileForm"
import ProfileList from "./components/ProfileList"
import "./App.css"
import SearchBar from "./components/SearchBar"
import FilterBar from "./components/FilterBar"
import SortSelect from "./components/SortSelect"
import Pagination from "./components/Pagination"

import {
  fetchProfiles,
  addProfile,
  removeProfile,
  followProfile,
  toggleLike,
  selectStatus,
  selectError,
} from "./features/profile/profileSlice"

import {
  setSearch,
  setRoleFilter,
  setSortBy,
  setPage,
  resetPage,
  selectSearch,
  selectRoleFilter,
  selectSortBy
} from "./features/profile/profileUiSlice"

import {
  selectTotalPages,
  selectPaginatedProfiles,
  selectSafePage,
  selectIsFiltered
} from "./features/profile/profileSelectors"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProfiles())
  }, [dispatch])

  const status = useSelector(selectStatus)
  const error = useSelector(selectError)
  const search = useSelector(selectSearch)
  const roleFilter = useSelector(selectRoleFilter)
  const sortBy = useSelector(selectSortBy)
  const paginated = useSelector(selectPaginatedProfiles)
  const totalPages = useSelector(selectTotalPages)
  const safePage = useSelector(selectSafePage)
  const isFiltered = useSelector(selectIsFiltered)

  const isLoading = status === "idle" || status === "loading"
  const isFailed = status === "failed"
  const isSucceeded = status === "succeeded"
  const controlsDisabled = !isSucceeded

  const roles = useMemo(() => [
    { value: "all", label: "All Roles" },
    { value: "Developer", label: "Developer" },
    { value: "Designer", label: "Designer" },
    { value: "Manager", label: "Manager" }
  ], [])

  const options = useMemo(() => [
    { value: "followers", label: "Followers" },
    { value: "name", label: "Name" }
  ], [])

  const handleSearch = useCallback((value) => {
    dispatch(setSearch(value))
  }, [dispatch])

  const handleRoleChange = useCallback((value) => {
    dispatch(setRoleFilter(value))
  }, [dispatch])

  const handleSortChange = useCallback((value) => {
    dispatch(setSortBy(value))
  }, [dispatch])

  const handleRetry = useCallback(() => {
    if (!isLoading) {
      dispatch(fetchProfiles())
    }
  }, [dispatch, isLoading])

  const handleLike = useCallback((id) => {
    dispatch(toggleLike(id))
  }, [dispatch])

  const handleFollow = useCallback((id) => {
    dispatch(followProfile(id))
  }, [dispatch])
  
  const handleRemove = useCallback((id) => {
    dispatch(removeProfile(id))
    dispatch(resetPage())
  }, [dispatch])

  const handleAdd = useCallback((profile) => {
    dispatch(addProfile(profile))
    dispatch(resetPage())
  }, [dispatch])

  const handlePageChange = useCallback((nextPage) => {
    const bounded = Math.min(Math.max(1, nextPage), totalPages || 1)
    dispatch(setPage(bounded))
  }, [dispatch, totalPages])

  return (
    <div className="app">
      <h1>Profile Dashboard</h1>
      <div className="toolbar">
        <SearchBar value={search} onChange={handleSearch} disabled={controlsDisabled} />
        <FilterBar roles={roles} value={roleFilter} onChange={handleRoleChange} disabled={controlsDisabled} />
        <SortSelect options={options} value={sortBy} onChange={handleSortChange} disabled={controlsDisabled} />
      </div>
      <AddProfileForm onAdd={handleAdd} disabled={controlsDisabled} />
      {isLoading && <p>Loading...</p>}
      {isFailed && (
        <div className="error-box">
          <p>{error}</p>
          <button onClick={handleRetry} disabled={isLoading}>Retry</button>
        </div>
      )}
      {isSucceeded &&
        (<ProfileList
          profiles={paginated}
          onFollow={handleFollow}
          onLike={handleLike}
          onRemove={handleRemove}
          isFiltered={isFiltered}
        />)}

      {isSucceeded && (
        <Pagination
          total={totalPages}
          page={safePage}
          onChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default App