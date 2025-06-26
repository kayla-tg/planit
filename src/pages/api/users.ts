import { NextApiRequest, NextApiResponse } from "next"
import { User } from "@/types/user"

let users: User[] = [
    {id: "1", name: "Test", email: "test@test.com", password: "testpassword"},
    {id: "2", name: "Test2", email: "test2@test2.com", password: "testpassword"}
]

const getUsers = (): User[] => {
    return users
}

const getUserByEmail = (email: string): User | undefined => {
    return users.find(user => user.email == email ? user : undefined)
}

const createUser = (newUser: User): User => {
    users.push(newUser)
    return newUser
}

const updateUser = (id: string, updatedUser: User): User => {
    users = users.map(user => user.id === id ? updatedUser : user)
    return updatedUser
}

const deleteUser = (id: string): void => {
   users = users.filter(user => user.id === id)
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const {email} = req.query
    if (email && typeof email === "string") {
        const user = getUserByEmail(email)
        if (!user) return res.status(404).json({error: "User not found"})
        return res.status(200).json(user)
    }
    const users = getUsers()
    res.status(200).json(users)
  } else if (req.method === 'POST') {
    const newUser = createUser(req.body)
    res.status(201).json(newUser)
  } else if (req.method === 'PUT') {
    const updatedUser = updateUser(req.body.id, req.body)
    res.status(200).json(updatedUser)
  } else if (req.method === 'DELETE') {
    deleteUser(req.body.id)
    res.status(204).end()
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
