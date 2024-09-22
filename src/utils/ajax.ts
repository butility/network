import { AjaxOptions } from '@/types/network';

export async function ajaxFetch(options: AjaxOptions) {
    const config: RequestInit = {
        method: options.method,
        headers: options.headers,
        body:
            options.method !== 'GET'
                ? formatDataForFetch(options.data, options.headers)
                : undefined,
        signal: options.abortSignal,
    };

    try {
        const response = await fetch(options.url, config);
        const responseBody = await handleFetchResponse(
            response,
            options.responseType,
        );
        if (options.success) options.success(responseBody);
    } catch (error: any) {
        handleError(options, error);
    }
}

export function ajaxXHR(options: AjaxOptions) {
    const xhr = new XMLHttpRequest();

    xhr.open(options.method, options.url, true);

    // Set custom headers
    if (options.headers) {
        for (const [key, value] of Object.entries(options.headers)) {
            xhr.setRequestHeader(key, value);
        }
    }

    // Set response type (e.g., json, text, blob, arraybuffer)
    if (options.responseType) {
        xhr.responseType = options.responseType;
    }

    // Handle request timeout if provided
    if (options.timeout) {
        xhr.timeout = options.timeout;
    }

    // Set up progress event listener
    if (options.onProgress) {
        xhr.onprogress = (event) => {
            (options.onProgress as any)(event.loaded, event.total);
        };
    }

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            if (options.success) {
                const response =
                    options.responseType === 'json'
                        ? xhr.response
                        : xhr.responseText;
                options.success(response);
            }
        } else {
            handleError(
                options,
                `Request failed with status ${xhr.status}: ${xhr.statusText}`,
            );
        }
    };

    xhr.onerror = function () {
        handleError(options, 'Request failed due to network error.');
    };

    xhr.ontimeout = function () {
        handleError(options, `Request timed out after ${xhr.timeout}ms`);
    };

    // Handle retries if the request fails
    retryRequest(xhr, options);

    const requestData: any = formatDataForXHR(options.data, options.headers);
    xhr.send(requestData);
}

async function handleFetchResponse(
    response: Response,
    responseType?: XMLHttpRequestResponseType,
) {
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }
    switch (responseType) {
        case 'json':
            return await response.json();
        case 'blob':
            return await response.blob();
        case 'arraybuffer':
            return await response.arrayBuffer();
        default:
            return await response.text();
    }
}

function formatDataForFetch(data: any, headers?: Record<string, string>) {
    if (data && typeof data === 'object' && !(data instanceof FormData)) {
        if (headers && headers['Content-Type'] === 'application/json') {
            return JSON.stringify(data);
        }
    }
    return data;
}

function handleError(options: AjaxOptions, error: string | Error) {
    if (options.error) {
        options.error(error);
    } else {
        console.error(error);
    }
}

function retryRequest(
    xhr: XMLHttpRequest,
    options: AjaxOptions,
    attempt: number = 1,
) {
    xhr.onloadend = () => {
        if (xhr.status >= 400 && attempt <= (options.retries || 1)) {
            setTimeout(() => {
                console.warn(
                    `Retrying request... (${attempt}/${options.retries})`,
                );
                ajaxXHR({ ...options, retries: options.retries! - 1 });
            }, options.retryDelay || 1000);
        }
    };
}

function formatDataForXHR(
    data: string | FormData | object | null | undefined,
    headers?: Record<string, string>,
) {
    if (data && typeof data === 'object' && !(data instanceof FormData)) {
        if (headers && headers['Content-Type'] === 'application/json') {
            return JSON.stringify(data);
        }
    }
    return data;
}
