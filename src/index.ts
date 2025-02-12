import { ProxyManager } from "./proxy-manager";

async function main() {
    const proxyManager = new ProxyManager();

    try {
        // Initialize the proxy manager
        await proxyManager.init();

        // Get all available configurations
        const configs = proxyManager.getConfigs();
        console.log("Available configurations:", configs);

        // Connect to a proxy
        await proxyManager.connect();

        // Get current proxy configuration
        const currentConfig = await proxyManager.getCurrentConfig();
        console.log("Current proxy configuration:", currentConfig);

        const req1 = await fetch("https://api.ipify.org?format=json");
        const ip1 = await req1.json();
        console.log("IP1:", ip1);

        // Wait for 30 seconds
        await new Promise((resolve) => setTimeout(resolve, 3000));

        // Rotate to next proxy
        await proxyManager.rotate();

        // Get new current configuration after rotation
        const newConfig = await proxyManager.getCurrentConfig();
        console.log("New proxy configuration after rotation:", newConfig);

        const req2 = await fetch("https://api.ipify.org?format=json");
        const ip2 = await req2.json();
        console.log("IP2:", ip2);

        // Disconnect when done
        await proxyManager.disconnect();
    } catch (error) {
        console.error("Error:", error);
    }
}

main();
