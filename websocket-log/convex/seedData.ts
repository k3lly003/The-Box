import { v } from "convex/values";
import { mutation } from "./_generated/server";

/**
 * Seed mutation to populate initial documentation data
 * Run this using: npx convex run convex/seedData:seedAll
 */
export const seedAll = mutation({
  args: {},
  handler: async (ctx) => {
    // First, create folders (they don't have content)
    const gettingStartedFolder = await ctx.db.insert("docs", {
      title: "Getting Started",
      slug: "getting-started",
      type: "folder",
      order: 1,
      isPublished: true,
      lastModified: Date.now(),
      iconName: "Rocket",
    });

    const guidesFolder = await ctx.db.insert("docs", {
      title: "Guides",
      slug: "guides",
      type: "folder",
      order: 2,
      isPublished: true,
      lastModified: Date.now(),
      iconName: "Book",
    });

    const apiFolder = await ctx.db.insert("docs", {
      title: "API Reference",
      slug: "api-reference",
      type: "folder",
      order: 3,
      isPublished: true,
      lastModified: Date.now(),
      iconName: "Code",
    });

    // Now create articles under "Getting Started"
    await ctx.db.insert("docs", {
      title: "Installation",
      slug: "installation",
      type: "article",
      order: 1,
      parentId: gettingStartedFolder,
      isPublished: true,
      lastModified: Date.now(),
      iconName: "Download",
      content: `# Installation Guide

Welcome to the installation guide! This will help you get started with the project.

## Prerequisites

Before you begin, make sure you have the following installed:

- Node.js (v18 or higher)
- pnpm (or npm/yarn)
- A Convex account

## Step 1: Install Dependencies

\`\`\`bash
pnpm install
\`\`\`

## Step 2: Set Up Convex

Run the Convex development server:

\`\`\`bash
pnpm run conv
\`\`\`

This will create your Convex project and generate the necessary environment variables.

## Step 3: Start Development Server

In a new terminal, start the frontend:

\`\`\`bash
pnpm run dev
\`\`\`

## Next Steps

- Check out the [Quick Start Guide](./quick-start)
- Explore the [API Documentation](./api-reference)
`,
    });

    await ctx.db.insert("docs", {
      title: "Quick Start",
      slug: "quick-start",
      type: "article",
      order: 2,
      parentId: gettingStartedFolder,
      isPublished: true,
      lastModified: Date.now(),
      iconName: "Zap",
      content: `# Quick Start Guide

Get up and running in 5 minutes!

## Overview

This project is a documentation system built with:
- **TanStack Router** for routing
- **Convex** for backend and database
- **React** for the UI
- **Tailwind CSS** for styling

## Your First Document

1. Navigate to the admin panel
2. Click "New Document"
3. Fill in the title and content
4. Save and publish

## Understanding the Structure

Documents can be either:
- **Folders**: Container for organizing articles
- **Articles**: Actual content pages

## Tips

- Use markdown for rich formatting
- Organize content with folders
- Use slugs for clean URLs
`,
    });

    // Articles under "Guides"
    await ctx.db.insert("docs", {
      title: "Creating Documents",
      slug: "creating-documents",
      type: "article",
      order: 1,
      parentId: guidesFolder,
      isPublished: true,
      lastModified: Date.now(),
      iconName: "FileText",
      content: `# Creating Documents

Learn how to create and manage documents in the system.

## Creating a New Document

### Step 1: Access Admin Panel

Navigate to \`/admin\` in your application.

### Step 2: Click "New Document"

You'll see a form with the following fields:
- **Title**: The display name
- **Slug**: URL-friendly identifier (auto-generated from title)
- **Type**: Choose "folder" or "article"
- **Content**: Markdown content (for articles only)
- **Parent**: Optional parent folder
- **Icon**: Lucide icon name

### Step 3: Fill in Details

- **For Articles**: Add markdown content
- **For Folders**: Leave content empty, they're just containers

### Step 4: Save

Click "Save" to create the document. It will be immediately available if published.

## Best Practices

- Use descriptive titles
- Keep slugs short and meaningful
- Organize with folders
- Use markdown for formatting
`,
    });

    await ctx.db.insert("docs", {
      title: "Markdown Guide",
      slug: "markdown-guide",
      type: "article",
      order: 2,
      parentId: guidesFolder,
      isPublished: true,
      lastModified: Date.now(),
      iconName: "Markdown",
      content: `# Markdown Guide

Complete guide to markdown formatting in documents.

## Headers

\`\`\`markdown
# H1 Header
## H2 Header
### H3 Header
\`\`\`

## Text Formatting

- **Bold**: \`**text**\` or \`__text__\`
- *Italic*: \`*text*\` or \`_text_\`
- \`Code\`: \`\`code\`\`

## Lists

### Unordered
\`\`\`markdown
- Item 1
- Item 2
  - Nested item
\`\`\`

### Ordered
\`\`\`markdown
1. First item
2. Second item
3. Third item
\`\`\`

## Code Blocks

\`\`\`typescript
function example() {
  return "Hello, World!";
}
\`\`\`

## Links

\`\`\`markdown
[Link Text](./path/to/page)
\`\`\`

## Tables

\`\`\`markdown
| Column 1 | Column 2 |
|----------|----------|
| Data 1   | Data 2   |
\`\`\`
`,
    });

    // Articles under "API Reference"
    await ctx.db.insert("docs", {
      title: "Queries",
      slug: "queries",
      type: "article",
      order: 1,
      parentId: apiFolder,
      isPublished: true,
      lastModified: Date.now(),
      iconName: "Search",
      content: `# Queries API

Learn how to query documents from Convex.

## Available Queries

### getNav

Fetch all documents for navigation/sidebar.

\`\`\`typescript
import { useQuery } from "convex/react";
import { api } from "./convex/_generated/api";

const navItems = useQuery(api.docs.getNav);
\`\`\`

Returns: Array of all documents

### getBySlug

Fetch a single document by its slug.

\`\`\`typescript
const doc = useQuery(api.docs.getBySlug, { slug: "installation" });
\`\`\`

**Parameters:**
- \`slug\`: string - The document slug

**Returns:** Document object or null
`,
    });

    await ctx.db.insert("docs", {
      title: "Mutations",
      slug: "mutations",
      type: "article",
      order: 2,
      parentId: apiFolder,
      isPublished: true,
      lastModified: Date.now(),
      iconName: "Edit",
      content: `# Mutations API

Learn how to create, update, and delete documents.

## Available Mutations

### createDoc

Create a new document.

\`\`\`typescript
import { useMutation } from "convex/react";
import { api } from "./convex/_generated/api";

const createDoc = useMutation(api.docs.createDoc);

await createDoc({
  title: "My Document",
  slug: "my-document",
  type: "article",
  order: 1,
  content: "# Content here",
  iconName: "FileText",
});
\`\`\`

### updateDoc

Update an existing document.

\`\`\`typescript
const updateDoc = useMutation(api.docs.updateDoc);

await updateDoc({
  id: docId,
  title: "Updated Title",
  content: "Updated content",
});
\`\`\`

### deleteDoc

Delete a document.

\`\`\`typescript
const deleteDoc = useMutation(api.docs.deleteDoc);

await deleteDoc({ id: docId });
\`\`\`
`,
    });

    return {
      success: true,
      message: "Seed data created successfully!",
      foldersCreated: 3,
      articlesCreated: 6,
    };
  },
});

