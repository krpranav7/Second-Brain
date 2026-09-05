import { Brain } from "lucide-react"

interface LoadderProps {
    message?: string
    fullScreen?: boolean
}

export function Loader({ message = 'Loading...', fullScreen = true }: LoadderProps) {
    return (
        <div className={`flex flex-col items-center justify-center gap-3 ${fullScreen ? 'min-h-screen bg-slate-50 dark:bg-slate-950' : 'py-16'}`}>
            <Brain className="animate-pulse text-indigo-600 dark:text-indigo-400" size={48} />
            <p className="text-sm text-slate-500 dark:text-slate-400">{message}</p>
        </div>
    )
}