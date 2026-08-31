export function getYouTubeEmbedUrl(url: string): string | null{
    const patterns = [
        /(?:youtube\.com\/watch\?v=)([^&]+)/,
        /(?:youtu\.be\/)([^?]+)/,
        /(?:youtube\.com\/embed\/)([^?]+)/
    ]

    for(const pattern of patterns){
        const match = url.match(pattern)
        if(match?.[1]){
            return `https://youtube.com/embed/${match[1]}`
        }
    }
    return null;
}