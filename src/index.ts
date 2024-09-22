export * from '@/core/ip';
export * from '@/core/url';
export * from '@/core/sw';
export * from '@/core/request';

import IP, {
    isPrivateIP,
    isValidIPv4,
    isValidIPv6,
    isValidSubnetMask,
    calculateNetworkAddress,
    convertIPv4ToIPv6,
    convertIPv6ToIPv4,
    generateRandomIPv4,
    generateRandomIPv6,
    getIPVersion,
    getLocationByIP,
    getUserIPAddress,
    extractFromCIDR,
    areIPsInSameNetwork,
    normalizeIPv6,
} from '@/modules/ip';

import Request, {
    ajax,
    get,
    patch,
    post,
    put,
    deleteRequest,
} from '@/modules/request';

import SW, {
    handleBackgroundSync,
    handleCachingStrategy,
    showPushNotification,
    registerServiceWorker,
    sendMessageToSW,
} from '@/modules/sw';

import URL, {
    constructURL,
    parseQueryStringParameters,
    removeQueryStringParameter,
    replaceQueryStringParameter,
    extractFragment,
    mergeURL,
    normalizeURL,
} from '@/modules/url';

const Network = {
    isPrivateIP,
    isValidIPv4,
    isValidIPv6,
    isValidSubnetMask,
    calculateNetworkAddress,
    convertIPv4ToIPv6,
    convertIPv6ToIPv4,
    generateRandomIPv4,
    generateRandomIPv6,
    getIPVersion,
    getLocationByIP,
    getUserIPAddress,
    extractFromCIDR,
    areIPsInSameNetwork,
    normalizeIPv6,
    ajax,
    get,
    patch,
    post,
    put,
    deleteRequest,
    handleBackgroundSync,
    handleCachingStrategy,
    showPushNotification,
    registerServiceWorker,
    sendMessageToSW,
    constructURL,
    parseQueryStringParameters,
    removeQueryStringParameter,
    replaceQueryStringParameter,
    extractFragment,
    mergeURL,
    normalizeURL,
};

export default Network;
export { URL, Request, IP, SW };
