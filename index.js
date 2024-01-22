import OpenAI from "openai";
import dotenv from 'dotenv';
import report from "./report.js";
dotenv.config();



const openai = new OpenAI({
    apiKey: process.env.API_KEY, // Replace with your actual API key
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: `Below is the medical report of the patient please analyse the report and provide useful insights in 10 lines
    you have to response like so 

    It appears there may be indications of [Potential Diagnosis]. However, further examination is recommended.
    Do you have any specific concerns or questions?
    
    ${report}` }],
    model: "ft:gpt-3.5-turbo-1106:personal::8jPTGSKR",
  });

  console.log(completion.choices[0].message.content);
}

main();