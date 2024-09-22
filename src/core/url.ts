export function parseQueryStringParameters(
    queryString: string,
    decode: boolean = true,
): object {
    const params: any = {};

    if (!queryString || typeof queryString !== 'string') {
        return params;
    }

    queryString = queryString.startsWith('?')
        ? queryString.slice(1)
        : queryString;

    const pairs = queryString.split('&');

    for (const pair of pairs) {
        const [key, value] = pair.split('=');
        const decodedKey = decode ? decodeURIComponent(key) : key;
        const decodedValue = value
            ? decode
                ? decodeURIComponent(value)
                : value
            : '';

        if (params.hasOwnProperty(decodedKey)) {
            if (Array.isArray(params[decodedKey])) {
                params[decodedKey].push(decodedValue);
            } else {
                params[decodedKey] = [params[decodedKey], decodedValue];
            }
        } else {
            params[decodedKey] = decodedValue;
        }
    }

    return params;
}

export function replaceQueryStringParameter(
    url: string,
    key: string,
    value: string,
    encode: boolean = true,
): string {
    if (!url || typeof url !== 'string') {
        return url;
    }

    const [baseUrl, queryString] = url.split('?');
    const params: Record<string, string> = {};

    if (queryString) {
        const pairs = queryString.split('&');
        for (const pair of pairs) {
            const [existingKey, existingValue] = pair.split('=');
            const decodedKey = decodeURIComponent(existingKey);
            const decodedValue = existingValue
                ? decodeURIComponent(existingValue)
                : '';
            params[decodedKey] = decodedValue;
        }
    }

    const keyToUse = encode ? encodeURIComponent(key) : key;
    const valueToUse = encode ? encodeURIComponent(value) : value;

    params[keyToUse] = valueToUse;

    const newQueryString = Object.entries(params)
        .map(([k, v]) => `${k}=${v}`)
        .join('&');

    return newQueryString ? `${baseUrl}?${newQueryString}` : baseUrl;
}

export function removeQueryStringParameter(url: string, key: string): string {
    if (!url || typeof url !== 'string') {
        return url;
    }

    const [baseUrl, queryString] = url.split('?');
    const params: Record<string, string> = {};

    if (queryString) {
        const pairs = queryString.split('&');
        for (const pair of pairs) {
            const [existingKey, existingValue] = pair.split('=');
            const decodedKey = decodeURIComponent(existingKey);
            const decodedValue = existingValue
                ? decodeURIComponent(existingValue)
                : '';
            params[decodedKey] = decodedValue;
        }

        delete params[key];
    }

    const newQueryString = Object.entries(params)
        .map(([k, v]) => `${k}=${v}`)
        .join('&');

    return newQueryString ? `${baseUrl}?${newQueryString}` : baseUrl;
}

export function mergeURL(baseURL: string, relativeURL: string): string {
    const base = new URL(baseURL);
    const relative = new URL(relativeURL, base);
    relative.search = relative.search || base.search;
    relative.hash = relative.hash || base.hash;

    return relative.href;
}

export function normalizeURL(url: string): string {
    try {
        const normalized = new URL(url);
        normalized.hash = normalized.hash.replace(/#$/, ''); // Remove trailing hash symbol
        return normalized.href;
    } catch (error) {
        console.error('Invalid URL provided for normalization:', error);
        return url;
    }
}

export function extractFragment(url: string): string {
    try {
        const fragment = new URL(url).hash.substring(1); // Remove the leading #
        return decodeURIComponent(fragment);
    } catch {
        console.error('Failed to extract or decode fragment from URL:', url);
        return '';
    }
}

export function constructURL(
    base: string,
    path: string = '',
    queryParams: object = {},
): string {
    try {
        const url = new URL(base);
        if (path) url.pathname = path;
        Object.entries(queryParams).forEach(([key, value]) => {
            url.searchParams.set(key, value);
        });
        return url.href;
    } catch (error) {
        console.error('Error constructing URL:', error);
        return '';
    }
}
