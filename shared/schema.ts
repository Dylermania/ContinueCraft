import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email"),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const devices = pgTable("devices", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  osVersion: text("os_version").notNull(),
  cpuArchitecture: text("cpu_architecture").notNull(),
  ram: text("ram").notNull(),
  gpu: text("gpu"),
  storage: text("storage").notNull(),
  isRooted: boolean("is_rooted").default(false),
  performanceScore: integer("performance_score"),
  model: text("model"),
  userAgent: text("user_agent"),
  additionalSpecs: jsonb("additional_specs"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const apps = pgTable("apps", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  packageName: text("package_name"),
  developer: text("developer"),
  category: text("category"),
  size: text("size"),
  minAndroidVersion: text("min_android_version"),
  minRam: text("min_ram"),
  minCpu: text("min_cpu"),
  minStorage: text("min_storage"),
  icon: text("icon"),
  isPopular: boolean("is_popular").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const compatibilityChecks = pgTable("compatibility_checks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  deviceId: integer("device_id"),
  appId: integer("app_id"),
  appName: text("app_name").notNull(),
  isCompatible: boolean("is_compatible").notNull(),
  compatibilityScore: integer("compatibility_score"),
  issues: jsonb("issues"),
  suggestions: jsonb("suggestions"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertDeviceSchema = createInsertSchema(devices).omit({
  id: true,
  createdAt: true,
});

export const insertAppSchema = createInsertSchema(apps).omit({
  id: true,
  createdAt: true,
});

export const insertCompatibilityCheckSchema = createInsertSchema(compatibilityChecks).omit({
  id: true,
  createdAt: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Device = typeof devices.$inferSelect;
export type InsertDevice = z.infer<typeof insertDeviceSchema>;
export type App = typeof apps.$inferSelect;
export type InsertApp = z.infer<typeof insertAppSchema>;
export type CompatibilityCheck = typeof compatibilityChecks.$inferSelect;
export type InsertCompatibilityCheck = z.infer<typeof insertCompatibilityCheckSchema>;
