import { HfInference } from "@huggingface/inference";

const client = new HfInference(process.env.HUGGINGFACE_API_KEY);

export async function generateApplicationContent(
  prompt: string,
  userInput: Record<string, any>
): Promise<string> {
  try {
    const systemPrompt = `You are an expert application writer. Generate a professional, compelling, and personalized application based on the provided information. 
    
User Information:
- Name: ${userInput.name}
- Email: ${userInput.email}
- Experience: ${userInput.experience}
- Skills: ${userInput.skills}
- Achievements: ${userInput.achievements}
- Motivations: ${userInput.motivations}

Generate a well-structured, professional application content that is specific to the ${userInput.type} application.`;

    const response = await client.textGeneration({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      prompt: systemPrompt + "\n\n" + prompt,
      details: true,
      max_new_tokens: 1000,
    });

    if (typeof response === "string") {
      return response;
    }

    if ("generated_text" in response) {
      return response.generated_text;
    }

    return "";
  } catch (error) {
    console.error("Error generating content:", error);
    throw new Error("Failed to generate application content");
  }
}

export async function improveApplicationContent(
  content: string,
  feedback: string
): Promise<string> {
  try {
    const prompt = `You are an expert editor. Based on the following feedback, improve and refine this application content:

Original Content:
${content}

Feedback to address:
${feedback}

Provide an improved version of the content that incorporates the feedback while maintaining professionalism and structure.`;

    const response = await client.textGeneration({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      prompt,
      details: true,
      max_new_tokens: 1000,
    });

    if (typeof response === "string") {
      return response;
    }

    if ("generated_text" in response) {
      return response.generated_text;
    }

    return "";
  } catch (error) {
    console.error("Error improving content:", error);
    throw new Error("Failed to improve application content");
  }
}
