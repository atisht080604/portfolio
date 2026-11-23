export const protocolsData = [
  {
    id: 'tcp',
    name: 'TCP',
    fullName: 'Transmission Control Protocol',
    layer: 'Layer 4 (Transport)',
    category: 'Transport',
    defaultPort: 'Dynamic / Bound by service',
    portNote: 'Not a service itself; assigns dynamic source ports (e.g., 49152-65535) and target service ports.',
    color: '#4DA8FF',
    characteristics: [
      'Connection-oriented: requires active 3-Way Handshake before data flow.',
      'Guaranteed delivery via sequence numbers and ACK packets.',
      'Automatic retransmission of dropped or damaged segments.',
      'Built-in flow control (sliding window) and congestion management (AIMD).'
    ],
    handshake: {
      step1: 'SYN: Client sends synchronization packet with Initial Sequence Number (ISN_c).',
      step2: 'SYN-ACK: Server responds acknowledging ISN_c + 1 and provides its own ISN_s.',
      step3: 'ACK: Client confirms receipt of ISN_s + 1; connection enters ESTABLISHED state.'
    },
    purpose: 'Provides reliable, ordered, and error-checked delivery of a stream of octets between software applications running on hosts communicating over an IP network.',
    exampleUsage: 'Underpins web traffic (HTTP/1.1 & HTTP/2), secure shell (SSH), database drivers, and file transfers where zero packet loss is mandatory.'
  },
  {
    id: 'udp',
    name: 'UDP',
    fullName: 'User Datagram Protocol',
    layer: 'Layer 4 (Transport)',
    category: 'Transport',
    defaultPort: 'Dynamic / Bound by service',
    portNote: 'Connectionless protocol that wraps payloads into lightweight datagrams without state tracking.',
    color: '#65C7FF',
    characteristics: [
      'Connectionless: emits datagrams without prior handshake or teardown.',
      'Minimal 8-byte header overhead compared to TCP 20-60 byte header.',
      'No retransmissions, no packet reordering, and no flow control.',
      'Supports broadcast and multicast communication patterns.'
    ],
    purpose: 'Prioritizes maximum throughput and minimal latency over guaranteed arrival. Ideal for time-sensitive streams where stale data is worse than lost data.',
    exampleUsage: 'Real-time multiplayer gaming, VoIP calling, live video conferencing (WebRTC), and lightweight query systems like DNS and DHCP.'
  },
  {
    id: 'dns',
    name: 'DNS',
    fullName: 'Domain Name System',
    layer: 'Layer 7 (Application)',
    category: 'Core Services',
    defaultPort: '53 (UDP primary, TCP fallback)',
    portNote: 'UDP 53 used for standard lookups (<512B); TCP 53 used for zone transfers and large DNSSEC answers.',
    color: '#B7FF6B',
    characteristics: [
      'Hierarchical distributed naming database: Root (.) -> TLD (.com) -> Authoritative (example.com).',
      'Recursive resolvers query root hints down to authoritative nameservers.',
      'High-performance distributed caching using TTL (Time To Live) headers.',
      'Translates human-friendly hostnames to IPv4 (A record) or IPv6 (AAAA record).'
    ],
    architecture: 'Query flow: Local Stub Resolver -> Recursive Resolver (ISP/8.8.8.8) -> Root DNS (.) -> TLD (.org) -> Authoritative Nameserver.',
    purpose: 'The telephone directory of the Internet, resolving alphanumeric domain identifiers into machine-routable IP addresses.',
    exampleUsage: 'A web browser queries `api.github.com` and receives `140.82.114.6` before initiating a TCP connection.'
  },
  {
    id: 'dhcp',
    name: 'DHCP',
    fullName: 'Dynamic Host Configuration Protocol',
    layer: 'Layer 7 (Application / BootP)',
    category: 'Core Services',
    defaultPort: 'UDP 67 (Server) / UDP 68 (Client)',
    portNote: 'Client broadcasts to 255.255.255.255:67; server replies to client port 68.',
    color: '#FFD166',
    characteristics: [
      'Automated leasing of IPv4 parameters: IP address, Subnet Mask, Gateway, DNS servers.',
      'Eliminates manual IP configuration and duplicate address collisions in LANs.',
      'Lease duration management with automatic renewal requests at 50% (T1) and 87.5% (T2).',
      'Operates through the four-step DORA exchange process.'
    ],
    doraProcess: [
      { step: 'D - DISCOVER', desc: 'Client broadcasts: "Is there a DHCP server available? I need an IP address."' },
      { step: 'O - OFFER', desc: 'DHCP server reserves an unassigned IP and broadcasts an offer with IP, mask, and lease.' },
      { step: 'R - REQUEST', desc: 'Client broadcasts acceptance of that specific server offer, notifying all other DHCP servers.' },
      { step: 'A - ACKNOWLEDGE', desc: 'DHCP server commits the lease in its database and sends final confirmation to client.' }
    ],
    purpose: 'Dynamically issues network configuration parameters to client devices upon connection to a local area network.',
    exampleUsage: 'Connecting your smartphone or laptop to a Wi-Fi router instantly provisions an IP like 192.168.1.105 with gateway 192.168.1.1.'
  },
  {
    id: 'http',
    name: 'HTTP',
    fullName: 'Hypertext Transfer Protocol',
    layer: 'Layer 7 (Application)',
    category: 'Web Services',
    defaultPort: '80 (TCP)',
    portNote: 'Default standard IANA port; can be configured on any non-privileged port (e.g. 8080, 3000).',
    color: '#B5838D',
    characteristics: [
      'Stateless request-response paradigm using standard HTTP verbs (GET, POST, PUT, DELETE).',
      'Plaintext ASCII transmission of headers and message bodies.',
      'Extensible header system for caching, authentication, and content negotiation.',
      'Lacks cryptographic confidentiality and tamper-resistance.'
    ],
    purpose: 'Standard foundational communication protocol for the World Wide Web and client-server REST APIs.',
    exampleUsage: 'Fetching HTML web pages, assets, and JSON endpoints over unencrypted networks.'
  },
  {
    id: 'https',
    name: 'HTTPS',
    fullName: 'Hypertext Transfer Protocol Secure',
    layer: 'Layer 7 + TLS (Layer 6/7)',
    category: 'Web Services',
    defaultPort: '443 (TCP)',
    portNote: 'Encapsulated within Transport Layer Security (TLS 1.2 / TLS 1.3).',
    color: '#06D6A0',
    characteristics: [
      'Guarantees end-to-end confidentiality: data payload and URLs are encrypted on the wire.',
      'Integrity verification: prevents man-in-the-middle packet tampering or injection.',
      'Identity authentication: verifies server authenticity via X.509 public key certificates.',
      'Cryptographic forward secrecy using Ephemeral Diffie-Hellman key exchanges.'
    ],
    purpose: 'Secures web transactions, payment flows, login credentials, and user data against eavesdropping and impersonation.',
    exampleUsage: 'Accessing banking portals, online commerce platforms, and all modern secure web applications.'
  },
  {
    id: 'ssh',
    name: 'SSH',
    fullName: 'Secure Shell',
    layer: 'Layer 7 (Application)',
    category: 'Remote Access',
    defaultPort: '22 (TCP)',
    portNote: 'Frequently remapped to custom high ports (e.g., 2222) to mitigate automated scanner spam.',
    color: '#9B87FF',
    characteristics: [
      'Encrypted remote command-line login, shell execution, and port forwarding.',
      'Strong public key cryptography authentication (Ed25519, RSA) replacing passwords.',
      'Encrypted SFTP and SCP capabilities for secure remote file manipulation.',
      'Tunneling and socks proxy capabilities (SSH L/R port redirection).'
    ],
    purpose: 'Provides secure cryptographic network protocol for operating network services and shell sessions over an unsecured network.',
    exampleUsage: 'Logging into remote Linux servers, cloud VMs, and network switches via terminal console (`ssh user@server`).'
  },
  {
    id: 'ftp',
    name: 'FTP',
    fullName: 'File Transfer Protocol',
    layer: 'Layer 7 (Application)',
    category: 'File Transfer',
    defaultPort: '21 (TCP Control) / 20 (TCP Data)',
    portNote: 'Uses two separate connections: Control channel on port 21 and Data channel on port 20 (or passive dynamic ports).',
    color: '#E07A5F',
    characteristics: [
      'Dual-channel architecture: command channel operates independently of data stream.',
      'Active mode vs. Passive mode (PASV required behind NAT firewalls).',
      'Transmits credentials and file contents in cleartext (unless upgraded to FTPS with TLS).',
      'Legacy protocol, widely superseded in modern systems by SFTP and HTTPS.'
    ],
    purpose: 'Standard network protocol used for the transfer of computer files between a client and server on a computer network.',
    exampleUsage: 'Uploading website files and assets to hosting web servers using dedicated FTP clients.'
  },
  {
    id: 'smtp',
    name: 'SMTP',
    fullName: 'Simple Mail Transfer Protocol',
    layer: 'Layer 7 (Application)',
    category: 'Email Services',
    defaultPort: '25 (Server-to-Server) / 587 (Submission) / 465 (SMTPS)',
    portNote: 'Port 25 is often blocked by consumer ISPs to curb spam. Modern client submission uses 587 with STARTTLS.',
    color: '#F4A261',
    characteristics: [
      'Text-based push protocol used by Mail Transfer Agents (MTA) to deliver email.',
      'Hop-by-hop relaying across destination domains determined via DNS MX records.',
      'Enhanced with STARTTLS for opportunistic encryption and SPF/DKIM/DMARC for spoofing defense.'
    ],
    purpose: 'Delivers and routes electronic mail across internet mail servers.',
    exampleUsage: 'Sending emails from application notification microservices to user mailboxes.'
  },
  {
    id: 'icmp',
    name: 'ICMP',
    fullName: 'Internet Control Message Protocol',
    layer: 'Layer 3 (Network Layer Protocol)',
    category: 'Diagnostics & Control',
    defaultPort: 'N/A (No Port Numbers)',
    portNote: 'Directly encapsulated inside IP packets (IP Protocol number 1). Does not utilize TCP/UDP transport ports.',
    color: '#FF6B6B',
    characteristics: [
      'Used by network devices to send error messages and operational information.',
      'Echo Request (Type 8) and Echo Reply (Type 0) power the `ping` utility.',
      'Time Exceeded (Type 11, Code 0) returned when IP TTL expires, powering `traceroute`.',
      'Destination Unreachable (Type 3) notifies routers and senders of packet drop causes.'
    ],
    purpose: 'Vital diagnostic and reporting protocol for the Internet Protocol suite; reports routing failures and latency.',
    exampleUsage: 'Executing `ping 8.8.8.8` to test reachability and measuring round-trip latency in milliseconds.'
  },
  {
    id: 'arp',
    name: 'ARP',
    fullName: 'Address Resolution Protocol',
    layer: 'Layer 2 / Layer 3 Boundary',
    category: 'Address Resolution',
    defaultPort: 'N/A (Ethernet Frame Type 0x0806)',
    portNote: 'Encapsulated directly into Layer 2 Ethernet frames; does not use IP or transport layer ports.',
    color: '#4CC9F0',
    characteristics: [
      'Translates known 32-bit IPv4 addresses into 48-bit physical MAC addresses on a local subnet.',
      'Broadcasts request to all local hosts (`FF:FF:FF:FF:FF:FF`): "Who has IP 192.168.1.1? Tell 192.168.1.50".',
      'Target unicasts reply with its hardware MAC address (`e.g., 00:1A:2B:3C:4D:5E`).',
      'Hosts store results in local ARP Cache to avoid continuous broadcasting.'
    ],
    purpose: 'Enables Layer 2 frame forwarding to reach the physical hardware interface possessing a given target IP address on a local broadcast domain.',
    exampleUsage: 'Before your PC sends an IP packet to the default router, it uses ARP to find the router’s MAC address.'
  },
  {
    id: 'nat',
    name: 'NAT & PAT',
    fullName: 'Network Address Translation / Port Address Translation',
    layer: 'Layer 3 / Layer 4 (Network / Transport)',
    category: 'Address Translation',
    defaultPort: 'N/A (Operates in Router / Firewall Kernel)',
    portNote: 'Rewrites IP header addresses and TCP/UDP header port numbers dynamically in transit.',
    color: '#8338EC',
    characteristics: [
      'Conserves public IPv4 addresses by multiplexing thousands of private devices behind a single public IP.',
      'PAT (Port Address Translation / NAT Overload) maps private IP + source port to public IP + allocated port.',
      'Maintains a stateful NAT Translation Table to route incoming response packets back to the originating internal host.',
      'Acts as a natural ingress shield: inbound connections cannot reach private IPs unless explicit Port Forwarding is set.'
    ],
    purpose: 'Permits entire private local networks (192.168.0.0/16, 10.0.0.0/8) to access the global public Internet over scarce public IP addresses.',
    exampleUsage: 'Your home Wi-Fi router translates traffic from 15 domestic smartphones and laptops into one ISP-assigned public IP address.'
  }
];
