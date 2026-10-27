import { api } from './axios'

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
