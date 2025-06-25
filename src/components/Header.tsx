'use client'

import { JSX, useContext, useEffect, useState } from "react"
import { AuthContext } from "@/context/AuthContext"
import Link from "next/link"

export const Header = () => {
    const authContext = useContext(AuthContext)
    const [navbar, setNavbar] = useState<JSX.Element>(<></>)

    useEffect(() => {
        const loggedIn = authContext.token && authContext.currentUser
        if (loggedIn) {
            setNavbar(
                <p>my plans, profile, etc</p>
            )
        } else {
            setNavbar(
                <nav>
                    <Link href="/login">Login</Link>
                    <Link href="/signup">Signup</Link>
                </nav>
            )
        }
    }, [authContext.token, authContext.currentUser])

    return (
        <div id="header">
            <h1>Planit!</h1>
            {navbar}
        </div>
    )
}