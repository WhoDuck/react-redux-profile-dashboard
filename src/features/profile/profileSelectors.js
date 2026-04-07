import { createSelector } from "@reduxjs/toolkit"
import { selectProfiles } from "./profileSlice"
import {
    selectSearch,
    selectRoleFilter,
    selectSortBy,
    selectPage
} from "./profileUiSlice"

const PER_PAGE = 6

export const selectFilteredProfiles = createSelector(
    [selectProfiles, selectSearch, selectRoleFilter, selectSortBy],
    (profiles, search, roleFilter, sortBy) => {
        let result = profiles

        if (search.trim() !== "") {
            result = result.filter(p =>
                p.name.toLowerCase().includes(search.toLowerCase())
            )
        }

        if (roleFilter !== "all") {
            result = result.filter(p =>
                p.role.toLowerCase() === roleFilter.toLowerCase()
            )
        }

        if (sortBy === "followers") {
            result = [...result].sort((a, b) =>
                b.followers - a.followers
            )
        }

        if (sortBy === "name") {
            result = [...result].sort((a, b) =>
                a.name.localeCompare(b.name)
            )
        }

        return result
    }   
)

export const selectTotalPages = createSelector(
    [selectFilteredProfiles],
    (filtered) => Math.ceil(filtered.length / PER_PAGE)
)

export const selectSafePage = createSelector(
    [selectPage, selectTotalPages],
    (page, totalPages) => Math.min(page, totalPages) || 1
)

export const selectPaginatedProfiles = createSelector(
    [selectFilteredProfiles, selectSafePage],
    (filtered, page) => {
        const start = (page - 1) * PER_PAGE
        return filtered.slice(start, start + PER_PAGE)
    }
)

export const selectIsFiltered = createSelector(
    [selectSearch, selectRoleFilter],
    (search, roleFilter) =>
        search.trim() !== "" || roleFilter !== "all"
)