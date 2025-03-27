import {useState} from "react";

const Login = ({ handleLogin, createAccount, setErrorLogin }) => {
    const [input,setInput] = useState("")
    const [username, setUsername] = useState("")
    const[id,setId] = useState(0)
    const[tasks, setTasks] = useState([])

    return (
        <div>
            <h1>Login</h1>
                <p>Login to your account</p>
            <input type="text" placeholder="enter your id" onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => {if(event.key === "Enter"){handleLogin(parseInt(input)); }}}/>
            {/*when press enter, fetch the id from database.*/}
            <div>
                <div>
                    <h1>Create Account</h1>
                    <p>Create your account</p>
                    <input type="text" placeholder="enter your username" onChange={(event) => setUsername(event.target.value)} onKeyDown={(event) => {if(event.key === "Enter"){createAccount(username); }}}/>
                    {/*when press enter, fetch the id from database.*/}
                </div>
            </div>
        </div>

    )
}
export default Login