import { 
  users, 
  marineSpecies, 
  researchPapers, 
  oceanZones, 
  conservationTips,
  type User, 
  type InsertUser,
  type MarineSpecies,
  type InsertMarineSpecies,
  type ResearchPaper,
  type InsertResearchPaper,
  type OceanZone,
  type InsertOceanZone,
  type ConservationTip,
  type InsertConservationTip
} from "@shared/schema";
import { db } from "./db";
import { eq, ilike, desc } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Marine species operations
  getAllMarineSpecies(): Promise<MarineSpecies[]>;
  getMarineSpeciesById(id: number): Promise<MarineSpecies | undefined>;
  searchMarineSpecies(query: string): Promise<MarineSpecies[]>;
  createMarineSpecies(species: InsertMarineSpecies): Promise<MarineSpecies>;

  // Research papers operations
  getAllResearchPapers(): Promise<ResearchPaper[]>;
  getLatestResearchPapers(limit: number): Promise<ResearchPaper[]>;
  createResearchPaper(paper: InsertResearchPaper): Promise<ResearchPaper>;

  // Ocean zones operations
  getAllOceanZones(): Promise<OceanZone[]>;
  getOceanZoneById(id: number): Promise<OceanZone | undefined>;
  createOceanZone(zone: InsertOceanZone): Promise<OceanZone>;

  // Conservation tips operations
  getAllConservationTips(): Promise<ConservationTip[]>;
  createConservationTip(tip: InsertConservationTip): Promise<ConservationTip>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getAllMarineSpecies(): Promise<MarineSpecies[]> {
    return await db.select().from(marineSpecies).orderBy(marineSpecies.commonName);
  }

  async getMarineSpeciesById(id: number): Promise<MarineSpecies | undefined> {
    const [species] = await db.select().from(marineSpecies).where(eq(marineSpecies.id, id));
    return species || undefined;
  }

  async searchMarineSpecies(query: string): Promise<MarineSpecies[]> {
    return await db
      .select()
      .from(marineSpecies)
      .where(ilike(marineSpecies.commonName, `%${query}%`))
      .orderBy(marineSpecies.commonName);
  }

  async createMarineSpecies(species: InsertMarineSpecies): Promise<MarineSpecies> {
    const [newSpecies] = await db
      .insert(marineSpecies)
      .values(species)
      .returning();
    return newSpecies;
  }

  async getAllResearchPapers(): Promise<ResearchPaper[]> {
    return await db.select().from(researchPapers).orderBy(desc(researchPapers.publishDate));
  }

  async getLatestResearchPapers(limit: number): Promise<ResearchPaper[]> {
    return await db
      .select()
      .from(researchPapers)
      .orderBy(desc(researchPapers.publishDate))
      .limit(limit);
  }

  async createResearchPaper(paper: InsertResearchPaper): Promise<ResearchPaper> {
    const [newPaper] = await db
      .insert(researchPapers)
      .values(paper)
      .returning();
    return newPaper;
  }

  async getAllOceanZones(): Promise<OceanZone[]> {
    return await db.select().from(oceanZones);
  }

  async getOceanZoneById(id: number): Promise<OceanZone | undefined> {
    const [zone] = await db.select().from(oceanZones).where(eq(oceanZones.id, id));
    return zone || undefined;
  }

  async createOceanZone(zone: InsertOceanZone): Promise<OceanZone> {
    const [newZone] = await db
      .insert(oceanZones)
      .values(zone)
      .returning();
    return newZone;
  }

  async getAllConservationTips(): Promise<ConservationTip[]> {
    return await db.select().from(conservationTips);
  }

  async createConservationTip(tip: InsertConservationTip): Promise<ConservationTip> {
    const [newTip] = await db
      .insert(conservationTips)
      .values(tip)
      .returning();
    return newTip;
  }
}

export const storage = new DatabaseStorage();
