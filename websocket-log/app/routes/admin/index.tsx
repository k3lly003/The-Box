import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "../../components/ui/button";
import { FileText, Folder, Edit, Trash2 } from "lucide-react";
import { Id } from "../../../convex/_generated/dataModel";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const navigate = useNavigate();
  const docs = useQuery(api.docs.getNav);
  const deleteDoc = useMutation(api.docs.deleteDoc);

  const handleDelete = async (id: Id<"docs">) => {
    if (!confirm("Are you sure you want to delete this document?")) {
      return;
    }
    try {
      await deleteDoc({ id });
    } catch (error) {
      console.error("Error deleting document:", error);
      alert("Failed to delete document. Please try again.");
    }
  };

  if (!docs) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground animate-pulse">Loading documents...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">All Documents</h1>
        <p className="text-muted-foreground">
          Manage your documentation pages and folders.
        </p>
      </div>

      {docs.length === 0 ? (
        <div className="text-center py-12 border border-dashed rounded-lg">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-4">No documents yet.</p>
          <Link to="/admin/new">
            <Button>Create Your First Document</Button>
          </Link>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium">Type</th>
                <th className="text-left px-4 py-3 text-sm font-medium">Title</th>
                <th className="text-left px-4 py-3 text-sm font-medium">Slug</th>
                <th className="text-left px-4 py-3 text-sm font-medium">Order</th>
                <th className="text-left px-4 py-3 text-sm font-medium">Published</th>
                <th className="text-right px-4 py-3 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {docs
                .sort((a, b) => a.order - b.order)
                .map((doc) => (
                  <tr key={doc._id} className="hover:bg-muted/30">
                    <td className="px-4 py-3">
                      {doc.type === "folder" ? (
                        <Folder className="h-4 w-4 text-blue-500" />
                      ) : (
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium">{doc.title}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground font-mono">
                      {doc.slug}
                    </td>
                    <td className="px-4 py-3 text-sm">{doc.order}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                          doc.isPublished
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                        }`}
                      >
                        {doc.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate({ to: "/admin/$id.edit", params: { id: doc._id } })}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(doc._id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
