// 'use client';

import { ChevronDown, Moon, Sun, Search, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import logo from "@/assets/logo.png";

export function Navbar() {
    const [isDark, setIsDark] = useState(true);
    const handleSearch = (query: string) => {
         console.log('Search query:', query);
    };


    return (
        <nav className="fixed border-b border-neutral-700 bg-neutral-900 w-full px-3 ">
            <div className="flex justify-between h-16 px-4 gap-4">
                {/* Left Section: Logo & Product Name */}
                <div className="flex items-center gap-3 min-w-fit">
                    <div>
                        <img
                            src={logo}
                            alt="Brand Logo"
                            className="h-10 w-10 object-contain transition-all cursor-pointer"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-white font-bold text-2xl">3 Docs</h1>
                    </div>
                </div>
                {/* Right Section: Actions */}
                <div className="flex items-center gap-2 ml-auto">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="text-neutral-400 hover:text-white transition-colors text-xs flex items-center gap-1.5 px-2 py-1.5">
                                <span>Shortcuts: </span>
                                <ChevronDown size={14} />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-neutral-800 border-neutral-700">
                            <DropdownMenuItem className="text-neutral-200 hover:bg-neutral-700 text-xs">
                                Node js
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-neutral-200 hover:bg-neutral-700 text-xs">
                                Python
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-neutral-200 hover:bg-neutral-700 text-xs">
                                Java
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Theme Toggle */}
                    <button
                        onClick={() => setIsDark(!isDark)}
                        className="text-neutral-400 hover:text-white transition-colors p-1.5"
                        aria-label="Toggle theme"
                    >
                        {isDark ? <Sun size={16} /> : <Moon size={16} />}
                    </button>

                    {/* Accessibility Button */}
                    <button
                        className="text-neutral-400 hover:text-white transition-colors p-1.5"
                        aria-label="Accessibility options"
                    >
                        <HelpCircle size={16} />
                    </button>

                    {/* Search Button */}
                    <button className="text-neutral-400 hover:text-white transition-colors p-1.5">
                        <Dialog onClick={handleSearch} />
                    </button>
                </div>
            </div>
        </nav>
    );
}
