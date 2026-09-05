import { Brain, Menu, Plus, Share2 } from 'lucide-react'
import { ThemeToggle } from '../ui/ThemeToggle'

interface NavbarProps {
    onMenuClick: () => void
    onShareClick: () => void
    onAddClick: () => void
}

export function Navbar({ onMenuClick, onShareClick, onAddClick }: NavbarProps) {
    return (
        <header className='sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900 md:px-6'>
            <div className='flex items-center gap-3'>
                <button
                    onClick={onMenuClick}
                    aria-label='Open menu'
                    className='rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 md:hidden'
                >
                    <Menu size={20} />
                </button>
                <div className='flex items-center gap-2'>
                    <Brain className='text-indigo-600 dark:text-indigo-400' size={30} />
                    <span className='md:text-2xl text-lg font-bold text-slate-900 dark:text-white'>
                        Second Brain
                    </span>
                </div>
            </div>

            <div className='flex items-center gap-2' >
                <button
                    onClick={onShareClick}
                    className='cursor-pointer hidden items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-400 dark:hover:bg-indigo-500/20 sm:flex'
                >
                    <Share2 size={16} />
                    Share Brain
                </button>
                <button
                    onClick={onAddClick}
                    className="cursor-pointer flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                    <Plus size={16} />
                    <span className='hidden sm:inline' >Add Content</span>
                </button>
                <ThemeToggle />
            </div>
        </header>
    )
}