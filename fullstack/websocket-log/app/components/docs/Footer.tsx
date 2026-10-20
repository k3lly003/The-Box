import { BookOpen, Youtube, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const footerLinks = [
    { label: "What's new", href: "#" },
    { label: "Issue tracker", href: "#" },
    { label: "Submit support request", href: "#" },
    { label: "Privacy & Security", href: "#" },
    { label: "Terms Of Use", href: "#" },
    { label: "Trademarks", href: "#" },
    { label: "Legal", href: "#" },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bottom-0 border-t bg-background px-6 py-10 mt-auto border-b border-neutral-700 bg-neutral-900 text-white">
            <div className="container mx-auto flex flex-col items-start justify-between gap-8 md:flex-row">

                {/* Left Section: Icons, Links, and Copyright */}
                <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-1">
                        {/* Social Icons using Lucide */}
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <BookOpen className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Youtube className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Twitter className="h-4 w-4" />
                        </Button>

                        {/* Navigation Links */}
                        <nav className="ml-2 flex flex-wrap gap-x-4 gap-y-2 text-[13px]">
                            {footerLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="border-b border-transparent hover:border-green-300 transition-colors"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Copyright Notice */}
                    <p className="text-[13px] px-2">
                        Copyright © 1–{currentYear} n.b.k 👽
                    </p>
                </div>

                {/* Right Section: Brand Logo */}
                <div className="flex items-center self-center md:self-start">
                    <img
                        src={logo}
                        alt="Brand Logo"
                        className="h-10 w-10 object-contain brightness-90 grayscale hover:grayscale-0 transition-all cursor-pointer"
                    />
                </div>
            </div>
        </footer>
    );
}