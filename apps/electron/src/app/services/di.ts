export class Container {
  private instances: Record<string, unknown> = {};

  get<T = unknown>(key: string): T {
    return this.instances[key] as T;
  }

  set(key: string, value: unknown): Container {
    this.instances[key] = value;
    return this;
  }
}
