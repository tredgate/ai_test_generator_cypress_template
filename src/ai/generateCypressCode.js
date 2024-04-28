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

const generateCypressCode = async (description, identifier, steps) => {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  const openai = new OpenAI({
    apiKey: apiKey,
    // ! Nikdy nepoužívejte tuto konfiguraci na fronetendu, protože byste odhalili API klíč, běžná praxe je použít API klíč na backend serveru a z frontendu posílat requesty na server, tímto způsobem API klíč zůstane skrytý (pokud někdo nenapadne server a nezjistí API klíč jiným způsobem)
    // ! OpenAI dokumentace bezpečnější způsob: https://beta.openai.com/docs/guides/security
    dangerouslyAllowBrowser: true,
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
  const gptResponse = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: prompt,
      },
    ],
    model: "gpt-3.5-turbo-0125",
  });

  // Debug do konzole
  console.log(JSON.stringify(gptResponse, null, 2));

  return {
    testCode: gptResponse.choices[0].message.content,
    debugResponse: JSON.stringify(gptResponse, null, 2),
  };
};

export default generateCypressCode;
