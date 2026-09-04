import type {Content} from '../../types'
import { ContentCard } from './ContentCard';

interface ContentGridProps{
    contents: Content[]
    onDelete: (id: string) => void
}

export function ContentGrid({contents, onDelete}: ContentGridProps){
    if(contents.length === 0){
        return(
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 py-16 text-center dark:border-slate-700">
                <p className="text-slate-500 dark:text-slate-400">
                    No content here yet. Click "Add content to save your first item"
                </p>
            </div>
        )
    }

    return(
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {contents.map((content) => (
                <ContentCard key={content._id} content={content} onDelete={onDelete} />
            ))}
        </div>
    )
}