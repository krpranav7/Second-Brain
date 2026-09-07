import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Brain } from 'lucide-react'
import { login } from "../api/auth";
import { ThemeToggle } from "../components/ui/ThemeToggle"
import { useAuth } from "../context/AuthContext"

export function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { setUser } = useAuth()

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        setError('');
        setIsLoading(true)

        try {
            const {user} = await login(email, password)
            setUser(user)
            navigate('/')
        }
        catch (err: any) {
            const message = err.response?.data?.message ?? 'Something went wrong. Please try again.'
            setError(message)
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-dvh items-center justify-center bg-slate-50 px-4 dark:bg-neutral-950">
            <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">

                <div className="mb-6 relative flex items-center justify-center">
                    <div className="flex items-center gap-2">
                        <Brain className="text-indigo-600 dark:text-indigo-400" size={28} />
                        <span className="text-xl font-bold text-slate-900 dark:text-white">Second Brain</span>
                    </div>
                    <div className="absolute right-0">
                        <ThemeToggle />
                    </div>
                </div>

                <h1 className="mb-4 text-center text-lg font-semibold text-slate-900 dark:text-white">Log in to your account</h1>

                {error && (
                    <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400 flex justify-center items-center">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700 dark:text-neutral-300">Email</label>
                        <input type="email" id="email" value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700 dark:text-neutral-300">Password</label>
                        <input type="password" id="password" value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                        />
                    </div>

                    <button type="submit" disabled={isLoading} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60">{isLoading ? 'Logging in..' : 'Login'}</button>
                </form>

                <p className="mt-4 text-center text-sm text-slate-500 dark:text-neutral-400">Don't have an account?{' '}
                    <Link className="font-medium text-indigo-600 hover:underline dark:text-indigo-400" to="/signup">Sign up</Link>
                </p>

            </div>
        </div>
    )
}