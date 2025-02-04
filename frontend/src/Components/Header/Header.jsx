import React from 'react'
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className='h-[10vh] flex items-center px-[12vh] py-14  justify-between font-noice text-[2.8vh]'>
<div className="logo-div ">
    <img className='h-[18vh]'  src="public\Images\Logo\Screenshot_2025-02-02_215902-removebg-preview.png" alt="" />
</div>

<div className="dets text-white  p-3 px-10 rounded-full border border-[#4E7D7F]   flex gap-20 ">
      <Link to=" ">HOME</Link>
      <Link to="/login">LOGIN</Link>
      <Link to="/register">REGISTER</Link>
</div>

<div className="profile text-white  p-3 px-7 rounded-full border border-[#4E7D7F]   flex">
<Link to="/profile">PROFILE</Link>

</div>

    </div>
  )
}

export default Header