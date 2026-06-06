import { useRef, type RefObject } from "react";

export function useLazyRef<T>(fn: () => T): RefObject<T> {
  const ref: RefObject<T | null> = useRef<T | null>(null);
  ref.current ??= fn();
  return ref as RefObject<T>;
}