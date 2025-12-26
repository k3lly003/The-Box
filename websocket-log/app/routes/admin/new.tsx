import { createFileRoute, useNavigate } from "@tanstack/react-router";
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

export const Route = createFileRoute("/admin/new")({
  component: CreateDocPage,
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

function CreateDocPage() {
  const navigate = useNavigate();
  const createDoc = useMutation(api.docs.createDoc);
  const allDocs = useQuery(api.docs.getNav);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [autoSlug, setAutoSlug] = useState(true);
  const [type, setType] = useState<"folder" | "article">("article");
  const [order, setOrder] = useState(0);
  const [parentId, setParentId] = useState<string>("");
  const [iconName, setIconName] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Start writing your documentation...</p>",
    editorProps: {
      attributes: {
        class: "prose prose-sm dark:prose-invert max-w-none focus:outline-none font-mono",
      },
    },
  });

  // Auto-generate slug from title
  useEffect(() => {
    if (autoSlug && title) {
      setSlug(generateSlug(title));
    }
  }, [title, autoSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !slug) {
      alert("Please fill in title and slug");
      return;
    }

    if (type === "article" && !editor) {
      alert("Editor not ready");
      return;
    }

    setIsSaving(true);
    try {
      const content = type === "article" ? editor?.getHTML() : undefined;
      await createDoc({
        title,
        slug,
        content,
        type,
        order,
        parentId: parentId ? (parentId as any) : undefined,
        iconName: iconName || undefined,
      });

      // Reset form
      setTitle("");
      setSlug("");
      setType("article");
      setOrder(0);
      setParentId("");
      setIconName("");
      editor?.commands.setContent("<p>Start writing your documentation...</p>");

      // Navigate to admin list
      navigate({ to: "/admin" });
    } catch (error) {
      console.error("Error creating document:", error);
      alert("Failed to create document. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Filter folders for parent selection
  const folders = allDocs?.filter((doc) => doc.type === "folder") || [];

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Create New Document</h1>
        <p className="text-muted-foreground">
          Fill in the form below to create a new documentation page or folder.
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
          <p className="text-xs text-muted-foreground">
            URL-friendly identifier (lowercase, hyphens instead of spaces)
          </p>
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
            {isSaving ? "Saving..." : "Create Document"}
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

