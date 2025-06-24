import { pgTable, text, serial, integer, boolean, decimal, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const marineSpecies = pgTable("marine_species", {
  id: serial("id").primaryKey(),
  commonName: text("common_name").notNull(),
  scientificName: text("scientific_name").notNull(),
  description: text("description").notNull(),
  habitat: text("habitat").notNull(),
  oceanZone: text("ocean_zone").notNull(),
  conservationStatus: text("conservation_status").notNull(),
  diet: text("diet").notNull(),
  averageSize: text("average_size").notNull(),
  lifespan: text("lifespan"),
  threats: text("threats").array(),
  imageUrl: text("image_url"),
  funFacts: text("fun_facts").array(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const researchPapers = pgTable("research_papers", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  source: text("source").notNull(),
  publishDate: timestamp("publish_date").notNull(),
  url: text("url"),
  tags: text("tags").array(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const oceanZones = pgTable("ocean_zones", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  depth: text("depth").notNull(),
  characteristics: text("characteristics").notNull(),
  temperature: text("temperature"),
  pressure: text("pressure"),
  lightLevel: text("light_level"),
  commonSpecies: text("common_species").array(),
});

export const conservationTips = pgTable("conservation_tips", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  impact: text("impact").notNull(),
  difficulty: text("difficulty").notNull(),
});

// Relations
export const marineSpeciesRelations = relations(marineSpecies, ({ many }) => ({
  // Add relations if needed
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertMarineSpeciesSchema = createInsertSchema(marineSpecies).omit({
  id: true,
  createdAt: true,
});

export const insertResearchPaperSchema = createInsertSchema(researchPapers).omit({
  id: true,
  createdAt: true,
});

export const insertOceanZoneSchema = createInsertSchema(oceanZones).omit({
  id: true,
});

export const insertConservationTipSchema = createInsertSchema(conservationTips).omit({
  id: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertMarineSpecies = z.infer<typeof insertMarineSpeciesSchema>;
export type MarineSpecies = typeof marineSpecies.$inferSelect;

export type InsertResearchPaper = z.infer<typeof insertResearchPaperSchema>;
export type ResearchPaper = typeof researchPapers.$inferSelect;

export type InsertOceanZone = z.infer<typeof insertOceanZoneSchema>;
export type OceanZone = typeof oceanZones.$inferSelect;

export type InsertConservationTip = z.infer<typeof insertConservationTipSchema>;
export type ConservationTip = typeof conservationTips.$inferSelect;
