# dexterous

An _ad-free_ and lightweight Pokédex.

Contains the essentials (types, weaknesses, evolutions) and an intuitive interface to seamlessly navigate through Pokédex entries while playing your favorite Pokémon game.

Uses the following APIs and technologies:

- [PokéAPI](https://pokeapi.co/)
- [GraphQL Code Generator](https://www.graphql-code-generator.com/docs/getting-started)
- [Chakra UI](https://chakra-ui.com/getting-started)
- Node v14.x
- React v18.x
- Yarn v1.22.x


## Getting Started

```bash
$ yarn
$ yarn dev
```

Open [http://localhost:3000/](http://localhost:3000/) to view it in the browser.


## Service Worker

This app uses a service worker that locally caches pokemon sprites and artwork image requests.

It is enabled by default in production, however, in development it must be enabled manually:

```bash
$ REACT_APP_SW_ENABLED=true yarn dev
```

Additionally, the app _must_ be accessed with a trailing slash, otherwise the service worker will not be properly loaded.

| Status                                            | URL                                               |
|---------------------------------------------------|---------------------------------------------------|
| <span style="color:salmon">_INVALID_</span>       | [http://localhost:3000](http://localhost:3000)    |
| <span style="color:forestgreen">_CORRECT_</span>  | [http://localhost:3000/](http://localhost:3000/)  |
