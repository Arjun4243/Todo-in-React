 import React, { useState,useEffect } from 'react';

function Nav({ setLoginShow,loginShow }) {


    const [usernav,setUsernav]=useState("sign-Up")
    const showLoginPage = () => {
        setLoginShow(prev => !prev)
    }


     useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (userName) {
      setUsernav(userName);
    } else {
      setUsernav("sign-Up");
    }
  }, [loginShow]);

  const logOut = ()=>{
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    setUsernav("sign-Up"); // Update the nav state immediately
    if (setLoginShow) {
      setLoginShow(false); // Hide login form if showing
    }
  }

    return (
        <nav className="d-flex justify-content-between container mx-auto">
    
            <h1>Kanban Board</h1>

            <div>
            <button type="button" className='btn btn-primary my-2 mx-2'  onClick={showLoginPage}>{usernav}</button>
            <button type="button" className="btn btn-primary my-2" onClick={logOut}>Log Out</button>

            </div>

        </nav>
    );
}

export default React.memo(Nav);