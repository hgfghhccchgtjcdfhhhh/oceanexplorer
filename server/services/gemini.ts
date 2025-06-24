import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY
});

export async function enhanceMarineResearch(query: string, context: string): Promise<string> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Gemini API key not configured");
    }

    const systemPrompt = `You are OceanRobot, a highly intelligent AI assistant. While you specialize in marine biology and oceanography, you can help with any topic or question including:
    - General knowledge and education
    - Creative writing and content creation
    - YouTube ads and marketing
    - Technology and science
    - Problem-solving and analysis
    - Marine research and conservation
    
    Provide helpful, detailed, and accurate responses regardless of the topic. Be conversational and engaging while maintaining accuracy.`;

    const prompt = context 
      ? `Context: ${context}\n\nQuery: ${query}\n\nProvide additional insights and information on this topic.`
      : `Query: ${query}\n\nProvide a comprehensive and helpful response to this question.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
      },
      contents: prompt,
    });

    return response.text || "I'm unable to process that request right now.";
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error(`Failed to get AI response: ${error}`);
  }
}

export async function generateMarineEducationContent(topic: string, level: 'beginner' | 'intermediate' | 'advanced'): Promise<{
  summary: string;
  keyPoints: string[];
  activities: string[];
  furtherReading: string[];
}> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            summary: { type: "string" },
            keyPoints: { 
              type: "array",
              items: { type: "string" }
            },
            activities: {
              type: "array", 
              items: { type: "string" }
            },
            furtherReading: {
              type: "array",
              items: { type: "string" }
            }
          },
          required: ["summary", "keyPoints", "activities", "furtherReading"]
        }
      },
      contents: `Create comprehensive educational content about ${topic} for ${level} level learners. Include interactive activities and learning resources suitable for marine biology education.`,
    });

    const result = JSON.parse(response.text || "{}");

    return {
      summary: result.summary || `Educational content about ${topic}`,
      keyPoints: result.keyPoints || [],
      activities: result.activities || [],
      furtherReading: result.furtherReading || []
    };
  } catch (error) {
    console.error("Educational content generation error:", error);
    throw new Error(`Failed to generate educational content: ${error}`);
  }
}

export async function analyzeOceanImage(base64Image: string): Promise<{
  species: string[];
  ecosystem: string;
  conditions: string;
  threats: string[];
  recommendations: string[];
}> {
  try {
    const contents = [
      {
        inlineData: {
          data: base64Image,
          mimeType: "image/jpeg",
        },
      },
      `Analyze this marine/ocean image and identify:
      1. Marine species visible
      2. Ecosystem type and characteristics
      3. Environmental conditions
      4. Potential threats or conservation concerns
      5. Recommendations for protection or research
      
      Format response as JSON with species, ecosystem, conditions, threats, and recommendations fields.`
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: contents,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            species: { type: "array", items: { type: "string" } },
            ecosystem: { type: "string" },
            conditions: { type: "string" },
            threats: { type: "array", items: { type: "string" } },
            recommendations: { type: "array", items: { type: "string" } }
          },
          required: ["species", "ecosystem", "conditions", "threats", "recommendations"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");

    return {
      species: result.species || [],
      ecosystem: result.ecosystem || "Unknown ecosystem",
      conditions: result.conditions || "Conditions not determined",
      threats: result.threats || [],
      recommendations: result.recommendations || []
    };
  } catch (error) {
    console.error("Ocean image analysis error:", error);
    throw new Error(`Failed to analyze ocean image: ${error}`);
  }
}
