import React from "react"

function ProfileCard({id, name, role, followers, liked, avatarSrc, onFollow, onLike, onRemove}) {
    return (
        <div className="card">
            <img src={avatarSrc} alt={`${name}'s avatar`} />

            <h3>{name}</h3>
            <p>{role}</p>

            <p>Followers: {followers}</p>

            <div className="actions">
                <button onClick={() => onFollow(id)}>
                    Follow
                </button>

                <button onClick={() => onLike(id)}>
                    {liked ? "Unlike" : "Like"}
                </button>

                <button onClick={() => onRemove(id)}>
                    Remove
                </button>
            </div>
        </div>
    )
}

export default React.memo(ProfileCard)