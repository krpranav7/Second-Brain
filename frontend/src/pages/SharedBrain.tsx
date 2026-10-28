import { Brain } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ContentGrid } from "../components/content/ContentGrid";
import { ThemeToggle } from "../components/ui/ThemeToggle";
import { Loader } from "../components/ui/Loader";
import { getSharedBrain } from "../api/brain";
import type { Content } from '../types'

export function SharedBrain(){
    const {shareLink} = useParams<{shareLink: string}>()
    const [contents, setContents] = useState<Content[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        if(!shareLink) return
        getSharedBrain(shareLink)
            .then(setContents)
            .catch(() => setError('This link is invalid or no longer active.'))
            .finally(() => setIsLoading(false))
    }, [shareLink])

    if(isLoading) return <Loader message="Loading shared content..." />

    return (
        <div className="min-h-dvh bg-slate-50 dark:bg-neutral-950">
            <header className="flex items-center justify-between border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/70 md:px-6">
                <Link to="/" className="flex items-center gap-2">
                    <Brain className="text-indigo-600 dark:text-indigo-400" size={26} />
                    <span className="text-lg font-bold text-slate-900 dark:text-white">Second Brain</span>
                </Link>
                <ThemeToggle />
            </header>

            <main className="p-4 md:p-6">
                <h1 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">Shared Notes</h1>
                {error && (
                    <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">{error}</p>
                )}

                {!error && <ContentGrid contents={contents}/>}
            </main>
        </div>
    )
}