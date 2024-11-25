export function areSetsEqual<T>(
  a: Set<T> | undefined | null,
  b: Set<T> | undefined | null
) {
  if (a == null && b == null) {
    return true;
  }
  if (a == null || b == null) {
    return false;
  }
  if (a.size !== b.size) {
    return false;
  }
  for (const aItem of a) {
    if (!b.has(aItem)) {
      return false;
    }
  }
  for (const bItem of b) {
    if (!a.has(bItem)) {
      return false;
    }
  }
  return true;
}
