import { useEffect, useState } from "react";

const AuthCheck = () => {
    useEffect(() => {
        window.location.href = `${import.meta.env.VITE_BACKEND_URL}`
    }, []); // Redirect to the backend for authorization
    return (<div>loading!</div>)
}

export default AuthCheck;
