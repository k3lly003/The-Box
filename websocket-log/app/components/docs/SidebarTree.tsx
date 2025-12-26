import * as React from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import * as LucideIcons from "lucide-react";
import { ChevronDown, ChevronRight, FileText } from "lucide-react";
import { cn } from "../../lib/utils";

// Helper to get Lucide icon from string name
const DynamicIcon = ({ name, className }: { name?: string; className?: string }) => {
    const Icon = (LucideIcons as any)[name || "FileText"] || FileText;
    return <Icon className={className} />;
};

export function SidebarTree() {
    const pathname = useRouterState({ select: (s) => s.location.pathname });
    const rawDocs = useQuery(api.docs.getNav); // Assumes you have this query
    const [open, setOpen] = React.useState<Record<string, boolean>>({});

    // IF THERE IS NO DATA TO DISPLAY, JUST LOAD Loading tree ...
    if (!rawDocs) return <div className="p-4 text-xs animate-pulse">Loading Tree...</div>;

    const toggle = (id: string) => setOpen((o) => ({ ...o, [id]: !o[id] }));

    const renderNode = (node: any, depth: number) => {
        const isOpen = open[node._id] ?? depth < 1;

        if (node.type === "folder") {
            return (
                <div key={node._id} className="select-none">
                    <Row depth={depth} onClick={() => toggle(node._id)}>
                        {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        <DynamicIcon name={node.iconName} className="h-4 w-4 text-blue-500" />
                        <span className="truncate">{node.title}</span>
                    </Row>
                    {isOpen && (
                        <div className="mt-0.5">
                            {/* Filter children where parentId matches current node ID */}
                            {rawDocs
                                .filter((d) => d.parentId === node._id)
                                .sort((a, b) => a.order - b.order)
                                .map((child) => renderNode(child, depth + 1))}
                        </div>
                    )}
                </div>
            );
        }

        const isActive = pathname.includes(node.slug);
        return (
            <Link key={node._id} to="/docs/$slug" params={{ slug: node.slug }} className="block">
                <Row depth={depth} isActive={isActive}>
                    <DynamicIcon name={node.iconName} className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{node.title}</span>
                </Row>
            </Link>
        );
    };

    // Start rendering from top-level nodes (those without a parentId)
    const rootNodes = rawDocs.filter((d) => !d.parentId).sort((a, b) => a.order - b.order);

    return <div className="space-y-0.5">{rootNodes.map((n) => renderNode(n, 0))}</div>;
}

// Keep your existing Row component below...
function Row({ depth, children, isActive, onClick }: any) {
    return (
        <div
            className={cn(
                "flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-[13px] transition-colors",
                "hover:bg-accent/50",
                isActive ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:text-foreground",
            )}
            style={{ paddingLeft: 12 + depth * 16 }}
            onClick={onClick}
        >
            {children}
        </div>
    );
}