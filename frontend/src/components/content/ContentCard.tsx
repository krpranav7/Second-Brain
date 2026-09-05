import { FileText, Headphones, Image, Link2, Trash2, Video } from "lucide-react"
import { useState, type ElementType } from "react"
import type {Content, ContentType} from '../../types'
import {getYouTubeEmbedUrl} from '../../utils/embed'
import { FaXTwitter } from "react-icons/fa6";

const typeIconMap: Record<ContentType, ElementType> = {
    article: FileText,
    video: Video,
    image: Image,
    audio: Headphones,
    tweet: FaXTwitter
}

interface ContentCardProps{
    content: Content
    onDelete: (id: string) => void
}

export function ContentCard({content, onDelete}: ContentCardProps){
    const Icon = typeIconMap[content.type]
    const [imageFailed, setImageFailed] = useState(false)

    const embedUrl = content.type === 'video' ? getYouTubeEmbedUrl(content.link) : null
    const showImageEmbed = content.type === 'image' && !imageFailed

    return(
        <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <Icon size={18} />
                    <a href={content.link} target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-900 hover:underline dark:text-white">
                        {content.title}
                    </a>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                    <a href={content.link} target="_blank" rel="noopener noreferrer" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300">
                        <Link2 size={16} />
                    </a>
                    <button onClick={() => onDelete(content._id)} aria-label="Delete content" className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/50 dark:hover:text-red-400">
                        <Trash2 size={16}/>
                    </button>
                </div>
            </div>

            {showImageEmbed && (
                <div className="aspect-video w-full overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                    <img 
                        src={content.link}
                        alt={content.title}
                        onError={() => setImageFailed(true)}
                        className="h-full w-full rounded-lg object-cover"
                        loading="lazy"
                    />
                </div>
            )}

            {embedUrl && (
                <div className="aspect-video w-full overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                    <iframe
                        src={embedUrl}
                        title={content.title}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                    />
                </div>
            )}

            {content.type === 'video' && !embedUrl && (
                <div className="flex items-center w-full aspect-video justify-center rounded-lg bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
                    <Video size={32}/>
                </div>
            )}

            {content.type === 'article' && (
                <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-slate-100 text-sm text-slate-400 dark:bg-slate-800 dark:text-slate-500">
                    <div className="flex items-center justify-center p-2.5">
                        Preview unavailable for this URL <br />
                        Click title/link-icon to view this article
                    </div>
                </div>
            )}

            {content.type === 'audio' && (
                <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-slate-100 text-sm text-slate-400 dark:bg-slate-800 dark:text-slate-500">
                    <div className="flex items-center justify-center p-2.5">
                        Preview unavailable for this URL <br />
                        Click title/link-icon to listen
                    </div>
                </div>
            )}

            {content.type === 'tweet' && (
                <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-slate-100 text-sm text-slate-400 dark:bg-slate-800 dark:text-slate-500">
                    <p className="p-2.5">Click title/link-icon to view this post</p>
                </div>
            )}
            
            {content.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                    {content.tags.map((tag) => (
                        <span key={tag._id} className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium  text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                            #{tag.title}
                        </span>
                    ))}
                </div>
            )}

            {content.createdAt && (
                <p className="text-xs text-slate-400 dark:text-slate-500">
                    Added on {new Date(content.createdAt).toLocaleDateString()}
                </p>
            )}
        </div>
    )
}