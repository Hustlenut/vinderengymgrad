function Admin() {

    const handleOnClickToGetJwt = () => {
        console.log(localStorage.getItem('authToken'));
    }

    return (
        <>
            <div>
                <h1>Admin</h1>
                <button onClick={handleOnClickToGetJwt}>Get JWT token</button>
            </div>
        </>
    )
}

export default Admin