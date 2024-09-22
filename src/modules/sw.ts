export * from '@/core/sw';
import {
    handleBackgroundSync,
    handleCachingStrategy,
    showPushNotification,
    registerServiceWorker,
    sendMessageToSW,
} from '@/core/sw';

const SW = {
    handleBackgroundSync,
    handleCachingStrategy,
    showPushNotification,
    sendMessageToSW,
    registerServiceWorker,
};

export default SW;
