# Zadanie rekrutacyjne

W tym zadaniu użyłem frameworku Express dla Node.js.  
Jest on konieczny do przechowywania plików po stronie serweru.  

Pliki w folderze `public` są statyczne. Struktura części klientowej:

```text
public/
    index.html   <-- Główny plik HTML, zawiera strukturę strony
    index.css    <-- Plik ze wszystkimi stylami dla bloków
    js/
        index.js    <-- Zawiera startową konfigurację, tz wszystkie DOM elementy i zmienne statyczne potrzebne do pracy
        helpers.js    <-- Zawiera niezależne metode dodatkowe, tj `setCookie`, `getCookies` i inne
        menu/            <-- Każdy plik tego folderu zawiera listenery odpowiadające kategorii, czyli dla menu Edit, File oraz View
            edit.js
            file.js
            view.js

src/
    server.js    <-- Zawiera konfigurację serwera oraz routing
files/    <-- Folder przechowujący pliki użytkonwików
```

## Jak uruchomić?

- Pobrać archiwum z projektem
- Uruchomić komendę `npm install`
- Uruchomić serwer przez `npm run start`
