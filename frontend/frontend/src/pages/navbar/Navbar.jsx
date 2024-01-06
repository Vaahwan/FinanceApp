import React from "react";
import './navbar.css'
import logo from '../../assets/logo.jpg'
import homeIcom from '../../assets/home-icon.svg'
import moneyIcon from '../../assets/money-icon.svg'
import personIcon from '../../assets/person-icon.svg'
import {useNavigate,NavLink} from 'react-router-dom'
import { Button, ButtonGroup } from '@chakra-ui/react'

const Navbar = ()=>{
    const navigate = useNavigate();

    const handleSignout = ()=>{
        localStorage.removeItem('jwtToken');
        navigate('/')
    }

    return(
        <div className="nav">
            <a href="" className="logo">
                <img src={logo} alt="logo" />
            </a>
            <div className="navmenu">
                <NavLink to="/" className="home">
                    <span className="span">HOME</span>
                </NavLink>
                <NavLink to="/expense" className="home">
                    <span className="span">EXPENSE</span>
                </NavLink>
                <NavLink to="/group" className="home">
                    <span className="span">GROUP</span>
                </NavLink>
                <NavLink to="/netwealth" className="home">
                    <span className="span">NET WEALTH</span>
                </NavLink>
            </div>
            {localStorage.getItem('jwtToken')==null?
                <Button background='var(--primary-color)' color='var(--secondary-color)' border='1px' borderColor='var(--secondary-color)'
                _hover={{
                    background: "white",
                    color: "var(--primary-color)",
                    border: '1px',
                    borderColor: 'var(--primary-color)'
                }} 
                onClick={()=>{navigate('/login')}}
                >Login</Button>
                :
                <div className="signout">
                    <img className="userImage" src={personIcon} alt="user image" />
                    <div className="dropdown">
                        <span onClick={handleSignout}>Sign out</span>
                    </div>
                </div>
            }
        </div>
    )
}

export default Navbar;