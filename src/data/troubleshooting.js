export const windowsCommands = [
  {
    cmd: 'ipconfig',
    title: 'Basic IP Configuration',
    category: 'Windows',
    purpose: 'Displays active IPv4/IPv6 addresses, subnet masks, and default gateways for all physical and virtual network adapters.',
    whenToUse: 'Initial triage step to verify if the machine has acquired an IP address and recognizes a default gateway.',
    sampleOutput: `Windows IP Configuration

Ethernet adapter Ethernet 1:
   Connection-specific DNS Suffix  . : lan
   Link-local IPv6 Address . . . . . : fe80::d912:7c9e:4f32:891b%12
   IPv4 Address. . . . . . . . . . . : 192.168.1.105
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 192.168.1.1`
  },
  {
    cmd: 'ipconfig /all',
    title: 'Detailed Adapter Diagnostic',
    category: 'Windows',
    purpose: 'Reveals MAC addresses (Physical Address), DHCP lease acquisition & expiration times, DHCP server IP, and configured DNS servers.',
    whenToUse: 'When suspecting DHCP failures, verifying physical MAC addresses for ARP/switch filtering, or debugging DNS server assignments.',
    sampleOutput: `Windows IP Configuration

   Host Name . . . . . . . . . . . . : ATISH-STATION
   Primary Dns Suffix  . . . . . . . : 
   Node Type . . . . . . . . . . . . : Hybrid
   IP Routing Enabled. . . . . . . . : No
   WINS Proxy Enabled. . . . . . . . : No

Ethernet adapter Ethernet 1:
   Description . . . . . . . . . . . : Intel(R) Ethernet Controller I225-V
   Physical Address. . . . . . . . . : 00-D8-61-3A-9F-22
   DHCP Enabled. . . . . . . . . . . : Yes
   IPv4 Address. . . . . . . . . . . : 192.168.1.105(Preferred)
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Lease Obtained. . . . . . . . . . : Monday, November 23, 2026 09:12:00 AM
   Lease Expires . . . . . . . . . . : Tuesday, November 24, 2026 09:12:00 AM
   Default Gateway . . . . . . . . . : 192.168.1.1
   DHCP Server . . . . . . . . . . . : 192.168.1.1
   DNS Servers . . . . . . . . . . . : 1.1.1.1
                                       8.8.8.8`
  },
  {
    cmd: 'ping 1.1.1.1',
    title: 'ICMP Echo Reachability Test',
    category: 'Windows',
    purpose: 'Sends ICMP Echo Requests to verify end-to-end IP level reachability and measures round-trip latency and packet loss.',
    whenToUse: 'Testing raw connectivity to local gateway (192.168.1.1) or external public hosts (1.1.1.1 or 8.8.8.8) bypassing DNS resolution.',
    sampleOutput: `Pinging 1.1.1.1 with 32 bytes of data:
Reply from 1.1.1.1: bytes=32 time=9ms TTL=58
Reply from 1.1.1.1: bytes=32 time=8ms TTL=58
Reply from 1.1.1.1: bytes=32 time=9ms TTL=58
Reply from 1.1.1.1: bytes=32 time=8ms TTL=58

Ping statistics for 1.1.1.1:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 8ms, Maximum = 9ms, Average = 8ms`
  },
  {
    cmd: 'tracert 1.1.1.1',
    title: 'Trace Route (Hop-by-Hop Path)',
    category: 'Windows',
    purpose: 'Discovers each routing hop along the packet delivery path by systematically incrementing the IP TTL (Time-to-Live) field.',
    whenToUse: 'Identifying exactly which internal router or upstream ISP gateway is dropping packets or adding massive latency spikes.',
    sampleOutput: `Tracing route to one.one.one.one [1.1.1.1]
over a maximum of 30 hops:

  1    <1 ms    <1 ms    <1 ms  192.168.1.1 [Local Gateway]
  2     2 ms     2 ms     2 ms  10.12.0.1 [ISP Optical Node]
  3     4 ms     3 ms     4 ms  172.30.12.189 [Edge Gateway]
  4     8 ms     8 ms     9 ms  182.79.255.45 [Airtel Core Transit]
  5     9 ms     8 ms     9 ms  1.1.1.1 [Cloudflare Edge]

Trace complete.`
  },
  {
    cmd: 'nslookup github.com',
    title: 'DNS Resolution Query',
    category: 'Windows',
    purpose: 'Queries configured DNS servers to test whether domain names resolve to appropriate A/AAAA records.',
    whenToUse: 'Diagnosing whether an internet access failure is caused by broken name resolution rather than underlying IP connectivity.',
    sampleOutput: `Server:  one.one.one.one
Address:  1.1.1.1

Non-authoritative answer:
Name:    github.com
Addresses:  140.82.114.3
          140.82.114.4`
  },
  {
    cmd: 'netstat -ano',
    title: 'Active Network Sockets & Port Status',
    category: 'Windows',
    purpose: 'Lists all active TCP connections, listening UDP ports, foreign IP:Port tuples, and associated process IDs (PIDs).',
    whenToUse: 'Verifying if local backend servers (Node, Flask) are listening on target ports (3000, 5000, 8080) and checking socket states.',
    sampleOutput: `Active Connections

  Proto  Local Address          Foreign Address        State           PID
  TCP    0.0.0.0:3000           0.0.0.0:0              LISTENING       8412
  TCP    0.0.0.0:5000           0.0.0.0:0              LISTENING       14290
  TCP    192.168.1.105:53210    140.82.114.3:443       ESTABLISHED     11244
  TCP    192.168.1.105:53211    52.96.166.130:443      TIME_WAIT       0`
  },
  {
    cmd: 'arp -a',
    title: 'ARP Table Inspection',
    category: 'Windows',
    purpose: 'Displays the local Address Resolution Protocol table mapping IPv4 addresses to physical MAC hardware addresses.',
    whenToUse: 'Diagnosing Layer 2 communication problems, detecting ARP spoofing/poisoning, or verifying gateway MAC identity.',
    sampleOutput: `Interface: 192.168.1.105 --- 0xc
  Internet Address      Physical Address      Type
  192.168.1.1           e4-38-83-21-a0-12     dynamic
  192.168.1.120         b8-27-eb-44-11-c9     dynamic
  192.168.1.255         ff-ff-ff-ff-ff-ff     static
  224.0.0.22           01-00-5e-00-00-16     static`
  },
  {
    cmd: 'route print',
    title: 'IPv4 & IPv6 Routing Table',
    category: 'Windows',
    purpose: 'Outputs the host kernel routing table including the Default Gateway (0.0.0.0 mask 0.0.0.0), interface metrics, and on-link subnets.',
    whenToUse: 'When multi-homed hosts (e.g., Ethernet + VPN + Wi-Fi) forward traffic out the incorrect interface or have broken gateway metrics.',
    sampleOutput: `===========================================================================
IPv4 Route Table
===========================================================================
Active Routes:
Network Destination        Netmask          Gateway       Interface  Metric
          0.0.0.0          0.0.0.0      192.168.1.1   192.168.1.105      25
        127.0.0.0        255.0.0.0         On-link        127.0.0.1     331
      192.168.1.0    255.255.255.0         On-link    192.168.1.105     281
    192.168.1.105  255.255.255.255         On-link    192.168.1.105     281
    192.168.1.255  255.255.255.255         On-link    192.168.1.105     281
        224.0.0.0        240.0.0.0         On-link    192.168.1.105     281
  255.255.255.255  255.255.255.255         On-link    192.168.1.105     281
===========================================================================`
  }
];

