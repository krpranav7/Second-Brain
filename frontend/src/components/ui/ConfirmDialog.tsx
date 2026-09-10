import { Modal } from "./Modal"

interface ConfirmDialogProps {
    isOpen: boolean
    title: string
    message: string
    confirmLabel?: string
    isConfirming?: boolean
    onConfirm: () => void
    onCancel: () => void
}

export function ConfirmDialog({ isOpen, title, message, confirmLabel = 'Delete', isConfirming = false, onConfirm, onCancel }: ConfirmDialogProps) {
    return (
        <Modal isOpen={isOpen} onClose={onCancel} title={title}>
            <p className="mb-6 text-sm text-slate-600 dark:text-neutral-400">{message}</p>
            <div>
                <button
                    type="button"
                    onClick={onCancel}
                    className="cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={onConfirm}  //onClick runs this handleConfirmDelete function
                    disabled={isConfirming}
                    className="cursor-pointer ml-1.5 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isConfirming ? 'Deleting...' : confirmLabel}
                </button>
            </div>
            <div>

            </div>
        </Modal>
    )
}