import { createFileRoute } from "@tanstack/react-router";
import { ToC, type TocItem } from "../components/docs/ToC";

export const Route = createFileRoute("/docs/$slug")({
  component: DocPage,
});

const toc: TocItem[] = [
  { id: "overview", title: "Unified IntelliJ IDEA Overview", level: 2 },
  { id: "next-steps", title: "Next steps", level: 2 },
  { id: "code-sample", title: "Code sample (JetBrains Mono)", level: 3 },
];

function DocPage() {
  const { slug } = Route.useParams();

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_260px]">
      <article className="prose prose-zinc max-w-none dark:prose-invert">
        <div className="not-prose mb-6">
          <div className="text-xs text-muted-foreground">
            Getting started / IntelliJ IDEA as a unified product
          </div>
          <h1 className="mt-1 text-4xl font-semibold tracking-tight">
            {slug
              .split("-")
              .map((s) => s.slice(0, 1).toUpperCase() + s.slice(1))
              .join(" ")}
          </h1>
          <div className="mt-2 text-sm text-muted-foreground">
            Last modified: 28 November 2025
          </div>
        </div>

        <h2 id="overview">Unified IntelliJ IDEA Overview</h2>
        <p>
          Starting with IntelliJ IDEA 2025.3, JetBrains combines the previous
          Community and Ultimate entry points into a unified product experience.
          This page is a visual baseline matching the screenshots: left tree,
          centered content, right ToC.
        </p>

        <h2 id="next-steps">Next steps</h2>
        <ul>
          <li>Recursive folder/article sidebar powered by Convex.</li>
          <li>Command-K modal with Convex search index and fuzzy results.</li>
          <li>Tiptap + Shiki code blocks with VS Code themes for dark mode.</li>
        </ul>

          <div className="not-prose mb-6">
              <div className="text-xs text-muted-foreground">
                  Getting started / IntelliJ IDEA as a unified product
              </div>
              <h1 className="mt-1 text-4xl font-semibold tracking-tight">
                  {slug
                      .split("-")
                      .map((s) => s.slice(0, 1).toUpperCase() + s.slice(1))
                      .join(" ")}
              </h1>
              <div className="mt-2 text-sm text-muted-foreground">
                  Last modified: 28 November 2025
              </div>
          </div>

          <h2 id="overview">Unified IntelliJ IDEA Overview</h2>
          <p>
              Starting with IntelliJ IDEA 2025.3, JetBrains combines the previous
              Community and Ultimate entry points into a unified product experience.
              This page is a visual baseline matching the screenshots: left tree,
              centered content, right ToC.
          </p>

          <h2 id="next-steps">Next steps</h2>
          <ul>
              <li>Recursive folder/article sidebar powered by Convex.</li>
              <li>Command-K modal with Convex search index and fuzzy results.</li>
              <li>Tiptap + Shiki code blocks with VS Code themes for dark mode.</li>
          </ul>

        <h3 id="code-sample">Code sample (JetBrains Mono)</h3>
        <pre>
          <code>{`fun main() {
  println("Hello, DevStack Docs")
}`}</code>
        </pre>
      </article>

      {/* Right rail ToC (matches screenshot behavior, scroll-spy highlights) */}
      <aside className="hidden lg:block sticky top-5">
        <div className="sticky top-16">
          <div className="text-sm font-medium">Quick jump</div>
          <ToC items={toc} />
        </div>
      </aside>
    </div>
  );
}


