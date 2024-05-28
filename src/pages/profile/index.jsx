import React from 'react'
import ProfileCustomer from '@/components/Profile/ProfileCustomer';
import AuthenticatedNavbar from '@/components/Navbar/AuthenticatedNavbar';


const Profile = () => {
  return (
    <div>
      <AuthenticatedNavbar/>
      <ProfileCustomer/>
    </div>
  )
}

export default Profile