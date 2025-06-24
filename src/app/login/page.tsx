'use client'

import { useContext, useState } from "react"
import { getUserByEmail, User} from "@/types/User"
import { AuthContext } from "@/context/AuthContext"
import Link from "next/link"

export default function Page () {
    const authContext = useContext(AuthContext)
    const [error, setError] = useState("")
    const [loginForm, setLoginForm] = useState<User> ( {
        id: '',
        name: '',
        email: '',
        password: '' 
    })

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = event.target
        setLoginForm(currState => ({
            ...currState,
            [name]: value, 
        }))
    }

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event?.preventDefault()
        try {
            const existingUser = await getUserByEmail(loginForm.email)
            if (existingUser !== null) {
                if (existingUser?.password === loginForm?.password) {
                    authContext.login(crypto.randomUUID(), existingUser)
                } else {
                    setError("Invalid password.")
                }
            } else {
                setError("Invalid email.")
            }
        } catch (err) {
            console.error(err)
        }

    }

    return (
        <div id="login-page">
            <h1>Log in</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="billie@example.com"
                    id="email"
                    name="email"
                    value={loginForm.email}
                    onChange={handleChange}
                    required>
                </input>
                <input
                    type="password"
                    placeholder="*********"
                    minLength={8}
                    id="password"
                    name="password"
                    value={loginForm.password}
                    onChange={handleChange}
                    required>
                </input>
                <button type="submit">Login</button>
            </form>
            <p>{error}</p>
            <p>Don't have an account? <Link href="/signup">Sign up!</Link></p>
        </div>
    )
}