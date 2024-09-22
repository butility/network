# Installation

To use the Network package in your project, follow these steps:

## Using npm

1. Open your terminal.
2. Navigate to your project directory.
3. Run the following command:

```bash
npm install @butility/network
# or
pnpm add @butility/network
# or
yarn add @butility/network
```

## Using CDN

You can also include the network package via a CDN link in your HTML file:

```html
<!-- To use all the functions and methods -->
<script src="https://unpkg.com/@butility/network@latest/network.js" type="module"></script>
<script src="https://cdn.jsdelivr.net/npm/@butility/network@latest/network.js"></script>
<!-- To use IP utils -->
<script src="https://unpkg.com/@butility/network@latest/ip.js" type="module"></script>
<script src="https://cdn.jsdelivr.net/npm/@butility/network@latest/ip.js"></script>
<!-- To use URL utils -->
<script src="https://unpkg.com/@butility/network@latest/url.js" type="module"></script>
<script src="https://cdn.jsdelivr.net/npm/@butility/network@latest/url.js"></script>
<!-- To use service worker -->
<script src="https://unpkg.com/@butility/network@latest/sw.js" type="module"></script>
<script src="https://cdn.jsdelivr.net/npm/@butility/network@latest/sw.js"></script>
<!-- To use Ajax utils -->
<script src="https://unpkg.com/@butility/network@latest/request.js" type="module"></script>
<script src="https://cdn.jsdelivr.net/npm/@butility/network@latest/request.js"></script>
```

```js

import network from "https://unpkg.com/@butility/network@latest/network.js";
import network from "https://cdn.jsdelivr.net/npm/@butility/network@latest/network.js";

import IPUtils from "https://unpkg.com/@butility/network@latest/ip.js";
import IPUtils from "https://cdn.jsdelivr.net/npm/@butility/network@latest/ip.js";

import Request from "https://unpkg.com/@butility/network@latest/reuest.js";
import Request from "https://cdn.jsdelivr.net/npm/@butility/network@latest/reuest.js";
// ....
```

## Importing the Package

After installation, import the necessary modules in your JavaScript files:

```javascript
import { getLocationByIP, parseQueryStringParameters } from '@butility/network';
```