import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.API_KEY, // Replace with your actual API key
});

async function FetchMessage(prevMessages, pdfData) {
  const completion = await openai.chat.completions.create({
    messages: [{role: 'system', content: `You are a helpful medical assistant reply in 4-5 sentenses to any of the user queries.` }
      ,{role: 'user', content: `PatinetReport:"""${pdfData}"""` },
     ...prevMessages],
    model: "gpt-3.5-turbo",
  });

  const message = completion.choices[0].message.content
  console.log(completion.choices[0].message.content);
  return message
}

export default FetchMessage;