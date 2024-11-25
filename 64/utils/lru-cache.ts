/** Least  Recently Used cache */
export class LRUCache<T> {
  private readonly data = new Map<string, T>();

  constructor(private readonly capacity: number) {}

  public get(key: string): T | undefined {
    if (!this.data.has(key)) return undefined;
    const value = this.data.get(key)!;
    // Exploit the fact that Map enumerates items in insertion order, so inserting again will make it the last one
    this.data.set(key, value);
    return value;
  }

  public set(key: string, value: T) {
    if (this.data.has(key)) {
      // Delete to allow re-insert to "append it to tail"
      this.data.delete(key);
    } else if (this.data.size === this.capacity) {
      // We should remove something to stay within capacity.
      // First item is the LRU item
      this.removeFirst();
    }
    this.data.set(key, value);
  }

  private removeFirst() {
    const first = this.data.keys().next().value as string;
    this.data.delete(first);
  }

  public clear(predicate?: (value: T) => boolean) {
    if (!predicate) {
      this.data.clear();
      return;
    }
    for (const [key, value] of this.data) {
      if (predicate(value)) {
        this.data.delete(key);
      }
    }
  }
}
