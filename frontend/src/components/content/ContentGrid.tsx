import { useState } from 'react';
import type { Content } from '../../types'
import { ContentCard } from './ContentCard'
import { ConfirmDialog } from '../ui/ConfirmDialog'

interface ContentGridProps {
    contents: Content[]
    onDelete: (id: string) => void
}

export function ContentGrid({ contents, onDelete }: ContentGridProps) {

    const [pendingDelete, setPendingDelete] = useState<Content | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

    async function handleConfirmDelete() {
        if (!pendingDelete) return
        setIsDeleting(true)
        await onDelete(pendingDelete._id)
        setIsDeleting(false)
        setPendingDelete(null)
    }

    if (contents.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 py-16 text-center dark:border-neutral-700">
                <p className="text-slate-500 dark:text-neutral-400">
                    No content here yet. Click "Add content to save your first item"
                </p>
            </div>
        )
    }

    return (
        <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {contents.map((content) => (
                    <ContentCard key={content._id} content={content} onDelete={setPendingDelete} /> //this onDelete is the trash icon click functionality on content card
                ))}
            </div>

            <ConfirmDialog
                isOpen={pendingDelete !== null}
                title="Delete content"
                message={pendingDelete ? `Are you sure you want to delete "${pendingDelete.title}"? This can't be undone.` : ''}
                confirmLabel="Delete"
                isConfirming={isDeleting}
                onConfirm={handleConfirmDelete}
                onCancel={() => setPendingDelete(null)}
            />
        </>
    )
}