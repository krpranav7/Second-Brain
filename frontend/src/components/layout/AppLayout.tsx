import { useState, type ReactNode } from 'react'
import { FileText, Hash, Link2, MessageSquare, Video } from 'lucide-react'
import { Navbar } from './Navbar'
import { Sidebar, type NavItem } from './Sidebar'

const navItems: NavItem[] = [
    { id: 'tweets', label: 'Tweets', icon: MessageSquare },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'links', label: 'Links', icon: Link2 },
    { id: 'tags', label: 'Tags', icon: Hash }
]

interface AppLayoutProps {
    children: ReactNode
    activeId: string
    onSelect: (id: string) => void
    onShareClick: () => void
    onAddClick: () => void
}

export function AppLayout({ children, activeId, onSelect, onShareClick, onAddClick }: AppLayoutProps) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    return (
        <div className='flex min-h-screen bg-slate-50 dark:bg-slate-950'>
            <Sidebar
                items={navItems}
                activeId={activeId}
                onSelect={onSelect}
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            />

            <div className="flex flex-1 flex-col">
                <Navbar
                    onMenuClick={() => setIsDrawerOpen(true)}
                    onShareClick={onShareClick}
                    onAddClick={onAddClick}
                />
                <main className="flex-1 p-4 md:p-6">{children}</main>
            </div>
        </div>
    )
}