import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from "axios";
import {withRouter} from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import img from "../../../static/images/JC.png"



const NavigationContainer = (props) => {
    const dynamicLink = (route, linkText) => {
        
        return (
        <div className='nav-link-wrapper'>
            <NavLink to={route} activeClassName="nav-link-active">
                {linkText}
            </NavLink>
            </div>
        )
    }

    const handleSignOut = () => {
        axios.delete("https://api.devcamp.space/logout", {withCredentials: true}).then(response => {
            if (response.status === 200) {
                props.history.push("/");
                props.handleSuccessfulLogout();
            }
            return response.data
        }).catch(error => {
            console.log("error logging out", error)
        })

    }
    
    
    return (
        <div className = "nav-wrapper">
            <div className = "left-side">
            
            <div className='nav-link-wrapper'>
            <FontAwesomeIcon className="icon" icon="home" />
            <NavLink exact to="/" activeClassName="nav-link-active">
                    Home
                    
            </NavLink>
            </div>

            <div className='nav-link-wrapper'>
            <FontAwesomeIcon className="icon" icon="user-astronaut" />
            <NavLink to="/about-me" activeClassName="nav-link-active">
                About
            </NavLink>
            </div>


            <div className='nav-link-wrapper'>
            <FontAwesomeIcon className="icon" icon="phone" />
            <NavLink to="/contact" activeClassName="nav-link-active">
                Contact
            </NavLink>
            </div>

            <div className='nav-link-wrapper'>
            <FontAwesomeIcon className="icon" icon="scroll" />
            <NavLink to="/blog" activeClassName="nav-link-active">
                Blog
            </NavLink>
            </div>

           {props.loggedInStatus === "LOGGED_IN" ? dynamicLink("/portfolio-manager", "Portfolio Manager") : null}
            
            </div>

            <div className = "center-img">
                <img src ={img} />
            </div>

            <div className="right-side">
            Jeremy Crundwell
            {props.loggedInStatus === "LOGGED_IN" ? < a onClick={handleSignOut}>
                <FontAwesomeIcon icon="sign-out-alt" />
            </a> : null}
            </div>
        </div>
        )
    }

    export default withRouter(NavigationContainer);
