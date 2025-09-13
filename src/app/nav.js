 import React, { useState,useEffect } from 'react';

function Nav({ setShowLogin }) {


    const [usernav,setUsernav]=useState("sign-Up")
    const showLoginPage = () => {
        setShowLogin(prev => !prev)
    }


     useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (userName) {
      setUsernav(userName);
    }
  }, []);

    return (
        <nav className="d-flex justify-content-between container mx-auto">
    
            <h1>Kanban Board</h1>

            <button type="button" className='btn btn-primary my-2' onClick={showLoginPage}>{usernav}</button>

        </nav>
    );
}

export default React.memo(Nav);