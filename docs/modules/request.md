# Module Description for `Request`

The `Request` module provides a versatile set of functions for making HTTP requests in a straightforward and flexible manner. This module supports various request methods and allows for extensive customization of options.

## Namespace: `Request`

### Functions

- **ajax(options: AjaxOptions): void | Promise<void>**
  - Sends an AJAX request with customizable options. Supports callbacks for success and error handling, as well as advanced features like progress tracking and retries.

- **deleteRequest(url: string, data?: object, options?: Partial<AjaxOptions>): void | Promise<void>**
  - Sends a DELETE request to the specified URL. Optionally includes data and additional settings.

- **get(url: string, data?: object, options?: Partial<AjaxOptions>): void | Promise<void>**
  - Sends a GET request to the specified URL. Can include query parameters and custom options.

- **patch(url: string, data: object, options?: Partial<AjaxOptions>): void | Promise<void>**
  - Sends a PATCH request to update resources at the specified URL with the provided data.

- **post(url: string, data: object, options?: Partial<AjaxOptions>): void | Promise<void>**
  - Sends a POST request to create a new resource at the specified URL using the provided data.

- **put(url: string, data: object, options?: Partial<AjaxOptions>): void | Promise<void>**
  - Sends a PUT request to replace the resource at the specified URL with the provided data.

### Interface: `AjaxOptions`

The `AjaxOptions` interface defines the configuration options for AJAX requests, including:

- **method**: string - The HTTP method to use (GET, POST, etc.).
- **url**: string - The URL to which the request is sent.
- **headers?**: Record<string, string> - Custom headers to include in the request.
- **data?**: string | FormData | object | null - Data to send with the request.
- **success?**: (response: any) => void - Callback for handling successful responses.
- **error?**: (error: string | Error) => void - Callback for handling errors.
- **timeout?**: number - Timeout for the request in milliseconds.
- **retries?**: number - Number of retries for failed requests.
- **retryDelay?**: number - Delay between retries in milliseconds.
- **responseType?**: XMLHttpRequestResponseType - The type of response expected.
- **onProgress?**: (loaded: number, total: number) => void - Callback for tracking progress.
- **abortSignal?**: AbortSignal - Signal to abort the request.
- **useFetch?**: boolean - Indicates whether to use the Fetch API instead of XMLHttpRequest.

## Default Export

The module exports the `Request` namespace by default, providing easy access to all the HTTP request functions.
