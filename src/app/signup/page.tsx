'use client'

import { useState } from "react"
import Link from "next/link"
import { getUserByEmail, fetchCreateUser } from "@/lib/users"
import { User } from "@/types/user"

export default function Page() {
    const [error, setError] = useState("")
    const [signupForm, setSignupForm] = useState<User> ( {
        id: '',
        name: '',
        email: '',
        password: '' 
    })

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = event.target
        setSignupForm(currState => ({
            ...currState,
            [name]: value, 
        }))
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        if (await getUserByEmail(signupForm.email) !== null) {
            await fetchCreateUser(signupForm)
        } else {
            setError(`A user with that email already exists.`)
        }
    }

    return (
        <div id="signup-page">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    id="name"
                    name="name"
                    value={signupForm.name}
                    onChange={handleChange}
                    required>
                </input>
                <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    name="email"
                    value={signupForm.email}
                    onChange={handleChange}
                    required>
                </input>
                <input
                    type="password"
                    placeholder="*********"
                    minLength={8}
                    id="password"
                    name="password"
                    value={signupForm.password}
                    onChange={handleChange}
                    required>
                </input>
                <button type="submit">Sign up!</button>
            </form>
            <p>{error}</p>
            <p>Already have an account? <Link href="/login">Log in.</Link></p>
        </div>
    )
}