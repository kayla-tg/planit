import { User } from "@/types/user"

export const fetchUsers = async (): Promise<User[]> => {
    const url=`api/users`
    const response = await fetch(url, {
        method: "GET"
    })
    if (!response.ok) {
        throw new Error("Network request failed")
    }
    return await response.json() as User[]
}

export const fetchCreateUser = async (newUser: User): Promise<User> => {
    const url = `/api/users`
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
    if (!response.ok) {
        throw new Error("Network request failed")
    }
    return await response.json() as User
}

export const fetchUpdateUser = async (id: string, existingUser: User): Promise<User> => {
    const url = `/api/users?id=${id}`
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(existingUser)
    })
    if (!response.ok) {
        throw new Error("Network request failed")
    }
    return await response.json() as User
}

export const fetchDeleteUser = async (id: string): Promise<User> => {
    const url = `/api/users?id=${id}`
    const response = await fetch(url, {
        method: "DELETE"
    })
    if (!response.ok) {
        throw new Error("Network request failed")
    }
    return await response.json() as User
}



export const fetchUserByEmail = async (email: string): Promise<User | undefined> => {
    const url = `/api/users?email=${email}`
    const response = await fetch(url, {
        method: "GET"
    })
    if (!response.ok) {
        return
    }
    return await response.json() as User
}