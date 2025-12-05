import { useEffect } from "preact/hooks";

/**
 * Custom hook to lock body scroll when a modal or overlay is open.
 * Automatically restores scroll when the component unmounts.
 *
 * @param isLocked - Optional boolean to conditionally lock/unlock scroll. Defaults to true.
 *
 * @example
 * // Simple usage - always lock when component is mounted
 * function MyModal() {
 *   useBodyScrollLock();
 *   return <div>...</div>;
 * }
 *
 * @example
 * // Conditional locking based on state
 * function MyModal() {
 *   const isOpen = useSignal(false);
 *   useBodyScrollLock(isOpen.value);
 *   return <div>...</div>;
 * }
 */
export function useBodyScrollLock(isLocked = true) {
  useEffect(() => {
    if (!isLocked) return;

    // Save original styles
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // Get scrollbar width to prevent layout shift
    const scrollbarWidth = globalThis.innerWidth -
      document.documentElement.clientWidth;

    // Lock scroll and compensate for scrollbar width
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Cleanup: restore original styles
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isLocked]);
}
