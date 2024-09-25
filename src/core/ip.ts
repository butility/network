import { IPMaskType } from '@/types/network';
import { get } from './request';

export function isValidIPv4(ip: string): boolean {
    const ipv4Regex =
        /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipv4Regex.test(ip);
}

export function isValidIPv6(ip: string): boolean {
    const ipv6Regex =
        /^(?:^([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4}|:)$)|(^([0-9a-fA-F]{1,4}:){1,7}:$)|(^([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}$)|(^([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}$)|(^([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}$)|(^([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}$)|(^([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}$)|(^([0-9a-fA-F]{1,4}:){1}(:[0-9a-fA-F]{1,4}){1,6}$)|(^:((:[0-9a-fA-F]{1,4}){1,7}|:)$)|(^([0-9a-fA-F]{1,4}:){1,7}:)$/;
    return ipv6Regex.test(ip);
}

export function convertIPv4ToIPv6(ip: string): string | null {
    if (!isValidIPv4(ip)) {
        console.error('Invalid IPv4 address provided.');
        return null;
    }
    // Split the IPv4 address into its components
    const segments = ip.split('.').map(Number);

    // Convert each segment to hexadecimal and pad it to 2 digits
    const hexSegments = segments.map((segment) =>
        segment.toString(16).padStart(2, '0'),
    );

    // Combine the segments into an IPv6-mapped address
    const ipv6 = `::ffff:${hexSegments.join(':')}`;
    return ipv6;
}

export function convertIPv6ToIPv4(ip: string): string | null {
    if (!isValidIPv6(ip)) {
        console.error('Invalid IPv6 address provided.');
        return null;
    }

    const ipv4Regex =
        /::ffff:([\da-f]{2}):([\da-f]{2}):([\da-f]{2}):([\da-f]{2})/i;
    const match = ip.match(ipv4Regex);

    if (!match) {
        console.error('Not a valid IPv6-mapped IPv4 address.');
        return null;
    }

    // Convert the hexadecimal parts back to decimal
    const ipv4Parts = match.slice(1, 5).map((hex) => parseInt(hex, 16));

    // Return the IPv4 address as a dotted decimal string
    const ipv4 = ipv4Parts.join('.');
    return ipv4;
}

export function normalizeIPv6(ip: string): string | null {
    if (!isValidIPv6(ip)) return null;

    // Expand shorthand IPv6 notations like "::" into full notation
    try {
        const segments = ip.split(':');
        let fullSegments: string[] = [];

        segments.forEach((segment) => {
            if (segment === '') {
                // Empty segment corresponds to "::" shorthand, fill the gap with zeroes
                const fillLength = 8 - segments.filter((s) => s !== '').length;
                fullSegments.push(...Array(fillLength).fill('0000'));
            } else {
                // Pad each segment with leading zeros to ensure 4 characters
                fullSegments.push(segment.padStart(4, '0'));
            }
        });

        return fullSegments.join(':');
    } catch (e) {
        console.error('Error normalizing IPv6:', e);
        return null;
    }
}

export function getIPVersion(ip: string): 4 | 6 | null {
    if (isValidIPv4(ip)) return 4;
    if (isValidIPv6(ip)) return 6;
    return null;
}

export function isPrivateIP(ip: string): boolean {
    if (!isValidIPv4(ip)) return false;
    const privateRanges = [
        /^10\./, // 10.0.0.0 - 10.255.255.255
        /^172\.(1[6-9]|2[0-9]|3[0-1])\./, // 172.16.0.0 - 172.31.255.255
        /^192\.168\./, // 192.168.0.0 - 192.168.255.255
    ];
    return privateRanges.some((range) => range.test(ip));
}

export function generateRandomIPv4(): string {
    return Array(4)
        .fill(0)
        .map(() => Math.floor(Math.random() * 256))
        .join('.');
}

export function generateRandomIPv6(): string {
    const getRandomHex = () => Math.floor(Math.random() * 65536).toString(16);
    const segments = Array.from({ length: 8 }, getRandomHex);
    return segments.join(':');
}

export function isValidSubnetMask(mask: string): boolean {
    const validMasks = [
        '255.255.255.255',
        '255.255.255.254',
        '255.255.255.252',
        '255.255.255.248',
        '255.255.255.240',
        '255.255.255.224',
        '255.255.255.192',
        '255.255.255.128',
        '255.255.255.0',
        '255.255.254.0',
        '255.255.252.0',
        '255.255.248.0',
        '255.255.240.0',
        '255.255.224.0',
        '255.255.192.0',
        '255.255.128.0',
        '255.255.0.0',
        '255.254.0.0',
        '255.252.0.0',
        '255.248.0.0',
        '255.240.0.0',
        '255.224.0.0',
        '255.192.0.0',
        '255.128.0.0',
        '255.0.0.0',
    ];
    return validMasks.includes(mask);
}

export function extractFromCIDR(cidr: string): IPMaskType | null {
    const cidrRegex = /^([\d\.]+)\/(\d{1,2})$/;
    const match = cidr.match(cidrRegex);

    if (!match || !isValidIPv4(match[1]) || parseInt(match[2]) > 32)
        return null;

    const ip = match[1];
    const prefixLength = parseInt(match[2]);

    // Calculate the subnet mask from prefix length
    const maskBinary: string = '1'.repeat(prefixLength).padEnd(32, '0');
    const mask =
        maskBinary
            .match(/.{8}/g)
            ?.map((bin) => parseInt(bin, 2))
            .join('.') || '';
    return { ip, mask };
}

export function calculateNetworkAddress(
    ip: string,
    mask: string,
): string | null {
    if (!isValidIPv4(ip) || !isValidSubnetMask(mask)) return null;

    const ipSegments = ip.split('.').map(Number);
    const maskSegments = mask.split('.').map(Number);

    // Perform bitwise AND between IP and subnet mask to get network address
    const networkAddress = ipSegments.map(
        (segment, i) => segment & maskSegments[i],
    );
    return networkAddress.join('.');
}

export function areIPsInSameNetwork(
    ip1: string,
    ip2: string,
    mask: string,
): boolean {
    const network1 = calculateNetworkAddress(ip1, mask);
    const network2 = calculateNetworkAddress(ip2, mask);
    return network1 === network2;
}

export function getLocationByIP(ip: string, callback: Function) {
    const apiUrl = `https://ipinfo.io/${ip}/json`;

    // Make an API request to ipinfo.io
    // And Unless the IP address is bogon, ipinfo returns an object with loc property that can be splited to latt and long
    get(
        apiUrl,
        {},
        {
            responseType: 'json',
            useFetch: true,
            error: (error) => {
                console.error('Error fetching geolocation information:', error);
                callback(null);
            },
            success: (response) => {
                const data = response;
                const location = {
                    latitude: parseFloat(data.loc.split(',')[0]),
                    longitude: parseFloat(data.loc.split(',')[1]),
                };

                callback(location);
            },
        },
    );
}

export function getUserIPAddress(callback: Function): void {
    const apiUrl = 'https://api.ipify.org?format=json';
    get(
        apiUrl,
        {},
        {
            responseType: 'json',
            useFetch: true,
            error: (error) => {
                console.error('Error fetching ip information:', error);
                callback(null);
            },
            success: (response) => {
                const data = response;
                const ip = data.ip;

                if (isValidIPv4(ip)) {
                    callback(ip);
                }
            },
        },
    );
}
