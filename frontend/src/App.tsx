import {useState} from 'react'
import { AppLayout } from './components/layout/AppLayout'

function App() {
  const [activeId, setActiveId] = useState('tweets')

  return (
    <AppLayout
      activeId={activeId}
      onSelect={setActiveId}
      onShareClick={() => alert('share clicked')}
      onAddClick={() => alert('add clicked')}
    >
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
        All Notes
      </h1>
      <p className="text-slate-500 dark:text-slate-400">Selected: {activeId}</p>
    </AppLayout>
  )
}

export default App
