import { useNavigate } from "react-router-dom";
import { logOut } from "../authProvider";

function Admin() {
    const navigateHome = useNavigate();

    const handleOnClickToGetJwt = () => {
        console.log(localStorage.getItem('authToken'));
    }

    const handleLogOut = () => {
        logOut(navigateHome);
        window.location.reload();
    }

    return (
        <>
            <div>
                <h1>Admin</h1>
                <button onClick={handleOnClickToGetJwt}>Get JWT token</button>
            </div>
            <div>
                <button onClick={handleLogOut}>Logg ut</button>
            </div>
        </>
    )
}

export default Admin