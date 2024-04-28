// TODO: implementovat AI
// ? Kroky:
/*
    1. Příprava promptu pro OpenAI
        a. Připravit vzor promptu
        b. Zpracovat parametry: description, identifier, steps
            i. description - popis testu - required
            ii. identifier - identifikátor - required
            iii. steps - kroky - optional, připravit defaultní hodnotu
        c. Naplnit prompt
    2. Připravit OpenAI API request
        a. Získat API klíč - dotenv: REACT_APP_OPENAI_API_KEY (.env soubor je nutné vytvořit v root adresáři projektu)
        b. Připravit request
    3. Odeslat request
    4. Zpracovat response
        a. Získat testCode
        b. Získat debugResponse
    5. Vrátit výsledek
  */
import OpenAI from "openai";
import dotenv from "dotenv";

const generateCypressCode = async (description, identifier, steps) => {
  dotenv.config();
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  const openai = new OpenAI({
    apiKey: apiKey,
  });

  // Příprava promptu
  const promptInit =
    "Generate Cypress test code with the following instrocutions. Return only the code in the response using Javascript language.";
  const promptDescription = `Description: ${description}`;
  const promptIdentifier = `Identifier: ${identifier}`;
  const promptSteps = `Steps: ${steps}`;
  let prompt;

  if (steps) {
    prompt = `${promptInit}\n${promptDescription}\n${promptIdentifier}\n${promptSteps}`;
  } else {
    prompt = `${promptInit}\n${promptDescription}\n${promptIdentifier}`;
  }

  // Příprava requestu
  const gptResponse = await openai.complete({
    engine: "gpt-3.5-turbo-0125",
    prompt: prompt,
    maxTokens: 500,
    messages: [
      {
        role: "system",
        content: prompt,
      },
    ],
  });

  // Debug do konzole
  console.log(JSON.stringify(gptResponse, null, 2));

  return {
    testCode: gptResponse.choices[0].message,
    debugResponse: JSON.stringify(gptResponse, null, 2),
  };
};

export default generateCypressCode;