export const linuxCommands = [
  {
    cmd: 'ip addr',
    title: 'Network Interfaces & Addresses',
    category: 'Linux',
    purpose: 'Modern iproute2 utility showing network interface status (UP/DOWN), MTU, MAC addresses, and assigned IPv4/IPv6 CIDR addresses.',
    whenToUse: 'Checking whether an ethernet (eth0/enp3s0) or wireless (wlan0) interface is up and what CIDR subnet is assigned.',
    sampleOutput: `1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 52:54:00:12:34:56 brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.150/24 brd 192.168.1.255 scope global dynamic eth0
       valid_lft 85400sec preferred_lft 85400sec`
  },
  {
    cmd: 'ip route',
    title: 'Kernel Routing Table',
    category: 'Linux',
    purpose: 'Displays all routing entries programmed into the Linux kernel, identifying the default route next-hop and interface.',
    whenToUse: 'Verifying if the default route (`default via <gateway>`) exists and is pointing to the expected gateway router interface.',
    sampleOutput: `default via 192.168.1.1 dev eth0 proto dhcp src 192.168.1.150 metric 100
192.168.1.0/24 dev eth0 proto kernel scope link src 192.168.1.150 metric 100`
  },
  {
    cmd: 'ss -tuln',
    title: 'Socket Statistics (Ports & Listeners)',
    category: 'Linux',
    purpose: 'Modern replacement for netstat showing listening TCP (-t) and UDP (-u) sockets with numeric port bindings (-n) and listener state (-l).',
    whenToUse: 'Confirming if web servers (Nginx, Apache, Node.js) or database instances (MySQL, MongoDB) are listening on 0.0.0.0 vs 127.0.0.1.',
    sampleOutput: `Netid  State   Recv-Q  Send-Q   Local Address:Port   Peer Address:Port  Process
tcp    LISTEN  0       511            0.0.0.0:80          0.0.0.0:*
tcp    LISTEN  0       128            0.0.0.0:22          0.0.0.0:*
tcp    LISTEN  0       511          127.0.0.1:27017       0.0.0.0:*
tcp    LISTEN  0       128          127.0.0.1:3306        0.0.0.0:*
tcp    LISTEN  0       511            0.0.0.0:3000        0.0.0.0:*
udp    UNCONN  0       0              0.0.0.0:5353        0.0.0.0:*`
  },
  {
    cmd: 'dig +trace google.com',
    title: 'Iterative DNS Trace',
    category: 'Linux',
    purpose: 'Performs hierarchical iterative DNS resolution from root servers down to authoritative nameservers, displaying exact records.',
    whenToUse: 'Debugging complex DNS delegation failures, stale cache entries, or misconfigured NS/CNAME records.',
    sampleOutput: `; <<>> DiG 9.18.18 <<>> +trace google.com
;; global options: +cmd
.                       518400  IN  NS  a.root-servers.net.
.                       518400  IN  NS  m.root-servers.net.
;; Received 525 bytes from 1.1.1.1#53(1.1.1.1)

com.                    172800  IN  NS  a.gtld-servers.net.
;; Received 830 bytes from 198.41.0.4#53(a.root-servers.net)

google.com.             172800  IN  NS  ns1.google.com.
;; Received 298 bytes from 192.5.6.30#53(a.gtld-servers.net)

google.com.             300     IN  A   142.250.190.46
;; Received 55 bytes from 216.239.32.10#53(ns1.google.com)`
  },
  {
    cmd: 'ip neigh',
    title: 'Neighbor Table (ARP / NDP Cache)',
    category: 'Linux',
    purpose: 'Lists IPv4 ARP and IPv6 Neighbor Discovery cache entries with state (REACHABLE, STALE, DELAY, FAILED).',
    whenToUse: 'Detecting failed Layer 2 hardware handshakes (state FAILED) between the Linux host and a switch or default router.',
    sampleOutput: `192.168.1.1 dev eth0 lladdr e4:38:83:21:a0:12 REACHABLE
192.168.1.100 dev eth0 lladdr b8:27:eb:11:22:33 STALE
192.168.1.200 dev eth0  FAILED`
  }
];

