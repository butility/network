import { retryFailedRequests } from '@/utils/sw';
import {
    SWRegisterOptions,
    CachingOptions,
    BackgroundSyncOptions,
    PushNotificationOptions,
    SyncManager,
} from '@/types/network';

export async function registerServiceWorker(
    swPath: string,
    options?: SWRegisterOptions,
): Promise<ServiceWorkerRegistration | undefined> {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register(
                swPath,
                {
                    scope: options?.scope,
                    updateViaCache: options?.updateViaCache || 'all',
                },
            );

            if (options?.onUpdateFound) {
                registration.onupdatefound = () => {
                    const newWorker = registration.installing;
                    const oldVersion = registration.active?.scriptURL || 'none';
                    if (newWorker) {
                        newWorker.onstatechange = () => {
                            if (
                                newWorker.state === 'installed' &&
                                navigator.serviceWorker.controller
                            ) {
                                (options.onUpdateFound as any)(
                                    oldVersion,
                                    newWorker.scriptURL,
                                );
                            }
                        };
                    }
                };
            }

            return registration;
        } catch (error) {
            console.error('Service Worker registration failed:', error);
        }
    }
    return undefined;
}

export async function handleCachingStrategy(
    request: Request,
    options: CachingOptions,
): Promise<Response> {
    const cache = await caches.open(options.cacheName);

    if (options.cacheFirst) {
        // Cache First Strategy
        const cachedResponse = await cache.match(request);
        return (
            cachedResponse ||
            fetch(request).then(async (networkResponse) => {
                await cache.put(request, networkResponse.clone());
                return networkResponse;
            })
        );
    } else {
        // Network First Strategy with optional timeout
        const fetchPromise = fetch(request).then(async (networkResponse) => {
            await cache.put(request, networkResponse.clone());
            return networkResponse;
        });

        if (options.networkTimeoutSeconds) {
            const timeoutPromise = new Promise<Response>((resolve, reject) => {
                setTimeout(
                    async () => {
                        const cachedResponse = await cache.match(request);
                        cachedResponse
                            ? resolve(cachedResponse)
                            : reject('Request timed out');
                    },
                    (options.networkTimeoutSeconds as any) * 1000,
                );
            });

            return Promise.race([fetchPromise, timeoutPromise]);
        }

        return fetchPromise.catch(async () => {
            const cachedResponse = await cache.match(request);
            if (cachedResponse) return cachedResponse;
            throw new Error('Network and cache failed');
        });
    }
}

export async function handleBackgroundSync(
    url: string,
    options: BackgroundSyncOptions,
): Promise<void> {
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
        try {
            // Get the active service worker registration
            const registration = await navigator.serviceWorker.ready;
            const syncRegistration =
                registration as unknown as ServiceWorkerRegistration & {
                    sync: SyncManager;
                };

            // Check if sync is supported and register the sync event with a tag
            if (syncRegistration.sync) {
                await syncRegistration.sync.register(options.tag);
                console.log(
                    `Background sync registered with tag: ${options.tag}`,
                );
            } else {
                console.warn('SyncManager is not supported in this browser.');
            }

            // Add event listener for sync in the service worker
            self.addEventListener('sync', (event: any) => {
                if (event.tag === options.tag) {
                    event.waitUntil(
                        retryFailedRequests(
                            url,
                            options.retryDelay,
                            options.maxRetry,
                        ),
                    );
                }
            });
        } catch (err) {
            console.error('Background sync registration failed:', err);
        }
    } else {
        console.warn('Background sync is not supported in this browser.');
    }
}

export function showPushNotification(
    registration: ServiceWorkerRegistration,
    options: PushNotificationOptions,
): void {
    const notificationOptions: NotificationOptions = {
        body: options.body,
        icon: options.icon ?? '/images/default-icon.png', // Use nullish coalescing for a safer default
    };

    registration.showNotification(options.title, notificationOptions);

    // Check if onNotificationClick is defined
    if (options.onNotificationClick) {
        const clickHandler = (event: any) => {
            event.notification.close();
            options.onNotificationClick!(event); // Use non-null assertion to call safely
        };

        // Avoid multiple listeners by removing previous listener if already set
        self.removeEventListener('notificationclick', clickHandler);
        self.addEventListener('notificationclick', clickHandler);
    }
}

export function sendMessageToSW(message: string): Promise<void> {
    if (navigator.serviceWorker.controller) {
        return new Promise((resolve, reject) => {
            const messageChannel = new MessageChannel();
            messageChannel.port1.onmessage = (event) => {
                if (event.data && event.data.error) {
                    reject(event.data.error);
                } else {
                    resolve(event.data);
                }
            };
            (navigator.serviceWorker.controller as any).postMessage(message, [
                messageChannel.port2,
            ]);
        });
    } else {
        return Promise.reject('No Service Worker controller found');
    }
}
