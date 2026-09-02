import { api } from "./axios";
import type { Content } from '../types'

interface GetContentsResponse{
    message: string
    contents?: Content[]
    content?: Content[]
}

interface AddContentPayload{
    title: string
    link: string
    type: string
    tags: string[]
}

export async function getContents(): Promise<Content[]> {
    const response = await api.get<GetContentsResponse>('/content')
    return response.data.contents ?? response.data.content ?? []
}

export async function addContent(payload: AddContentPayload): Promise<Content>{
    const response = await api.post<{message: string; content: Content}>('/content', payload)
    return response.data.content
}

export async function deleteContent(contentId: string): Promise<void>{
    await api.delete('/content', {data: {contentId}})
}