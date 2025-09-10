
function Nav({ setShowLogin }) {

    const showLoginPage = () => {
        setShowLogin(prev => !prev)
    }

    return (
        <nav className="d-flex justify-content-between container mx-auto">
            <h1>Kanban Boarde</h1>

            <button type="button" className='btn btn-primary my-2' onClick={showLoginPage}>Sign-Up</button>

        </nav>
    );
}

export default Nav;