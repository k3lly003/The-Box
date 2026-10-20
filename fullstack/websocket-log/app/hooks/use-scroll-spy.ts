import * as React from "react";

/**
 * Lightweight scroll-spy for the ToC.
 * Observes headings and returns the "active" id based on intersection.
 */
export function useScrollSpy(ids: string[], rootMargin = "-20% 0px -70% 0px") {
    const [activeId, setActiveId] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (typeof window === "undefined") return;
        if (!ids.length) return;

        const elements = ids
            .map((id) => document.getElementById(id))
            .filter(Boolean) as HTMLElement[];

        if (!elements.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                // Pick the top-most visible heading (closest to top)
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => (a.boundingClientRect.top ?? 0) - (b.boundingClientRect.top ?? 0));

                if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
            },
            { root: null, rootMargin, threshold: [0.1, 0.25, 0.5, 1] },
        );

        for (const el of elements) observer.observe(el);
        return () => observer.disconnect();
    }, [ids.join("|"), rootMargin]);

    return activeId;
}


