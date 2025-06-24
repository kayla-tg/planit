'use client'

import { JSX, useContext, useEffect, useState } from "react"
import { AuthContext } from "@/context/AuthContext"

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
                <p>login and signup</p>
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