import { useTheme } from "../../context/ThemeContext"
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme() // works bcz whole app is wrapped with ThemeProvider context API

    return (
        <button onClick={toggleTheme} aria-label="Toggle theme" className="cursor-pointer p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
    )
}