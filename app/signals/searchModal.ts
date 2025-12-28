import { signal } from "@preact/signals";

/**
 * Shared signal for search modal open state.
 * Used by all SearchModal instances to ensure only one modal is rendered.
 */
export const isSearchModalOpen = signal(false);
