const generateCypressCode = async (description, identifier, steps) => {
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
  return {
    testCode: `tady bude vygenerovaný kód pro test s popisem: ${description}, identifikátorem: ${identifier} \na kroky: ${steps}`,
    debugResponse: "Tady bude celá odpověď z API...",
  };
};

export default generateCypressCode;
