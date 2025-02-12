import { ProxyManager } from "./proxy-manager";

async function main() {
    const proxyManager = new ProxyManager();

    try {
        // Initialize the proxy manager
        await proxyManager.init();

        // Example proxy configuration
        const exampleConfig = {
            name: "proxy1",
            address: "10.0.0.2/24",
            privateKey: "YOUR_PRIVATE_KEY",
            publicKey: "SERVER_PUBLIC_KEY",
            endpoint: "server.example.com:51820",
            allowedIPs: "0.0.0.0/0",
            dns: "1.1.1.1",
            persistentKeepalive: 25,
            active: false,
        };

        // Add a proxy configuration
        await proxyManager.addProxy(exampleConfig);

        // Get all available configurations
        const configs = proxyManager.getConfigs();
        console.log("Available configurations:", configs);

        // Connect to a specific proxy
        await proxyManager.connect("proxy1");

        // Get current proxy configuration
        const currentConfig = await proxyManager.getCurrentConfig();
        console.log("Current proxy configuration:", currentConfig);

        // Wait for 30 seconds
        await new Promise((resolve) => setTimeout(resolve, 30000));

        // Rotate to next proxy
        await proxyManager.rotate();

        // Get new current configuration after rotation
        const newConfig = await proxyManager.getCurrentConfig();
        console.log("New proxy configuration after rotation:", newConfig);

        // Disconnect when done
        await proxyManager.disconnect();
    } catch (error) {
        console.error("Error:", error);
    }
}

main();
