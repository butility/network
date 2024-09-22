# Module Description for `URL`

The `URL` module provides a set of utilities for constructing, parsing, and manipulating URLs. It simplifies common URL operations, making it easier for developers to work with web addresses and query parameters effectively.

## Namespace: `URL`

### Functions

- **constructURL(base: string, path?: string, queryParams?: object): string**
  - Constructs a complete URL from a base URL, optional path, and query parameters. Automatically handles encoding of query parameters.

- **extractFragment(url: string): string**
  - Extracts and returns the fragment (hash) portion of a URL.

- **mergeURL(baseURL: string, relativeURL: string): string**
  - Merges a base URL with a relative URL, resolving the resulting URL.

- **normalizeURL(url: string): any**
  - Normalizes a given URL to a standard format, ensuring consistency.

- **parseQueryStringParameters(queryString: string, decode?: boolean): object**
  - Parses a query string into an object of key-value pairs. Optionally decodes the parameter values.

- **removeQueryStringParameter(url: string, key: string): string**
  - Removes a specified query string parameter from a URL, returning the updated URL.

- **replaceQueryStringParameter(url: string, key: string, value: string, encode?: boolean): string**
  - Replaces the value of a specified query string parameter in a URL. Optionally encodes the new value.

## Default Export

The module exports the `URL` namespace by default, offering easy access to all URL manipulation functions.
