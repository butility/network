export interface AjaxOptions {
    method: string;
    url: string;
    headers?: Record<string, string>;
    data?: string | FormData | object | null;
    success?: (response: any) => void;
    error?: (error: string | Error) => void;
    timeout?: number;
    retries?: number;
    retryDelay?: number;
    responseType?: XMLHttpRequestResponseType;
    onProgress?: (loaded: number, total: number) => void;
    abortSignal?: AbortSignal; // Allows aborting requests with Fetch API
    useFetch?: boolean; // Whether to use Fetch API
}

export interface IPMaskType {
    ip: string;
    mask: string;
}

export type CallbackFunction = (message: string) => void;
export type CacheUpdateCallback = (
    oldVersion: string,
    newVersion: string,
) => void;

export interface SWRegisterOptions {
    scope?: string;
    updateViaCache?: 'imports' | 'all' | 'none';
    onUpdateFound?: CacheUpdateCallback;
}

export interface CachingOptions {
    cacheName: string;
    cacheFirst?: boolean;
    networkTimeoutSeconds?: number;
}

export interface BackgroundSyncOptions {
    tag: string;
    retryDelay?: number; // Retry interval in seconds
    maxRetry?: number; // Maximum retries for failed requests
}

export interface PushNotificationOptions {
    title: string;
    body: string;
    icon?: string;
    onNotificationClick?: (event: NotificationEvent) => void;
}

export interface SyncManager {
    register(tag: string): Promise<void>;
    getTags(): Promise<string[]>;
}
