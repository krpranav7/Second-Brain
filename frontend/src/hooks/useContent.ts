import { useCallback, useEffect, useState } from "react"
import * as contentApi from '../api/content'
import type { Content, ContentType } from '../types'

export function useContent(){
    const [contents, setContents] = useState<Content[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    const fetchContents = useCallback(async () => {
        setIsLoading(true)
        setError('')
        try{
            const data = await contentApi.getContents()
            setContents(data)
        }
        catch(err: any){
            setError(err.response?.data?.message ?? 'Failed to load content')
        }
        finally{
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchContents()
    }, [fetchContents])

    async function removeContent(id: string){
        const previousContents = contents
        setContents((prev) => prev.filter((c) => c._id !== id))

        try{
            await contentApi.deleteContent(id)
        }
        catch(err: any){
            setContents(previousContents)
            setError(err.response?.data?.message ?? 'Failed to delete content')
        }
    }

    async function createContent(data: { title: string; link: string; type: ContentType; tags: string[] }){
        const newContent = await contentApi.addContent(data)
        setContents((prev) => [newContent, ...prev])
    }

    return { contents, isLoading, error, fetchContents, removeContent, createContent }
}