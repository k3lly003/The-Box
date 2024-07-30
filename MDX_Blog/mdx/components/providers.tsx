"use client"
import { ThemeProvider } from "next-themes"
import { ReactNode } from "react"

export function Providers({children}:{children:ReactNode}){
    return (
        <ThemeProvider 
        // I gave this component the attributtes I want to use
         attribute="class"
         defaultTheme="system" 
         enableSystem
         disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
    );
}