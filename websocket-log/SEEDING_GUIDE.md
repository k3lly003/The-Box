# 🌱 Convex Seeding Guide

Complete guide to populating your Convex database with seed data.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Method 1: Using the Seed Script (Recommended)](#method-1-using-the-seed-script-recommended)
3. [Method 2: Using Convex Dashboard](#method-2-using-convex-dashboard)
4. [Method 3: Using Convex CLI](#method-3-using-convex-cli)
5. [Method 4: Manual Creation via Frontend](#method-4-manual-creation-via-frontend)
6. [Customizing Seed Data](#customizing-seed-data)
7. [Verifying Your Data](#verifying-your-data)

---

## Prerequisites

Before seeding, make sure:

✅ **Convex dev server is running** (`pnpm run conv`)  
✅ **Your schema is deployed** (Convex auto-deploys when you run `conv`)  
✅ **You have a Convex project set up** (first run of `conv` will create it)

---

## Method 1: Using the Seed Script (Recommended)

This is the easiest and most automated method.

### Step 1: Run the Seed Mutation

Open a terminal and run:

```bash
npx convex run convex/seedData:seedAll
```

This will:
- Create 3 folders (Getting Started, Guides, API Reference)
- Create 6 sample articles with content
- Set up a proper hierarchy with parent-child relationships

### Step 2: Verify Success

You should see output like:
```
{
  success: true,
  message: "Seed data created successfully!",
  foldersCreated: 3,
  articlesCreated: 6
}
```

### Step 3: Check Your Data

- **In Convex Dashboard**: Visit the URL shown in your `conv` terminal output
- **In Your App**: Navigate to `http://localhost:5173` (or your dev server URL)

---

## Method 2: Using Convex Dashboard

The Convex Dashboard provides a visual interface to manage your data.

### Step 1: Open Dashboard

1. Look at your terminal where `pnpm run conv` is running
2. Find the dashboard URL (usually something like `https://dashboard.convex.dev`)
3. Click the link or copy it to your browser

### Step 2: Navigate to Data

1. In the dashboard, click on **"Data"** in the sidebar
2. Select the **"docs"** table

### Step 3: Add Documents

1. Click **"Add Row"** or **"Insert"**
2. Fill in the required fields:
   - `title`: "Getting Started" (string)
   - `slug`: "getting-started" (string)
   - `type`: "folder" (must be either "folder" or "article")
   - `order`: 1 (number)
   - `isPublished`: true (boolean)
   - `lastModified`: Current timestamp in milliseconds (number)
3. Optional fields:
   - `content`: Leave empty for folders, add markdown for articles
   - `parentId`: ID of parent folder (if creating nested content)
   - `iconName`: "Rocket" (any Lucide icon name)
4. Click **"Save"**

### Step 4: Create Articles

Repeat the process for articles, but:
- Set `type` to `"article"`
- Add markdown content in the `content` field
- Optionally set `parentId` to link to a folder

---

## Method 3: Using Convex CLI

You can run mutations directly from the command line.

### Step 1: Create a Single Document

```bash
npx convex run convex/docs:createDoc --title "My Document" --slug "my-document" --type "article" --order 1 --content "# Hello World"
```

**Note**: The CLI syntax varies. For complex data, use the seed script instead.

### Step 2: Using the Seed Mutation

If you want to seed multiple documents at once:

```bash
npx convex run convex/docs:seed --docs '[{"title":"Doc 1","slug":"doc-1","type":"article","order":1,"content":"# Content"}]'
```

---

## Method 4: Manual Creation via Frontend

If your app has an admin interface, you can create documents there.

### Step 1: Start Your App

```bash
pnpm run dev
```

### Step 2: Navigate to Admin

Go to `http://localhost:5173/admin` (or your admin route)

### Step 3: Create Documents

1. Click **"New Document"**
2. Fill in the form:
   - Title
   - Slug (auto-generated from title)
   - Type (folder/article)
   - Content (for articles)
   - Parent folder (optional)
   - Icon name (optional)
3. Click **"Save"**

---

## Customizing Seed Data

### Editing the Seed Script

1. Open `convex/seedData.ts`
2. Modify the data to match your needs
3. Run the seed again:

```bash
npx convex run convex/seedData:seedAll
```

**⚠️ Warning**: Running the seed multiple times will create duplicate data. You may want to clear existing data first.

### Clearing Existing Data

If you need to start fresh:

1. **Via Dashboard**: Delete rows manually in the Convex Dashboard
2. **Via Mutation**: Create a clear mutation:

```typescript
// In convex/docs.ts
export const clearAll = mutation({
  args: {},
  handler: async (ctx) => {
    const docs = await ctx.db.query("docs").collect();
    for (const doc of docs) {
      await ctx.db.delete(doc._id);
    }
    return { deleted: docs.length };
  },
});
```

Then run:
```bash
npx convex run convex/docs:clearAll
```

### Understanding the Schema

Your documents must have these **required fields**:
- `title`: string
- `slug`: string (unique URL identifier)
- `type`: "folder" | "article"
- `order`: number (for sorting)
- `isPublished`: boolean
- `lastModified`: number (Unix timestamp)

**Optional fields**:
- `content`: string (markdown/HTML, empty for folders)
- `parentId`: Id<"docs"> (for nested structure)
- `iconName`: string (Lucide icon name)
- `headings`: array (auto-generated table of contents)

---

## Verifying Your Data

### Check in Convex Dashboard

1. Open your Convex Dashboard
2. Go to **Data** → **docs** table
3. You should see all your seeded documents

### Check in Your App

1. Start your frontend: `pnpm run dev`
2. Navigate to your app
3. Check the sidebar/navigation - you should see your folders and articles
4. Click on articles to view their content

### Query Data via CLI

Test queries from the command line:

```bash
# Get all documents
npx convex run convex/docs:getNav

# Get a specific document by slug
npx convex run convex/docs:getBySlug --slug "installation"
```

---

## Troubleshooting

### "Function not found" Error

- Make sure your Convex dev server is running (`pnpm run conv`)
- Wait for the schema to deploy (check terminal output)
- Try running `npx convex codegen` to regenerate types

### Duplicate Data

- The seed script doesn't check for existing data
- Clear existing data before re-seeding (see [Clearing Existing Data](#clearing-existing-data))

### Missing Fields Error

- Check that all required fields are provided
- Ensure `type` is exactly `"folder"` or `"article"` (lowercase)
- Make sure `order` is a number, not a string

### Data Not Showing in App

- Verify `VITE_CONVEX_URL` is set in `.env.local`
- Check that your frontend is connected to the same Convex project
- Refresh your browser
- Check browser console for errors

---

## Next Steps

After seeding:

1. ✅ Explore your data in the Convex Dashboard
2. ✅ View documents in your app
3. ✅ Customize the seed data for your needs
4. ✅ Create your own documents via the admin panel
5. ✅ Build out your documentation structure

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `npx convex run convex/seedData:seedAll` | Run the seed script |
| `npx convex run convex/docs:getNav` | Get all documents |
| `npx convex run convex/docs:getBySlug --slug "name"` | Get document by slug |
| `pnpm run conv` | Start Convex dev server |
| `pnpm run dev` | Start frontend dev server |

---

**Happy Seeding! 🌱**

