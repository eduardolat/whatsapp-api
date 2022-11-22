import NodeCache from 'node-cache';

class NodeCacheAdapter {
  private readonly cache: NodeCache;

  constructor() {
    this.cache = new NodeCache();
  }

  async set(key: string, value: any, ttlSeconds?: number): Promise<boolean> {
    const stringValue = JSON.stringify(value);
    if (ttlSeconds != null) {
      return this.cache.set(key, stringValue, ttlSeconds);
    }
    return this.cache.set(key, stringValue);
  }

  async get(key: string): Promise<any> {
    if (!this.cache.has(key)) return null;
    return JSON.parse(this.cache.get(key) as string);
  }

  async del(key: string): Promise<void> {
    this.cache.del(key);
  }

  async has(key: string): Promise<boolean> {
    return this.cache.has(key);
  }

  async executeFunctionWithCache<Type>(args: {
    key: string;
    ttlSeconds?: number;
    fn: () => Promise<Type>;
  }): Promise<Type> {
    const { key, ttlSeconds, fn } = args;

    if (await this.has(key)) {
      return this.get(key);
    }

    const result = await fn();

    await this.set(key, result, ttlSeconds);

    return result as Type;
  }
}

export default NodeCacheAdapter;
