import React from 'react'
import UserActiveBorrowings from './UserActiveBorrowings'

function UserHome({user}) {
  return (
    <>
    <UserActiveBorrowings user={user}/>
    </>
    
  )
}

export default UserHome