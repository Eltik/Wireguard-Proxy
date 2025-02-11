import fs from "fs/promises";
import path from "path";
import type { IConfig } from "./types";

export class ProxyManager {
    private configs: IConfig[] = [];
    private currentConfig: IConfig | null = null;

    constructor() {}

    async readConfigs() {
        const configsDir = path.join(process.cwd(), process.env.CONFIGS_DIR || "configs");
        const configs = await fs.readdir(configsDir);
        this.configs = await Promise.all(
            configs.map(async (config) => {
                const loadedConfig = await this.loadConfig(path.join(configsDir, config));
                this.configs.push(loadedConfig);
                return loadedConfig;
            }),
        );

        await this.rotate();
    }

    async loadConfig(configPath: string): Promise<IConfig> {
        const file = Bun.file(configPath);
        if (!(await file.exists())) {
            throw new Error(`Config file ${configPath} does not exist`);
        }

        const configContent = await file.text();

        const config = {
            privateKey: configContent.match(/PrivateKey = (.*)/)?.[1],
            address: configContent.match(/Address = (.*)/)?.[1],
            dns: configContent.match(/DNS = (.*)/)?.[1],
            publicKey: configContent.match(/PublicKey = (.*)/)?.[1],
            allowedIPs: configContent.match(/AllowedIPs = (.*)/)?.[1],
            endpoint: configContent.match(/Endpoint = (.*)/)?.[1],
            name: path.basename(configPath),
            active: false,
        } as IConfig;

        return config;
    }

    async rotate() {
        if (this.currentConfig) {
            this.currentConfig.active = false;
        }

        this.currentConfig = this.configs[Math.floor(Math.random() * this.configs.length)];
        this.currentConfig.active = true;
    }

    async getCurrentConfig() {
        return this.currentConfig;
    }
}
