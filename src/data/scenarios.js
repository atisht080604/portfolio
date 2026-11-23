export const troubleshootingScenarios = [
  {
    id: 'scenario-1',
    title: 'Scenario 1: Complete Internet Connectivity Loss',
    badge: 'LAYER 1 - LAYER 3 FAILURE',
    symptom: 'User workstation reports "No Internet Access". Web browser displays ERR_NETWORK_CHANGED or DNS_PROBE_FINISHED_NO_INTERNET.',
    context: 'A developer workstation in the Pune office was working normally yesterday, but this morning cannot open any external or internal web pages.',
    steps: [
      {
        stepNum: 1,
        question: 'What is the very first diagnostic check you should perform?',
        options: [
          { text: 'Check physical cable link lights (Layer 1) & run ipconfig to verify adapter status', isCorrect: true, feedback: 'Correct! Always start at Layer 1/2. Check RJ45 link LED or Wi-Fi radio association, then verify if an IP was provisioned.' },
          { text: 'Immediately change the DNS server in Windows settings to 8.8.8.8', isCorrect: false, feedback: 'Premature. If the physical link is down or IP is missing, changing DNS accomplishes nothing.' },
          { text: 'Restart the core office edge router', isCorrect: false, feedback: 'Incorrect. Disrupting the whole network before verifying a single client is bad practice.' }
        ]
      },
      {
        stepNum: 2,
        question: 'Output of `ipconfig` shows IPv4 Address `169.254.120.45` with Subnet Mask `255.255.0.0` and no Default Gateway. What does this indicate?',
        options: [
          { text: 'The workstation has acquired an APIPA (Automatic Private IP Addressing) address because the DHCP server failed to respond to DHCPDISCOVER.', isCorrect: true, feedback: 'Spot on! 169.254.0.0/16 is the APIPA range assigned when DHCP fails (Layer 7 / DORA failure).' },
          { text: 'The workstation has a valid static enterprise IP address.', isCorrect: false, feedback: 'Incorrect. 169.254.x.x is link-local fallback, not a routable enterprise IP.' },
          { text: 'The internet ISP is having a fiber cut outside the building.', isCorrect: false, feedback: 'No. Local DHCP is not issuing an internal address, which is an internal LAN issue.' }
        ]
      },
      {
        stepNum: 3,
        question: 'What action should you take to resolve the DHCP failure on this host?',
        options: [
          { text: 'Run `ipconfig /release` followed by `ipconfig /renew`, and verify switch port VLAN membership if renew times out.', isCorrect: true, feedback: 'Exact industry procedure! Forcing a renewed DORA broadcast will renegotiate with the DHCP pool or isolate port VLAN mismatch.' },
          { text: 'Format the operating system and reinstall network drivers.', isCorrect: false, feedback: 'Extreme overkill without isolating the network scope.' }
        ]
      }
    ],
    resolution: 'Executing `ipconfig /renew` triggered a successful DHCP DORA handshake. The host received `192.168.1.108/24` with Gateway `192.168.1.1` and DNS `1.1.1.1`. Pinging the default gateway responded in <1ms, and public ICMP to 1.1.1.1 succeeded. Internet restored.'
  },
  {
    id: 'scenario-2',
    title: 'Scenario 2: Website Not Opening While Ping by IP Succeeds',
    badge: 'LAYER 7 / DNS RESOLUTION FAILURE',
    symptom: 'User can ping 1.1.1.1 and 8.8.8.8 with 0% packet loss, but visiting `github.com` or `google.com` in Chrome fails with DNS_PROBE_FINISHED_NXDOMAIN.',
    context: 'The network interface has a valid IP address and can route packets to the internet by raw IP, but all domain names fail to resolve.',
    steps: [
      {
        stepNum: 1,
        question: 'Since `ping 1.1.1.1` succeeds, what layers can be ruled out as functioning properly?',
        options: [
          { text: 'Layers 1 through 4 (Physical, Data Link, Network, Transport) are proven functional for raw IP reachability.', isCorrect: true, feedback: 'Correct. If ICMP packets travel to an external public IP and return, local link, gateway routing, and ISP transit are healthy.' },
          { text: 'All layers are failing equally.', isCorrect: false, feedback: 'False. Ping proves IP routing is working.' }
        ]
      },
      {
        stepNum: 2,
        question: 'Which tool will directly diagnose why the domain name is failing to resolve?',
        options: [
          { text: 'Run `nslookup github.com` or `dig github.com` to inspect query timeout or NXDOMAIN responses from the configured resolver.', isCorrect: true, feedback: 'Correct! nslookup explicitly tests DNS server response on port 53 without browser caching interference.' },
          { text: 'Run `tracert` to hop 30.', isCorrect: false, feedback: 'Tracert tests routing path, but we already know IP connectivity works.' }
        ]
      },
      {
        stepNum: 3,
        question: '`nslookup` reports: "DNS request timed out: timeout was 2 seconds. Default Server: 192.168.1.250". What is the root cause?',
        options: [
          { text: 'The workstation is pointing to an offline internal DNS server (192.168.1.250). Updating DNS to 1.1.1.1 / 8.8.8.8 or starting the DNS service will fix it.', isCorrect: true, feedback: 'Spot on! The configured resolver is non-responsive on UDP port 53.' },
          { text: 'The Ethernet cable has high impedance.', isCorrect: false, feedback: 'No, raw ping was 100% successful.' }
        ]
      }
    ],
    resolution: 'The local DNS server VM was down for maintenance. Configured secondary fallback DNS resolver `1.1.1.1`. Verified with `ipconfig /flushdns` followed by `nslookup github.com`. Name resolution returned `140.82.114.3` in 12ms. Web browsing resumed.'
  },
  {
    id: 'scenario-3',
    title: 'Scenario 3: Intermittent Connection Drops Caused by IP Conflict',
    badge: 'LAYER 2 / ARP COLLISION',
    symptom: 'A workstation experiences random 5-minute disconnects, ARP cache flapping, and Windows warning: "Another computer on this network has the same IP address."',
    context: 'A newly added laboratory printer was manually assigned a static IP that overlapped with the dynamic pool of the local DHCP server.',
    steps: [
      {
        stepNum: 1,
        question: 'How do hosts and switches detect an IP address conflict on an Ethernet LAN?',
        options: [
          { text: 'Via Gratuitous ARP (GARP): when a device broadcasts its IP/MAC, another device responds claiming ownership of the identical IP.', isCorrect: true, feedback: 'Precisely! Gratuitous ARP detects duplicate IPs across the Layer 2 broadcast domain.' },
          { text: 'Via HTTP cookie inspection.', isCorrect: false, feedback: 'HTTP cookies have no relation to Layer 2/3 IP conflicts.' }
        ]
      },
      {
        stepNum: 2,
        question: 'How do you identify the MAC address of the conflicting rogue device?',
        options: [
          { text: 'Check the router/switch ARP table or run `arp -a` from a third machine while pinging the conflicted IP to view which MAC responds.', isCorrect: true, feedback: 'Correct. The MAC address uniquely identifies the offending hardware manufacturer and physical port.' },
          { text: 'Reboot every machine in the entire building simultaneously.', isCorrect: false, feedback: 'Inefficient and disruptive.' }
        ]
      }
    ],
    resolution: 'Identified rogue MAC `00:1B:A9:...` belonging to a lab network printer configured with static IP `192.168.1.50`. Excluded `192.168.1.50` from the DHCP dynamic scope range (`.100 - .254`) and bound the printer MAC to a static DHCP reservation. Conflict resolved.'
  },
  {
    id: 'scenario-4',
    title: 'Scenario 4: Severe Network Slowness and High Latency Spikes',
    badge: 'PERFORMANCE & CONGESTION',
    symptom: 'File downloads crawl at 50 KB/s, ping latency to gateway spikes from 1ms to 800ms with 18% packet loss during peak afternoon hours.',
    context: 'Office team reports unusable video calls and sluggish API responses across both wired and wireless devices.',
    steps: [
      {
        stepNum: 1,
        question: 'What initial diagnostic commands isolate whether the issue is inside the local LAN or on the ISP WAN uplink?',
        options: [
          { text: 'Run simultaneous continuous pings: `ping -t 192.168.1.1` (Gateway) and `ping -t 1.1.1.1` (External). Compare latency and packet loss.', isCorrect: true, feedback: 'Exemplary diagnostic methodology! If gateway latency is 1ms but external is 800ms, the bottleneck is WAN uplink. If gateway itself is 800ms, the bottleneck is local LAN / switch / Wi-Fi.' },
          { text: 'Immediately purchase a faster consumer broadband plan.', isCorrect: false, feedback: 'Never upgrade hardware without knowing where the bottleneck originates.' }
        ]
      },
      {
        stepNum: 2,
        question: 'Ping to local gateway `192.168.1.1` shows <1ms stable, but ping to `1.1.1.1` shows 750ms with packet loss. Router WAN interface shows 99.8% outbound bandwidth saturation. What is the cause?',
        options: [
          { text: 'Bufferbloat and outbound uplink bandwidth exhaustion caused by unthrottled large file uploads or backups saturating the queue.', isCorrect: true, feedback: 'Spot on! Saturated uplink induces high queue latency (bufferbloat) and drops incoming TCP ACKs.' },
          { text: 'A corrupted DNS cache on the workstation.', isCorrect: false, feedback: 'DNS does not cause continuous ping latency or bandwidth saturation.' }
        ]
      }
    ],
    resolution: 'Discovered an unthrottled cloud backup job saturating the 50 Mbps WAN uplink. Configured Quality of Service (QoS) and FQ-CoDel traffic shaping on the edge gateway to prioritize interactive DNS, SSH, and video streams, limiting background backup transfers to 60% bandwidth. Latency dropped back to 12ms.'
  },
  {
    id: 'scenario-5',
    title: 'Scenario 5: Two Subnets Cannot Communicate (Inter-VLAN Routing)',
    badge: 'LAYER 3 / VLAN & ROUTING FAILURE',
    symptom: 'Host on Subnet A (`192.168.10.5/24`, VLAN 10) cannot ping or establish SSH connection to Server on Subnet B (`192.168.20.10/24`, VLAN 20).',
    context: 'Both machines have internet access, but inter-departmental traffic between VLAN 10 and VLAN 20 is completely unreachable.',
    steps: [
      {
        stepNum: 1,
        question: 'Because Subnet A and Subnet B are distinct broadcast domains, what device is required to pass packets between them?',
        options: [
          { text: 'A Layer 3 device (Router or Multilayer Switch) with an interface / SVI on both VLANs and active IP routing enabled.', isCorrect: true, feedback: 'Correct! Layer 2 switches cannot forward frames between different VLANs without a Layer 3 routing mechanism (Router-on-a-Stick or L3 SVI).' },
          { text: 'An unmanaged hub connected between two random ports.', isCorrect: false, feedback: 'Hubs lack VLAN awareness and would cause broadcast storms and collision loops.' }
        ]
      },
      {
        stepNum: 2,
        question: 'Checking the inter-VLAN router reveals routes exist, but traffic is still dropped. What should be inspected next?',
        options: [
          { text: 'Inspect Access Control Lists (ACLs) / Firewall policies on the router between VLAN 10 and VLAN 20, plus the host OS firewall on the target server.', isCorrect: true, feedback: 'Exact root cause isolation! Inter-VLAN traffic is frequently blocked by security ACLs or local OS host firewalls (iptables / Windows Defender).' },
          { text: 'Change the subnet mask of both subnets to /8.', isCorrect: false, feedback: 'Collapsing distinct subnets breaks network segmentation architecture.' }
        ]
      }
    ],
    resolution: 'The router ACL was permitting only established traffic from VLAN 20 to VLAN 10. Added explicit bidirectional ACL rule permitting TCP port 22 and ICMP between VLAN 10 admin subnet and VLAN 20 server subnet. Verified with `ping 192.168.20.10` and SSH handshake. Communication restored.'
  }
];
