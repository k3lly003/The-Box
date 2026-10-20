// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    docs: defineTable({
        title: v.string(),
        slug: v.string(), // e.g. "installation-guide"
        content: v.string(),
        type: v.union(v.literal("folder"), v.literal("article")),
        parentId: v.optional(v.string()), // ID of the parent folder
        iconName: v.optional(v.string()), // e.g. "Folder", "Settings", "FileText"
        order: v.number(), // To keep the list sorted
    }).index("by_parent", ["parentId"]),
});