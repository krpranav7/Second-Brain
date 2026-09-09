import { ArrowLeft } from "lucide-react";
import { useState, type SubmitEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { updateProfile, changePassword } from "../api/auth"

export function Profile() {
    const { user, setUser } = useAuth()
    const navigate = useNavigate()

    const [username, setUsername] = useState(user?.username ?? '')
    const [email, setEmail] = useState(user?.email ?? '')
    const [profileError, setProfileError] = useState('')
    const [profileSuccess, setProfileSuccess] = useState('')
    const [isProfileSubmitting, setIsProfileSubmitting] = useState(false)

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [passwordSuccess, setPasswordSuccess] = useState('')
    const [isPasswordSubmitting, setIsPasswordSubmitting] = useState(false)

    async function handleProfileSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        setProfileError('')
        setProfileSuccess('')
        setIsProfileSubmitting(true)

        try {
            const { user: updatedUser } = await updateProfile(username, email) //rename user while extracting it
            setUser(updatedUser)
            setProfileSuccess('Profile updated successfully')
        } catch (err: any) {
            setProfileError(err.response?.data?.message ?? 'Failed to update profile')
        } finally {
            setIsProfileSubmitting(false)
        }
    }

    async function handlePasswordSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        setPasswordError('')
        setPasswordSuccess('')
        setIsPasswordSubmitting(true)

        try {
            await changePassword(currentPassword, newPassword)
            setPasswordSuccess('Password changed successfully')
            setCurrentPassword('')
            setNewPassword('')
        } catch (err: any) {
            setPasswordError(err.response?.data?.message ?? 'Failed to change password')
        } finally {
            setIsPasswordSubmitting(false)
        }
    }

    return (
        <div className="min-h-dvh bg-slate-50 px-4 py-8 dark:bg-neutral-950">
            <div className="mx-auto max-w-lg">
                <button onClick={() => navigate('/')}
                    className="cursor-pointer mb-6 flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white"    
                >
                    <ArrowLeft size={18} />
                    Back to Dashboard
                </button>

                <h1 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">Profile Settings</h1>

                <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900 shadow-sm hover:shadow-lg dark:hover:shadow-gray-800/75 hover:shadow-gray-400/75">
                    <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Profile Information</h2>

                    {profileError && (
                        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
                            {profileError}
                        </p>
                    )}
                    {profileSuccess && (
                        <p className="mb-4 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-600 dark:bg-green-500/10 dark:text-green-400">
                        {profileSuccess}
                        </p>
                    )}

                    <form onSubmit={handleProfileSubmit} className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="username" className="mb-1 block text-sm font-medium text-slate-700 dark:text-neutral-300">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700 dark:text-neutral-300">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                            />
                        </div>

                        <button
                        type="submit"
                        disabled={isProfileSubmitting}
                        className="cursor-pointer self-start rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                            {isProfileSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                    </form>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900 shadow-sm hover:shadow-lg dark:hover:shadow-gray-800/75 hover:shadow-gray-400/75">
                    <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Change Password</h2>

                    {passwordError && (
                        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
                        {passwordError}
                        </p>
                    )}
                    {passwordSuccess && (
                        <p className="mb-4 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-600 dark:bg-green-500/10 dark:text-green-400">
                        {passwordSuccess}
                        </p>
                    )}

                    <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="currentPassword" className="mb-1 block text-sm font-medium text-slate-700 dark:text-neutral-300">
                                Current Password
                            </label>
                            <input
                                id="currentPassword"
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                            />
                        </div>

                        <div>
                            <label htmlFor="newPassword" className="mb-1 block text-sm font-medium text-slate-700 dark:text-neutral-300">
                                New Password
                            </label>
                            <input
                                id="newPassword"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                            />
                        </div>

                        <button
                        type="submit"
                        disabled={isPasswordSubmitting}
                        className="cursor-pointer self-start rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                            {isPasswordSubmitting ? 'Changing...' : 'Change Password'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}