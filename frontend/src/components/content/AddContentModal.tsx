import { useState, type SubmitEvent } from "react"
import { Modal } from '../ui/Modal'
import type { ContentType } from '../../types'

interface AddContentModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: { title: string; link: string; type: ContentType; tags: string[] }) => Promise<void>
}

const typeOptions: ContentType[] = ['tweet', 'video', 'image', 'article', 'audio']

export function AddContentModal({isOpen, onClose, onSubmit}: AddContentModalProps){
    const [title, setTitle] = useState('')
    const [link, setLink] = useState('')
    const [type, setType] = useState<ContentType>('video')
    const [tagsInput, setTagsInput] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')

    function resetForm(){
        setTitle('')
        setLink('')
        setType('video')
        setTagsInput('')
        setError('')
    }

    function handleClose(){
        resetForm()
        onClose()
    }

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>){
        e.preventDefault()
        setError('')
        setIsSubmitting(true)

        const tags = tagsInput.split(',').map((t) => t.trim()).filter((t) => t.length > 0)

        try {
            await onSubmit({title, link, type, tags})
            handleClose()
        } catch (err: any) {
            setError(err.response?.data?.message ?? 'Failed to add content')
        }
        finally{
            setIsSubmitting(false)
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Add Content">
            {error && (
                <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">{error}</p>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label htmlFor="title" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Title</label>
                    <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                </div>

                <div>
                    <label htmlFor="link" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Link</label>
                    <input id="link" type="url" value={link} onChange={(e) => setLink(e.target.value)} required placeholder="https://..." className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                </div>

                <div>
                    <label htmlFor="type" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Type
                    </label>
                    <select id="title" value={type} onChange={(e) => setType(e.target.value as ContentType)} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
                        {typeOptions.map((t) => (
                            <option key={t} value={t}>
                                {t[0].toUpperCase() + t.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="tags" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Tags <span className="font-normal text-slate-400">(comma separated)</span>
                    </label>
                    <input id="tags" type="text" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} required className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                        <button type="button" onClick={handleClose} className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 dark:bg-slate-100 dark:text-slate-800 dark:hover:bg-slate-300 cursor-pointer">Cancel</button>

                        <button type="submit" disabled={isSubmitting} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer">
                            {isSubmitting ? 'Adding...' : 'Add Content'}
                        </button>
                </div>
            </form>
        </Modal>
    )
}