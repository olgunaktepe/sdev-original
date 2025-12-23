import DefaultLayout from "@/layouts/Default";

const Layout = ({children}: { children: React.ReactNode }) => {
    return (
        <DefaultLayout>{children}</DefaultLayout>
    )
}

export default Layout;