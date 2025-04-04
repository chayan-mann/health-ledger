import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API with Vite's environment variable
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const fetchAIResponse = async (prompt) => {
  try {
    // Fetch the model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Send the prompt
    const result = await model.generateContent(prompt);
    const response = await result.response;

    return response.text(); // Extracts and returns the AI-generated text
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "Error fetching AI response. Please try again.";
  }
};
