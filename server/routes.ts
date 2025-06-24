import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getMarineResearch, identifyMarineSpecies, generateConservationPlan } from "./services/openai";
import { enhanceMarineResearch, generateMarineEducationContent, analyzeOceanImage } from "./services/gemini";
import { seedMarineData } from "./services/marine-data";
import { z } from "zod";

const chatMessageSchema = z.object({
  message: z.string().min(1),
  type: z.enum(['species', 'ecosystem', 'conservation', 'research', 'general']).optional()
});

const speciesIdentificationSchema = z.object({
  description: z.string().min(1)
});

const conservationPlanSchema = z.object({
  species: z.string().min(1),
  threats: z.array(z.string())
});

const educationContentSchema = z.object({
  topic: z.string().min(1),
  level: z.enum(['beginner', 'intermediate', 'advanced'])
});

const imageAnalysisSchema = z.object({
  image: z.string().min(1) // base64 encoded image
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Seed marine data on startup (only run once in production)
  if (process.env.NODE_ENV === "development") {
    try {
      await seedMarineData();
    } catch (error) {
      console.log("Marine data already seeded or error occurred:", error);
    }
  }

  // Marine species endpoints
  app.get("/api/species", async (req, res) => {
    try {
      const species = await storage.getAllMarineSpecies();
      res.json(species);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch marine species" });
    }
  });

  app.get("/api/species/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const species = await storage.getMarineSpeciesById(id);
      if (!species) {
        return res.status(404).json({ error: "Species not found" });
      }
      res.json(species);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch species" });
    }
  });

  app.get("/api/species/search/:query", async (req, res) => {
    try {
      const query = req.params.query;
      const species = await storage.searchMarineSpecies(query);
      res.json(species);
    } catch (error) {
      res.status(500).json({ error: "Failed to search species" });
    }
  });

  // Ocean zones endpoints
  app.get("/api/zones", async (req, res) => {
    try {
      const zones = await storage.getAllOceanZones();
      res.json(zones);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch ocean zones" });
    }
  });

  // Research papers endpoints
  app.get("/api/research", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const papers = await storage.getLatestResearchPapers(limit);
      res.json(papers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch research papers" });
    }
  });

  // Conservation tips endpoints
  app.get("/api/conservation", async (req, res) => {
    try {
      const tips = await storage.getAllConservationTips();
      res.json(tips);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch conservation tips" });
    }
  });

  // OceanRobot AI chat endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, type = 'general' } = chatMessageSchema.parse(req.body);
      
      console.log("Processing chat message:", message);
      console.log("OpenAI API Key exists:", !!process.env.OPENAI_API_KEY);
      console.log("Gemini API Key exists:", !!process.env.GEMINI_API_KEY);
      
      let primaryResponse;
      let enhancedInsights = "";
      
      // Try OpenAI first, fall back to Gemini if it fails
      try {
        primaryResponse = await getMarineResearch({ query: message, type });
        
        // Enhance response with Gemini for additional insights
        try {
          enhancedInsights = await enhanceMarineResearch(message, primaryResponse.answer);
        } catch (geminiError) {
          console.warn("Gemini enhancement failed:", geminiError);
          enhancedInsights = "Additional insights temporarily unavailable.";
        }
        
        res.json({
          answer: primaryResponse.answer,
          enhancedInsights,
          sources: primaryResponse.sources,
          confidence: primaryResponse.confidence,
          relatedTopics: primaryResponse.relatedTopics
        });
        
      } catch (openaiError) {
        console.warn("OpenAI failed, using Gemini as fallback:", openaiError);
        
        // Fallback to Gemini only
        try {
          const geminiResponse = await enhanceMarineResearch(message, "");
          res.json({
            answer: geminiResponse,
            enhancedInsights: "Response powered by Gemini AI (OpenAI quota exceeded)",
            sources: ["Gemini AI Analysis"],
            confidence: 0.85,
            relatedTopics: ["Ask me anything", "AI assistance", "General knowledge"]
          });
        } catch (geminiError) {
          throw new Error("Both AI services unavailable. OpenAI quota exceeded, Gemini also failed.");
        }
      }
    } catch (error) {
      console.error("Chat error details:", error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ 
        error: "Failed to process chat message",
        answer: `I'm having trouble connecting to my AI services. Error: ${errorMessage}. Please check that your API keys are properly configured.`
      });
    }
  });

  // Species identification endpoint
  app.post("/api/identify-species", async (req, res) => {
    try {
      const { description } = speciesIdentificationSchema.parse(req.body);
      const identification = await identifyMarineSpecies(description);
      res.json(identification);
    } catch (error) {
      console.error("Species identification error:", error);
      res.status(500).json({ error: "Failed to identify species" });
    }
  });

  // Conservation plan generation endpoint
  app.post("/api/conservation-plan", async (req, res) => {
    try {
      const { species, threats } = conservationPlanSchema.parse(req.body);
      const plan = await generateConservationPlan(species, threats);
      res.json(plan);
    } catch (error) {
      console.error("Conservation plan error:", error);
      res.status(500).json({ error: "Failed to generate conservation plan" });
    }
  });

  // Educational content generation endpoint
  app.post("/api/education", async (req, res) => {
    try {
      const { topic, level } = educationContentSchema.parse(req.body);
      const content = await generateMarineEducationContent(topic, level);
      res.json(content);
    } catch (error) {
      console.error("Education content error:", error);
      res.status(500).json({ error: "Failed to generate educational content" });
    }
  });

  // Ocean image analysis endpoint
  app.post("/api/analyze-image", async (req, res) => {
    try {
      const { image } = imageAnalysisSchema.parse(req.body);
      const analysis = await analyzeOceanImage(image);
      res.json(analysis);
    } catch (error) {
      console.error("Image analysis error:", error);
      res.status(500).json({ error: "Failed to analyze ocean image" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
