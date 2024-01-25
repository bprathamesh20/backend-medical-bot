import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.API_KEY, // Replace with your actual API key
});

async function FetchMessage(prevMessages) {
  const completion = await openai.chat.completions.create({
    messages: prevMessages,
    model: "ft:gpt-3.5-turbo-1106:personal::8jPTGSKR",
  });

  const message = completion.choices[0].message.content
  console.log(completion.choices[0].message.content);
  return message
}

export default FetchMessage;