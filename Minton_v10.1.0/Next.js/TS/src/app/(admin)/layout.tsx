'use client'
import {Preloader} from '@/components'
import {useSession} from 'next-auth/react'
import {useRouter} from 'next/navigation'
import MainLayout from "@/layouts/MainLayout";

const Layout = ({children}: { children: React.ReactNode }) => {
    const {status} = useSession()
    const router = useRouter()

    if (status == 'unauthenticated') {
        router.push('/auth/login')
        return
    }
    if (status == 'loading') {
        return <Preloader/>
    }

    return (
        <MainLayout>
            {children}
        </MainLayout>
    )
}

export default Layout
