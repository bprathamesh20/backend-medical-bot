import OpenAI from "openai";
import dotenv from 'dotenv';
dotenv.config();


const openai = new OpenAI({
    apiKey: process.env.API_KEY, // Replace with your actual API key
});

let report = `Medical Report

Patient Information:
Name: Taylor Anderson
Date of Birth: June 25, 1990
Gender: Female

Chief Complaint:
The patient presents for a routine health checkup and reports no specific health concerns.

Medical History:
The patient has an excellent health history with no known chronic illnesses, allergies, or ongoing medications.

Family History:
There is no significant family history of chronic diseases or hereditary conditions.

Social History:
The patient maintains a healthy lifestyle, including a balanced diet, regular physical activity, and refraining from tobacco or excessive alcohol use.

Vital Signs:
- Blood Pressure: 118/75 mmHg
- Heart Rate: 70 bpm
- Respiratory Rate: 14 breaths per minute
- Temperature: 98.6°F (37°C)
- Oxygen Saturation: 99% on room air

Laboratory Tests:
1. Complete Blood Count (CBC): Within normal limits
2. Fasting Blood Glucose: Normal range (70-99 mg/dL)
3. Lipid Profile: Within normal limits
4. Liver Function Tests: Within normal limits
5. Kidney Function Tests: Within normal limits

Physical Examination:
General: The patient appears well and in no acute distress.
Skin: No abnormalities or lesions noted.
Head, Eyes, Ears, Nose, and Throat (HEENT): No abnormalities detected.
Cardiovascular: Regular rate and rhythm, with no murmurs or irregularities.
Respiratory: Clear breath sounds, no wheezing or abnormalities.
Abdomen: Soft and non-tender, no palpable masses.

Diagnosis:
The patient is in good overall health with no reported diseases.

Treatment Plan:
1. Continue with a healthy lifestyle, including regular exercise and a balanced diet.
2. Schedule routine health checkups every 6 months for ongoing preventive care.

Recommendations:
1. Encourage regular exercise and a well-balanced diet.
2. Provide counseling on preventive health measures.
3. Discuss age-appropriate screenings and vaccinations.

Follow-up:
The patient is advised to schedule a follow-up appointment in six months for routine health monitoring.

Dr. James R. Mitchell, MD
General Practitioner
[Medical Facility Name]
[Date]

`
async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: `Below is the medical report of the patient please analyse the report and provide useful insights in 10 lines
    you have to response like so 

    It appears there may be indications of [Potential Diagnosis]. However, further examination is recommended.
    Some reference: [LINKS] or [FILES]
    Do you have any specific concerns or questions?
    
    ${report}` }],
    model: "ft:gpt-3.5-turbo-1106:personal::8jPTGSKR",
  });

  console.log(completion.choices[0].message.content);
}

main();