export * from '@/core/ip';
import {
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
} from '@/core/ip';

const IP = {
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
};

export default IP;
