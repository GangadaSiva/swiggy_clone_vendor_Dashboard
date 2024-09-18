import React from 'react'

const NavBar = ({showLoginHandler, showRegisterHandler, showLogout, logoutHandler})=>{
    const firmName = localStorage.getItem('vendorFirmName');
    return(
        <div className="navSection">
            <div className="company">
                Swiggy
            </div>
            <div>
                <h4>{firmName}</h4>
            </div>
            <div className="userAuth">
                {!showLogout ? 
                <>
                    <span onClick = {showLoginHandler}> Login /</span>
                    <span onClick={showRegisterHandler}>Register</span>
                </>
                :
                <span onClick={logoutHandler}>Logout</span>
            }
                
                
            </div>
        </div>
    )
}

export default NavBar
