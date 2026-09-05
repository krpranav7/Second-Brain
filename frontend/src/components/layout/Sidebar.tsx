import type { ElementType } from 'react';
import { LogOut, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { logout } from '../../api/auth'

export interface NavItem {
    id: string
    label: string
    icon: ElementType
}

interface SidebarProps {
    items: NavItem[]
    activeId: string
    onSelect: (id: string) => void
    isOpen: boolean
    onClose: () => void
}

export function Sidebar({ items, activeId, onSelect, isOpen, onClose }: SidebarProps) {

    const { user, setUser } = useAuth()
    const navigate = useNavigate()

    async function handleLogout() {
        try {
            await logout()
        } catch {
            
        }
        finally{
            setUser(null)
            navigate('/login')
        }
    }

    return (
        <>
            {isOpen && (
                <div className='fixed inset-0 z-30 bg-black/50 md:hidden' onClick={onClose} aria-hidden='true' />
            )}

            <aside className={`fixed inset-y-0 z-40 w-64 transform border-r border-slate-200 bg-white transition-transform duration-200 ease-in-out dark:border-slate-800 dark:bg-slate-900 md:sticky md:top-0 md:h-screen md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>

                <div className="flex items-center justify-between gap-2 border-b border-slate-200 p-4 dark:border-slate-800">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                            <User size={18} />
                        </div>
                        <span className="truncate text-sm font-medium text-slate-900 dark:text-white">
                            {user?.username}
                        </span>
                    </div>
                    
                    <button onClick={handleLogout} aria-label="Log out"
                        className="cursor-pointer shrink-0 rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                    >
                        <LogOut size={18} />
                    </button>
                </div>

                <nav className='flex flex-col gap-1 p-4'>
                    {items.map((item) => {
                        const Icon = item.icon
                        const isActive = item.id === activeId
                        return (
                            <button key={item.id}
                                onClick={() => {
                                    onSelect(item.id)
                                    // if (window.innerWidth < 768) {
                                    //     onClose();
                                    // }
                                    onClose()
                                }}
                                className={`cursor-pointer flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${isActive ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}`}
                            >
                                <Icon size={18} />
                                {item.label}
                            </button>
                        )
                    })}
                </nav>
            </aside>
        </>
    )
}
