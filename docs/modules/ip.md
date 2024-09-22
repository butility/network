# Module Description for `IP`

The `IP` module provides a comprehensive suite of utilities for handling IP addresses and related operations. It includes functions for validation, conversion, network calculations, and more found in the Network package.

## Namespace: `IP`

### Functions

- **isPrivateIP(ip: string): boolean**
  - Determines if the given IP address is a private IP.

- **isValidIPv4(ip: string): boolean**
  - Validates whether the provided string is a valid IPv4 address.

- **isValidIPv6(ip: string): boolean**
  - Validates whether the provided string is a valid IPv6 address.

- **isValidSubnetMask(mask: string): boolean**
  - Checks if the given string is a valid subnet mask.

- **calculateNetworkAddress(ip: string, mask: string): string | null**
  - Computes the network address based on the provided IP and subnet mask.

- **convertIPv4ToIPv6(ip: string): string | null**
  - Converts an IPv4 address to its equivalent IPv6 representation.

- **convertIPv6ToIPv4(ip: string): string | null**
  - Converts an IPv6 address to its equivalent IPv4 representation, if possible.

- **generateRandomIPv4(): string**
  - Generates a random valid IPv4 address.

- **generateRandomIPv6(): string**
  - Generates a random valid IPv6 address.

- **getIPVersion(ip: string): 4 | 6**
  - Returns the version of the given IP address (4 or 6).

- **getLocationByIP(ip: string, callback: Function): void**
  - Retrieves geolocation information based on the provided IP address.

- **getUserIPAddress(callback: Function): void**
  - Fetches the user's public IP address.

- **extractFromCIDR(cidr: string): { ip: string; mask: string; }**
  - Extracts the IP address and subnet mask from a CIDR notation string.

- **areIPsInSameNetwork(ip1: string, ip2: string, mask: string): boolean**
  - Checks if two IP addresses are in the same network given a subnet mask.

- **normalizeIPv6(ip: string): string**
  - Normalizes an IPv6 address to its standard format.

## Default Export

The module exports the `IP` namespace by default, encapsulating all the functions for easy access.
