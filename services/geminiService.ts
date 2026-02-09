import { GoogleGenAI } from "@google/genai";
import { ImageSize } from "../types";

export const generateImage = async (prompt: string, size: ImageSize): Promise<string> => {
  // 1. Check/Request API Key
  if (window.aistudio) {
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      await window.aistudio.openSelectKey();
    }
  }

  // 2. Initialize Client (must happen after key selection)
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // 3. Make the API Call
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
          imageSize: size,
        },
      },
    });

    // 4. Extract Image
    if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }
    }
    
    throw new Error("No image data found in response");

  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    // If we get a "Requested entity was not found" or 404/403 related to keys, prompt again
    if (error instanceof Error && (error.message.includes("Requested entity was not found") || error.message.includes("403") || error.message.includes("404"))) {
        if(window.aistudio) {
             await window.aistudio.openSelectKey();
             // Retry once (optional, but good UX) - for now just throw to let UI handle retry
        }
    }
    throw error;
  }
};