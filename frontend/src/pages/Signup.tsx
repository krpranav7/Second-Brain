import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Brain} from 'lucide-react'
import { signup } from "../api/auth";
import { ThemeToggle } from "../components/ui/ThemeToggle";

export function Signup(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        setError('');
        setIsLoading(true)

        try{
            await signup(username, password)
            navigate('/')
        }
        catch(err: any){
            const message = err.response?.data?.message ?? 'Something went wrong. Please try again.'
            setError(message)
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
            <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
               
                <div className="mb-6 relative flex items-center justify-center">
                    <div className="flex items-center gap-2">
                        <Brain className="text-indigo-600 dark:text-indigo-400" size={28} />
                        <span className="text-xl font-bold text-slate-900 dark:text-white">Second Brain</span>
                    </div>
                    <div className="absolute right-0">
                        <ThemeToggle />
                    </div>
                </div>
                

                <h1 className="mb-4 text-center text-lg font-semibold text-slate-900 dark:text-white">Create your account</h1>

                {error && (
                    <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="username" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Username</label>
                        <input type="text" id="username" value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                        <input type="password" id="password" value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                    </div>

                    <button type="submit" disabled={isLoading} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60">{isLoading ? 'Creating account...' : 'Sign up'}</button>
                </form>

                <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">Already have an account?{' '}
                    <Link className="font-medium text-indigo-600 hover:underline dark:text-indigo-400" to="/login">Login</Link>
                </p>

            </div>
        </div>
    )
}