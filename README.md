# brianfomo

brianfomo is an application containing JavaScript. The checked-in dependency manifests use Express, MongoDB via Mongoose. Source modules cover `auth.controller`, `chats.controller`, `contacts.controller`, `messages.controller`, `users.controller`, `chat-participant.model`, `chat.model`, `contact.model`, `message.model`, `user.model`.

## Repository layout

- `src/` — 27 tracked file(s); source examples: `src/config/config.js`, `src/connections/database.js`.

## Local setup

Run each package setup block from the repository root. For workspace repositories, install dependencies at the root before running application-specific scripts.

Clone this repository and enter its directory:

```sh
git clone https://github.com/stanleyHayes/brianfomo.git
cd brianfomo
```

### Node package: `package.json`

Use Node.js and npm.

```sh
npm install
```

- `npm run dev` — runs the declared `dev` script (`nodemon src/server/server.js`).
- `npm run start` — runs the declared `start` script (`node src/server/server.js`).
- `npm run lint` — runs the declared `lint` script (`eslint .`).
- The package test script is a placeholder and exits with an error; it does not run an automated test suite.

## Configuration

The application declares `dotenv`. Review environment-variable references in the source and supply your own local values before starting it. Keep credentials out of Git; do not reuse committed credentials.

## Source entry points

- [eslint.config.js](eslint.config.js)
- [src/config/config.js](src/config/config.js)
- [src/connections/database.js](src/connections/database.js)
- [src/constants/user.errors.js](src/constants/user.errors.js)
- [src/controllers/authentication/auth.controller.js](src/controllers/authentication/auth.controller.js)
- [src/controllers/chats/chats.controller.js](src/controllers/chats/chats.controller.js)
- [src/controllers/contacts/contacts.controller.js](src/controllers/contacts/contacts.controller.js)
- [src/controllers/messages/messages.controller.js](src/controllers/messages/messages.controller.js)

## Development notes

Commands above come from the tracked manifests and source layout. External services and runtime configuration may be required. Documentation updates do not establish that the application is deployed or that its tests pass.
