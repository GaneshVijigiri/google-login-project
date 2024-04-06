import React from 'react'

const Profile = ({ user }: { user: any }) => {
  return (
    <div>
      <h2>User Details</h2>
          <p>Name: {user.name}</p>
          <p>Mail: {user.email}</p>
          <img src={user.picture} />
    </div>
  )
}

export default Profile
