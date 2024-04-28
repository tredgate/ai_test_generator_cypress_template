## Tredgate AI kurz - Cypress test generator

### Popis

Tato aplikace je vzorovým projektem pro kurz AI. Její hlavní funkcí je generování kódu pro testování pomocí nástroje Cypress na základě vstupních parametrů.
V hlavní (main) branch je připravená struktura React bez implementace AI.
Hotový projekt s implementací AI je v branchi `ai-implementation`.

### Jak aplikaci spustit

Pro spuštění aplikace je potřeba mít nainstalovaný Node.js a npm.
Poté je potřeba spustit následující příkazy:

1. `npm install`
2. `npm start`

Pro použití AI části aplikace je potřeba mít vygenerovaný API klíč pro [OpenAI](https://platform.openai.com/docs/quickstart). Ten je potřeba vložit do souboru `.env` pod názvem `REACT_APP_OPENAI_API_KEY` v kořenovém adresáři aplikace.

### Struktura aplikace

Aplikace je postavena na knihovně React a má následující strukturu:

- `public/`: Obsahuje veřejné soubory jako je index.html a obrázky.
- `src/`: Obsahuje zdrojový kód aplikace.
- `ai/`: Obsahuje soubor [generateCypressCode.js](command:_github.copilot.openSymbolInFile?%5B%22src%2Fai%2FgenerateCypressCode.js%22%2C%22generateCypressCode.js%22%5D "src/ai/generateCypressCode.js"), který je zodpovědný za generování kódu pro testování.
- [App.js](command:_github.copilot.openSymbolInFile?%5B%22src%2FApp.js%22%2C%22App.js%22%5D "src/App.js"): Hlavní komponenta aplikace.

### Jak používat aplikaci

Aplikace má jednoduché uživatelské rozhraní, které se skládá z následujících částí:

1. Pole pro popis testu: Zde uživatel zadává popis testu.
2. Pole pro identifikátor: Zde uživatel zadává identifikátor.
3. Pole pro kroky: Zde uživatel zadává kroky testu.

Po stisknutí tlačítka "Generovat" aplikace vygeneruje kód pro testování a zobrazí ho na obrazovce.
