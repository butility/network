# Usage

Here are some basic examples of how to use the Media package.

## IP Module

- Example usage:
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

### Request Module

- Example usage:

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
