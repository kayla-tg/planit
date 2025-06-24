export interface User {
    id: string, 
    name: string, 
    email: string, 
    password: string
}

const getUsers = async () => {
    const url = `http://localhost:8000/users`
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error("Network request failed")
    }
    return await response.json() as User[]  
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
    const users = await getUsers()
    users.forEach((user: User) => {
        if ((user.email === email)) {
            return user
        }
    })
    return null
}