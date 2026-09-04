import type { ElementType } from 'react';

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
    return (
        <>
            {isOpen && (
                <div className='fixed inset-0 z-30 bg-black/50 md:hidden' onClick={onClose} aria-hidden='true' />
            )}

            <aside className={`fixed inset-y-0 z-40 w-64 transform border-r border-slate-200 bg-white transition-transform duration-200 ease-in-out dark:border-slate-800 dark:bg-slate-900 md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
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
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${isActive ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}`}
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
