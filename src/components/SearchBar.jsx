import { useState, useEffect, useRef } from "react"

function SearchBar({ value: externalValue = "", onChange, disabled = false }) {
    const DEBOUNCE_MS = 500
    const [value, setValue] = useState(externalValue)
    const lastDispatchedValueRef = useRef(externalValue)

    useEffect(() => {
        if (externalValue === value) {
            lastDispatchedValueRef.current = externalValue
            return
        }

        const frame = requestAnimationFrame(() => {
            setValue(externalValue)
            lastDispatchedValueRef.current = externalValue
        })

        return () => cancelAnimationFrame(frame)
    }, [externalValue, value])

    useEffect(() => {
        if (disabled) {
            return
        }

        if (value === lastDispatchedValueRef.current) {
            return
        }

        const timer = setTimeout(() => {
            onChange(value)
            lastDispatchedValueRef.current = value
        }, DEBOUNCE_MS)

        return () => clearTimeout(timer)
    }, [value, onChange, disabled, DEBOUNCE_MS])

    return (
        <div className="toolbar-item">
            <input type="text" className="search-input" aria-label="Search profile"
                placeholder="Search profiles..."
                value={value}
                disabled={disabled}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )
}

export default SearchBar