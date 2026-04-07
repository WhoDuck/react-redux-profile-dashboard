import React from "react"
import ProfileCard from "./ProfileCard"

function ProfileList({ profiles, onFollow, onLike, onRemove, isFiltered }) {
    if (profiles.length === 0 && !isFiltered) {
        return <p>No profiles found. Please add some profiles.</p>
    } 
    else if (profiles.length === 0) {
        return <p>No results found.</p>
    }

    return (
        <div className="list">
            {
                profiles.map(profile => (
                    <ProfileCard
                    key={profile.id}
                    id={profile.id}
                    name={profile.name}
                    followers={profile.followers}
                    role={profile.role}
                    liked={profile.liked}
                    avatarSrc={profile.avatarSrc}
                    onFollow={onFollow}
                    onLike={onLike}
                    onRemove={onRemove}
                    />
                ))
            }
        </div>
    )
}

export default React.memo(ProfileList)