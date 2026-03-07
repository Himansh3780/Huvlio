// OpenAI API client
const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

export const generateDocument = async (templatePrompt, userInputs) => {
  try {
    const prompt = templatePrompt.replace(/{(\w+)}/g, (match, key) => {
      return userInputs[key] || match;
    });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a professional document writer. Generate formal, well-structured documents.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const generatedText = data.choices[0].message.content;

    return {
      success: true,
      text: generatedText,
      tokens_used: data.usage.total_tokens
    };
  } catch (error) {
    console.error('Error generating document:', error);
    return {
      success: false,
      error: error.message
    };
  }
};
