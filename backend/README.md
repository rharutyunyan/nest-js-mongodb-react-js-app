## Description

Rating review test MVP application backend.

## Prerequisites

Ensure Node.js is installed, preferrably via [nvm](https://github.com/nvm-sh/nvm) or [nodenv](https://github.com/nodenv/nodenv).

Ensure npm is installed

## Setup

First install dependencies. This will need to be run again any time dependencies have been added to package.json, so you may want to run it periodically or whenever you pull new code and notice changes to package.json.

```
$ npm install
```

## Running the app

```bash
# start mongodb with docker, mongodb default port is used, if you want to use another port
# please update it in .env file
$ docker-compose up

# run app on dev mode
$ npm run start
```

## Other

### IDE

We recommending using either Webstorm or VS Code as your code editor. Installing the plugins / extensions is highly recommended to prevent errors.

#### VS Code

- Install [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- Install [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), which automatically formats code on each save

