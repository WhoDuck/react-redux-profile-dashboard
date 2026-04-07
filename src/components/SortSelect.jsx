function SortSelect({options, value, onChange, disabled = false }) {
    
    return (
        <div className="toolbar-item">
            <select value={value} aria-label="Sort profiles by"
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}>
                {options.map(o => 
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                )}
            </select>
        </div>
    )
}

export default SortSelect
