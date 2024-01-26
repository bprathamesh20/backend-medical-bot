import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.API_KEY, // Replace with your actual API key
});

async function FetchResponse(report) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: `Below is the medical report of the patient please analyse the report and provide useful insights in minimum 10 lines
    you have to response like so 

    It appears there may be indications of [Potential Diagnosis].
    This appears to caused by [Potential Causes]
      However, further examination is recommended.
    Do you have any specific concerns or questions?
    
    ${report}` }],
    model: "ft:gpt-3.5-turbo-1106:personal::8jPTGSKR",
  });

  const message = completion.choices[0].message.content
  console.log(completion.choices[0].message.content);
  return message
}

export default FetchResponse;