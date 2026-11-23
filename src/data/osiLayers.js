export const osiLayers = [
  {
    number: 7,
    name: 'Application',
    pdu: 'Data',
    tag: 'L7 / APPLICATION',
    color: '#B7FF6B',
    summary: 'Direct interface with user software, network APIs, and high-level communications.',
    responsibilities: [
      'Provides network services directly to end-user software applications.',
      'Identifies communication partners and synchronizes service availability.',
      'Handles application authentication and user interface protocols.'
    ],
    protocols: ['HTTP', 'HTTPS', 'DNS', 'SMTP', 'FTP', 'SSH', 'DHCP', 'SNMP'],
    devices: ['Web Browsers', 'REST API Gateways', 'Mail User Agents (MUA)', 'Application Proxies'],
    encapsulationDetail: 'Raw user payload generated (e.g., HTTP GET request or JSON body).'
  },
  {
    number: 6,
    name: 'Presentation',
    pdu: 'Data',
    tag: 'L6 / PRESENTATION',
    color: '#8AE979',
    summary: 'Data syntax formatting, serialization, character translation, encryption, and compression.',
    responsibilities: [
      'Translation between application syntax and standard wire formats (ASCII, UTF-8, JSON).',
      'Cryptographic operations including SSL/TLS handshake encryption and decryption.',
      'Data compression and decompression to optimize transmission overhead.'
    ],
    protocols: ['TLS / SSL', 'ASCII', 'UTF-8', 'JPEG', 'MPEG', 'JSON / Protocol Buffers'],
    devices: ['TLS Termination Proxies', 'Cryptographic Hardware Modules (HSM)', 'OS Security Subsystems'],
    encapsulationDetail: 'Payload formatted into canonical syntax and encrypted via TLS.'
  },
  {
    number: 5,
    name: 'Session',
    pdu: 'Data',
    tag: 'L5 / SESSION',
    color: '#65C7FF',
    summary: 'Controls the dialogue, checkpointing, and connection lifecycle between computers.',
    responsibilities: [
      'Establishes, manages, and gracefully terminates communication sessions between processes.',
      'Provides simplex, half-duplex, or full-duplex dialogue separation.',
      'Implements session checkpointing and token management for recovery from transient drops.'
    ],
    protocols: ['NetBIOS', 'RPC (Remote Procedure Call)', 'PPTP', 'Sockets API Session Layer'],
    devices: ['Operating System Socket Subsystems', 'Session Border Controllers'],
    encapsulationDetail: 'Session tokens and dialogue synchronization state tagged to the stream.'
  },
  {
    number: 4,
    name: 'Transport',
    pdu: 'Segment (TCP) / Datagram (UDP)',
    tag: 'L4 / TRANSPORT',
    color: '#4DA8FF',
    summary: 'End-to-end transport reliability, port addressing, segmentation, and flow control.',
    responsibilities: [
      'Multiplexes data streams using source and destination Port numbers (0 - 65535).',
      'Segments large data payloads into manageable segments and ensures sequential reassembly.',
      'Guarantees delivery via TCP sequence numbers, acknowledgments (ACKs), and windowing.',
      'Alternative low-overhead connectionless transport provided by UDP.'
    ],
    protocols: ['TCP', 'UDP', 'QUIC', 'SCTP'],
    devices: ['Stateful Firewalls', 'L4 Load Balancers (HAProxy, AWS NLB)', 'OS Kernel TCP/IP Stack'],
    encapsulationDetail: 'Adds Source Port, Destination Port, Sequence Number, and Checksum to create a Segment.'
  },
  {
    number: 3,
    name: 'Network',
    pdu: 'Packet',
    tag: 'L3 / NETWORK',
    color: '#9B87FF',
    summary: 'Logical IP addressing, subnet traversal, and dynamic path determination (routing).',
    responsibilities: [
      'Assigns logical hierarchical identifiers (IPv4 and IPv6 addresses).',
      'Determines the optimal path across interconnected networks using routing algorithms.',
      'Handles packet fragmentation when packet size exceeds link MTU (Maximum Transmission Unit).',
      'Carries network control messages via ICMP.'
    ],
    protocols: ['IPv4', 'IPv6', 'ICMP', 'IPsec', 'OSPF', 'BGP', 'EIGRP', 'RIP'],
    devices: ['Routers', 'Layer 3 Multilayer Switches', 'Network Firewalls'],
    encapsulationDetail: 'Wraps segment with IP Header: Source IP, Destination IP, TTL, Protocol ID to form a Packet.'
  },
  {
    number: 2,
    name: 'Data Link',
    pdu: 'Frame',
    tag: 'L2 / DATA LINK',
    color: '#FFB86C',
    summary: 'Physical hop-to-hop delivery, MAC addressing, framing, and link error detection.',
    responsibilities: [
      'Encapsulates network packets into frames with physical Source and Destination MAC addresses.',
      'Arbitrates access to shared physical media via CSMA/CD or full-duplex switching.',
      'Performs error detection using a Frame Check Sequence (FCS) cyclic redundancy check (CRC).',
      'Maintains VLAN tags (802.1Q) to isolate local broadcast domains.'
    ],
    protocols: ['Ethernet (IEEE 802.3)', 'Wi-Fi (IEEE 802.11)', 'ARP', 'PPP', '802.1Q VLAN'],
    devices: ['Network Switches (Layer 2)', 'Network Interface Cards (NICs)', 'Wireless Access Points'],
    encapsulationDetail: 'Prepends Frame Header (Source/Dest MAC) and appends Frame Trailer (FCS/CRC) to form a Frame.'
  },
  {
    number: 1,
    name: 'Physical',
    pdu: 'Bits',
    tag: 'L1 / PHYSICAL',
    color: '#FF79C6',
    summary: 'Transmission and reception of unstructured raw bit streams over physical transmission media.',
    responsibilities: [
      'Encodes binary 1s and 0s into electrical voltages, optical light pulses, or radio frequencies.',
      'Defines mechanical connectors, pinouts, cable specifications, and signaling levels.',
      'Regulates bit synchronization, clock timing, and transmission rates (e.g. 1 Gbps, 10 Gbps).'
    ],
    protocols: ['Cat5e/Cat6/Cat6a Ethernet', 'Single-Mode / Multi-Mode Fiber', 'IEEE 802.11 RF', 'DSL'],
    devices: ['Ethernet Patch Cables', 'Optical Transceivers (SFP/QSFP)', 'Network Hubs', 'Repeaters'],
    encapsulationDetail: 'Encodes frame into physical electrical, optical, or radio bit waveforms.'
  }
];

