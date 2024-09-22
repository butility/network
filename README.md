
# Butility Network Utils

This library provides a set of utilities and helper functions for managing network-related tasks, such as IP address validation and manipulation, making HTTP requests, handling service workers, and working with URLs. It is organized into five main namespaces: `Network`, `IP`, `Request`, `SW`, and `URL`.

## Overview

### **Network**
The `Network` namespace imports and centralizes various utility methods, such as IP validation, HTTP requests, service worker management, and URL handling.

#### Key Methods:
- **IP**: `isPrivateIP`, `isValidIPv4`, `convertIPv4ToIPv6`, etc.
- **Request**: `get`, `post`, `ajax`, etc.
- **SW - Service Workers**: `handleBackgroundSync`, `registerServiceWorker`, etc.
- **URL**: `constructURL`, `mergeURL`, etc.

## Installation

To install the package, you can use npm or CDN:

```sh
npm install @butility/network
```

```html
<!-- To use all the functions and methods -->
<script src="https://unpkg.com/@butility/network@latest/network.js" type="module"></script>
<script src="https://cdn.jsdelivr.net/npm/@butility/network@latest/network.js"></script>
<!-- To use IP utils -->
<script src="https://unpkg.com/@butility/network@latest/ip.js" type="module"></script>
<script src="https://cdn.jsdelivr.net/npm/@butility/network@latest/ip.js"></script>
<!-- To use Ajax utils -->
<script src="https://unpkg.com/@butility/network@latest/request.js" type="module"></script>
<script src="https://cdn.jsdelivr.net/npm/@butility/network@latest/request.js"></script>
<!-- To use Service Worker -->
<script src="https://unpkg.com/@butility/network@latest/sw.js" type="module"></script>
<script src="https://cdn.jsdelivr.net/npm/@butility/network@latest/sw.js"></script>
<!-- To use URL utils -->
<script src="https://unpkg.com/@butility/network@latest/url.js" type="module"></script>
<script src="https://cdn.jsdelivr.net/npm/@butility/network@latest/url.js"></script>
```
## Example

### Working with IP

```javascript
import { getUserIPAddress, getLocationByIP } from "@butility/network/ip"; 
// First, get the user's IP address
getUserIPAddress((ip) => {
    if (ip) {
        console.log('User IP Address:', ip);

        // Now use the IP to get the geolocation
        getLocationByIP(ip, (location) => {
            if (location) {
                console.log(`User is located at Latitude: ${location.latitude}, Longitude: ${location.longitude}`);
            } else {
                console.error('Failed to retrieve geolocation.');
            }
        });
    } else {
        console.error('Failed to retrieve IP address.');
    }
});

```

### Working with HTTP request

```javascript
import { get } from "@butility/network/request";
// Define the URL and data
const apiUrl = 'https://api.example.com/data';
const requestData = {
    query: 'example',
    limit: 10,
};

// Define options for the AJAX request (All optional)
const ajaxOptions = {
    method: 'GET',               // The HTTP method (already default for 'get')
    headers: {                   // Custom headers
        'Authorization': 'Bearer some-token',
        'Content-Type': 'application/json',
    },
    responseType: 'json',         // Expect a JSON response
    timeout: 5000,                // Set a timeout of 5 seconds
    retries: 3,                   // Retry the request 3 times in case of failure
    retryDelay: 1000,             // Wait 1 second before each retry
    useFetch: true,               // Use the Fetch API instead of XMLHttpRequest
    onProgress: (loaded, total) => {  // Progress callback (if supported)
        console.log(`Loaded ${loaded} of ${total} bytes`);
    },
    abortSignal: new AbortController().signal,  // Ability to abort request in Fetch API
    success: (response) => {  // Success callback
        console.log('Request successful:', response);
    },
    error: (error) => {  // Error callback
        console.error('Request failed:', error);
    },
};

// Make the GET request using the defined URL, data, and options
get(apiUrl, requestData, ajaxOptions);
```

## Documentation

For `@butility/network` documentation refer to the [docs folder](https://github.com/butility/network/tree/main/docs).

## Changelog

You can find [changelog here](https://github.com/butility/network/tree/main/docs/changelog.md)

## License

This project is licensed under the [MIT License](LICENSE).