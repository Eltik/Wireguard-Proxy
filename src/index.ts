import { ProxyManager } from "./proxy-manager";

async function main() {
    const proxyManager = new ProxyManager();

    try {
        // Initialize the proxy manager
        await proxyManager.init();

        // Get all available configurations
        const configs = proxyManager.getConfigs();
        console.log("Available configurations:", configs);

        // Connect to a specific proxy
        await proxyManager.connect();

        // Get current proxy configuration
        const currentConfig = await proxyManager.getCurrentConfig();
        console.log("Current proxy configuration:", currentConfig);

        // Wait for 30 seconds
        await new Promise((resolve) => setTimeout(resolve, 3000));

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
