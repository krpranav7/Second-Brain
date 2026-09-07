import { useEffect, type ReactNode } from "react"
import { X } from 'lucide-react'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    children: ReactNode
}

export function Modal({ isOpen, onClose, title, children }: ModalProps){
    useEffect(() => {
        function handleEscape(e: KeyboardEvent){
            if(e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', handleEscape)

        return () => document.removeEventListener('keydown', handleEscape)
    }, [onClose])

    if(!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/75 backdrop-blur-xs" onClick={onClose} aria-hidden="true"></div>

            <div className="relative w-full max-w-md rounded-xl border border-slate-200 bg-white/95 p-6 shadow-2xl backdrop-blur-lg dark:border-neutral-800 dark:bg-neutral-900/80">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h2>
                    <button onClick={onClose} aria-label="close"
                        className="rounded-lg p-1 text-red-500 bg-slate-200 hover:bg-slate-300 dark:hover:bg-neutral-700 hover:text-red-600 dark:bg-neutral-800 cursor-pointer"
                    >
                        <X size={18} />
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}