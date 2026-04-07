import { useState } from "react"
import avatar from "../assets/avatar.png"

function AddProfileForm({ onAdd, disabled = false }) {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault()

        if (disabled) {
            return
        }

        if(!name.trim() || !role.trim()) {
            setError("Please fill in all fields.")
            return;
        }

        onAdd({
            id: crypto.randomUUID(),
            name: name.trim(),
            role: role.trim(),
            followers: 0,
            liked: false,
            avatarSrc: avatar
        })

        setName("");
        setRole("");
        setError("");
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <input
            aria-label="Profile name"
            placeholder="Name"
            value={name}
            disabled={disabled}
            onChange={(e) => setName(e.target.value)}
            />
            <input
            aria-label="Profile role"
            placeholder="Role"
            value={role}
            disabled={disabled}
            onChange={(e) => setRole(e.target.value)}
            />
            <button type="submit" disabled={disabled}>Add Profile</button>
            <div className="error-container">
                {error && <p className="error">{error}</p>}
            </div>
        </form>
    )
}

export default AddProfileForm