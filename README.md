# NFT360 App

The first heatmap NFT

## Built With

- [Vue.js](https://vuejs.org/)
- [Vite.js](https://vitejs.dev/guide/)
- [AWS Amplify](https://docs.amplify.aws/)

## Installation

NFT360 requires [Node.js](https://nodejs.org/) and [Amplify CLI](https://docs.amplify.aws/start/getting-started/installation/q/integration/vue/) to run.

Install Amplify CLI

```
npm install -g @aws-amplify/cli
```

> Note: If you run the project for the first time, you need to init your Amplify backend

Init Amplify backend

```sh
cd nft360
amplify init --appId <AMPLIFY_APPID>
```

Install the dependencies and devDependencies and start the server.

```sh
cd nft360
npm install
npm run dev
```

Checkout amplify env

```sh
cd nft360
amplify checkout env <ENVIRONMENT_NAME>
```
