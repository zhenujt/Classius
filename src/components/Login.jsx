import { useLayoutEffect, useState  } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom'

function Login() {

    const [errorMessage, setErrorMessage] = useState("")
    const history = useHistory()

    async function handleLogin(e) {
        e.preventDefault()

        const form = e.target;
        const user = {
            username: form[0].value,
            password: form[1].value
        }

        const res = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
        const data = await res.json()
        localStorage.setItem("token", data.token)
        setErrorMessage(data.message)
        await history.push("/")
    }

    useLayoutEffect(() => {
        fetch("/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(data => data.isLoggedIn ? history.push("/"): null)
    }, [])

    return (
        <div className="text-white flex flex-col h-screen w-screen items-center justify-center">
            <div className="p-5 text-3xl font-extrabold">Login</div>
            <form className="mx-5 flex flex-col w-72" onSubmit={(e) => handleLogin(e)}>
                <label htmlFor="username">Username</label>
                <input className="text-black m-3 border-2 border-green-400 p-1" type="text" required name="username" id="username" />
                <label htmlFor="password">Password</label>
                <input className="text-black m-3 border-2 border-green-400 p-1" type="password" required name="password" id="password" />
                <input className="m-1 px-2 py-1 rounded font-bold text-xl bg-green-400 text-gray-900" type="submit" value="Login"/>
                <Link className="text-center m-1 px-2 py-1 rounded font-bold text-xl border-2 border-green-400 text-green-400" to="/register">Register</Link>
            </form>
            {errorMessage === "Success" ? <Redirect to="/"/>: <div>{errorMessage}</div>}
        </div>
    )
}

export default Login;