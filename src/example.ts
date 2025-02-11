import { ProxyManager } from "./proxy-manager";

(async () => {
    const proxyManager = new ProxyManager();
    await proxyManager.readConfigs();
    await proxyManager.rotate();
    const config = await proxyManager.getCurrentConfig();
    console.log(config);
})();
