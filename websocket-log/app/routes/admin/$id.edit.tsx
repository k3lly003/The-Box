import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "../../components/ui/button";
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Code,
  Quote,
  Undo,
  Redo,
} from "lucide-react";
import { Id } from "../../../convex/_generated/dataModel";

export const Route = createFileRoute("/admin/$id.edit")({
  component: EditDocPage,
});

// Slug generator utility
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces, underscores, and multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

function EditDocPage() {
  const { id } = useParams({ from: "/admin/$id.edit" });
  const navigate = useNavigate();
  const updateDoc = useMutation(api.docs.updateDoc);
  const allDocs = useQuery(api.docs.getNav);
  const doc = allDocs?.find((d) => d._id === (id as Id<"docs">));

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [autoSlug, setAutoSlug] = useState(false);
  const [type, setType] = useState<"folder" | "article">("article");
  const [order, setOrder] = useState(0);
  const [parentId, setParentId] = useState<string>("");
  const [iconName, setIconName] = useState<string>("");
  const [isPublished, setIsPublished] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: doc?.content || "<p>Start writing your documentation...</p>",
    editorProps: {
      attributes: {
        class: "prose prose-sm dark:prose-invert max-w-none focus:outline-none font-mono",
      },
    },
  });

  // Load document data
  useEffect(() => {
    if (doc) {
      setTitle(doc.title);
      setSlug(doc.slug);
      setType(doc.type);
      setOrder(doc.order);
      setParentId(doc.parentId || "");
      setIconName(doc.iconName || "");
      setIsPublished(doc.isPublished);
      if (editor && doc.content) {
        editor.commands.setContent(doc.content);
      }
    }
  }, [doc, editor]);

  // Auto-generate slug from title
  useEffect(() => {
    if (autoSlug && title) {
      setSlug(generateSlug(title));
    }
  }, [title, autoSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !slug || !doc) {
      alert("Please fill in title and slug");
      return;
    }

    setIsSaving(true);
    try {
      const content = type === "article" ? editor?.getHTML() : undefined;
      await updateDoc({
        id: doc._id,
        title,
        slug,
        content,
        type,
        order,
        parentId: parentId ? (parentId as any) : undefined,
        iconName: iconName || undefined,
        isPublished,
      });

      // Navigate to admin list
      navigate({ to: "/admin" });
    } catch (error) {
      console.error("Error updating document:", error);
      alert("Failed to update document. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!doc) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground animate-pulse">Loading document...</div>
      </div>
    );
  }

  // Filter folders for parent selection
  const folders = allDocs?.filter((d) => d.type === "folder" && d._id !== doc._id) || [];

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Edit Document</h1>
        <p className="text-muted-foreground">
          Update the document details below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Title *
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground font-mono"
            placeholder="e.g., Getting Started Guide"
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="slug" className="text-sm font-medium">
              Slug *
            </label>
            <label className="flex items-center gap-2 text-xs text-muted-foreground">
              <input
                type="checkbox"
                checked={autoSlug}
                onChange={(e) => setAutoSlug(e.target.checked)}
                className="rounded"
              />
              Auto-generate from title
            </label>
          </div>
          <input
            id="slug"
            type="text"
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setAutoSlug(false);
            }}
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground font-mono"
            placeholder="e.g., getting-started-guide"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="type" className="text-sm font-medium">
              Type *
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as "folder" | "article")}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
            >
              <option value="article">Article</option>
              <option value="folder">Folder</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="order" className="text-sm font-medium">
              Order
            </label>
            <input
              id="order"
              type="number"
              value={order}
              onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground font-mono"
              placeholder="0"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="parentId" className="text-sm font-medium">
              Parent Folder (optional)
            </label>
            <select
              id="parentId"
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
            >
              <option value="">None (Top-level)</option>
              {folders.map((folder) => (
                <option key={folder._id} value={folder._id}>
                  {folder.title}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="iconName" className="text-sm font-medium">
              Icon Name (optional)
            </label>
            <input
              id="iconName"
              type="text"
              value={iconName}
              onChange={(e) => setIconName(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground font-mono"
              placeholder="e.g., FileText, Folder, Settings"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm font-medium">Published</span>
          </label>
        </div>

        {type === "article" && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Content *</label>
            <div className="border border-input rounded-lg bg-background overflow-hidden">
              {/* Toolbar */}
              <div className="border-b border-input p-2 flex gap-1 flex-wrap bg-muted/30">
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                  className={`p-2 rounded hover:bg-accent transition-colors ${
                    editor?.isActive("bold") ? "bg-accent" : ""
                  }`}
                  title="Bold"
                >
                  <Bold className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                  className={`p-2 rounded hover:bg-accent transition-colors ${
                    editor?.isActive("italic") ? "bg-accent" : ""
                  }`}
                  title="Italic"
                >
                  <Italic className="h-4 w-4" />
                </button>
                <div className="w-px bg-border mx-1" />
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                  className={`p-2 rounded hover:bg-accent transition-colors ${
                    editor?.isActive("heading", { level: 1 }) ? "bg-accent" : ""
                  }`}
                  title="Heading 1"
                >
                  <Heading1 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                  className={`p-2 rounded hover:bg-accent transition-colors ${
                    editor?.isActive("heading", { level: 2 }) ? "bg-accent" : ""
                  }`}
                  title="Heading 2"
                >
                  <Heading2 className="h-4 w-4" />
                </button>
                <div className="w-px bg-border mx-1" />
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleBulletList().run()}
                  className={`p-2 rounded hover:bg-accent transition-colors ${
                    editor?.isActive("bulletList") ? "bg-accent" : ""
                  }`}
                  title="Bullet List"
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                  className={`p-2 rounded hover:bg-accent transition-colors ${
                    editor?.isActive("orderedList") ? "bg-accent" : ""
                  }`}
                  title="Ordered List"
                >
                  <ListOrdered className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
                  className={`p-2 rounded hover:bg-accent transition-colors ${
                    editor?.isActive("codeBlock") ? "bg-accent" : ""
                  }`}
                  title="Code Block"
                >
                  <Code className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                  className={`p-2 rounded hover:bg-accent transition-colors ${
                    editor?.isActive("blockquote") ? "bg-accent" : ""
                  }`}
                  title="Blockquote"
                >
                  <Quote className="h-4 w-4" />
                </button>
                <div className="w-px bg-border mx-1" />
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().undo().run()}
                  disabled={!editor?.can().undo()}
                  className="p-2 rounded hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Undo"
                >
                  <Undo className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().redo().run()}
                  disabled={!editor?.can().redo()}
                  className="p-2 rounded hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Redo"
                >
                  <Redo className="h-4 w-4" />
                </button>
              </div>
              {/* Editor */}
              <div className="p-6 min-h-[400px] prose prose-sm dark:prose-invert max-w-none">
                <EditorContent editor={editor} />
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : "Update Document"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate({ to: "/admin" })}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

