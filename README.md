# Zadanie rekrutacyjne

W tym zadaniu użyłem frameworku Express dla Node.js.  
Jest on konieczny do przechowywania plików po stronie serweru.  

Pliki w folderze `public` są statyczne. Struktura części klientowej:

```text
public/
    index.html           <-- Główny plik HTML, zawiera strukturę strony
    style.css            <-- Style aplikacji
    js/
        index.js         <-- Główny plik, włączy wszystkie inne
        helpers.js       <-- Zawiera niezależne metode dodatkowe, tj `setCookie`, `getCookies` i inne
        api.js           <-- Metody do pobrania oraz zapisywania danych na serwerze
        config.js        <-- Konfiguracja i wartości standardowe
        dom.js           <-- DOM elementy
        menu/            <-- Każdy plik tego folderu zawiera listenery odpowiadające kategorii, czyli dla menu Edit, File oraz View
            edit.js
            file.js
            view.js

src/
    server.js            <-- Zawiera konfigurację serwera oraz routing
files/                   <-- Folder przechowujący pliki użytkonwików
```

## Jak uruchomić?

- Pobrać archiwum z projektem
- Uruchomić komendę `npm install`
- Uruchomić serwer przez `npm run start`
