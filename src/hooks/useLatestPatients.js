import { useMemo } from "react";

export function useLatestPatients(data = []) {
  return useMemo(() => {
    const map = new Map();
    for (const item of data) {
      const existing = map.get(item.patientencode);
      if (!existing || new Date(item.updated_at) > new Date(existing.updated_at)) {
        map.set(item.patientencode, item);
      }
    }
    return Array.from(map.values());
  }, [data]);
}
