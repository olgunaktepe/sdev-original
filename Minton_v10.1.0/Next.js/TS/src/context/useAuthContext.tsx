'use client'
import {deleteCookie, getCookie, hasCookie, setCookie} from 'cookies-next'
import {useRouter} from 'next/navigation'
import {createContext, type ReactNode, useContext, useState} from 'react'

export type User = {
    id: string
    email?: string
    username?: string
    password: string
    firstName?: string
    lastName?: string
    role?: string
    token?: string
}

export type AuthContextType = {
    user: User | undefined
    isAuthenticated: boolean
    saveSession: (session: User) => void
    removeSession: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuthContext() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider')
    }
    return context
}

const authSessionKey = '_MINTON_AUTH_KEY_'

export function AuthProvider({children}: Readonly<{ children: ReactNode }>) {
    const router = useRouter()

    const getSession = (): AuthContextType['user'] => {
        const fetchedCookie = getCookie(authSessionKey)?.toString()
        if (!fetchedCookie) return
        else return JSON.parse(fetchedCookie)
    }

    const [user, setUser] = useState<User | undefined>(getSession())

    const saveSession = (user: User) => {
        setCookie(authSessionKey, JSON.stringify(user))
        setUser(user)
    }

    const removeSession = () => {
        deleteCookie(authSessionKey)
        setUser(undefined)
        router.push('/auth/login')
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!hasCookie(authSessionKey),
                saveSession,
                removeSession,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}