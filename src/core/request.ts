import { ajaxXHR, ajaxFetch } from '@/utils/ajax';
import { AjaxOptions } from '@/types/network';

export function ajax(options: AjaxOptions) {
    if (options.useFetch) {
        return ajaxFetch(options);
    } else {
        return ajaxXHR(options);
    }
}

// GET request wrapper
export function get(
    url: string,
    data: object = {},
    options: Partial<AjaxOptions> = {},
) {
    const queryString = Object.entries(data)
        .map(
            ([key, value]) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
        )
        .join('&');
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    return ajax({
        method: 'GET',
        url: fullUrl,
        ...options,
    });
}

// POST request wrapper
export function post(
    url: string,
    data: object,
    options: Partial<AjaxOptions> = {},
) {
    return ajax({
        method: 'POST',
        url,
        data,
        headers: { 'Content-Type': 'application/json' },
        ...options,
    });
}

// PUT request wrapper
export function put(
    url: string,
    data: object,
    options: Partial<AjaxOptions> = {},
) {
    return ajax({
        method: 'PUT',
        url,
        data,
        headers: { 'Content-Type': 'application/json' },
        ...options,
    });
}

// PATCH request wrapper
export function patch(
    url: string,
    data: object,
    options: Partial<AjaxOptions> = {},
) {
    return ajax({
        method: 'PATCH',
        url,
        data,
        headers: { 'Content-Type': 'application/json' },
        ...options,
    });
}

// DELETE request wrapper
export function deleteRequest(
    url: string,
    data: object = {},
    options: Partial<AjaxOptions> = {},
) {
    const queryString = Object.entries(data)
        .map(
            ([key, value]) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
        )
        .join('&');
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    return ajax({
        method: 'DELETE',
        url: fullUrl,
        ...options,
    });
}
