import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY
});

export interface MarineResearchQuery {
  query: string;
  type: 'species' | 'ecosystem' | 'conservation' | 'research' | 'general';
}

export interface MarineResearchResponse {
  answer: string;
  sources: string[];
  confidence: number;
  relatedTopics: string[];
}

export async function getMarineResearch(query: MarineResearchQuery): Promise<MarineResearchResponse> {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OpenAI API key not configured");
    }
    const systemPrompt = `You are OceanRobot, a highly intelligent AI assistant with expertise in marine biology and oceanography, but capable of helping with any topic or question. While you specialize in:
    - Marine species identification and behavior
    - Ocean ecosystems and zones
    - Marine conservation efforts
    - Latest oceanographic research
    - Climate change impacts on marine life
    - Sustainable fishing practices
    - Coral reef ecology
    - Deep sea exploration

    You can also assist with general knowledge, creative tasks, problem-solving, education, technology, science, and any other topics users might ask about. Provide helpful, accurate, and detailed responses regardless of the subject matter.

    For marine-related topics, include specific scientific facts and research. For other topics, provide comprehensive and useful information tailored to the user's needs.

    Format your response as JSON with the following structure:
    {
      "answer": "detailed response",
      "sources": ["source1", "source2"],
      "confidence": 0.95,
      "relatedTopics": ["topic1", "topic2", "topic3"]
    }`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: `Query type: ${query.type}\nQuestion: ${query.query}`
        }
      ],
      response_format: { type: "json_object" },
      tools: [
        {
          type: "function",
          function: {
            name: "web_search",
            description: "Search the web for current marine research and oceanographic data",
            parameters: {
              type: "object",
              properties: {
                query: {
                  type: "string",
                  description: "Search query for marine research"
                }
              },
              required: ["query"]
            }
          }
        }
      ],
      tool_choice: "auto"
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");

    return {
      answer: result.answer || "I couldn't process that query. Please try rephrasing your question about marine life.",
      sources: result.sources || [],
      confidence: Math.max(0, Math.min(1, result.confidence || 0.8)),
      relatedTopics: result.relatedTopics || []
    };
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error(`Failed to get marine research: ${error}`);
  }
}

export async function identifyMarineSpecies(description: string): Promise<{
  species: string;
  confidence: number;
  characteristics: string[];
  habitat: string;
  funFacts: string[];
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a marine species identification expert. Based on the description provided, identify the most likely marine species and provide detailed information. Format your response as JSON with the following structure:
          {
            "species": "Common Name (Scientific Name)",
            "confidence": 0.95,
            "characteristics": ["key identifying features"],
            "habitat": "habitat description",
            "funFacts": ["interesting facts about the species"]
          }`
        },
        {
          role: "user",
          content: description
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");

    return {
      species: result.species || "Unknown Species",
      confidence: Math.max(0, Math.min(1, result.confidence || 0.5)),
      characteristics: result.characteristics || [],
      habitat: result.habitat || "Unknown habitat",
      funFacts: result.funFacts || []
    };
  } catch (error) {
    console.error("Species identification error:", error);
    throw new Error(`Failed to identify species: ${error}`);
  }
}

export async function generateConservationPlan(species: string, threats: string[]): Promise<{
  plan: string;
  actions: string[];
  timeline: string;
  resources: string[];
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a marine conservation expert. Create a comprehensive conservation plan for the specified species considering the given threats. Format your response as JSON with:
          {
            "plan": "overall conservation strategy",
            "actions": ["specific action items"],
            "timeline": "implementation timeline",
            "resources": ["required resources and organizations"]
          }`
        },
        {
          role: "user",
          content: `Species: ${species}\nThreats: ${threats.join(", ")}`
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");

    return {
      plan: result.plan || "Conservation plan could not be generated",
      actions: result.actions || [],
      timeline: result.timeline || "Timeline not specified",
      resources: result.resources || []
    };
  } catch (error) {
    console.error("Conservation plan error:", error);
    throw new Error(`Failed to generate conservation plan: ${error}`);
  }
}
