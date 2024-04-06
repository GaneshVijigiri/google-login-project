import React from 'react'

const Profile = ({ user }: { user: any }) => {
  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      {/* Render other user information as needed */}
    </div>
  )
}

export default Profile
