import React from 'react'
import './logoutButton.css'
import { ReactComponent as LogoutIcon } from '../../icons/logout.svg';
import { logoutFetch } from '../../service/user';
import { useNavigate } from 'react-router-dom';
const LogoutButton = () => {
    const navigate = useNavigate()
  return (

       <div className='logoutButton' onClick={(e)=> {logoutFetch(navigate)} }>
            <LogoutIcon width="24px" height="24px" stroke="#ff000088"></LogoutIcon>
       </div>

  )
}

export default LogoutButton