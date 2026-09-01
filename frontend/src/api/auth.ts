import { api } from "./axios";

interface AuthResponse{
    message: string
    user: {
        _id: string
        username: string
    }
}

export async function signup(username: string, password: string): Promise<AuthResponse>{
    const response = await api.post<AuthResponse>('/signup', {username, password})

    return response.data
}

export async function login(username: string, password: string): Promise<AuthResponse>{
    const response = await api.post<AuthResponse>('/signin', {username, password})

    return response.data
}

export async function logout(): Promise<void> {
    await api.post('/logout')
}