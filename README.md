<!-- Repo Badges -->
<p align="center">
  <img height="30" src="/media/uses-js.svg" alt="Uses JS badge" >
  <img height="30" src="/media/with-love.svg" alt="Built with love badge" >
  <img height="30" src="/media/check-it-out.svg" alt="Check it out badge" >
</p><!-- ./Repo Badges -->


<!-- Block explorer Hero -->
<p align="center">
  <img width="100%" src="/media/banner.png" />
</p>

<table>
  <tbody>
    <tr>
      <td>Sponsored by</td>
      <td>
        <a href="https://appliedblockchain.com/">
          <img height="45" src="/media/appliedblockchain-logo.png" alt="Applied Blockchain" />
        </a>
      </td>
    </tr>
  </tbody>
</table>
<p>&nbsp;</p><!-- Spacing -->


## Project
The goal of this project is to have a single Block explorer for all Applied Blockchain projects that is both simple and easy to customise. The standard Block explorer comes as a single Docker image and custom Block explorers can be created using a CLI tool.

### Features
- 🖥 View latest Blocks & Transactions
- ⚡️ Simple, Powerful, & Intuitive API
- 🐙 Customizable React Frontend
- 🐥 Customizable Block explorer Koa server
- 🐳 Use as Docker Image

<p align="center">
  <img width="75%" src="/media/app.png" />
</p>
<p>&nbsp;</p><!-- Spacing -->


