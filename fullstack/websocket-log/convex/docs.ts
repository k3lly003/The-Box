import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Fetch the list for the Sidebar
export const getNav = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("docs").collect();
  },
});

// Fetch a single article by slug
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("docs")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

// Create a new document
export const createDoc = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    content: v.optional(v.string()), // Optional - folders don't have content
    type: v.union(v.literal("folder"), v.literal("article")),
    order: v.number(),
    parentId: v.optional(v.id("docs")), // Corrected to v.id
    iconName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("docs", {
      ...args,
      isPublished: true, // Required by schema
      lastModified: Date.now(), // Required by schema
    });
  },
});

// Update an existing document
export const updateDoc = mutation({
  args: {
    id: v.id("docs"),
    title: v.optional(v.string()),
    slug: v.optional(v.string()),
    content: v.optional(v.string()),
    type: v.optional(v.union(v.literal("folder"), v.literal("article"))),
    order: v.optional(v.number()),
    parentId: v.optional(v.id("docs")), // Corrected to v.id
    iconName: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    // Spread updates and refresh the timestamp
    await ctx.db.patch(id, {
      ...updates,
      lastModified: Date.now(),
    });
    
    return await ctx.db.get(id);
  },
});

// Delete a document
export const deleteDoc = mutation({
  args: {
    id: v.id("docs"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return { success: true };
  },
});

// Updated Seed to match literal types and required fields
export const seed = mutation({
  args: {
    docs: v.array(
      v.object({
        title: v.string(),
        slug: v.string(),
        content: v.optional(v.string()),
        type: v.union(v.literal("folder"), v.literal("article")), // Corrected
        order: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    for (const doc of args.docs) {
      await ctx.db.insert("docs", {
        ...doc,
        isPublished: true,
        lastModified: Date.now(),
      });
    }
  },
});