import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Profile from './Profile.jsx'
import Settings from './Settings.jsx'
import Chat from './Chat.jsx'
import Feed from './Feed.jsx'
import Login from "./Login.jsx";
import AuthCheck from "./AuthCheck.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/profile",
        element: <Profile />,
    },
    {
        path: "/settings",
        element: <Settings />,
    },
    {
        path: "/chat",
        element: <Chat />,
    },
    {
        path: "/feed",
        element: <Feed />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/auth",
        element: <AuthCheck />,
    }

]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
