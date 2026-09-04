import { useState } from "react"
import { AppLayout } from "../components/layout/AppLayout"
import { ContentGrid } from "../components/content/ContentGrid"
import { useContent } from "../hooks/useContent"
import { AddContentModal } from '../components/content/AddContentModal'

export function Dashboard() {
    const [activeId, setActiveId] = useState('all')
    const { contents, isLoading, error, removeContent, createContent } = useContent()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const filteredContents = activeId === 'all' ? contents : contents.filter((c) => c.type === activeId)

    const activeLabel = activeId === 'all' ? 'All Notes' : activeId[0].toUpperCase() + activeId.slice(1) + 's'

    return (
        <AppLayout activeId={activeId} onSelect={setActiveId}
            onShareClick={() => alert('Share Brain modal - coming soon')}
            onAddClick={() => setIsModalOpen(true)}
        >
            <h1 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">{activeLabel}</h1>

            {isLoading && (
                <p className="text-slate-500 dark:text-slate-400">Loading your content...</p>
            )}

            {error && !isLoading && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">{error}</p>
            )}

            {!isLoading && !error && (
                <ContentGrid contents={filteredContents} onDelete={removeContent} />
            )}

            <AddContentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={createContent}/>
        </AppLayout>
    )
}