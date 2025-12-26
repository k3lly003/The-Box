import * as React from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { ConvexProvider } from "convex/react";
import { convex, convexUrl } from "../lib/convex";
import { SidebarTree } from "../components/docs/SidebarTree";
import { Navbar } from "@/components/docs/navbar";
import { Footer } from "@/components/docs/Footer";

function AppShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative flex min-h-screen flex-col bg-background text-foreground">
            {/* 1. Header: Fixed at the top */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <Navbar />
            </header>

            {/* 2. Main Layout Container */}
            <div className="flex flex-1 items-start">
                {/* SIDEBAR:
                   - sticky top-14: Keeps it fixed below the Navbar (assuming Navbar is ~56px/14rem)
                   - h-[calc(100vh-3.5rem)]: Takes up remaining viewport height
                */}
                <aside className="sticky top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-[300px] shrink-0 overflow-y-auto border-r md:block">
                    <div className="h-full py-6 pl-4 pr-2 lg:py-8">
                        <SidebarTree />
                    </div>
                </aside>

                {/* CONTENT AREA:
                   - flex-1: Fills remaining horizontal space
                   - min-h-[calc(100vh-3.5rem)]: Ensures it's at least as tall as the viewport
                */}
                <main className="relative flex-1 min-w-0 flex flex-col min-h-[calc(100vh-3.5rem)]">
                    <div className="flex-1 px-4 py-20 md:px-8 lg:px-12 border">
                        <div className="mx-auto max-w-5xl">
                            {children}
                        </div>
                    </div>

                    {/* Footer sits at the bottom of the article scroll */}
                    <Footer />
                </main>
            </div>
        </div>
    );
}

function RootLayout() {
    const content = (
        <AppShell>
            <Outlet />
        </AppShell>
    );

    return convex ? <ConvexProvider client={convex}>{content}</ConvexProvider> : content;
}

export const Route = createRootRoute({
    component: RootLayout,
});