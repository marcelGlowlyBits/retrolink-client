import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  listings: defineTable({
    title: v.string(),
    description: v.string(),
    price: v.number(),
    category: v.string(),
    condition: v.string(),
    platform: v.string(),
    hasDamage: v.boolean(),
    damageDescription: v.optional(v.string()),
  }),
  users: defineTable({
    userId: v.string(),
    email: v.string(),
    username: v.optional(v.string()),
    image_url: v.optional(v.string()),
  }).index("by_userId", ["userId"]),
});
