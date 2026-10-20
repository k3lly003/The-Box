import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { FileText, Plus } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-muted/30 p-6">
        <div className="space-y-1">
          <h2 className="mb-4 px-2 text-lg font-semibold">Admin Dashboard</h2>
          <Link
            to="/admin"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground [&.active]:bg-accent [&.active]:text-accent-foreground"
            activeProps={{ className: "bg-accent text-accent-foreground" }}
          >
            <FileText className="h-4 w-4" />
            All Docs
          </Link>
          <Link
            to="/admin/new"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground [&.active]:bg-accent [&.active]:text-accent-foreground"
            activeProps={{ className: "bg-accent text-accent-foreground" }}
          >
            <Plus className="h-4 w-4" />
            Create New
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}

