import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generates a document based on a template prompt and user inputs using Gemini AI.
 * 
 * @param {string} templatePrompt - The base prompt for the document
 * @param {Object} userInputs - Key-value pairs of user provided information
 * @returns {Promise<Object>} - Success status and generated text or error message
 */
export const generateDocument = async (templatePrompt, userInputs) => {
  try {
    // Replace placeholders like {name} with values from userInputs
    const prompt = templatePrompt.replace(/{(\w+)}/g, (match, key) => {
      return userInputs[key] || match;
    });

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent([
      "You are a professional document writer. Generate formal, well-structured documents.",
      prompt
    ]);
    
    const response = await result.response;
    const generatedText = response.text();

    return {
      success: true,
      text: generatedText,
    };
  } catch (error) {
    console.error('Error generating document with Gemini:', error);
    return {
      success: false,
      error: error.message
    };
  }
};
