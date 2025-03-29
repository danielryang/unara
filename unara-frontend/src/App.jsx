import './App.css'
import React, {useEffect, useState } from 'react'
import Profile from "./Profile.jsx";
import Settings from "./Settings.jsx";
import Chat from "./Chat.jsx";
import Feed from "./Feed.jsx";
import Tasks from "./Tasks.jsx";
import Login from "./Login.jsx";
import APIService from "./APIService.js";


function App() {

    const [tasks, setTasks] = useState([])
    const [taskDisplay, showTask] = useState({title: "", id: ""})
    const [screen, setScreen] = useState("tasks")
    const [userId, setUserId] = useState(0)
    const [errorLogin, setErrorLogin] = useState(false)

    // useEffect(() => {
    //     // Check if the user is already authenticated (e.g., check localStorage, sessionStorage, or a global state)
    //     const isAuthenticated = localStorage.getItem('isAuthenticated'); // Replace with your actual check
    //
    //     if (!isAuthenticated) {
    //         // If not authenticated, redirect to the backend for authorization
    //         window.location.href = `${import.meta.env.VITE_URL}`;
    //         localStorage.setItem('isAuthenticated', 'true');
    //     }
    // }, []); // The empty dependency array ensures this effect runs only once when the component mounts.
    //

    const handleLogin = (id) => {
        setUserId(id);
    };

    const createAccount = async (username) => {
        try {
            // Make the API call
            const data = await APIService.createAccount(username);

            if (data && data.id) {
                setUserId(data.id);  // Set the user ID if it exists
            } else {
            }
        } catch (error) {
        }
    };




    useEffect(() => {
        APIService.loadTasks(userId, setTasks)
    }, [userId]);


    const addTask = () => {

        const newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
        const newTask = {
            title: "tasks" + newId,
            description: "test description!",
        };
        APIService.addTask(userId, newTask,tasks, setTasks)

    };

    const removeTask = (id) => {
        APIService.deleteTask(id, setTasks, tasks)
    }

  return (
    <>
    <div className="flex">
        <div className={"object-center text-center bg-gray-200 h-screen pt-8 p-2 w-10"}>
            <div className={"flex flex-col space-y-10"}>
                {/*<Link to = "profile">P</Link>*/}
                <button onClick={() => setScreen("login")}>L</button>
                <button onClick={() => setScreen("tasks")}>T</button>
                <button onClick={() => setScreen("profile")}>P</button>
                <button onClick={() => setScreen("settings")}>S</button>
                <button onClick={() => setScreen("chat")}>C</button>
                <button onClick={() => setScreen("feed")}>F</button>
            </div>
        </div>
        <div className={"bg-gray-50 h-screen p-5 pt-8 w-50"}>
            <h1 className={"text_black"}>Logged in as: {userId}</h1>
            <h1 className={"text_black"}>Tasks:</h1>
            <table>
                <tbody>
                {
                    tasks.map((task) => (
                        <tr key={task.id}>
                            <td>
                                <button
                                    className="p-2"
                                    onClick={() => {
                                        removeTask(task.id);
                                        if (task.id === taskDisplay.id) {
                                            showTask({title: "", id: ""});
                                        }
                                    }}
                                >o
                                </button>
                                <button
                                    onClick={() => {
                                        showTask({title: task.title, id: task.id, description: task.description});
                                        setScreen("tasks")
                                    }}>
                                    {task.title}</button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            <button onClick={ () => {
                if (userId !== 0) {
                    setErrorLogin(false)
                    addTask();
                }
                else {
                    setErrorLogin(true)
                }
                }} className={""}>add task</button>
            {errorLogin && <p>please login to add task</p>}
        </div>
        {/*Main Content Components:*/}
        <div>
            {(() => {
                if(screen === "login") {
                    return <Login handleLogin={handleLogin} createAccount={createAccount}></Login>
                }
                if (screen === "tasks") {
                    return <Tasks taskDisplay={taskDisplay} tasks={tasks} setTasks={setTasks}/>
                }
                if (screen === "profile") {
                    return <Profile />;
                }
                if (screen === "settings") {
                    return <Settings />;
                }
                if (screen === "chat") {
                    return <Chat />;
                }
                if (screen === "feed") {
                    return <Feed />;
                }
            })()}
        </div>
    </div>
</>
)
}

export default App