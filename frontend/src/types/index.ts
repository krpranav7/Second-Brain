export type ContentType = 'image' | 'video' | 'article' | 'audio' | 'tweet'

export interface Tag{
    _id: string
    title: string
}

export interface Content{
    _id: string
    title: string
    link: string
    type: ContentType
    tags: Tag[]
    userId: string
    createdAt?: string
}