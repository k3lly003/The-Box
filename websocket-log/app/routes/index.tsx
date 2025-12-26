import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">DevStack Docs</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            JetBrains-style docs shell + Command-K search (coming next).
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md border bg-secondary px-3 py-2 text-sm text-secondary-foreground hover:bg-secondary/80"
        >
          <Search className="h-4 w-4" />
          Command-K
        </button>
      </div>

      <div className="rounded-lg border bg-background p-4">
        <div className="text-sm font-medium">Quick links</div>
        <div className="mt-3 grid gap-2 text-sm">
          <Link
            to="/docs/$slug"
            params={{ slug: "intellij-idea-as-a-unified-product" }}
            className="text-primary underline-offset-4 hover:underline"
          >
            Open a sample doc
          </Link>
        </div>
      </div>
    </div>
  );
}










