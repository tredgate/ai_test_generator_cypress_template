import OpenAI from "openai";

const generateCypressCode = async (
  description,
  identifier,
  steps = "No specific test steps provided"
) => {
  // ? Získání API klíče z .env souboru
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  // ? Nastavení instance OpenAI s API klíčem (aby bylo možné volat API)
  // ! Nikdy nepoužívejte tuto konfiguraci na fronetendu, protože byste odhalili API klíč, běžná praxe je použít API klíč na backend serveru a z frontendu posílat requesty na server, tímto způsobem API klíč zůstane skrytý (pokud někdo nenapadne server a nezjistí API klíč jiným způsobem)
  // ! OpenAI dokumentace bezpečnější způsob: https://beta.openai.com/docs/guides/security

  const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

  // ? Vytvoření promptu pro OpenAI
  const prompt = `Generate a Cypress end-to-end test in Javascript.
  Description: ${description}
  Identifier: ${identifier}
  Steps: ${steps}`.trim();

  // ? Výpis promptu pro kontrolu
  console.log("Prompt: ", prompt);

  const gptResponse = await openai.chat.completions.create({
    model: "gpt-4o-mini-2024-07-18",
    temperature: 0.2,
    messages: [
      {
        role: "developer",
        content:
          "You are senior test automation engineer specializing in Cypress. You task is to generate a Cypress end-to-end test in Javascript based on the provided description, identifier and steps. The output should be pure Javascript code without explanation, comments or formatting like code blocks",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });
  // ? Výpis odpovědi pro kontrolu
  console.log("GPT Response: ", JSON.stringify(gptResponse, null, 2));

  return {
    testCode: gptResponse.choices[0].message.content,
    debugResponse: JSON.stringify(gptResponse, null, 2),
  };
};

export default generateCypressCode;
