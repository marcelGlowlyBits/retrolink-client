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
  }),
});