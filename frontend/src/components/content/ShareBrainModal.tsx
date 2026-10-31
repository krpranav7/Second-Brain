import { Check, Copy } from 'lucide-react';
import {useEffect, useState} from 'react'
import { Modal } from '../ui/Modal';
import { getOrCreateShareLink, stopSharing } from '../../api/brain';

interface ShareBrainModalProps{
    isOpen: boolean
    onClose: () => void
}

export function ShareBrainModal({isOpen, onClose}: ShareBrainModalProps){
    const [hash, setHash] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isStopping, setIsStopping] = useState(false)
    const [error, setError] = useState('')
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        if(!isOpen) return

        setError('')
        setCopied(false)
        setIsLoading(true)
        getOrCreateShareLink()
            .then(setHash)
            .catch(() => setError('Failed to generate share link'))
            .finally(() => setIsLoading(false))
    }, [isOpen])

    const shareUrl = hash ? `${window.location.origin}/brain/${hash}`: ''

    async function handleCopy(){
        await navigator.clipboard.writeText(shareUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    async function handleStopSharing(){
        setIsStopping(true)
        try{
            await stopSharing()
            setHash('')
            onClose()      
        }
        catch{
            setError('Failed to stop sharing')
        }
        finally{
            setIsStopping(false)
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title='Share your second brain'>
            <p className='mb-4 text-sm text-slate-600 dark:text-neutral-400'>
                Anyone with this link can view your saved content - no login required.
            </p>

            {error && (
                <p className='mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400'>{error}</p>
            )}

            {isLoading ? (
                <p className='text-sm text-slate-500 dark:text-neutral-400'>Generating link...</p>
            ) : (
                <>
                    <div className='mb-4 flex items-center gap-2'>
                        <input type="text" readOnly value={shareUrl}
                        className='w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white'
                        />
                        <button onClick={handleCopy} aria-label='Copy link' className='cursor-pointer shrink-0 rounded-lg bg-indigo-600 p-2 text-white hover:bg-indigo-800 hover:scale-105'>
                            {copied ? <Check size={18} /> : <Copy size={18}/>}
                        </button>
                    </div>

                    <button onClick={handleStopSharing} disabled={isStopping} 
                        className='cursor-pointer text-sm font-medium text-red-600 hover:scale-105 disabled: opacity-60 dark:text-red-400'
                    >
                        {isStopping ? 'Stopping' : 'Stop sharing'}
                    </button>
                </>
            )}
        </Modal>
    )
}