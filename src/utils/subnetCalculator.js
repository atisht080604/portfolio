/**
 * Subnet Calculator Utility
 * Accurately calculates IPv4 subnetting metrics, handles /31 (RFC 3021) and /32 special cases,
 * classifies private/public IP ranges, and generates binary representations.
 */

// Convert 32-bit uint to dotted decimal string
export function intToIp(int) {
  return [
    (int >>> 24) & 255,
    (int >>> 16) & 255,
    (int >>> 8) & 255,
    int & 255
  ].join('.');
}

// Convert dotted decimal IP to 32-bit unsigned integer
export function ipToInt(ip) {
  const octets = ip.trim().split('.');
  if (octets.length !== 4) return null;
  
  let result = 0;
  for (let i = 0; i < 4; i++) {
    const octet = Number(octets[i]);
    if (isNaN(octet) || octet < 0 || octet > 255 || !Number.isInteger(octet)) {
      return null;
    }
    // Check for leading zero unless value is 0
    if (octets[i].length > 1 && octets[i].startsWith('0')) {
      return null;
    }
    result = ((result << 8) | octet) >>> 0;
  }
  return result;
}

// Convert 32-bit uint to binary dotted string
export function intToBinary(int) {
  const binary32 = (int >>> 0).toString(2).padStart(32, '0');
  return `${binary32.slice(0, 8)}.${binary32.slice(8, 16)}.${binary32.slice(16, 24)}.${binary32.slice(24, 32)}`;
}

// Determine IP classification and scope
export function getIpClassification(ipInt) {
  const firstOctet = (ipInt >>> 24) & 255;
  const secondOctet = (ipInt >>> 16) & 255;
  
  // RFC 1918 Private Ranges
  // 10.0.0.0 - 10.255.255.255 (10.0.0.0/8)
  if (firstOctet === 10) {
    return { type: 'Private (RFC 1918)', classType: 'Class A Private', scope: 'Private Network' };
  }
  // 172.16.0.0 - 172.31.255.255 (172.16.0.0/12)
  if (firstOctet === 172 && secondOctet >= 16 && secondOctet <= 31) {
    return { type: 'Private (RFC 1918)', classType: 'Class B Private', scope: 'Private Network' };
  }
  // 192.168.0.0 - 192.168.255.255 (192.168.0.0/16)
  if (firstOctet === 192 && secondOctet === 168) {
    return { type: 'Private (RFC 1918)', classType: 'Class C Private', scope: 'Private Network' };
  }
  // Loopback (127.0.0.0/8)
  if (firstOctet === 127) {
    return { type: 'Loopback', classType: 'Special', scope: 'Local Host' };
  }
  // APIPA / Link-Local (169.254.0.0/16)
  if (firstOctet === 169 && secondOctet === 254) {
    return { type: 'APIPA / Link-Local', classType: 'Special', scope: 'Auto-configuration' };
  }
  // Multicast (224.0.0.0 - 239.255.255.255)
  if (firstOctet >= 224 && firstOctet <= 239) {
    return { type: 'Multicast (RFC 5771)', classType: 'Class D', scope: 'Multicast Group' };
  }
  // Reserved (240.0.0.0 - 255.255.255.255)
  if (firstOctet >= 240) {
    return { type: 'Reserved / Experimental', classType: 'Class E', scope: 'Reserved' };
  }
  
  // Standard public classes
  if (firstOctet >= 1 && firstOctet <= 126) {
    return { type: 'Public', classType: 'Class A Public', scope: 'Global Internet' };
  }
  if (firstOctet >= 128 && firstOctet <= 191) {
    return { type: 'Public', classType: 'Class B Public', scope: 'Global Internet' };
  }
  if (firstOctet >= 192 && firstOctet <= 223) {
    return { type: 'Public', classType: 'Class C Public', scope: 'Global Internet' };
  }

  return { type: 'Public', classType: 'Public Unicast', scope: 'Global Internet' };
}

/**
 * Calculate full subnet details
 * @param {string} ipStr e.g. "192.168.1.10"
 * @param {number|string} cidr e.g. 24
 * @returns {object} calculation results or error
 */
export function calculateSubnet(ipStr, cidr) {
  if (!ipStr || ipStr.trim() === '') {
    return { error: 'Please enter an IPv4 address (e.g., 192.168.1.10)' };
  }

  const cleanIp = ipStr.trim();
  const ipInt = ipToInt(cleanIp);
  if (ipInt === null) {
    return { error: 'Invalid IPv4 address format. Must be 4 octets (0-255) without leading zeros (e.g., 192.168.1.1).' };
  }

  const prefix = Number(cidr);
  if (isNaN(prefix) || prefix < 0 || prefix > 32 || !Number.isInteger(prefix)) {
    return { error: 'CIDR prefix must be an integer between /0 and /32.' };
  }

  // Calculate Subnet Mask (32-bit uint)
  const maskInt = prefix === 0 ? 0 : ((~0 << (32 - prefix)) >>> 0);
  const wildcardInt = (~maskInt) >>> 0;
  
  const networkInt = (ipInt & maskInt) >>> 0;
  const broadcastInt = (networkInt | wildcardInt) >>> 0;

  const totalAddresses = Math.pow(2, 32 - prefix);
  
  let usableHosts = 0;
  let firstUsableIp = '';
  let lastUsableIp = '';
  let specialNote = '';

  if (prefix === 32) {
    // Single host route (/32)
    usableHosts = 1;
    firstUsableIp = intToIp(networkInt);
    lastUsableIp = intToIp(networkInt);
    specialNote = '/32 Host Route: Represents a single unique IP address with no network or broadcast overhead.';
  } else if (prefix === 31) {
    // RFC 3021 Point-to-Point links
    usableHosts = 2;
    firstUsableIp = intToIp(networkInt);
    lastUsableIp = intToIp(networkInt + 1);
    specialNote = 'RFC 3021 Point-to-Point Link: Both addresses are usable as host endpoints on router-to-router connections (no broadcast address).';
  } else if (prefix === 0) {
    // Default route 0.0.0.0/0
    usableHosts = totalAddresses - 2;
    firstUsableIp = intToIp(1);
    lastUsableIp = intToIp(broadcastInt - 1);
    specialNote = 'Default Route (0.0.0.0/0): Matches all possible IPv4 destinations.';
  } else {
    // Standard subnets (/1 to /30)
    usableHosts = totalAddresses - 2;
    firstUsableIp = intToIp(networkInt + 1);
    lastUsableIp = intToIp(broadcastInt - 1);
  }

  const classification = getIpClassification(ipInt);

  return {
    success: true,
    inputIp: cleanIp,
    cidr: prefix,
    cidrNotation: `${intToIp(networkInt)}/${prefix}`,
    subnetMask: intToIp(maskInt),
    wildcardMask: intToIp(wildcardInt),
    networkAddress: intToIp(networkInt),
    broadcastAddress: prefix === 32 || prefix === 31 ? 'N/A (Special Link)' : intToIp(broadcastInt),
    totalAddresses: totalAddresses.toLocaleString(),
    usableHosts: usableHosts.toLocaleString(),
    firstUsableIp,
    lastUsableIp,
    usableRange: prefix === 32 
      ? firstUsableIp 
      : `${firstUsableIp} - ${lastUsableIp}`,
    binarySubnetMask: intToBinary(maskInt),
    binaryIp: intToBinary(ipInt),
    binaryNetwork: intToBinary(networkInt),
    classification: classification.type,
    classType: classification.classType,
    scope: classification.scope,
    specialNote,
    isPrivate: classification.type.includes('Private'),
  };
}
