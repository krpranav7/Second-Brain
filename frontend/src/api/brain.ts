import { api } from './axios'
import type { Content } from '../types'

interface ShareBrainResponse {
    message: string
    hash: string
}

export async function getOrCreateShareLink(): Promise<string> {
    try {
        const response = await api.post<ShareBrainResponse>('/brain/share', {
            share: true
        })
        return response.data.hash
    } catch (err: any) {
        if (err.response?.status === 409 && err.response.data?.hash) {
            return err.response.data.hash
        }
        throw err
    }
}

export async function stopSharing(): Promise<void> {
    await api.post('/brain/share', { share: false })
}

export async function getSharedBrain(hash: string): Promise<Content[]> {
    const response = await api.get<{content: Content[]}>(`/brain/${hash}`)
    return response.data.content
}