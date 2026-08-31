import {useState} from 'react'
import { AppLayout } from './components/layout/AppLayout'
import { ContentGrid } from './components/content/ContentGrid';
import type {Content} from './types'

const dummyContent: Content[] = [
  {
    _id: '1',
    title: 'Project Ideas',
    link: 'https://example.com',
    type: 'article',
    tags: [{ _id: 't1', title: 'productivity' }, { _id: 't2', title: 'ideas' }],
    userId: 'u1',
    createdAt: '2024-03-10'
  },
  {
    _id: '2',
    title: 'How to Build a Second Brain',
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    type: 'video',
    tags: [{ _id: 't1', title: 'productivity' }, { _id: 't3', title: 'learning' }],
    userId: 'u1',
    createdAt: '2024-03-09'
  },
  {
    _id: '3',
    title: 'A nice landscape photo',
    link: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
    type: 'image',
    tags: [{ _id: 't4', title: 'inspiration' }],
    userId: 'u1',
    createdAt: '2024-03-08'
  }
]

function App() {
  const [activeId, setActiveId] = useState('tweets')
  const [contents, setContents] = useState(dummyContent)

  function handleDelete(id: string){
    setContents((prev) => prev.filter((c) => c._id !== id))
  }

  return (
    <AppLayout
      activeId={activeId}
      onSelect={setActiveId}
      onShareClick={() => alert('share clicked')}
      onAddClick={() => alert('add clicked')}
    >
      <h1 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
        All Notes
      </h1>
      
      <ContentGrid contents={contents} onDelete={handleDelete} />
    </AppLayout>
  )
}

export default App