## Table of Contents
- [Requirements](#requirements)
  - Node
  - Docker
- [Getting Started](#getting-started)
  - [Using Docker Image](#🐳-using-docker-image)
  - [`create-block-explorer`](#⚡️-create-block-explorer)
- [Browser Support](#browser-support)
- [Modules](#modules)
  - [`block-explorer-server`](#block-explorer-server)
  - [`block-explorer-client`](#block-explorer-client)
- [Examples](#examples)
- [Repositories](#repositories)
- [Contributors](#contributors)
- [License](#license)
<p>&nbsp;</p><!-- Spacing -->


## Requirements
### Node
The Block explorer requires [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) (npm comes prebundled with node) for development. The source code for the server is written in ES2015+ so Node.js **V8+** is recommended. Node.js version can be checked using the `node -v` CLI command.

### Docker
Docker installtion is not required for development but can be useful for running the production app locally.
- [Docker Mac installtion](https://docs.docker.com/docker-for-mac/install/)
- [Docker Window installtion](https://docs.docker.com/docker-for-windows/install/)
- [Docker Linux installtion](https://docs.docker.com/install/)
<p>&nbsp;</p><!-- Spacing -->


## Getting Started
### 🐳 Using Docker Image
If the Block explorer does not require customization then the Docker image can be used to run the Block explorer with ease. An optional config file can be used to display extra information for transactions sent to a deployed contract. This includes method parameters with values and event logs. The config file has contract (ABI, deployments) and addressbook entries.

#### Project structure
```
block-explorer/
  ├── config.json
  └── docker-compose.yml
```

#### Simple `docker-compose.yml` example _(Without config.json)_
```yml
version: '3'

services:
  explorer:
    image: appliedblockchain/b-explorer
    ports:
      - 3000:3000
    environment:
      - ETHEREUM_JSONRPC_ENDPOINT=http://network.project.com:8545/
```

#### `docker-compose.yml` example _(With config.json)_
```yml
version: '3'

services:
  explorer:
    container_name: explorer
    image: appliedblockchain/b-explorer
    volumes:
      - ${PWD}/config.json:/home/explorer/app/config.json:ro
    ports:
      - 3000:3000
    environment:
      - ETHEREUM_JSONRPC_ENDPOINT=http://parity:8545/
      - CONFIG_FILE_PATH=/home/explorer/app/config.json
```

#### `config.json` example
_NOTE: All addresses must be checksummed_
```js
{
  "contracts": {
    ":Foo": {
      "name": "Foo",
      "abi": [],
      "deployments": [
        { "address": "6b62d428eebde5e452ffa997d7be34709bbaa6ae4ca1d74b5c2310c952903b59" }
      ]
    }
  },

  "addressBook": {
    "108d65fdbe2baf0eaeb3f1755af8a96614c914d453e92d915284175360ce7027": "Bob"
  }
}
```

#### Run explorer
_Verify that you have docker-compose installed using the `docker-compose -v` command_
```shell
> docker-compose up
```
<p>&nbsp;</p><!-- Spacing -->


### ⚡️ `create-block-explorer`
<p align="center">
  <img width="75%" src="/media/create-block-explorer.png" alt="create block explorer CLI" />
</p>

__`create-block-explorer`__ is the quickest way to get started with creating a Block explorer with customization. The CLI tool can read all your contracts and create the right `config.json` file for the explorer. Please refer to the document for [`appliedblockchain/block-explorer-server`](#block-explorer-server) and [`appliedblockchain/block-explorer-client`](#block-explorer-client) for components that can be configured.

#### Usage
```shell
> npx @appliedblockchain/create-block-explorer appii
```

<p align="center">
  <img width="85%" src="/media/create-block-explorer.gif" alt="create block explorer CLI usage" />
</p>

#### Project structure
```
appii-block-explorer/
  ├── .circleci/
  │   └── config.yml
  ├── .editorconfig
  ├── .gitignore
  ├── .nvmrc
  ├── Dockerfile
  ├── README.md
  ├── config.json
  ├── package-lock.json
  ├── package.json
  ├── public/
  │   ├── favicon.ico
  │   ├── index.html
  │   └── manifest.json
  ├── server.js
  └── src/
      └── index.js
```

#### Scripts
- __`npm start`__: Starts the development server for React frontend and Koa api.
- __`npm run start:api`__: Starts the development server for Koa api.
- __`npm run start:client`__: Starts the development server for React frontend.
- __`npm run build`__: Builds the production static files for React frontend.
<p>&nbsp;</p><!-- Spacing -->


## Browser Support
At present, we aim to support the last two versions of the following browsers:

<table>
  <thead>
    <tr>
      <td><img src="/media/chrome.png" alt="Chrome" /></td>
      <td><img src="/media/firefox.png" alt="Firefox" /></td>
      <td><img src="/media/ie.png" alt="Internet Explorer" /></td>
      <td><img src="/media/edge.png" alt="Edge" /></td>
      <td><img src="/media/safari.png" alt="Safari" /></td>
      <td><img src="/media/opera.png" alt="Opera" /></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">✔️</td>
      <td align="center">✔️</td>
      <td align="center">✖️</td>
      <td align="center">✔️</td>
      <td align="center">✔️</td>
      <td align="center">✔️</td>
    </tr>
  </tbody>
</table>
<p>&nbsp;</p><!-- Spacing -->


## Modules
### `block-explorer-server`
#### Installation
```shell
> npm install @appliedblockchain/block-explorer-server
```

<p align="center">
  <img src="/media/block-explorer-server.jpg" alt="block-explorer-server npm module" />
</p>

#### Usage
```js
import { createServer } from '@appliedblockchain/block-explorer-server'

/** Koa server */
const server = createServer({ /* options */ })

server.listen(3000)
```

#### `createServer.options`
<table>
  <thead>
    <tr>
      <td>Option</td>
      <td>Type</td>
      <td>Default Value</td>
      <td>Description</td>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td><code>prefix</code></td>
      <td>String</td>
      <td><code>false</code></td>
      <td>Creates a Koa server instance where all the API routes are prefixed with the given prefix value.</td>
    </tr>
    <tr>
      <td><code>ethereumJsonRPC</code></td>
      <td>String</td>
      <td><code>'http://localhost:8546'</code></td>
      <td>HTTP JSON-RPC  endpoint for a node on the ethereum based network.</td>
    </tr>
    <tr>
      <td><code>networkConfigPath</code></td>
      <td>String</td>
      <td><code>path.resolve('./config.json')</code></td>
      <td>Path to the <code>config.json</code> file used by the standard handler to get contract information.</td>
    </tr>
    <tr>
      <td><code>useStandardHandler</code></td>
      <td>Boolean</td>
      <td><code>true</code></td>
      <td>Toggle standard handler use.</td>
    </tr>
    <tr>
      <td><code>txHandler</code></td>
      <td>Function</td>
      <td><code>null</code></td>
      <td>Customise the output of <code>/transactions/:txHash</code> route.</td>
    </tr>
  </tbody>
</table>
<p>&nbsp;</p><!-- Spacing -->


### `block-explorer-client`
#### Installation
```shell
> npm install @appliedblockchain/block-explorer-client
```

#### Description
@TODO
<p>&nbsp;</p><!-- Spacing -->


## Examples
- [APPII](https://github.com/appliedblockchain/appii-block-explorer)
<p>&nbsp;</p><!-- Spacing -->


## Repositories
<table>
  <thead>
    <tr>
      <td>Repository</td>
      <td>Description</td>
    </tr>
  <thead>
  <tbody>
    <tr>
      <td width="22.5%">
        <a href="https://github.com/appliedblockchain/block-explorer-main">block-explorer-main</a>
      </td>
      <td>
        This repository has all the Block explorer documentation and creates &amp; pushes the main Docker image that can be pulled from Docker Hub.
      </td>
    </tr>
    <tr>
      <td width="22.5%">
        <a href="https://github.com/appliedblockchain/block-explorer-server">block-explorer-server</a>
      </td>
      <td>Main repository for <code>@appliedblockchain/block-explorer-server</code> npm module.</td>
    </tr>
    <tr>
      <td width="22.5%">
        <a href="https://github.com/appliedblockchain/block-explorer-client">block-explorer-client</a>
      </td>
      <td>Main repository for <code>@appliedblockchain/block-explorer-client</code> npm module.</td>
    </tr>
    <tr>
      <td width="22.5%">
        <a href="https://github.com/appliedblockchain/create-block-explorer">create-block-explorer</a>
      </td>
      <td>Main repository for <code>@appliedblockchain/create-block-explorer</code> npm module.</td>
    </tr>
  </tbody>
</table>
<p>&nbsp;</p><!-- Spacing -->


## Contributors
_In alphabetical order:_

<table>
  <tr>
    <td width="20%">
      <a href="https://github.com/mariogemoll"><img src="https://avatars2.githubusercontent.com/u/627106?v=4" /></a>
      <p align="center">Mario Gemoll <i>(Project Lead)</i></p>
    </td>
    <td width="20%">
      <a href="https://github.com/tahseenm"><img src="https://avatars2.githubusercontent.com/u/8666625?v=4" /></a>
      <p align="center">Tahseen Malik <i>(Developer)</i></p>
    </td>
    <td width="20%"></td>
    <td width="20%"></td>
    <td width="20%"></td>
  </tr>
</table>
<p>&nbsp;</p><!-- Spacing -->


## License
_UNLICENSED_
