import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const generatePersonalizedEmailContent = async (companyName, headName) => {
  try {
    const prompt = `Create a friendly, personalized email message for ${headName} at ${companyName} introducing our company and inviting them to learn more about our services.`;

    const response = await openai.createCompletion({
      model: "text-davinci-003", // Or any model you prefer
      prompt,
      max_tokens: 100,
    });

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error generating personalized email content:", error);
    return "Thank you for your interest in our company! We would like to know more about the possible catch up!"; // Fallback message
  }
};
