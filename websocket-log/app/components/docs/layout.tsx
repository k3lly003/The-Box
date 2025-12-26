import { Navbar } from "./navbar"
import { SidebarTree } from "./SidebarTree"

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <div className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)]">
                <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block border-r">
                    <SidebarTree nodes={[]} />
                </aside>
                <main className="relative">{children}</main>
            </div>
        </div>
    )
}