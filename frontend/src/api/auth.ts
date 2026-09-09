import { api } from "./axios";

interface AuthResponse{
    message: string
    user: {
        _id: string
        username: string
        email: string
    }
}

export async function signup(username: string, email: string, password: string): Promise<AuthResponse>{
    const response = await api.post<AuthResponse>('/signup', {username, email, password})

    return response.data
}

export async function login(email: string, password: string): Promise<AuthResponse>{
    const response = await api.post<AuthResponse>('/signin', {email, password})

    return response.data
}

export async function logout(): Promise<void> {
    await api.post('/logout')
}

export async function getCurrentUser(): Promise<AuthResponse['user']>{
    const response = await api.get<{user: AuthResponse['user']}>('/me')
    return response.data.user
}

export async function updateProfile(username: string, email: string): Promise<AuthResponse>{
    const response = await api.patch<AuthResponse>('/me', {username, email})

    return response.data
}

export async function changePassword(currentPassword: string, newPassword: string): Promise<AuthResponse>{
    const response = await api.patch<AuthResponse>('/me/password', {currentPassword, newPassword})

    return response.data
}