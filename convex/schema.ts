import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    username: v.optional(v.string()),
    imageId: v.optional(v.id("_storage")),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
  }).index("email", ["email"]),

  bucketList: defineTable({
    name: v.string(),
    location: v.string(),
    image: v.optional(v.string()),
    userId: v.id("users"),
  }).index("userId", ["userId"]),

  adventures: defineTable({
    title: v.string(),
    location: v.string(),
    startDate: v.string(),
    endDate: v.string(),
    // duration is automatically calculated from startDate and endDate

    gearNeed: v.any(), // later we can define a schema for this

    description: v.optional(v.string()),
    activities: v.optional(v.array(v.string())),

    userId: v.id("users"),
    bucketListId: v.optional(v.id("bucketList")),
  }).index("userId", ["userId"]),

  gearStacks: defineTable({
    name: v.string(),
    emoji: v.any(),
    currentLocation: v.string(),
    nextLocation: v.string(),
    inventory: v.any(), // later we can define a schema for this

    userId: v.id("users"),
  }).index("userId", ["userId"]),
});