export const wiresharkInspection = {
  title: 'Wireshark Protocol Packet Inspection',
  description: 'Deep-dive packet analysis showing actual dissected frame fields, protocol headers, and TCP flow states.',
  samplePackets: [
    {
      frameNo: 1,
      time: '0.000000',
      source: '192.168.1.105',
      destination: '1.1.1.1',
      protocol: 'DNS',
      length: '74 bytes',
      info: 'Standard query 0x1a2b A api.github.com',
      details: {
        layer2: 'Ethernet II, Src: Intel_3a:9f:22 (00:d8:61:3a:9f:22), Dst: Router_21:a0:12 (e4:38:83:21:a0:12)',
        layer3: 'Internet Protocol Version 4, Src: 192.168.1.105, Dst: 1.1.1.1, TTL: 64, Protocol: UDP (17)',
        layer4: 'User Datagram Protocol, Src Port: 54321, Dst Port: 53 (DNS), Length: 40',
        layer7: 'Domain Name System (query): Transaction ID: 0x1a2b, Query: api.github.com: type A, class IN'
      }
    },
    {
      frameNo: 2,
      time: '0.009412',
      source: '1.1.1.1',
      destination: '192.168.1.105',
      protocol: 'DNS',
      length: '90 bytes',
      info: 'Standard query response 0x1a2b A api.github.com A 140.82.114.6',
      details: {
        layer2: 'Ethernet II, Src: Router_21:a0:12 (e4:38:83:21:a0:12), Dst: Intel_3a:9f:22 (00:d8:61:3a:9f:22)',
        layer3: 'Internet Protocol Version 4, Src: 1.1.1.1, Dst: 192.168.1.105, TTL: 58, Protocol: UDP (17)',
        layer4: 'User Datagram Protocol, Src Port: 53, Dst Port: 54321, Length: 56',
        layer7: 'Domain Name System (response): api.github.com: type A, class IN, addr 140.82.114.6, TTL: 60'
      }
    },
    {
      frameNo: 3,
      time: '0.012500',
      source: '192.168.1.105',
      destination: '140.82.114.6',
      protocol: 'TCP',
      length: '66 bytes',
      info: '58120 → 443 [SYN] Seq=0 Win=64240 Len=0 MSS=1460 SACK_PERM=1',
      details: {
        layer2: 'Ethernet II, Src: Intel_3a:9f:22, Dst: Router_21:a0:12',
        layer3: 'Internet Protocol Version 4, Src: 192.168.1.105, Dst: 140.82.114.6, TTL: 64, Protocol: TCP (6)',
        layer4: 'Transmission Control Protocol, Src Port: 58120, Dst Port: 443 (HTTPS), Seq: 0, Flags: [SYN], Window: 64240',
        layer7: 'TCP Handshake Initial Stage (Client initiating connection)'
      }
    },
    {
      frameNo: 4,
      time: '0.024810',
      source: '140.82.114.6',
      destination: '192.168.1.105',
      protocol: 'TCP',
      length: '66 bytes',
      info: '443 → 58120 [SYN, ACK] Seq=0 Ack=1 Win=65535 Len=0 MSS=1432',
      details: {
        layer2: 'Ethernet II, Src: Router_21:a0:12, Dst: Intel_3a:9f:22',
        layer3: 'Internet Protocol Version 4, Src: 140.82.114.6, Dst: 192.168.1.105, TTL: 56, Protocol: TCP (6)',
        layer4: 'Transmission Control Protocol, Src Port: 443, Dst Port: 58120, Seq: 0, Ack: 1, Flags: [SYN, ACK], Window: 65535',
        layer7: 'TCP Handshake Stage 2 (Server acknowledging and offering connection)'
      }
    },
    {
      frameNo: 5,
      time: '0.024920',
      source: '192.168.1.105',
      destination: '140.82.114.6',
      protocol: 'TCP',
      length: '54 bytes',
      info: '58120 → 443 [ACK] Seq=1 Ack=1 Win=64240 Len=0',
      details: {
        layer2: 'Ethernet II, Src: Intel_3a:9f:22, Dst: Router_21:a0:12',
        layer3: 'Internet Protocol Version 4, Src: 192.168.1.105, Dst: 140.82.114.6, TTL: 64, Protocol: TCP (6)',
        layer4: 'Transmission Control Protocol, Src Port: 58120, Dst Port: 443, Seq: 1, Ack: 1, Flags: [ACK], Window: 64240',
        layer7: 'Connection ESTABLISHED; Ready for TLS 1.3 Client Hello'
      }
    }
  ]
};
