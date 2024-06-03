import React, { useEffect, useState } from 'react'
import ProfileCustomer from '@/components/Profile/ProfileCustomer';
import ProfileSeller from '@/components/Profile/ProfileSeller';
import AuthenticatedNavbar from '@/components/Navbar/AuthenticatedNavbar';


const Profile = () => {
const [role,setRole] = useState (null);

useEffect(() => {
  const storedRole = localStorage.getItem('role');
  setRole(storedRole);
}, []);



return (
    <div>
      <AuthenticatedNavbar/>
      {role === 'customer' && <ProfileCustomer />}
      {role === 'seller' && <ProfileSeller />}
      {!role && <div>Loading.....</div>} {/* Tampilkan loading jika role belum ditentukan */}

    </div>
  )
}

export default Profile