# Notepad (internship task)

In this task we used Node.js with Express. He is necessary to store user's notes on the server.

Files in `public` folder are static. Client's structure:

```text
public/
    index.html           <-- main html file with basic page structure
    style.css
    js/
        index.js         <-- main js file, connects others together
        helpers.js       <-- contains additional independent functions (eg. `setCookie`, `getCookies`, etc)
        api.js           <-- API function for server communications
        config.js
        dom.js           <-- DOM elements declaration
        menu/            <-- files with listeners for each category (Edit, File and View)
            edit.js
            file.js
            view.js

src/
    server.js            <-- contains routing and server config
files/                   <-- user's notes storage
```

## Run

- Download or `git clone` this repository
- Run `npm install`
- Run server with `npm run start`
