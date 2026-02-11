import NodeCache from "node-cache";

class CacheService {
    private cache: NodeCache;

    constructor() {
        this.cache = new NodeCache({ stdTTL: 1800 }); // Default TTL: 30 minutes (1800 seconds)
    }

    get<T>(key: string): T | undefined {
        return this.cache.get<T>(key);
    }

    set<T>(key: string, value: T, ttl?: number): boolean {
        if (ttl) {
            return this.cache.set(key, value, ttl);
        }
        return this.cache.set(key, value);
    }

    // Invalidate/delete cache 
    del(keys: string | string[]): number {
        return this.cache.del(keys);
    }

    // Clear whole cache (if needed)
    flush(): void {
        this.cache.flushAll();
    }
}

export const cacheService = new CacheService();
