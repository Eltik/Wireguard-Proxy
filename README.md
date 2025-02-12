# WireGuard Proxy
A simple "IP Rotator" manager for WireGuard configurations.

## Purpose
The goal of this project was to create a simple way to rotate IP addresses using WireGuard configurations. I originally bought [Mullvad VPN](https://mullvad.net/) to bypass rate limits, but then I realized that I could use the same method to rotate IP addresses using WireGuard configurations.

## Usage
You will need WireGuard installed to use this tool as well as have multiple configuration files in the `configs` directory. Each configuration should look like this:
```conf
[Interface]
PrivateKey = myprivatekey1234567890!@
Address = 12.34.56.78/32,abcd:1234:5678:90ab:cdef:1234:5678:90ab/128
DNS = 12.34.5.6

[Peer]
PublicKey = mypublickey1234567890!@
AllowedIPs = 0.0.0.0/0,::0/0
Endpoint = 12.34.56.78:12345
```
Put all of your configurations in the `configs` directory and then run the following command to start the proxy manager.
```bash
bun install
bun run src/index.ts
```