export const encapsulationSteps = [
  {
    stage: 'Application Data',
    layer: 'L7 / L6 / L5',
    pdu: 'Data',
    action: 'Generated',
    desc: 'Application prepares the message payload (HTTP GET, DNS query, raw bytes).',
    color: '#B7FF6B'
  },
  {
    stage: 'Transport Segment',
    layer: 'L4 Transport',
    pdu: 'Segment',
    action: 'Segmented',
    desc: 'Adds Source & Destination Port (e.g. Src: 51234, Dst: 443) and TCP seq numbers.',
    color: '#4DA8FF'
  },
  {
    stage: 'Network Packet',
    layer: 'L3 Network',
    pdu: 'Packet',
    action: 'Addressed',
    desc: 'Adds Source IP & Destination IP (e.g. 192.168.1.50 -> 142.250.190.46) and TTL.',
    color: '#9B87FF'
  },
  {
    stage: 'Data Link Frame',
    layer: 'L2 Data Link',
    pdu: 'Frame',
    action: 'Framed',
    desc: 'Adds Source/Dest MAC addresses and CRC checksum (FCS) trailer for error detection.',
    color: '#FFB86C'
  },
  {
    stage: 'Physical Bits',
    layer: 'L1 Physical',
    pdu: 'Bits (10101001...)',
    action: 'Transmitted',
    desc: 'Transmits bits as electrical pulses, fiber optic light flashes, or RF waves.',
    color: '#FF79C6'
  }
];

export const tcpIpComparison = [
  {
    tcpIpLayer: 'Application Layer',
    tcpIpNumber: 4,
    description: 'Combines user interaction, presentation formats, data encryption, and session state.',
    osiLayers: ['Layer 7: Application', 'Layer 6: Presentation', 'Layer 5: Session'],
    protocols: 'HTTP, HTTPS, DNS, SSH, FTP, SMTP, DHCP',
    color: '#B7FF6B'
  },
  {
    tcpIpLayer: 'Transport Layer',
    tcpIpNumber: 3,
    description: 'Provides host-to-host communication, segment multiplexing, reliability, and flow control.',
    osiLayers: ['Layer 4: Transport'],
    protocols: 'TCP, UDP, QUIC',
    color: '#4DA8FF'
  },
  {
    tcpIpLayer: 'Internet Layer',
    tcpIpNumber: 2,
    description: 'Handles logical addressing, packet encapsulation, and routing across internetworks.',
    osiLayers: ['Layer 3: Network'],
    protocols: 'IPv4, IPv6, ICMP, ARP (operating alongside), IPsec',
    color: '#9B87FF'
  },
  {
    tcpIpLayer: 'Network Access Layer (Link)',
    tcpIpNumber: 1,
    description: 'Encompasses physical hardware media, framing, MAC addressing, and signal transmission.',
    osiLayers: ['Layer 2: Data Link', 'Layer 1: Physical'],
    protocols: 'Ethernet (802.3), Wi-Fi (802.11), PPP, Fiber',
    color: '#FFB86C'
  }
];
