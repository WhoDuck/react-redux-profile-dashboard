function Pagination({ page, total, onChange, disabled = false }) {
    const pages = total

    return (
        <div className="pagination">
            <button
                disabled={disabled || page <= 1}
                onClick={() => onChange(page - 1)}>
                Previous
            </button>
            {[...Array(pages)].map((_, i) => (
                <button
                    key={i}
                    className={page === i + 1 ? "active" : ""}
                    disabled={disabled}
                    onClick={() => onChange(i + 1)}>
                    {i + 1}
                </button>
            ))}
            <button
                disabled={disabled || page === pages || pages === 0}
                onClick={() => onChange(page + 1)}>
                Next
            </button>
        </div>
    )
}

export default Pagination