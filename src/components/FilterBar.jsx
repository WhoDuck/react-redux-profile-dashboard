function FilterBar({roles, value, onChange, disabled = false}) {
    return (
        <div className="toolbar-item">
            <select value={value} aria-label="Filter role"
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
            >
                {roles.map(r => (
                    <option key={r.value} value={r.value}>
                        {r.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default FilterBar